import { resolve } from 'path';
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.js'),
        // es: resolve(__dirname, './index.es.js'),
        // umd: resolve(__dirname, './index.umd.js'),
      },
      external: [...Object.keys(dependencies)],
      output: [
        {
          dir: resolve(__dirname, 'dist'),
          format: 'es',
          entryFileNames: "[name].[format].js",
        },
        {
          dir: resolve(__dirname, 'dist'),
          format: 'cjs',
          entryFileNames: "[name].[format].js",
        }
      ],
    },
    // sourcemap: true,
  }
})