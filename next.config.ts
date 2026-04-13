import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

// When a parent folder has its own package-lock.json, Next may infer the wrong workspace root
// and fail to resolve packages (e.g. tailwindcss) that live in this app's node_modules.
const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: appDir,
  },
};

export default nextConfig;
