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
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
</style>
