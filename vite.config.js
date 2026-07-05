import { defineConfig } from "vite";
import { resolve } from "path";

/**
 * Vite Multi-Page App configuration.
 *
 * Entry points:
 *   main      → index.html       (homepage / portfolio)
 *   projects  → projects.html    (project archive list)
 *
 * Individual project pages (/projects/<slug>) are a future iteration.
 * When that work begins, add a new entry here and create the HTML shell.
 */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, "index.html"),
        projects: resolve(__dirname, "projects.html"),
      },
    },
  },
});
