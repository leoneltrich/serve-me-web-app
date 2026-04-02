<script lang="ts">
	import { setAuthService } from '$lib/services/context';
	import { FetchApiClient } from '$lib/services/api/fetch-api-client';
	import { BackendAuthService } from '$lib/services/auth/backend-auth.service';

	let { children } = $props();

	// Composition Root: Initialize implementations
	const apiClient = new FetchApiClient();
	const authService = new BackendAuthService(apiClient);

	// Provide to the entire app
	setAuthService(authService);
</script>

{@render children()}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
</style>
