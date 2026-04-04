<script lang="ts">
  import {onMount} from 'svelte';
  import {getServerService} from '$lib/services/context';
  import type {AccessStatus, Server} from '$lib/services/interfaces';
  import Modal from '$lib/components/dashboard/Modal.svelte';
  import ConfirmationModal from '$lib/components/dashboard/ConfirmationModal.svelte';
  import ServerCard from '$lib/components/dashboard/ServerCard.svelte';
  import {Pencil, Plus, Server as ServerIcon, Shield, Trash2} from 'lucide-svelte';

  const serverService = getServerService();

  let servers = $state<Server[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  // Modal states
  let isCreateModalOpen = $state(false);
  let isEditModalOpen = $state(false);
  let isAccessModalOpen = $state(false);
  let isDeleteModalOpen = $state(false);
  
  // Form states
  let currentServer = $state<Server>({ servername: '', port: 8080, protocol: 'TCP' });
  let editingServerName = $state('');
  let serverToDelete = $state<string | null>(null);
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

  function openDeleteModal(name: string) {
    serverToDelete = name;
    isDeleteModalOpen = true;
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

  async function handleDelete() {
    if (!serverToDelete) return;
    
    isActionLoading = true;
    try {
      await serverService.deleteServer(serverToDelete);
      await loadServers();
      isDeleteModalOpen = false;
      serverToDelete = null;
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
    <Plus size={18}/>
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

<div class="servers-container">
  {#if isLoading}
    <div class="loading-grid">
      {#each Array(3) as _}
        <div class="card-skeleton"></div>
      {/each}
    </div>
  {:else if servers.length === 0}
    <div class="empty-state">
      <p>No servers found. Add your first server to get started.</p>
    </div>
  {:else}
    <!-- Mobile Grid View -->
    <div class="servers-grid mobile-only">
      {#each servers as server}
        <ServerCard 
          {server} 
          onaccess={() => openAccessModal(server.servername)}
          onedit={() => openEditModal(server)}
          ondelete={() => openDeleteModal(server.servername)}
        />
      {/each}
    </div>

    <!-- Desktop Table View -->
    <div class="glass-list desktop-only">
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
                <td class="name-cell">
                  <div class="server-icon">
                    <ServerIcon size={16}/>
                  </div>
                  {server.servername}
                </td>
                <td><code>{server.port}</code></td>
                <td><span class="badge">{server.protocol}</span></td>
                <td class="actions-cell">
                  <div class="action-group">
                    <button class="action-btn action-btn-table btn-access"
                            onclick={() => openAccessModal(server.servername)} title="Access Status">
                      <Shield size={16}/>
                    </button>
                    <button class="action-btn action-btn-table" onclick={() => openEditModal(server)} title="Edit">
                      <Pencil size={16}/>
                    </button>
                    <button class="action-btn action-btn-table btn-delete"
                            onclick={() => openDeleteModal(server.servername)} title="Delete">
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
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
      <button type="button" class="modal-btn-cancel"
              onclick={() => { isCreateModalOpen = false; isEditModalOpen = false; }}>Cancel
      </button>
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
        <button class="primary-button full-width" onclick={() => handleRequestAccess(accessStatus.server)}
                disabled={isActionLoading}>
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

<!-- Delete Confirmation Modal -->
<ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Server"
        message="Are you sure you want to delete {serverToDelete}? This action cannot be undone."
        confirmLabel="Delete Server"
        isDanger={true}
        isLoading={isActionLoading}
        onconfirm={handleDelete}
        onclose={() => { isDeleteModalOpen = false; serverToDelete = null; }}
/>

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

  .servers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: block;
  }

  @media (max-width: 768px) {
    .mobile-only {
      display: grid;
    }
    .desktop-only {
      display: none;
    }
  }

  .loading-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .card-skeleton {
    height: 200px;
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    animation: pulse-bg 2s infinite ease-in-out;
  }

  @keyframes pulse-bg {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 0.3; }
  }

  /* Desktop Table Styles */
  .table-container {
    overflow-x: auto;
  }

  .servers-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .servers-table th {
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    border-bottom: none;
  }

  .servers-table td {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    color: var(--text-main);
    border-bottom: none;
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
