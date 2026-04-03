<script lang="ts">
  import { page } from '$app/state';

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { name: 'Servers', path: '/dashboard/servers', icon: 'M2 20h20M5 20V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12M9 13h6' },
    { name: 'Users', path: '/dashboard/users', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' }
  ];
</script>

<aside class="sidebar">
  <div class="sidebar-brand">
    <div class="brand-icon">
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    </div>
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
    background: var(--sidebar-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-right: 1px solid var(--card-border);
    display: flex;
    flex-direction: column;
    color: var(--text-muted);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    transition: all 0.3s ease;
  }

  .sidebar-brand {
    padding: 2rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-main);
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .brand-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--brand-bg);
    color: var(--brand-color);
    border-radius: 10px;
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
    border-radius: 12px;
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

  /* Subtle indicator on the left for premium feel */
  .nav-link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) scaleY(0);
    width: 3px;
    height: 16px;
    background: var(--brand-color);
    border-radius: 0 4px 4px 0;
    transition: transform 0.2s ease;
  }

  .nav-link:hover::before {
    transform: translateY(-50%) scaleY(1);
  }

  .nav-link.active {
    color: var(--brand-color);
    background: var(--brand-bg);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .nav-link.active::before {
    transform: translateY(-50%) scaleY(1);
    height: 20px;
  }

  :global(:root:not(.dark-mode)) .nav-link.active {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.02);
  }
</style>
