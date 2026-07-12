export async function GET() {
  return Response.json({
    status: "ok",
    service: "forgepress",
    runtime: "cloudflare-compatible",
    timestamp: new Date().toISOString()
  });
}
