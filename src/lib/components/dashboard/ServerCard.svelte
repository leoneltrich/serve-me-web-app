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

<div class="server-card">
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
    <button class="action-btn access" onclick={onaccess} title="Access Status">
      <Lock size={18}/>
      <span>Status</span>
    </button>
    <div class="secondary-actions">
      <button class="action-btn edit" onclick={onedit} title="Edit">
        <Pencil size={18}/>
      </button>
      <button class="action-btn delete" onclick={ondelete} title="Delete">
        <Trash2 size={18}/>
      </button>
    </div>
  </div>
</div>

<style>
  .server-card {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--card-shadow);
    position: relative;
    overflow: hidden;
  }

  .server-card:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(37, 99, 235, 0.2);
    box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }

  :global(.dark-mode) .server-card:hover {
    background: rgba(24, 24, 27, 0.85);
    border-color: rgba(56, 189, 248, 0.3);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
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

  .server-name h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: -0.01em;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
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

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid var(--card-border);
  }

  .action-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 10px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .action-btn.access {
    background: var(--brand-bg);
    color: var(--brand-color);
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 0.8125rem;
    flex: 1;
  }

  .action-btn.access:hover {
    filter: brightness(0.95);
  }

  .secondary-actions {
    display: flex;
    gap: 0.25rem;
  }

  .action-btn.edit:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-main);
  }

  .action-btn.delete:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  :global(.dark-mode) .action-btn.edit:hover {
    background: rgba(255, 255, 255, 0.05);
  }
</style>
