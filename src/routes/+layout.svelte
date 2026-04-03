<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { setAuthService, setAdminService, setServerService } from '$lib/services/context';
	import { FetchApiClient } from '$lib/services/api/fetch-api-client';
	import { BackendAuthService } from '$lib/services/auth/backend-auth.service';
	import { MockAdminService } from '$lib/services/mock-admin.service.svelte';
	import { MockServerService } from '$lib/services/mock-server.service.svelte';
	import { authState } from '$lib/services/auth/auth.state.svelte';

	let { data, children } = $props();

	// Composition Root
	const apiClient = new FetchApiClient();
	const authService = new BackendAuthService(apiClient);
	const adminService = new MockAdminService();
	const serverService = new MockServerService();

	setAuthService(authService);
	setAdminService(adminService);
	setServerService(serverService);

	// SYNC: Immediately set state from server data to prevent flash
	authState.setUser(data.user);

	// Reactive Redirects
	$effect(() => {
		const isLoginPage = page.url.pathname === '/login';
		const isRoot = page.url.pathname === '/';

		if (authState.isAuthenticated) {
			if (isLoginPage || isRoot) {
				goto('/dashboard');
			}
		} else {
			if (!isLoginPage) {
				goto('/login');
			}
		}
	});
</script>

{@render children()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

	:global(:root) {
		--bg-base: #eff6ff; /* Matches the soft blue/brighter parts of the login background */
		--text-main: #0f172a;
		--text-muted: #64748b;
		--primary-gradient: linear-gradient(135deg, #2563eb, #3b82f6);
		--brand-color: #2563eb;
	}

	:global(:root.dark-mode) {
		--bg-base: #09090b;
		--text-main: #f8fafc;
		--text-muted: #94a3b8;
		--primary-gradient: linear-gradient(135deg, #0ea5e9, #38bdf8);
		--brand-color: #38bdf8;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		font-family: 'Poppins', sans-serif;
		background-color: var(--bg-base);
		color: var(--text-main);
		transition: background-color 0.3s ease, color 0.3s ease;
	}
</style>
