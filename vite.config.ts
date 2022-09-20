import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

const ROOT_PATH = path.join(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({
            babelConfig: {
                plugins: ['effector/babel-plugin'],
            },
        }),
    ],
    resolve: {
        alias: {
            '@features': path.resolve(ROOT_PATH, 'features'),
            '@entities': path.resolve(ROOT_PATH, 'entities'),
            '@pages': path.resolve(ROOT_PATH, 'pages'),
            '@ui': path.resolve(ROOT_PATH, 'shared/ui'),
            '@lib': path.resolve(ROOT_PATH, 'shared/lib'),
            '@types': path.resolve(ROOT_PATH, 'types'),
        },
    },
});
