<script lang="ts">
  import {onMount} from 'svelte';
  import {getAdminService, getHealthService, getServerService} from '$lib/services/context';
  import {authState} from '$lib/services/auth/auth.state.svelte';
  import type {HealthStatus} from '$lib/services/interfaces';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import HealthStatusList from '$lib/components/dashboard/HealthStatusList.svelte';

  const adminService = getAdminService();
  const serverService = getServerService();
  const healthService = getHealthService();

  let userCount = $state(0);
  let serverCount = $state(0);
  let systemHealth = $state<HealthStatus>('UNKNOWN');
  let servicesHealth = $state<Record<string, any>>({});
  let isLoading = $state(true);

  const healthColorMap = {
    'UP': 'health-up',
    'DOWN': 'health-down',
    'DEGRADED': 'health-degraded',
    'STARTING': 'health-starting',
    'UNKNOWN': 'health-unknown'
  } as const;

  onMount(async () => {
    const [users, servers, health] = await Promise.all([
      adminService.getUsers(),
      serverService.getServers(),
      healthService.getHealth()
    ]);
    userCount = users.length;
    serverCount = servers.length;
    systemHealth = health.status;
    servicesHealth = health.services;
    isLoading = false;
  });
  </script>
  <div class="dashboard-header-row">
  <h1>Dashboard</h1>
  <p class="welcome-text">Welcome back, <strong>{authState.user?.username ?? 'User'}</strong>!</p>
  </div>

  <div class="overview-grid">
  <StatCard
    title="Total Users"
    value={userCount}
    colorClass="users"
    loading={isLoading}
  >
    {#snippet icon()}
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    {/snippet}
  </StatCard>

  <StatCard
    title="Active Servers"
    value={serverCount}
    colorClass="servers"
    loading={isLoading}
  >
    {#snippet icon()}
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
    {/snippet}
  </StatCard>

  <StatCard
    title="System Health"
    value={systemHealth}
    colorClass={healthColorMap[systemHealth] || 'health-unknown'}
    loading={isLoading}
  >
    {#snippet icon()}
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
    {/snippet}
    </StatCard>
    </div>

    <HealthStatusList services={servicesHealth} loading={isLoading} />

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

  @media (max-width: 640px) {
    .dashboard-header-row {
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    .overview-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
