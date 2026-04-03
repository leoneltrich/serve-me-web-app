<script lang="ts">
  import { themeState } from '$lib/services/theme.svelte';
  import { authState } from '$lib/services/auth/auth.state.svelte';
  import { getAuthService } from '$lib/services/context';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  const authService = getAuthService();
  let isUserMenuOpen = $state(false);

  let breadcrumb = $derived(() => {
    const path = page.url.pathname;
    if (path.includes('users')) return 'System / Users';
    if (path.includes('servers')) return 'Network / Servers';
    return 'Dashboard / Overview';
  });

  async function handleLogout() {
    await authService.logout();
    authState.setUser(null);
    goto('/login');
  }

  function toggleUserMenu() {
    isUserMenuOpen = !isUserMenuOpen;
  }
</script>

<header class="header">
  <div class="breadcrumb">
    {breadcrumb()}
  </div>

  <div class="header-actions">
    <button class="theme-toggle" onclick={() => themeState.toggle()} aria-label="Toggle dark mode">
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
    </button>

    <div class="user-menu-container">
      <button class="user-badge" onclick={toggleUserMenu} aria-expanded={isUserMenuOpen}>
        <div class="user-avatar">
          {authState.user?.username.charAt(0).toUpperCase()}
        </div>
        <span class="username">{authState.user?.username}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" class="chevron" class:open={isUserMenuOpen}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {#if isUserMenuOpen}
        <div class="dropdown-menu">
          <div class="dropdown-header">
            <p class="user-label">Signed in as</p>
            <p class="user-email">{authState.user?.username}</p>
          </div>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item logout" onclick={handleLogout}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
        <!-- Click outside to close -->
        <button class="menu-overlay" onclick={() => isUserMenuOpen = false} aria-label="Close menu"></button>
      {/if}
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
    gap: 1rem;
  }

  .theme-toggle {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    transition: all 0.2s;
  }

  .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #0f172a;
  }

  :global(.dark-mode) .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #f8fafc;
  }

  .user-menu-container {
    position: relative;
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    transition: all 0.2s;
  }

  .user-badge:hover {
    background: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.05);
  }

  :global(.dark-mode) .user-badge:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.05);
  }

  .user-avatar {
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.75rem;
  }

  .username {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .chevron {
    color: #94a3b8;
    transition: transform 0.2s;
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    width: 200px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 100;
  }

  :global(.dark-mode) .dropdown-menu {
    background: #18181b;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  }

  .dropdown-header {
    padding: 1rem;
  }

  .user-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin: 0;
  }

  .user-email {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0.125rem 0 0;
  }

  .dropdown-divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
  }

  :global(.dark-mode) .dropdown-divider {
    background: rgba(255, 255, 255, 0.05);
  }

  .dropdown-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: 0.875rem;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
  }

  .dropdown-item:hover {
    background: #f8fafc;
  }

  :global(.dark-mode) .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .dropdown-item.logout {
    color: #ef4444;
  }

  .dropdown-item.logout:hover {
    background: #fef2f2;
  }

  :global(.dark-mode) .dropdown-item.logout:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  .menu-overlay {
    position: fixed;
    inset: 0;
    background: transparent;
    border: none;
    z-index: 99;
    cursor: default;
  }
</style>
