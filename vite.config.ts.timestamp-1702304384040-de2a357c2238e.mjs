// vite.config.ts
import { unstable_vitePlugin as remix } from "file:///D:/Github/lightmatter/node_modules/.pnpm/@remix-run+dev@2.3.1_@remix-run+serve@2.3.1_typescript@5.3.2_vite@5.0.7/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///D:/Github/lightmatter/node_modules/.pnpm/vite@5.0.7/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///D:/Github/lightmatter/node_modules/.pnpm/vite-tsconfig-paths@4.2.1_typescript@5.3.2_vite@5.0.7/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  assetsInclude: ["**/*.glb"],
  build: {
    commonjsOptions: { transformMixedEsModules: true }
    // Change
  },
  plugins: [remix(), tsconfigPaths()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHaXRodWJcXFxcbGlnaHRtYXR0ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEdpdGh1YlxcXFxsaWdodG1hdHRlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovR2l0aHViL2xpZ2h0bWF0dGVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdW5zdGFibGVfdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gXCJAcmVtaXgtcnVuL2RldlwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5nbGInXSxcbiAgYnVpbGQ6IHtcbiAgICBjb21tb25qc09wdGlvbnM6IHsgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUgfSAvLyBDaGFuZ2VcbiAgfSxcbiAgcGx1Z2luczogW3JlbWl4KCksIHRzY29uZmlnUGF0aHMoKV0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVAsU0FBUyx1QkFBdUIsYUFBYTtBQUNwUyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixlQUFlLENBQUMsVUFBVTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLGlCQUFpQixFQUFFLHlCQUF5QixLQUFLO0FBQUE7QUFBQSxFQUNuRDtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFDcEMsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
