import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface ForgePressEnv {
  DB?: D1Database;
  MEDIA?: R2Bucket;
  ADMIN_TOKEN?: string;
  ASSETS?: Fetcher;
}

export async function getEnv(): Promise<ForgePressEnv> {
  try {
    const context = await getCloudflareContext({ async: true });
    return context.env as ForgePressEnv;
  } catch {
    return {};
  }
}
