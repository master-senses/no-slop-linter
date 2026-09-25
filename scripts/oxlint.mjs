import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const extraFlags = "--experimental-strip-types --no-warnings";
const existing = process.env.NODE_OPTIONS?.trim();
const nodeOptions = existing ? `${existing} ${extraFlags}` : extraFlags;
const oxlint = path.join(root, "node_modules", ".bin", "oxlint");
const result = spawnSync(oxlint, process.argv.slice(2), {
  cwd: root,
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
  stdio: "inherit",
});

process.exit(result.status ?? 1);
