import { NextRequest, NextResponse } from "next/server";
import { getReportPublicUrl, getReportsBucket } from "@/lib/report-storage";

export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function getToken(req: NextRequest) {
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim() || "";
  if (!token || token.includes(" ") || token.startsWith("{") || token.startsWith("[")) {
    return "";
  }
  return token;
}

async function validateGithubToken(token: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return response.ok;
}

function normalizeFilename(filename: string) {
  const base = filename
    .replace(/\.[^.]+$/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return base || "report";
}

function isValidStoragePath(path: string) {
  return (
    path.startsWith("articles/") &&
    path.endsWith(".html") &&
    !path.includes("..") &&
    !path.includes("\\") &&
    !/^https?:\/\//i.test(path)
  );
}

function getStorageConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables.");
  }

  return {
    url: url.replace(/\/$/, ""),
    key,
    bucket: getReportsBucket(),
  };
}

export async function POST(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonError("Please sign in to the admin panel first.", 401);
  if (!(await validateGithubToken(token))) return jsonError("Admin session expired. Please sign in again.", 401);

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return jsonError("Invalid upload payload.", 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File)) return jsonError("Please choose an HTML file.", 400);
  if (!/\.html?$/i.test(file.name)) return jsonError("Only .html and .htm files are supported.", 400);
  if (file.size > 20 * 1024 * 1024) return jsonError("HTML file must be 20MB or smaller.", 400);

  const { url, key, bucket } = getStorageConfig();
  const date = new Date().toISOString().slice(0, 10);
  const id = crypto.randomUUID().slice(0, 8);
  const path = `articles/${date}-${normalizeFilename(file.name)}-${id}.html`;

  const uploadResponse = await fetch(
    `${url}/storage/v1/object/${bucket}/${encodeURIComponent(path).replace(/%2F/g, "/")}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": file.type || "text/html; charset=utf-8",
        "x-upsert": "false",
      },
      body: await file.arrayBuffer(),
    }
  );

  if (!uploadResponse.ok) {
    const detail = await uploadResponse.text().catch(() => uploadResponse.statusText);
    return jsonError(`Supabase upload failed: ${detail}`, 502);
  }

  return NextResponse.json({
    path,
    url: `${url}/storage/v1/object/public/${bucket}/${path}`,
    markdown: `<ReportFrame path="${path}" />`,
  });
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "";
  if (!isValidStoragePath(path)) return jsonError("Invalid report path.", 400);

  return NextResponse.redirect(getReportPublicUrl(path));
}
