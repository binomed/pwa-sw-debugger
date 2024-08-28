import { resolve } from 'path';
import { defineConfig } from 'vite';


export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            name: 'background',
            entry: resolve(__dirname, 'scripts/devtools.ts'),
            formats: ['iife'],
        },
        emptyOutDir: false,
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: 'devtools.mjs',
                format: "iife",
            }
        },
    },
});
