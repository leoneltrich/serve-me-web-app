<script lang="ts">
  import { themeState } from '$lib/services/theme.svelte';
  import { authState } from '$lib/services/auth/auth.state.svelte';
  import { page } from '$app/state';

  let breadcrumb = $derived(() => {
    const path = page.url.pathname;
    if (path.includes('users')) return 'System / Users';
    if (path.includes('servers')) return 'Network / Servers';
    return 'Dashboard / Overview';
  });
</script>

<header class="header">
  <div class="breadcrumb">
    {breadcrumb()}
  </div>

  <div class="header-actions">
    <button class="theme-toggle" onclick={() => themeState.toggle()} aria-label="Toggle dark mode">
      {#if themeState.dark}
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      {/if}
    </button>

    <div class="user-badge">
      <div class="user-avatar">
        {authState.user?.username.charAt(0).toUpperCase()}
      </div>
      <span class="username">{authState.user?.username}</span>
    </div>
  </div>
</header>

<style>
  .header {
    height: 64px;
    background: rgba(248, 250, 252, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 90;
  }

  :global(.dark-mode) .header {
    background: rgba(9, 9, 11, 0.8);
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }

  .breadcrumb {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #64748b;
    letter-spacing: 0.02em;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .theme-toggle {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    transition: background 0.2s;
  }

  .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :global(.dark-mode) .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    background: #38bdf8;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
  }

  .username {
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
