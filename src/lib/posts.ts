import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  cover?: string;
  type: "post" | "work" | "star";
}

const CONTENT_DIR = path.join(process.cwd(), "src/content");

function readMdxFiles(subDir: string, type: PostMeta["type"]): PostMeta[] {
  const dir = path.join(CONTENT_DIR, subDir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: filename.replace(/\.mdx?$/, ""),
        title: data.title ?? filename,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        description: data.description,
        category: data.category,
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        cover: data.cover,
        type,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPosts(): PostMeta[] {
  return readMdxFiles("posts", "post");
}

export function getWorks(): PostMeta[] {
  return readMdxFiles("works", "work");
}

export function getStars(): PostMeta[] {
  return readMdxFiles("stars", "star");
}

export function getPostBySlug(
  slug: string,
  subDir: string
): { meta: PostMeta; content: string } | null {
  const dir = path.join(CONTENT_DIR, subDir);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      description: data.description,
      category: data.category,
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      cover: data.cover,
      type: "post",
    },
    content,
  };
}

export function getFeaturedPosts(count: number = 3): PostMeta[] {
  return getPosts().filter((p) => p.featured).slice(0, count);
}

export function getFeaturedWorks(count: number = 1): PostMeta[] {
  return getWorks().filter((p) => p.featured).slice(0, count);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getPosts().filter((p) => p.category === category);
}

/** Days since site launch */
export function getDaysSinceStart(startDate: string): number {
  return Math.floor(
    (Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
  );
}
