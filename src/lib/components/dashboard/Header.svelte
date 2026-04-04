<script lang="ts">
    import {themeState} from '$lib/services/theme.svelte';
    import {uiState} from '$lib/services/ui.svelte';
    import {Menu, Monitor, Moon, Sun} from 'lucide-svelte';
</script>

<header class="header">
  <div class="header-left">
    <button class="menu-button" onclick={() => uiState.toggleSidebar()} aria-label="Toggle Menu">
        <Menu size={20}/>
    </button>
  </div>

  <div class="header-actions">
    <button class="theme-toggle" onclick={() => themeState.toggle()} aria-label="Toggle theme mode" title="Current: {themeState.mode}">
      {#if themeState.mode === 'system'}
          <Monitor size={20}/>
      {:else}
        {#if themeState.dark}
            <Sun size={20}/>
        {:else}
            <Moon size={20}/>
        {/if}
      {/if}
    </button>
  </div>
</header>

<style>
  .header {
    height: 64px;
      background: transparent;
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
      background: var(--bg-base);
    border: none;
    color: var(--text-main);
    cursor: pointer;
      width: 44px;
      height: 44px;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, filter 0.2s;
  }

  .menu-button:hover {
      filter: brightness(0.95);
  }

  :global(.dark-mode) .menu-button:hover {
      filter: brightness(1.1);
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

  .theme-toggle {
      background: var(--bg-base);
    border: none;
    color: var(--text-muted);
    cursor: pointer;
      width: 44px;
      height: 44px;
      border-radius: 50px;
    display: flex;
      align-items: center;
      justify-content: center;
    transition: all 0.2s;
  }

  .theme-toggle:hover {
      filter: brightness(0.95);
    color: var(--text-main);
  }

  :global(.dark-mode) .theme-toggle:hover {
      filter: brightness(1.1);
      color: var(--text-main);
  }
</style>
