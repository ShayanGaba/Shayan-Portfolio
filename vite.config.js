// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
    alias: {
      // Force single React instance
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // Important: don't let CJS modules create duplicate React
      requireReturnsDefault: "preferred",
    },
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          fiber: ["@react-three/fiber"],
          drei: ["@react-three/drei"],
          gsap: ["gsap"],
          lenis: ["lenis"],
          vendor: [
            "react",
            "react-dom",
            "react-responsive",
            "react-scroll",
            "@iconify/react",
          ],
        },
      },
    },
  },
  server: {
    compress: true,
  },
});
