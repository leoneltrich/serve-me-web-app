import {env} from '$env/dynamic/private';
import type {Handle} from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    // Proxy authentication and API requests to the BFF
    if (pathname.startsWith('/auth') || pathname.startsWith('/api')) {
        const backendUrl = env.BACKEND_API_URL || 'http://localhost:2000';
        
        // Construct the target URL
        const targetUrl = new URL(pathname + event.url.search, backendUrl);

        try {
            // Clone headers and remove those that shouldn't be forwarded
            const headers = new Headers(event.request.headers);
            headers.delete('host');
            headers.delete('connection');
            headers.delete('accept-encoding');
            
            // Add forwarding headers for the backend to know the real client
            const forwardedFor = event.request.headers.get('x-forwarded-for');
            const clientAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : event.getClientAddress();
            
            if (clientAddress) {
                headers.set('x-forwarded-for', clientAddress);
                headers.set('x-real-ip', clientAddress);
            }
            headers.set('x-forwarded-host', event.url.host);
            headers.set('x-forwarded-proto', event.url.protocol.replace(':', ''));

            // Forward the request to the backend
            const response = await fetch(targetUrl.toString(), {
                method: event.request.method,
                headers: headers,
                body: event.request.method !== 'GET' && event.request.method !== 'HEAD' 
                    ? await event.request.arrayBuffer() 
                    : undefined,
                // @ts-ignore - SvelteKit's fetch handles this
                duplex: 'half',
                redirect: 'manual'
            });

            const responseHeaders = new Headers(response.headers);
            responseHeaders.delete('content-encoding');
            responseHeaders.delete('content-length');
            responseHeaders.delete('transfer-encoding');

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders
            });
        } catch (error) {
            console.error(`Proxy error for ${pathname}:`, error);
            return new Response('Internal Server Error', { status: 500 });
        }
    }

    return resolve(event);
};
