<script lang="ts">
  import { themeState } from '$lib/services/theme.svelte';
  import { authState } from '$lib/services/auth/auth.state.svelte';
  import { getAuthService } from '$lib/services/context';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { uiState } from '$lib/services/ui.svelte';

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

    <div class="user-menu-container">
      <button class="user-badge" onclick={toggleUserMenu} aria-expanded={isUserMenuOpen}>
        <div class="user-avatar-small">
          {authState.user?.username?.charAt(0).toUpperCase() ?? '?'}
        </div>
        <span class="username">{authState.user?.username ?? 'Loading...'}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" class="chevron" class:open={isUserMenuOpen}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {#if isUserMenuOpen && authState.user}
        <div class="dropdown-menu">
          <div class="dropdown-header">
            <div class="dropdown-user-info">
              <div class="user-avatar-large">
                {authState.user.username.charAt(0).toUpperCase()}
              </div>
              <div class="user-text">
                <p class="user-name">{authState.user.username}</p>
                <p class="user-role">Administrator</p>
              </div>
            </div>
          </div>
          
          <div class="dropdown-divider"></div>
          
          <div class="dropdown-content">
            <button class="dropdown-item logout" onclick={handleLogout}>
              <div class="item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
                </svg>
              </div>
              <span>Sign Out</span>
            </button>
          </div>
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

    .username {
      display: none;
    }

    .user-badge {
      padding: 0.375rem;
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
    border-radius: 10px;
    cursor: pointer;
    color: var(--text-main);
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

  .user-avatar-small {
    width: 28px;
    height: 28px;
    background: var(--primary-gradient);
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.75rem;
    box-shadow: 0 2px 5px rgba(37, 99, 235, 0.2);
  }

  .username {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .chevron {
    color: var(--text-muted);
    transition: transform 0.2s;
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.75rem);
    right: 0;
    width: 240px;
    background: var(--card-bg);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    box-shadow: var(--card-shadow);
    overflow: hidden;
    z-index: 200;
    color: var(--text-main);
    animation: dropdown-fade 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes dropdown-fade {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dropdown-header {
    padding: 1.25rem;
  }

  .dropdown-user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-avatar-large {
    width: 44px;
    height: 44px;
    background: var(--primary-gradient);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.25rem;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
  }

  .user-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .user-name {
    font-size: 0.9375rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-main);
  }

  .user-role {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-muted);
    margin: 0;
  }

  .dropdown-divider {
    height: 1px;
    background: var(--card-border);
  }

  .dropdown-content {
    padding: 0.5rem;
  }

  .dropdown-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.875rem;
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s;
    border-radius: 10px;
  }

  .dropdown-item:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  :global(.dark-mode) .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    transition: color 0.2s;
  }

  .dropdown-item.logout {
    color: #ef4444;
  }

  .dropdown-item.logout .item-icon {
    color: #ef4444;
  }

  .dropdown-item.logout:hover {
    background: rgba(239, 68, 68, 0.08);
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
