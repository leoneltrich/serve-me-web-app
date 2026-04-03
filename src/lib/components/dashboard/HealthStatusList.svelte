<script lang="ts">
  import type { ServiceHealth } from '$lib/services/interfaces';

  let { services = {}, loading = false } = $props();

  const servicesList = $derived(Object.values(services as Record<string, ServiceHealth>));

  function getStatusColor(status: string) {
    switch (status) {
      case 'UP': return 'var(--status-up, #10b981)';
      case 'DOWN': return 'var(--status-down, #ef4444)';
      case 'DEGRADED': return 'var(--status-degraded, #f59e0b)';
      case 'STARTING': return 'var(--status-starting, #3b82f6)';
      default: return 'var(--status-unknown, #9ca3af)';
    }
  }
</script>

<div class="health-container">
  <div class="health-header">
    <h2>Service Dependencies</h2>
    <span class="count">{servicesList.length} monitored</span>
  </div>

  <div class="services-grid">
    {#if loading}
      {#each Array(3) as _}
        <div class="service-skeleton"></div>
      {/each}
    {:else}
      {#each servicesList as service}
        <div class="service-item">
          <div class="service-main">
            <div class="status-indicator" style="background: {getStatusColor(service.status)}">
              <div class="status-pulse" style="background: {getStatusColor(service.status)}"></div>
            </div>
            <div class="service-info">
              <span class="service-name">{service.name}</span>
              <span class="service-url">{service.url}</span>
            </div>
          </div>
          
          <div class="service-meta">
            {#if service.latency_ms !== null}
              <div class="latency">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                {service.latency_ms}ms
              </div>
            {/if}
            <div class="status-text" style="color: {getStatusColor(service.status)}">
              {service.status}
            </div>
          </div>

          {#if service.message}
            <div class="service-message">
              {service.message}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .health-container {
    margin-top: 2rem;
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid var(--card-border);
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
  }

  .health-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .health-header h2 {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-main);
  }

  .count {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    background: rgba(0, 0, 0, 0.05);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
  }

  :global(.dark-mode) .count {
    background: rgba(255, 255, 255, 0.05);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }

    .health-container {
      padding: 1rem;
    }
  }

  .service-item {
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1rem;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  :global(.dark-mode) .service-item {
    background: rgba(255, 255, 255, 0.02);
  }

  .service-item:hover {
    border-color: rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.03);
  }

  :global(.dark-mode) .service-item:hover {
    border-color: rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
  }

  .service-main {
    display: flex;
    align-items: center;
    gap: 0.875rem;
  }

  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: relative;
  }

  .status-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    opacity: 0.4;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(2.5); opacity: 0; }
  }

  .service-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .service-name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-main);
  }

  .service-url {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: monospace;
  }

  .service-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .latency {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--text-muted);
  }

  .status-text {
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .service-message {
    font-size: 0.8125rem;
    color: var(--text-muted);
    padding-top: 0.5rem;
    border-top: 1px dashed var(--card-border);
    line-height: 1.4;
  }

  .service-skeleton {
    height: 100px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(90deg, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.05) 75%);
    background-size: 200% 100%;
  }

  :global(.dark-mode) .service-skeleton {
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 75%);
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
  }
</style>
