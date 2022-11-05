import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: "Everywhere",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  permissions: ["cookies", "activeTab", "tabs"],
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      js: ["src/content.tsx"],
      matches: [
        "https://glastonbury.seetickets.com/*",
        "http://glastonbury.seetickets.com/*",
      ],
    },
  ],
}));
