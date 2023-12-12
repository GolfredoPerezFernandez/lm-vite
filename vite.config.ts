import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  },
  plugins: [remix(), tsconfigPaths()],
});
