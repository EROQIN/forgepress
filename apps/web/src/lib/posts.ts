import "server-only";
import { seedPosts, type Post } from "@forgepress/content";
import { getEnv } from "./cloudflare";

interface D1Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  tags_json: string;
  status: Post["status"];
  published_at: string | null;
}

function mapRow(row: D1Post): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverUrl: row.cover_url ?? undefined,
    tags: JSON.parse(row.tags_json) as string[],
    status: row.status,
    publishedAt: row.published_at ?? new Date().toISOString(),
    readingMinutes: Math.max(1, Math.ceil(row.content.length / 500))
  };
}

function reportReadFallback(operation: string, error: unknown): void {
  const message = error instanceof Error ? error.message : "Unknown D1 read error";
  console.warn(
    `[forgepress] D1 is not ready during ${operation}; falling back to bundled content. ${message}`
  );
}

export async function listPublishedPosts(): Promise<Post[]> {
  const { DB } = await getEnv();
  if (!DB) return seedPosts;

  try {
    const result = await DB.prepare(
      `SELECT id, title, slug, excerpt, content, cover_url, tags_json, status, published_at
       FROM posts
       WHERE status = 'published'
       ORDER BY published_at DESC`
    ).all<D1Post>();

    return result.results.length > 0 ? result.results.map(mapRow) : seedPosts;
  } catch (error) {
    reportReadFallback("published-post listing", error);
    return seedPosts;
  }
}

export async function findPublishedPost(slug: string): Promise<Post | undefined> {
  const seedPost = seedPosts.find((post) => post.slug === slug);
  const { DB } = await getEnv();
  if (!DB) return seedPost;

  try {
    const row = await DB.prepare(
      `SELECT id, title, slug, excerpt, content, cover_url, tags_json, status, published_at
       FROM posts
       WHERE slug = ? AND status = 'published'
       LIMIT 1`
    )
      .bind(slug)
      .first<D1Post>();

    return row ? mapRow(row) : seedPost;
  } catch (error) {
    reportReadFallback(`post lookup for ${slug}`, error);
    return seedPost;
  }
}

export async function createPost(input: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
}): Promise<Post> {
  const { DB } = await getEnv();
  if (!DB) {
    throw new Error("D1 binding DB is required for write operations.");
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await DB.prepare(
    `INSERT INTO posts
      (id, title, slug, excerpt, content, tags_json, status, published_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?, ?)`
  )
    .bind(
      id,
      input.title,
      input.slug,
      input.excerpt,
      input.content,
      JSON.stringify(input.tags),
      now,
      now,
      now
    )
    .run();

  return {
    id,
    ...input,
    status: "published",
    publishedAt: now,
    readingMinutes: Math.max(1, Math.ceil(input.content.length / 500))
  };
}
