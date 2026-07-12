import { isAuthorized } from "@/lib/auth";
import { getEnv } from "@/lib/cloudflare";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  if (!(await isAuthorized(request))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { MEDIA } = await getEnv();
  if (!MEDIA) return new Response("R2 binding MEDIA is unavailable.", { status: 503 });

  const { key } = await params;
  const objectKey = key.join("/");
  if (!objectKey || objectKey.includes("..")) {
    return new Response("Invalid object key.", { status: 400 });
  }

  await MEDIA.put(objectKey, request.body, {
    httpMetadata: {
      contentType: request.headers.get("content-type") ?? "application/octet-stream"
    }
  });

  return Response.json({ data: { key: objectKey }, error: null }, { status: 201 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { MEDIA } = await getEnv();
  if (!MEDIA) return new Response("R2 binding MEDIA is unavailable.", { status: 503 });

  const { key } = await params;
  const object = await MEDIA.get(key.join("/"));
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
