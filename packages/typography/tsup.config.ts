import { defineConfig } from "tsup";

export default defineConfig([
  // Main bundle with all components
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm", "cjs"],
    sourcemap: true,
    clean: true,
    dts: true,
    splitting: false,
    treeshake: true,
    external: ["react", "react-dom", "tailwindcss"],
    esbuildOptions(options) {
      options.alias = {
        "@": "./src",
      };
      options.jsx = "automatic";
    },
  },
  {
    entry: ["src/styles/typography.css"],
    outDir: "dist",
    format: ["esm"],
    clean: false,
    esbuildOptions(options) {
      options.loader = { ".css": "copy" };
    },
    onSuccess: async () => {
      const fs = await import("fs/promises");
      const path = await import("path");

      try {
        await fs.rename(
          path.join("dist", "typography.css"),
          path.join("dist", "styles.css"),
        );
      } catch (error) {
        console.warn("Could not rename CSS file:", error);
      }
    },
  },
]);
