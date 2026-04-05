import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, process.cwd(), '');

    const host = env.HOST || 'localhost';
    const port = parseInt(env.PORT || '5173');
    const backendUrl = env.BACKEND_API_URL || 'http://localhost:2000';

    return {
        plugins: [sveltekit()],
        server: {
            host,
            port,
            proxy: {
                // Auth endpoints handled directly by the BFF
                '/auth': {
                    target: backendUrl,
                    changeOrigin: true,
                },
                // Backend endpoints forwarded by the BFF
                '/api': {
                    target: backendUrl,
                    changeOrigin: true,
                    // No rewrite: preserve /api/v1 so it matches OpenAPI paths
                }
            }
        }
    };
});
