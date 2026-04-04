<script lang="ts">
  import {onMount} from 'svelte';
  import {getAdminService, getHealthService, getServerService} from '$lib/services/context';
  import {authState} from '$lib/services/auth/auth.state.svelte';
  import type {HealthStatus} from '$lib/services/interfaces';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import HealthStatusList from '$lib/components/dashboard/HealthStatusList.svelte';
  import {Activity, Server, Users} from 'lucide-svelte';

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
      <Users size={24}/>
    {/snippet}
  </StatCard>

  <StatCard
    title="Active Servers"
    value={serverCount}
    colorClass="servers"
    loading={isLoading}
  >
    {#snippet icon()}
      <Server size={24}/>
    {/snippet}
  </StatCard>

  <StatCard
    title="System Health"
    value={systemHealth}
    colorClass={healthColorMap[systemHealth] || 'health-unknown'}
    loading={isLoading}
  >
    {#snippet icon()}
      <Activity size={24}/>
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
