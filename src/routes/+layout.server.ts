import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
    try {
        // Use relative URL to ensure cookies are forwarded and it goes through our proxy
        const response = await fetch('/auth/me');
        
        if (response.ok) {
            const user = await response.json();
            return { user };
        }
    } catch (error) {
        console.error('Server-side auth check failed:', error);
    }

    return { user: null };
};
