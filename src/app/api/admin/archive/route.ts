import matter from "gray-matter";
import { NextRequest, NextResponse } from "next/server";

const OWNER = "bug-zi";
const REPO = "blog";
const BRANCH = "main";

const COLLECTIONS: Record<string, { label: string; folder: string }> = {
  posts: { label: "文章", folder: "src/content/posts" },
  works: { label: "作品", folder: "src/content/works" },
  stars: { label: "收藏", folder: "src/content/stars" },
  sentences: { label: "一言", folder: "src/content/sentences" },
  photos: { label: "照片", folder: "src/content/photos" },
  footprints: { label: "足迹", folder: "src/content/footprints" },
  history: { label: "历史", folder: "src/content/history" },
};

type GitHubContentFile = {
  content: string;
  encoding: string;
};

type GitHubRef = {
  object: {
    sha: string;
  };
};

type GitHubCommit = {
  sha: string;
  tree: {
    sha: string;
  };
};

type GitHubTree = {
  sha: string;
};

type ArchiveRequest = {
  collection?: unknown;
  filename?: unknown;
};

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

function isValidFilename(filename: string) {
  return (
    (filename.endsWith(".mdx") || filename.endsWith(".md")) &&
    !filename.includes("/") &&
    !filename.includes("\\") &&
    filename !== ".mdx" &&
    filename !== ".md"
  );
}

function stripExtension(filename: string) {
  return filename.replace(/\.mdx?$/i, "");
}

function normalizeTitle(value: unknown, fallback: string) {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function timestamp() {
  return new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
}

function decodeBase64(value: string) {
  return Buffer.from(value.replace(/\n/g, ""), "base64").toString("utf8");
}

async function githubRequest<T>(
  path: string,
  token: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = (await response.json()) as { message?: string };
      detail = body.message || detail;
    } catch {
      // Keep the HTTP status text.
    }
    throw new Error(`GitHub API ${response.status}: ${detail}`);
  }

  return response.json() as Promise<T>;
}

async function githubExists(path: string, token: string) {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${BRANCH}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (response.status === 404) return false;
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(`GitHub API ${response.status}: ${body.message || response.statusText}`);
  }
  return true;
}

async function buildArchivePath(collection: string, slug: string, token: string) {
  const basePath = `src/content/archive/${collection}-${slug}.mdx`;
  if (!(await githubExists(basePath, token))) return basePath;

  const fallbackPath = `src/content/archive/${collection}-${slug}-${timestamp()}.mdx`;
  if (!(await githubExists(fallbackPath, token))) return fallbackPath;

  throw new Error("归档文件名冲突，请稍后重试。");
}

export async function POST(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonError("缺少 GitHub 登录令牌，请先登录后台。", 401);

  let body: ArchiveRequest;
  try {
    body = (await req.json()) as ArchiveRequest;
  } catch {
    return jsonError("请求内容不是有效 JSON。", 400);
  }

  const collection = typeof body.collection === "string" ? body.collection : "";
  const filename = typeof body.filename === "string" ? body.filename : "";
  const collectionConfig = COLLECTIONS[collection];

  if (!collectionConfig) return jsonError("不支持归档这个栏目。", 400);
  if (!isValidFilename(filename)) return jsonError("文件名无效。", 400);

  const slug = stripExtension(filename);
  const sourcePath = `${collectionConfig.folder}/${filename}`;

  try {
    const sourceFile = await githubRequest<GitHubContentFile>(
      `/contents/${encodeURIComponent(sourcePath).replace(/%2F/g, "/")}?ref=${BRANCH}`,
      token
    );

    if (sourceFile.encoding !== "base64") {
      return jsonError("无法读取原文件内容。", 502);
    }

    const raw = decodeBase64(sourceFile.content);
    const parsed = matter(raw);
    const archivePath = await buildArchivePath(collection, slug, token);
    const archiveContent = matter.stringify(parsed.content, {
      title: normalizeTitle(parsed.data.title ?? parsed.data.place, slug),
      originalType: collectionConfig.label,
      originalCollection: collection,
      originalPath: sourcePath,
      originalSlug: slug,
      archivedAt: today(),
      originalData: JSON.stringify(parsed.data, null, 2),
    });

    const ref = await githubRequest<GitHubRef>(`/git/ref/heads/${BRANCH}`, token);
    const headCommit = await githubRequest<GitHubCommit>(`/git/commits/${ref.object.sha}`, token);
    const tree = await githubRequest<GitHubTree>("/git/trees", token, {
      method: "POST",
      body: JSON.stringify({
        base_tree: headCommit.tree.sha,
        tree: [
          {
            path: archivePath,
            mode: "100644",
            type: "blob",
            content: archiveContent,
          },
          {
            path: sourcePath,
            mode: "100644",
            type: "blob",
            sha: null,
          },
        ],
      }),
    });

    const commit = await githubRequest<GitHubCommit>("/git/commits", token, {
      method: "POST",
      body: JSON.stringify({
        message: `Archive ${collection}/${filename}`,
        tree: tree.sha,
        parents: [headCommit.sha],
      }),
    });

    await githubRequest(`/git/refs/heads/${BRANCH}`, token, {
      method: "PATCH",
      body: JSON.stringify({
        sha: commit.sha,
        force: false,
      }),
    });

    return NextResponse.json({
      archivedPath: archivePath,
      deletedPath: sourcePath,
      commitSha: commit.sha,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "归档失败。";
    return jsonError(message, 500);
  }
}
