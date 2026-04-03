<script lang="ts">
  import { themeState } from '$lib/services/theme.svelte';
  import { page } from '$app/state';
  import { uiState } from '$lib/services/ui.svelte';

  let breadcrumb = $derived(() => {
    const path = page.url.pathname;
    if (path.includes('users')) return 'System / Users';
    if (path.includes('servers')) return 'Network / Servers';
    return 'Dashboard / Overview';
  });
</script>

<header class="header">
  <div class="header-left">
    <button class="menu-button" onclick={() => uiState.toggleSidebar()} aria-label="Toggle Menu">
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    <div class="breadcrumb">
      {breadcrumb()}
    </div>
  </div>

  <div class="header-actions">
    <button class="theme-toggle" onclick={() => themeState.toggle()} aria-label="Toggle theme mode" title="Current: {themeState.mode}">
      {#if themeState.mode === 'system'}
        <!-- System Monitor Icon -->
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      {:else}
        {#if themeState.dark}
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        {/if}
      {/if}
    </button>
  </div>
</header>

<style>
  .header {
    height: 64px;
    background: var(--header-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 150;
    color: var(--text-main);
    transition: all 0.3s ease;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menu-button {
    display: none;
    background: none;
    border: none;
    color: var(--text-main);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .menu-button:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :global(.dark-mode) .menu-button:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .breadcrumb {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.02em;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  @media (max-width: 1024px) {
    .header {
      padding: 0 1rem;
    }
    
    .menu-button {
      display: flex;
    }
  }

  @media (max-width: 640px) {
    .breadcrumb {
      display: none;
    }
  }

  .theme-toggle {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    transition: all 0.2s;
  }

  .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-main);
  }

  :global(.dark-mode) .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.05);
  }
</style>
