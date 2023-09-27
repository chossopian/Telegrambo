import { resolve } from 'path';
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'lib/index.js'),
        bot: resolve(__dirname, 'lib/bot.js'),
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