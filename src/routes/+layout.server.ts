import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
    try {
        const backendUrl = env.BACKEND_API_URL || 'http://localhost:2000';
        // We call the backend directly from the server. 
        // SvelteKit's fetch automatically forwards cookies for us.
        const response = await fetch(`${backendUrl}/auth/me`);
        
        if (response.ok) {
            const user = await response.json();
            return { user };
        }
    } catch (error) {
        console.error('Server-side auth check failed:', error);
    }

    return { user: null };
};
