import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/base/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~react-image-gallery/styles/css/image-gallery.css": resolve(
        __dirname,
        "./src/assets/image-gallery.css"
      ),
      "~rc-dialog/assets/index.css": resolve(
        __dirname,
        "./src/assets/empty.css"
      ),
      "~react-resizable/css/styles.css": resolve(
        __dirname,
        "./src/assets/empty.css"
      ),
      "~react-datepicker/dist/react-datepicker.css": resolve(
        __dirname,
        "./src/assets/empty.css"
      ),
    },
  },
  server: {
    proxy: {
      "/api/": {
        target: "http://dev-oss.kxgcc.com:30872",
        changeOrigin: true,
      },
      "/public/": {
        target: "http://dev-oss.kxgcc.com:30872",
        changeOrigin: true,
      },
      "/cms-static/": {
        target: "http://dev-oss.kxgcc.com:30872",
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ["lodash-es"],
  },
});
