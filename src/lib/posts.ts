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
  status?: string;
  url?: string;
  link?: string;
}

export interface SentenceMeta {
  slug: string;
  title: string;
  date: string;
  author?: string;
  tags?: string[];
}

export interface PhotoMeta {
  slug: string;
  title: string;
  date: string;
  image: string;
  description?: string;
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
        status: data.status,
        url: data.url,
        link: data.link,
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

// Map subdirectory to post type
const SUBDIR_TO_TYPE: Record<string, PostMeta["type"]> = {
  posts: "post",
  works: "work",
  stars: "star",
};

export function getPostBySlug(
  slug: string,
  subDir: string
): { meta: PostMeta; content: string } | null {
  const decodedSlug = decodeURIComponent(slug);
  const dir = path.join(CONTENT_DIR, subDir);
  const mdxPath = path.join(dir, `${decodedSlug}.mdx`);
  const mdPath = path.join(dir, `${decodedSlug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug: decodedSlug,
      title: data.title ?? decodedSlug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      description: data.description,
      category: data.category,
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      cover: data.cover,
      status: data.status,
      url: data.url,
      link: data.link,
      type: SUBDIR_TO_TYPE[subDir] ?? "post",
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

export function getSentences(): SentenceMeta[] {
  const dir = path.join(CONTENT_DIR, "sentences");
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
        author: data.author,
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPhotos(): PhotoMeta[] {
  const dir = path.join(CONTENT_DIR, "photos");
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
        image: data.image ?? "",
        description: data.description,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
