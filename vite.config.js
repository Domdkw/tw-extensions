import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: false,
                drop_debugger: true,
                passes: 2,
            },
            mangle: {
                reserved: [
                    'Scratch',
                    'Transcoding',
                    'getInfo',
                ],
            },
            format: {
                comments: false,
            },
        },
        lib: {
            entry: 'src/main.js',
            name: 'Transcoding',
            fileName: () => 'main.js',
            formats: ['iife'],
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});
