<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdminService, getServerService } from '$lib/services/context';
  import { authState } from '$lib/services/auth/auth.state.svelte';
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

<div class="dashboard-header-row">
  <h1>Dashboard</h1>
  <p class="welcome-text">Welcome back, <strong>{authState.user?.username ?? 'User'}</strong>!</p>
</div>

<div class="overview-grid">
  <div class="stat-card">
    <div class="stat-icon users">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    </div>
    <div class="stat-info">
      <h3>Total Users</h3>
      <p class="stat-number">{isLoading ? '...' : userCount}</p>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon servers">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
    </div>
    <div class="stat-info">
      <h3>Active Servers</h3>
      <p class="stat-number">{isLoading ? '...' : serverCount}</p>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon system">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
    </div>
    <div class="stat-info">
      <h3>System Load</h3>
      <p class="stat-number">Normal</p>
    </div>
  </div>
</div>

<style>
  .dashboard-header-row {
    margin-bottom: 2.5rem;
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-main);
    letter-spacing: -0.02em;
  }

  .welcome-text {
    font-size: 0.9375rem;
    color: var(--text-muted);
    margin: 0.5rem 0 0;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    gap: 1.25rem;
    box-shadow: var(--card-shadow);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    border-color: var(--brand-color);
  }

  .stat-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .stat-icon.users { background: var(--brand-bg); color: var(--brand-color); }
  .stat-icon.servers { background: rgba(16, 185, 129, 0.1); color: #10b981; }
  .stat-icon.system { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

  .stat-info h3 {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-number {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0.25rem 0 0;
    color: var(--text-main);
    letter-spacing: -0.01em;
  }
</style>
