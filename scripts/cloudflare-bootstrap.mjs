import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const web = resolve(root, "apps/web");
const wranglerFile = resolve(web, "wrangler.jsonc");

function run(args, options = {}) {
  return execFileSync("pnpm", ["--dir", web, "exec", "wrangler", ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
}

function capture(args) {
  try {
    return run(args, { capture: true });
  } catch (error) {
    return `${error.stdout ?? ""}\n${error.stderr ?? ""}`;
  }
}

function findDatabaseId(output) {
  return (
    output.match(/database_id\s*=\s*"([^"]+)"/)?.[1] ??
    output.match(/"database_id"\s*:\s*"([^"]+)"/)?.[1] ??
    output.match(/\b([0-9a-f]{8}-[0-9a-f-]{27,})\b/i)?.[1]
  );
}

console.log("→ Checking Cloudflare authentication");
run(["whoami"]);

console.log("→ Creating or locating D1 database");
const d1Output = capture(["d1", "create", "forgepress-db"]);
let databaseId = findDatabaseId(d1Output);

if (!databaseId) {
  const listOutput = capture(["d1", "list", "--json"]);
  const databases = JSON.parse(listOutput);
  databaseId = databases.find((item) => item.name === "forgepress-db")?.uuid;
}

if (!databaseId) {
  throw new Error("Unable to determine the D1 database id.");
}

console.log(`→ Using D1 database ${databaseId}`);
const current = readFileSync(wranglerFile, "utf8");
const updated = current.replace(
  /"database_id"\s*:\s*"[^"]+"/,
  `"database_id": "${databaseId}"`,
);
writeFileSync(wranglerFile, updated);

console.log("→ Creating or reusing R2 bucket");
capture(["r2", "bucket", "create", "forgepress-media"]);

console.log("→ Applying D1 migrations");
run(["d1", "migrations", "apply", "forgepress-db", "--remote"]);

console.log("\nSet the administrator token in the next prompt.");
run(["secret", "put", "ADMIN_TOKEN"]);

console.log("→ Building and deploying ForgePress");
execFileSync("pnpm", ["--dir", web, "run", "deploy"], {
  cwd: root,
  stdio: "inherit",
});

console.log("✓ ForgePress is deployed.");
