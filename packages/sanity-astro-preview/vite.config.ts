import { resolve } from 'path';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'my-lib',
      fileName: 'my-lib',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'react-dom'
        }
      }
    }
  },
  plugins: [dts(), react({include: /\.(mdx|js|jsx|ts|tsx)$/ })],
});