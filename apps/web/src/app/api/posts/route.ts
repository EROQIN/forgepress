import { createPost, listPublishedPosts } from "@/lib/posts";
import { isAuthorized } from "@/lib/auth";

export async function GET() {
  const posts = await listPublishedPosts();
  return Response.json({ data: posts, error: null });
}

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return Response.json(
      { data: null, error: { code: "UNAUTHORIZED", message: "Invalid administrator token." } },
      { status: 401 }
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
    const content = typeof body.content === "string" ? body.content : "";
    const tags = Array.isArray(body.tags)
      ? body.tags.filter((item): item is string => typeof item === "string")
      : [];

    if (!title || !slug || !content || !/^[a-z0-9-]+$/.test(slug)) {
      return Response.json(
        {
          data: null,
          error: {
            code: "INVALID_POST",
            message: "title, lowercase kebab-case slug, and content are required."
          }
        },
        { status: 400 }
      );
    }

    const post = await createPost({ title, slug, excerpt, content, tags });
    return Response.json({ data: post, error: null }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { data: null, error: { code: "CREATE_POST_FAILED", message } },
      { status: 500 }
    );
  }
}
