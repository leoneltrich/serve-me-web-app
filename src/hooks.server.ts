import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    // Only proxy in production (or when not using Vite dev server proxy)
    // In SvelteKit, we can check if we're in dev mode using import.meta.env.DEV
    // However, the hooks run in both dev and prod.
    // If we want to avoid double proxying in dev, we should be careful.
    // Vite proxy usually takes precedence for requests it handles.

    if (pathname.startsWith('/auth') || pathname.startsWith('/api')) {
        const backendUrl = env.BACKEND_API_URL || 'http://localhost:2000';
        
        // Construct the target URL
        const targetUrl = new URL(pathname + event.url.search, backendUrl);

        try {
            // Forward the request to the backend
            const response = await fetch(targetUrl.toString(), {
                method: event.request.method,
                headers: event.request.headers,
                body: event.request.method !== 'GET' && event.request.method !== 'HEAD' 
                    ? await event.request.arrayBuffer() 
                    : undefined,
                // @ts-ignore - SvelteKit's fetch handles this
                duplex: 'half'
            });

            return response;
        } catch (error) {
            console.error(`Proxy error for ${pathname}:`, error);
            return new Response('Internal Server Error', { status: 500 });
        }
    }

    return resolve(event);
};
