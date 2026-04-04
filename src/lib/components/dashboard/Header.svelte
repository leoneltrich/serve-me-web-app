<script lang="ts">
    import {themeState} from '$lib/services/theme.svelte';
    import {page} from '$app/state';
    import {uiState} from '$lib/services/ui.svelte';
    import {getBreadcrumb} from '$lib/config/navigation';
    import {Menu, Monitor, Moon, Sun} from 'lucide-svelte';

    let breadcrumb = $derived(getBreadcrumb(page.url.pathname));
</script>

<header class="header">
  <div class="header-left">
    <button class="menu-button" onclick={() => uiState.toggleSidebar()} aria-label="Toggle Menu">
        <Menu size={22}/>
    </button>
    <div class="breadcrumb">
        {breadcrumb}
    </div>
  </div>

  <div class="header-actions">
    <button class="theme-toggle" onclick={() => themeState.toggle()} aria-label="Toggle theme mode" title="Current: {themeState.mode}">
      {#if themeState.mode === 'system'}
          <Monitor size={18}/>
      {:else}
        {#if themeState.dark}
            <Sun size={18}/>
        {:else}
            <Moon size={18}/>
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
      border-bottom: none;
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
        align-items: center;
        justify-content: center;
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
      align-items: center;
      justify-content: center;
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
