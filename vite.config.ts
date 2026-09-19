import { defineConfig, PluginOption } from "vite";
import { enterDevPlugin, enterProdPlugin } from 'vite-plugin-enter-dev';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [
    ...enterProdPlugin(),
  ];
  if (mode === 'development') {
    plugins.push(...enterDevPlugin());
  }
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean) as PluginOption[],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: '/',
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          // Split the vendor libs so the browser can download them in parallel
          // and cache them across deploys (only the app chunk changes).
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('react-router') || id.includes('react-router-dom')) return 'router';
            if (id.includes('@tanstack') || id.includes('react-query')) return 'query';
            if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('react-hook-form')) return 'forms';
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react') || id.includes('scheduler') || id.includes('object-assign')) return 'react';
            return 'vendor';
          },
        },
      },
    }
  };
});