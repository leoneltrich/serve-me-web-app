// @ts-nocheck
import { BACKEND_API_URL } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load = async ({ fetch }: Parameters<LayoutServerLoad>[0]) => {
    try {
        // We call the backend directly from the server. 
        // SvelteKit's fetch automatically forwards cookies for us.
        const response = await fetch(`${BACKEND_API_URL}/auth/me`);
        
        if (response.ok) {
            const user = await response.json();
            return { user };
        }
    } catch (error) {
        console.error('Server-side auth check failed:', error);
    }

    return { user: null };
};
