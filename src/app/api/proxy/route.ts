import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, slug, collection, data } = body;

    const contentDir = path.join(process.cwd(), "src/content");
    let targetDir: string;
    let filename: string;

    // 根据 collection 确定目标目录
    switch (collection) {
      case "posts":
        targetDir = path.join(contentDir, "posts");
        break;
      case "works":
        targetDir = path.join(contentDir, "works");
        break;
      case "stars":
        targetDir = path.join(contentDir, "stars");
        break;
      case "sentences":
        targetDir = path.join(contentDir, "sentences");
        break;
      case "photos":
        targetDir = path.join(contentDir, "photos");
        break;
      default:
        return NextResponse.json({ error: "Unknown collection" }, { status: 400 });
    }

    // 确保目录存在
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }

    filename = path.join(targetDir, `${slug}.mdx`);

    // 构建 frontmatter
    const frontmatter = Object.entries(data)
      .filter(([key]) => key !== "body")
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}:\n  - ${value.join("\n  - ")}`;
        }
        if (typeof value === "boolean") {
          return `${key}: ${value ? "true" : "false"}`;
        }
        return `${key}: ${JSON.stringify(value)}`;
      })
      .join("\n");

    const content = `---\n${frontmatter}\n---\n\n${data.body || ""}`;

    // 写入文件
    await writeFile(filename, content, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// 支持 GET 请求用于读取文件列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get("collection");

    const contentDir = path.join(process.cwd(), "src/content");
    let targetDir: string;

    switch (collection) {
      case "posts":
        targetDir = path.join(contentDir, "posts");
        break;
      case "works":
        targetDir = path.join(contentDir, "works");
        break;
      case "stars":
        targetDir = path.join(contentDir, "stars");
        break;
      case "sentences":
        targetDir = path.join(contentDir, "sentences");
        break;
      case "photos":
        targetDir = path.join(contentDir, "photos");
        break;
      default:
        return NextResponse.json({ error: "Unknown collection" }, { status: 400 });
    }

    // 这里简化处理，实际项目中可能需要读取文件列表
    return NextResponse.json({ files: [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}
