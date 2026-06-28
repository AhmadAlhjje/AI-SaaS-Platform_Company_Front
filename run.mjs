#!/usr/bin/env node
// Launcher: تشغيل الـ frontend (Next.js) محلياً عبر "node run.mjs".
// يثبّت الحزم تلقائياً عبر pnpm إن لم تكن مثبّتة، ثم يشغّل خادم التطوير.

import { spawn, spawnSync } from "child_process";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));
const isWindows = process.platform === "win32";
const pnpmCmd = isWindows ? "pnpm.cmd" : "pnpm";

function run(command, args) {
  // shell:true مطلوب على Windows لتشغيل ملفات .cmd (pnpm) عبر spawn —
  // بدونه يفشل بخطأ EINVAL (مشكلة معروفة في Node على Windows).
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit", shell: isWindows });
  if (result.error) {
    console.error(`❌ تعذر تشغيل "${command}": ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`❌ "${command} ${args.join(" ")}" فشل برمز خروج ${result.status}${result.signal ? ` (signal: ${result.signal})` : ""}`);
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(join(root, ".env"))) {
  console.warn('⚠️  لم يتم العثور على ملف ".env" في frontend/ — تأكد من إنشائه قبل الاستمرار (مثل NEXT_PUBLIC_API_URL).');
}

if (!existsSync(join(root, "node_modules"))) {
  console.log("📦 تثبيت حزم frontend (pnpm install)...");
  run(pnpmCmd, ["install"]);
}

console.log("🚀 تشغيل frontend (Next.js) في وضع التطوير...");
const dev = spawn(pnpmCmd, ["dev"], { cwd: root, stdio: "inherit", shell: isWindows });

dev.on("exit", (code) => process.exit(code ?? 0));
process.on("SIGINT", () => dev.kill("SIGINT"));
process.on("SIGTERM", () => dev.kill("SIGTERM"));
