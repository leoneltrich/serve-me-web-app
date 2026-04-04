<script lang="ts">
  import type {Server as ServerType} from '$lib/services/interfaces';
  import {Lock, Pencil, Server, Trash2} from 'lucide-svelte';

  let { server, onaccess, onedit, ondelete } = $props<{
    server: ServerType;
    onaccess: () => void;
    onedit: () => void;
    ondelete: () => void;
  }>();
</script>

<div class="glass-card server-card">
  <div class="card-header">
    <div class="server-icon">
      <Server size={20}/>
    </div>
    <div class="server-name">
      <h3>{server.servername}</h3>
    </div>
  </div>

  <div class="card-body">
    <div class="info-row">
      <span class="label">Port</span>
      <code>{server.port}</code>
    </div>
    <div class="info-row">
      <span class="label">Protocol</span>
      <span class="badge">{server.protocol}</span>
    </div>
  </div>

  <div class="card-actions">
    <button class="action-btn action-btn-card btn-access-primary" onclick={onaccess} title="Access Status">
      <Lock size={18}/>
      <span>Status</span>
    </button>
    <div class="secondary-actions">
      <button class="action-btn action-btn-card" onclick={onedit} title="Edit">
        <Pencil size={18}/>
      </button>
      <button class="action-btn action-btn-card btn-delete" onclick={ondelete} title="Delete">
        <Trash2 size={18}/>
      </button>
    </div>
  </div>
</div>

<style>
  .server-card {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  @media (max-width: 640px) {
    .server-card {
      padding: 0.875rem;
      gap: 0.75rem;
      border-radius: 12px;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    .card-header {
      gap: 0.75rem;
    }
  }

  .server-icon {
    width: 42px;
    height: 42px;
    background: var(--brand-bg);
    color: var(--brand-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .server-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }

    :global(.server-icon svg) {
      width: 16px;
      height: 16px;
    }
  }

  .server-name h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: -0.01em;
  }

  @media (max-width: 640px) {
    .server-name h3 {
      font-size: 0.9375rem;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    .card-body {
      gap: 0.375rem;
    }
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  @media (max-width: 640px) {
    .info-row {
      font-size: 0.75rem;
    }
  }

  .label {
    color: var(--text-muted);
    font-weight: 500;
  }

  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.8125rem;
    color: var(--text-main);
  }

  @media (max-width: 640px) {
    code {
      font-size: 0.75rem;
      padding: 0.125rem 0.375rem;
    }
  }

  :global(.dark-mode) code {
    background: rgba(255, 255, 255, 0.08);
  }

  .badge {
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(37, 99, 235, 0.1);
    color: var(--brand-color);
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
  }

  @media (max-width: 640px) {
    .badge {
      font-size: 0.6875rem;
      padding: 0.125rem 0.5rem;
    }
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: none;
  }

  @media (max-width: 640px) {
    .card-actions {
      padding-top: 0.75rem;
      gap: 0.5rem;
    }
  }

  .btn-access-primary {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
    flex: 1;
  }

  @media (max-width: 640px) {
    .btn-access-primary {
      padding: 0.4rem 0.75rem;
      font-size: 0.75rem;
    }

    :global(.btn-access-primary svg) {
      width: 16px;
      height: 16px;
    }
  }

  .secondary-actions {
    display: flex;
    gap: 0.25rem;
  }

  .action-btn-card:hover:not(.btn-access-primary):not(.btn-delete) {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-main);
  }

  :global(.dark-mode) .action-btn-card:hover:not(.btn-access-primary):not(.btn-delete) {
    background: rgba(255, 255, 255, 0.05);
  }
</style>
