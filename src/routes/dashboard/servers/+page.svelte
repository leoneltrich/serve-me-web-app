<script lang="ts">
  import { onMount } from 'svelte';
  import { getServerService } from '$lib/services/context';
  import type { Server, AccessStatus } from '$lib/services/interfaces';
  import Modal from '$lib/components/dashboard/Modal.svelte';

  const serverService = getServerService();

  let servers = $state<Server[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  // Modal states
  let isCreateModalOpen = $state(false);
  let isEditModalOpen = $state(false);
  let isAccessModalOpen = $state(false);
  
  // Form states
  let currentServer = $state<Server>({ servername: '', port: 8080, protocol: 'TCP' });
  let editingServerName = $state('');
  let accessStatus = $state<AccessStatus | null>(null);
  let isActionLoading = $state(false);

  async function loadServers() {
    isLoading = true;
    try {
      servers = await serverService.getServers();
    } catch (err) {
      error = 'Failed to load servers';
    } finally {
      isLoading = false;
    }
  }

  onMount(loadServers);

  function openCreateModal() {
    currentServer = { servername: '', port: 8080, protocol: 'TCP' };
    isCreateModalOpen = true;
  }

  function openEditModal(server: Server) {
    editingServerName = server.servername;
    currentServer = { ...server };
    isEditModalOpen = true;
  }

  async function handleCreate() {
    isActionLoading = true;
    try {
      await serverService.createServer(currentServer);
      await loadServers();
      isCreateModalOpen = false;
      showSuccess('Server created successfully');
    } catch (err) {
      error = 'Failed to create server';
    } finally {
      isActionLoading = false;
    }
  }

  async function handleUpdate() {
    isActionLoading = true;
    try {
      await serverService.updateServer(editingServerName, currentServer);
      await loadServers();
      isEditModalOpen = false;
      showSuccess('Server updated successfully');
    } catch (err) {
      error = 'Failed to update server';
    } finally {
      isActionLoading = false;
    }
  }

  async function handleDelete(name: string) {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    
    isActionLoading = true;
    try {
      await serverService.deleteServer(name);
      await loadServers();
      showSuccess('Server deleted');
    } catch (err) {
      error = 'Failed to delete server';
    } finally {
      isActionLoading = false;
    }
  }

  async function handleRequestAccess(name: string) {
    isActionLoading = true;
    try {
      const res = await serverService.requestAccess(name);
      showSuccess(res.message);
      // Refresh status if modal is open
      if (isAccessModalOpen) {
        accessStatus = await serverService.checkAccessStatus(name);
      }
    } catch (err) {
      error = 'Failed to request access';
    } finally {
      isActionLoading = false;
    }
  }

  async function openAccessModal(name: string) {
    isAccessModalOpen = true;
    accessStatus = null;
    try {
      accessStatus = await serverService.checkAccessStatus(name);
    } catch (err) {
      error = 'Failed to check access status';
    }
  }

  function showSuccess(msg: string) {
    successMessage = msg;
    setTimeout(() => successMessage = null, 3000);
  }
</script>

<div class="page-header">
  <div>
    <h1>Servers</h1>
    <p class="subtitle">Manage firewall rules and server access.</p>
  </div>
  <button class="primary-button" onclick={openCreateModal}>
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    Add Server
  </button>
</div>

{#if error}
  <div class="banner error">
    {error}
    <button onclick={() => error = null}>&times;</button>
  </div>
{/if}

{#if successMessage}
  <div class="banner success">
    {successMessage}
  </div>
{/if}

<div class="servers-card">
  {#if isLoading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading servers...</p>
    </div>
  {:else if servers.length === 0}
    <div class="empty-state">
      <p>No servers found. Add your first server to get started.</p>
    </div>
  {:else}
    <div class="table-container">
      <table class="servers-table">
        <thead>
          <tr>
            <th>Server Name</th>
            <th>Port</th>
            <th>Protocol</th>
            <th class="actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each servers as server}
            <tr>
              <td class="name-cell" data-label="Server Name">
                <div class="server-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                  </svg>
                </div>
                {server.servername}
              </td>
              <td data-label="Port"><code>{server.port}</code></td>
              <td data-label="Protocol"><span class="badge">{server.protocol}</span></td>
              <td class="actions-cell" data-label="Actions">
                <div class="action-group">
                  <button class="action-btn access" onclick={() => openAccessModal(server.servername)} title="Access Status">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </button>
                  <button class="action-btn edit" onclick={() => openEditModal(server)} title="Edit">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="action-btn delete" onclick={() => handleDelete(server.servername)} title="Delete">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<!-- Create/Edit Modal -->
<Modal 
  isOpen={isCreateModalOpen || isEditModalOpen} 
  title={isCreateModalOpen ? 'Add New Server' : 'Edit Server'} 
  onclose={() => { isCreateModalOpen = false; isEditModalOpen = false; }}
>
  <form onsubmit={(e) => { e.preventDefault(); isCreateModalOpen ? handleCreate() : handleUpdate(); }} class="modal-form">
    <div class="form-group">
      <label for="servername">Server Name</label>
      <input type="text" id="servername" bind:value={currentServer.servername} placeholder="e.g. media-server" required disabled={isActionLoading} />
    </div>
    <div class="form-group">
      <label for="port">Port</label>
      <input type="number" id="port" bind:value={currentServer.port} min="1" max="65535" required disabled={isActionLoading} />
    </div>
    <div class="form-group">
      <label for="protocol">Protocol</label>
      <select id="protocol" bind:value={currentServer.protocol} disabled={isActionLoading}>
        <option value="TCP">TCP</option>
        <option value="UDP">UDP</option>
        <option value="TCP/UDP">TCP/UDP</option>
      </select>
    </div>
    <div class="form-actions">
      <button type="button" class="secondary-button" onclick={() => { isCreateModalOpen = false; isEditModalOpen = false; }}>Cancel</button>
      <button type="submit" class="primary-button" disabled={isActionLoading}>
        {isActionLoading ? 'Saving...' : (isCreateModalOpen ? 'Create Server' : 'Save Changes')}
      </button>
    </div>
  </form>
</Modal>

<!-- Access Status Modal -->
<Modal isOpen={isAccessModalOpen} title="Access Status" onclose={() => isAccessModalOpen = false}>
  {#if accessStatus}
    <div class="access-details">
      <div class="status-indicator" class:active={accessStatus.is_active}>
        <div class="indicator-dot"></div>
        <span>{accessStatus.is_active ? 'Access Active' : 'No Access'}</span>
      </div>
      
      <div class="info-grid">
        <div class="info-item">
          <label>Target Server</label>
          <p>{accessStatus.server}</p>
        </div>
        <div class="info-item">
          <label>Your IP</label>
          <p>{accessStatus.ip}</p>
        </div>
        {#if accessStatus.is_active}
          <div class="info-item">
            <label>Expires In</label>
            <p>{accessStatus.time_remaining}</p>
          </div>
        {/if}
      </div>

      <div class="modal-actions-full">
        <button class="primary-button full-width" onclick={() => handleRequestAccess(accessStatus!.server)} disabled={isActionLoading}>
          {isActionLoading ? 'Processing...' : (accessStatus.is_active ? 'Extend Access' : 'Request Access')}
        </button>
      </div>
    </div>
  {:else}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Checking status...</p>
    </div>
  {/if}
</Modal>

<style>
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .primary-button {
      width: 100%;
      justify-content: center;
    }
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-main);
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 0.9375rem;
    color: var(--text-muted);
    margin: 0.5rem 0 0;
  }

  .primary-button {
    background: var(--primary-gradient);
    color: white;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: 10px;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: var(--primary-shadow);
    transition: all 0.3s;
  }

  .primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(37, 99, 235, 0.3);
  }

  .primary-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .secondary-button {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-main);
    border: 1px solid var(--card-border);
    padding: 0.625rem 1.25rem;
    border-radius: 10px;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark-mode) .secondary-button {
    background: rgba(255, 255, 255, 0.05);
  }

  .secondary-button:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  .banner {
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    animation: banner-slide 0.3s ease;
  }

  @keyframes banner-slide {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .banner.error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .banner.success {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .servers-card {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid var(--card-border);
    box-shadow: var(--card-shadow);
    overflow: hidden;
  }

  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .servers-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  @media (max-width: 768px) {
    .servers-card {
      background: none;
      border: none;
      box-shadow: none;
    }

    .table-container {
      overflow-x: visible;
    }

    .servers-table, .servers-table thead, .servers-table tbody, .servers-table th, .servers-table td, .servers-table tr {
      display: block;
    }

    .servers-table thead {
      display: none;
    }

    .servers-table tr {
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      margin-bottom: 1.25rem;
      padding: 0.75rem;
      box-shadow: var(--card-shadow);
      transition: transform 0.2s ease;
    }

    .servers-table td {
      border-bottom: none;
      padding: 0.75rem 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: right;
    }

    .servers-table td::before {
      content: attr(data-label);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.6875rem;
      color: var(--text-muted);
      text-align: left;
    }

    .name-cell {
      border-bottom: 1px solid var(--card-border) !important;
      margin-bottom: 0.5rem;
      padding-bottom: 1rem !important;
    }

    .name-cell::before {
      display: none;
    }

    .action-group {
      justify-content: flex-end;
      width: 100%;
    }
  }

  .servers-table th {
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    border-bottom: 1px solid var(--card-border);
  }

  .servers-table td {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    color: var(--text-main);
    border-bottom: 1px solid var(--card-border);
  }

  .servers-table tr:last-child td {
    border-bottom: none;
  }

  .name-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .server-icon {
    width: 32px;
    height: 32px;
    background: var(--brand-bg);
    color: var(--brand-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.8125rem;
  }

  :global(.dark-mode) code {
    background: rgba(255, 255, 255, 0.1);
  }

  .badge {
    font-size: 0.6875rem;
    font-weight: 600;
    background: rgba(37, 99, 235, 0.1);
    color: #2563eb;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
  }

  :global(.dark-mode) .badge {
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
  }

  .actions-cell {
    text-align: right;
  }

  .action-group {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .action-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s;
    display: flex;
  }

  .action-btn:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-main);
  }

  :global(.dark-mode) .action-btn:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .action-btn.delete:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .action-btn.access:hover {
    color: var(--brand-color);
    background: var(--brand-bg);
  }

  .loading-state, .empty-state {
    padding: 4rem 2rem;
    text-align: center;
    color: var(--text-muted);
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top-color: var(--brand-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Modal Form */
  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-muted);
  }

  .form-group input, .form-group select {
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    color: var(--input-text);
    font-family: inherit;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
  }

  .form-group input:focus {
    border-color: var(--brand-color);
    box-shadow: 0 0 0 3px var(--brand-bg);
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  /* Access Details */
  .access-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--text-muted);
  }

  :global(.dark-mode) .status-indicator {
    background: rgba(255, 255, 255, 0.03);
  }

  .status-indicator.active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  .indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    .info-grid {
      grid-template-columns: 1fr;
    }
  }

  .info-item label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    display: block;
    margin-bottom: 0.25rem;
  }

  .info-item p {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-main);
    margin: 0;
  }

  .modal-actions-full {
    margin-top: 0.5rem;
  }

  .full-width {
    width: 100%;
    justify-content: center;
    padding: 0.875rem;
  }
</style>
