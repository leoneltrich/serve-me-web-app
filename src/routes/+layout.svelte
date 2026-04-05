<script lang="ts">
	import '../app.css';
	import {page} from '$app/state';
	import {goto} from '$app/navigation';
	import {setAdminService, setAuthService, setHealthService, setServerService} from '$lib/services/context';
	import {env} from '$env/dynamic/public';
	import {FetchApiClient} from '$lib/services/api/fetch-api-client';
	import {BackendAuthService} from '$lib/services/auth/backend-auth.service';
	import {BackendAdminService} from '$lib/services/backend-admin.service';
	import {BackendServerService} from '$lib/services/backend-server.service';
	import {BackendHealthService} from '$lib/services/backend-health.service';
	import {authState} from '$lib/services/auth/auth.state.svelte';

	let { data, children } = $props();

	const apiBaseUrl = env.PUBLIC_API_BASE_URL || '';

	const isFullUrl = apiBaseUrl.startsWith('http');

	const authApiClient = new FetchApiClient(isFullUrl ? apiBaseUrl : '');
	const apiClient = new FetchApiClient(isFullUrl ? `${apiBaseUrl}/api/v1` : '/api/v1');

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
