import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            exclude: [
                'node_modules',
                '**/src/components/icons/**',
                '**/*.config.ts',
                '**/*.config.js',
                '**/vite-env.d.ts',
                'dist',
                '**/*.test.ts',
                '**/*.test.tsx',
                'src/main.tsx'
            ]
        },
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
        exclude: [
            'node_modules',
            '**/src/components/icons/**',
            '**/*.config.ts',
            '**/*.config.js'

        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
