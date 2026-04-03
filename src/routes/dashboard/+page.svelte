<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdminService, getServerService } from '$lib/services/context';
  import type { AdminUser, Server } from '$lib/services/interfaces';

  const adminService = getAdminService();
  const serverService = getServerService();

  let userCount = $state(0);
  let serverCount = $state(0);
  let isLoading = $state(true);

  onMount(async () => {
    const [users, servers] = await Promise.all([
      adminService.getUsers(),
      serverService.getServers()
    ]);
    userCount = users.length;
    serverCount = servers.length;
    isLoading = false;
  });
</script>

<div class="overview-grid">
  <div class="stat-card">
    <div class="stat-icon users">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    </div>
    <div class="stat-info">
      <h3>Total Users</h3>
      <p class="stat-number">{isLoading ? '...' : userCount}</p>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon servers">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
    </div>
    <div class="stat-info">
      <h3>Active Servers</h3>
      <p class="stat-number">{isLoading ? '...' : serverCount}</p>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon system">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
    </div>
    <div class="stat-info">
      <h3>System Load</h3>
      <p class="stat-number">Normal</p>
    </div>
  </div>
</div>

<style>
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 1.25rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s, border-color 0.2s;
  }

  /* Remove hover transform */
  .stat-card:hover {
    border-color: rgba(0, 0, 0, 0.1);
  }

  :global(.dark-mode) .stat-card {
    background: #18181b;
    border-color: rgba(255, 255, 255, 0.05);
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-icon.users { background: #eff6ff; color: #3b82f6; }
  .stat-icon.servers { background: #f0fdf4; color: #10b981; }
  .stat-icon.system { background: #faf5ff; color: #8b5cf6; }

  :global(.dark-mode) .stat-icon.users { background: rgba(59, 130, 246, 0.1); }
  :global(.dark-mode) .stat-icon.servers { background: rgba(16, 185, 129, 0.1); }
  :global(.dark-mode) .stat-icon.system { background: rgba(139, 92, 246, 0.1); }

  .stat-info h3 {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #64748b;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0.25rem 0 0;
    color: #0f172a;
  }

  :global(.dark-mode) .stat-number {
    color: #f8fafc;
  }
</style>
