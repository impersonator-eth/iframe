import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "DappscoutIframe",
      formats: ["es", "umd"],
      fileName: (format) => `dappscout-iframe.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "ethers"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          ethers: "ethers",
        },
      },
    },
  },
});
