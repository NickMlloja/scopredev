import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: 'src/frontend',
    base: './',
    server: {
        port: 5173,
        strictPort: true
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src')
        }
    },
    build: {
        outDir: '../../public',
        emptyOutDir: true,
        sourcemap: true,
        target: 'esnext',
        rollupOptions: {
            input: path.resolve(__dirname, 'src/frontend/index.html')
        }
    }
});
