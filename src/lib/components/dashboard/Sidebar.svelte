<script lang="ts">
  import { page } from '$app/state';

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { name: 'Servers', path: '/dashboard/servers', icon: 'M2 20h20M5 20V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12M9 13h6' },
    { name: 'Users', path: '/dashboard/users', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' }
  ];
</script>

<aside class="sidebar">
  <div class="sidebar-brand">
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
    <span>SERVE_ME</span>
  </div>

  <nav class="sidebar-nav">
    {#each navItems as item}
      <a href={item.path} class="nav-link" class:active={page.url.pathname === item.path}>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d={item.icon}></path>
        </svg>
        <span>{item.name}</span>
      </a>
    {/each}
  </nav>
</aside>

<style>
  .sidebar {
    width: 240px;
    height: 100vh;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    color: #94a3b8;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }

  :global(.dark-mode) .sidebar {
    background: rgba(9, 9, 11, 0.95);
  }

  .sidebar-brand {
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #f8fafc;
    font-weight: 700;
    letter-spacing: 0.05em;
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
    padding: 0.75rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .nav-link:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-link.active {
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
  }
</style>
