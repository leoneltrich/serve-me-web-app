<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { setAuthService } from '$lib/services/context';
	import { FetchApiClient } from '$lib/services/api/fetch-api-client';
	import { BackendAuthService } from '$lib/services/auth/backend-auth.service';
	import { authState } from '$lib/services/auth/auth.state.svelte';

	let { children } = $props();

	// Composition Root
	const apiClient = new FetchApiClient();
	const authService = new BackendAuthService(apiClient);
	setAuthService(authService);

	// Auth Guard Logic
	onMount(async () => {
		try {
			const user = await authService.getCurrentUser();
			authState.setUser(user);
		} catch {
			authState.setUser(null);
		}
	});

	// Reactive Redirects
	$effect(() => {
		// Wait until we know the user's status
		if (!authState.isInitialized) return;

		const isLoginPage = page.url.pathname === '/login';
		const isRoot = page.url.pathname === '/';

		if (authState.isAuthenticated) {
			// If logged in and on login/root page, go to dashboard
			if (isLoginPage || isRoot) {
				goto('/dashboard');
			}
		} else {
			// If NOT logged in and NOT on login page, go to login
			if (!isLoginPage) {
				goto('/login');
			}
		}
	});
</script>

{#if !authState.isInitialized}
	<!-- Optional: Simple loading spinner/splash screen -->
	<div class="initial-loading">
		<p>Initializing Session...</p>
	</div>
{:else}
	{@render children()}
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	.initial-loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background: #09090b;
		color: white;
		font-family: 'Poppins', sans-serif;
	}
</style>
