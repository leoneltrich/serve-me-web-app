import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [sveltekit()],
        server: {
            proxy: {
                '/api': {
                    target: env.BACKEND_API_URL || 'http://localhost:2000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        }
    };
});
