import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const testDirs = ["lib", "popup"];
for (const dir of testDirs) {
  const files = readdirSync(dir).filter(f => f.endsWith(".test.js"));
  for (const file of files) {
    console.log(`Running: ${dir}/${file}`);
    await import(pathToFileURL(join(process.cwd(), dir, file)));
  }
}
