import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        allowedHosts: ['localhost'],
        port: 5173,
        proxy: {
            '/api': {
                changeOrigin: true,
                secure: false,
                target: 'http://localhost:4000',
            },
        },
        strictPort: true,
    },
    resolve: {
        alias: {
            assets: '/src/assets',
            navigation: '/src/navigation',
            services: '/src/services',
            screens: '/src/screens',
            shared: '/src/shared',
            styles: '/src/styles',
            types: '/src/types',
            utils: '/src/utils',
        },
    },
})
