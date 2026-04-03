<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { setAuthService, setAdminService, setServerService, setHealthService } from '$lib/services/context';
	import { FetchApiClient } from '$lib/services/api/fetch-api-client';
	import { BackendAuthService } from '$lib/services/auth/backend-auth.service';
	import { BackendAdminService } from '$lib/services/auth/backend-admin.service';
	import { BackendServerService } from '$lib/services/auth/backend-server.service';
	import { BackendHealthService } from '$lib/services/auth/backend-health.service';
	import { authState } from '$lib/services/auth/auth.state.svelte';

	let { data, children } = $props();

	// Composition Root
	const apiClient = new FetchApiClient(); // Defaults to /api/v1 from .env
	const authApiClient = new FetchApiClient(''); // Uses root for /auth endpoints

	const authService = new BackendAuthService(authApiClient);
	const adminService = new BackendAdminService(apiClient);
	const serverService = new BackendServerService(apiClient);
	const healthService = new BackendHealthService(apiClient);

	setAuthService(authService);
	setAdminService(adminService);
	setServerService(serverService);
	setHealthService(healthService);
	// SYNC: Keep global state in sync with server-provided data
	$effect.pre(() => {
		authState.setUser(data.user);
	});

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

	// Global mouse tracking for the glow effect
	let mouseX = $state(0);
	let mouseY = $state(0);

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
</script>

<svelte:window onmousemove={handleMouseMove}/>

<!-- Shared Ambient Background -->
<div class="ambient-container">
	<div class="mouse-glow" style="transform: translate(calc({mouseX}px - 50%), calc({mouseY}px - 50%));"></div>
	<div class="ambient-orb orb-1"></div>
	<div class="ambient-orb orb-2"></div>
	<div class="ambient-texture"></div>
</div>

{@render children()}
