import { resolve } from 'path';
import { defineConfig } from 'vite';


export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: [
                resolve(__dirname, 'scripts/index.ts'),
                resolve(__dirname, 'scripts/devtools.ts'),
                resolve(__dirname, 'scripts/background/background.ts'),
                resolve(__dirname, 'scripts/panel/devtools-panel.ts'),
                resolve(__dirname, 'scripts/content/main-content.ts'),
                //resolve(__dirname, 'scripts/inject/getCurrentSW.ts'),
            ]
        },
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {


        },
    },
});
