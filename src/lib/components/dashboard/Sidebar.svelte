<script lang="ts">
    import {page} from '$app/state';
    import {uiState} from '$lib/services/ui.svelte';
    import {authState} from '$lib/services/auth/auth.state.svelte';
    import {navigationConfig} from '$lib/config/navigation';
    import {LayoutDashboard, LogOut, Server, Users, X} from 'lucide-svelte';

    const iconMap = {
        'Overview': LayoutDashboard,
        'Servers': Server,
        'Users': Users
    };

    function getIcon(name: string) {
        return iconMap[name as keyof typeof iconMap];
    }

  function handleLogout() {
    uiState.openLogoutConfirmation();
  }
</script>

<aside class="sidebar" class:open={uiState.isSidebarOpen}>
  <div class="sidebar-brand">
    <div class="brand-info">
      <div class="brand-icon">
          <img src="/serve-me-logo.svg" alt="Logo" width="32" height="32"/>
      </div>
        <span>ServeMe</span>
    </div>
    <button class="close-sidebar" onclick={() => uiState.closeSidebar()} aria-label="Close sidebar">
        <X size={20}/>
    </button>
  </div>

  <nav class="sidebar-nav">
      {#each navigationConfig as item}
          <a
                  href={item.path}
                  class="nav-link"
                  class:active={page.url.pathname === item.path}
                  onclick={() => {
          if (window.innerWidth < 1024) {
            uiState.closeSidebar();
          }
        }}
          >
          {#if getIcon(item.name)}
              {@const Icon = getIcon(item.name)}
              <Icon size={18}/>
          {/if}
        <span>{item.name}</span>
      </a>
    {/each}
  </nav>

  {#if authState.user}
    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar">
          {authState.user.username.charAt(0).toUpperCase()}
        </div>
        <div class="user-info">
          <span class="user-name">{authState.user.username}</span>
          <span class="user-role">Administrator</span>
        </div>
      </div>
      <button class="logout-button" onclick={handleLogout} title="Sign Out">
          <LogOut size={20}/>
      </button>
    </div>
  {/if}
</aside>

<style>
  .sidebar {
    width: 240px;
    height: 100vh;
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
    display: flex;
    flex-direction: column;
    color: var(--text-muted);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 300;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateX(-100%);
  }

  .sidebar.open {
      transform: translateX(0);
  }

  /* High-end glass effect */
  :global(:root:not(.dark-mode)) .sidebar {
      background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.85),
              rgba(255, 255, 255, 0.75)
      );
      border-right: none;
      box-shadow: none;
  }

  :global(.dark-mode) .sidebar {
      background: linear-gradient(
              135deg,
              rgba(15, 15, 20, 0.85),
              rgba(10, 10, 15, 0.75)
      );
      border-right: none;
      box-shadow: none;
  }

  .sidebar-brand {
      padding: 2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-main);
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .brand-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .close-sidebar {
    display: none;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s;
      align-items: center;
      justify-content: center;
  }

  .close-sidebar:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-main);
  }

  :global(.dark-mode) .close-sidebar:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 1024px) {
    .sidebar {
      transform: translateX(-100%);
        box-shadow: none;
    }

      :global(:root:not(.dark-mode)) .sidebar {
          background: rgba(255, 255, 255, 0.95);
      }

      :global(.dark-mode) .sidebar {
          background: rgba(15, 15, 20, 0.98);
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .close-sidebar {
      display: flex;
    }
  }

  .brand-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--brand-bg);
    border-radius: 10px;
      overflow: hidden;
  }

  .brand-icon img {
      width: 80%;
      height: 80%;
      object-fit: contain;
  }

  .sidebar-nav {
    flex: 1;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
      border-radius: 50px;
    text-decoration: none;
    color: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .nav-link:hover {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.05);
  }

  :global(:root:not(.dark-mode)) .nav-link:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  .nav-link.active {
    color: var(--brand-color);
    background: var(--brand-bg);
  }

  .sidebar-footer {
    padding: 1.5rem;
    margin-top: auto;
      border-top: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0; /* Allow text truncation if needed */
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    background: var(--primary-gradient);
    color: white;
      border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-main);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-role {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .logout-button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .logout-button:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  @media (max-height: 500px) {
    .sidebar-footer {
        padding: 0.75rem 1.5rem;
    }
  }
</style>
