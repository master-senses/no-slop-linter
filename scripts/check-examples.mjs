import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const expectedFailRules = [
  "anti-slop/no-array-filter-map",
  "anti-slop/no-reduce-accumulator-copy",
  "anti-slop/no-chained-type-assertions",
  "anti-slop/no-conditional-empty-object-spread",
  "anti-slop/no-known-value-widening",
  "anti-slop/no-module-mocking",
  "anti-slop/no-object-parameters",
  "anti-slop/no-reflect-apply",
  "anti-slop/no-reflect-get",
  "anti-slop/no-runtime-typeof",
  "anti-slop/no-shape-in-symbol-names",
  "anti-slop/no-unknown-parameters",
  "anti-slop/no-unknown-returns",
  "anti-slop/no-unknown-type-aliases",
  "anti-slop/no-unsafe-dictionary-type",
  "anti-slop/no-widen-then-assert",
  "anti-slop/require-safety-comment-for-type-assertion",
  "shadcn/no-restyle",
  "shadcn/no-raw-colors",
  "shadcn/no-arbitrary-values",
  "shadcn/no-inline-styles",
  "shadcn/no-unknown-classes",
  "shadcn/require-static-classes",
];

function reported(output, rule) {
  const separator = rule.indexOf("/");
  const plugin = rule.slice(0, separator);
  const name = rule.slice(separator + 1);

  return output.includes(rule) || output.includes(`${plugin}(${name})`);
}

function runOxlint(target) {
  const result = spawnSync(process.execPath, ["scripts/oxlint.mjs", "--format=unix", target], {
    cwd: root,
    encoding: "utf8",
  });

  return {
    status: result.status ?? 1,
    output: `${result.stdout}\n${result.stderr}`,
  };
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

const passingSrc = runOxlint("src");

if (passingSrc.status !== 0) {
  fail(`src should lint clean:\n${passingSrc.output}`);
}

const passingExamples = runOxlint("examples/pass");

if (passingExamples.status !== 0) {
  fail(`examples/pass should lint clean:\n${passingExamples.output}`);
}

const failing = runOxlint("examples/fail");

if (failing.status === 0) {
  fail("examples/fail should report violations, but oxlint exited 0.");
}

const missing = expectedFailRules.filter((rule) => !reported(failing.output, rule));

if (missing.length > 0) {
  fail(
    `examples/fail did not report expected rules:\n${missing.join("\n")}\n\nOutput:\n${failing.output}`,
  );
}

console.log("Pass fixtures are clean.");
console.log(`Fail fixtures reported ${expectedFailRules.length} expected rules.`);
