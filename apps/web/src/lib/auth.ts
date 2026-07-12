import "server-only";
import { getEnv } from "./cloudflare";

export async function isAuthorized(request: Request): Promise<boolean> {
  const { ADMIN_TOKEN } = await getEnv();
  if (!ADMIN_TOKEN) return false;

  const header = request.headers.get("authorization");
  return header === `Bearer ${ADMIN_TOKEN}`;
}
