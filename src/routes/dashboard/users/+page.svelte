<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdminService } from '$lib/services/context';
  import type { AdminUser } from '$lib/services/interfaces';
  import Modal from '$lib/components/dashboard/Modal.svelte';

  const adminService = getAdminService();

  let users = $state<AdminUser[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  // Modal states
  let isCreateModalOpen = $state(false);
  let isEditModalOpen = $state(false);
  
  // Form states
  let currentUser = $state<AdminUser & { password?: string }>({ username: '', is_admin: false, password: '' });
  let editingUsername = $state('');
  let isActionLoading = $state(false);

  async function loadUsers() {
    isLoading = true;
    try {
      users = await adminService.getUsers();
    } catch (err) {
      error = 'Failed to load users';
    } finally {
      isLoading = false;
    }
  }

  onMount(loadUsers);

  function openCreateModal() {
    currentUser = { username: '', is_admin: false, password: '' };
    isCreateModalOpen = true;
  }

  function openEditModal(user: AdminUser) {
    editingUsername = user.username;
    currentUser = { ...user, password: '' };
    isEditModalOpen = true;
  }

  async function handleCreate() {
    isActionLoading = true;
    try {
      await adminService.createUser(currentUser);
      await loadUsers();
      isCreateModalOpen = false;
      showSuccess('User created successfully');
    } catch (err) {
      error = 'Failed to create user';
    } finally {
      isActionLoading = false;
    }
  }

  async function handleUpdate() {
    isActionLoading = true;
    try {
      // In the mock we use the username as ID, so if it changed we might have issues 
      // but the API put /admin/users usually identifies by username in body or path
      await adminService.updateUser(currentUser);
      await loadUsers();
      isEditModalOpen = false;
      showSuccess('User updated successfully');
    } catch (err) {
      error = 'Failed to update user';
    } finally {
      isActionLoading = false;
    }
  }

  async function handleDelete(username: string) {
    if (!confirm(`Are you sure you want to delete user ${username}?`)) return;
    
    isActionLoading = true;
    try {
      await adminService.deleteUser(username);
      await loadUsers();
      showSuccess('User deleted');
    } catch (err) {
      error = 'Failed to delete user';
    } finally {
      isActionLoading = false;
    }
  }

  function showSuccess(msg: string) {
    successMessage = msg;
    setTimeout(() => successMessage = null, 3000);
  }
</script>

<div class="page-header">
  <div>
    <h1>Users</h1>
    <p class="subtitle">Manage system users and permissions.</p>
  </div>
  <button class="primary-button" onclick={openCreateModal}>
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    Add User
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

<div class="users-card">
  {#if isLoading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading users...</p>
    </div>
  {:else if users.length === 0}
    <div class="empty-state">
      <p>No users found.</p>
    </div>
  {:else}
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th class="actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            <tr>
              <td class="name-cell" data-label="Username">
                <div class="user-avatar-small">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {user.username}
              </td>
              <td data-label="Role">
                <span class="badge" class:admin={user.is_admin}>
                  {user.is_admin ? 'Admin' : 'User'}
                </span>
              </td>
              <td class="actions-cell" data-label="Actions">
                <div class="action-group">
                  <button class="action-btn edit" onclick={() => openEditModal(user)} title="Edit">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="action-btn delete" onclick={() => handleDelete(user.username)} title="Delete">
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
  title={isCreateModalOpen ? 'Add New User' : 'Edit User'} 
  onclose={() => { isCreateModalOpen = false; isEditModalOpen = false; }}
>
  <form onsubmit={(e) => { e.preventDefault(); isCreateModalOpen ? handleCreate() : handleUpdate(); }} class="modal-form">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" bind:value={currentUser.username} placeholder="e.g. johndoe" required disabled={isActionLoading || isEditModalOpen} />
      {#if isEditModalOpen}
        <p class="field-note">Username cannot be changed.</p>
      {/if}
    </div>
    
    <div class="form-group">
      <label for="password">{isEditModalOpen ? 'New Password (leave blank to keep current)' : 'Password'}</label>
      <input type="password" id="password" bind:value={currentUser.password} placeholder="••••••••" required={isCreateModalOpen} disabled={isActionLoading} />
    </div>

    <div class="form-group checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={currentUser.is_admin} disabled={isActionLoading} />
        <span>Administrator Privileges</span>
      </label>
      <p class="field-note">Admins can manage servers and other users.</p>
    </div>

    <div class="form-actions">
      <button type="button" class="secondary-button" onclick={() => { isCreateModalOpen = false; isEditModalOpen = false; }}>Cancel</button>
      <button type="submit" class="primary-button" disabled={isActionLoading}>
        {isActionLoading ? 'Saving...' : (isCreateModalOpen ? 'Create User' : 'Save Changes')}
      </button>
    </div>
  </form>
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

  .users-card {
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
.users-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

@media (max-width: 640px) {
  .users-card {
    background: none;
    border: none;
    box-shadow: none;
  }

  .table-container {
    overflow-x: visible;
  }

  .users-table, .users-table thead, .users-table tbody, .users-table th, .users-table td, .users-table tr {
    display: block;
  }

  .users-table thead {
    display: none;
  }

  .users-table tr {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    margin-bottom: 1rem;
    padding: 0.5rem;
    box-shadow: var(--card-shadow);
  }

  .users-table td {
    border-bottom: none;
    padding: 0.5rem 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    font-size: 0.9375rem;
  }

  .users-table td::before {
    content: attr(data-label);
    font-weight: 500;
    text-transform: none;
    font-size: 0.8125rem;
    color: var(--text-muted);
    text-align: left;
  }

  .name-cell {
    border-bottom: 1px solid var(--card-border) !important;
    margin-bottom: 0.25rem;
    padding: 0.75rem !important;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 8px 8px 0 0;
  }

  :global(.dark-mode) .name-cell {
    background: rgba(255, 255, 255, 0.02);
  }

  .user-avatar-small {
    width: 28px;
    height: 28px;
  }
  .name-cell::before {
    display: none;
  }

  .action-group {
    justify-content: flex-end;
    width: 100%;
  }
}

.users-table th {
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
...
    letter-spacing: 0.05em;
    color: var(--text-muted);
    border-bottom: 1px solid var(--card-border);
  }

  .users-table td {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    color: var(--text-main);
    border-bottom: 1px solid var(--card-border);
  }

  .users-table tr:last-child td {
    border-bottom: none;
  }

  .name-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .user-avatar-small {
    width: 32px;
    height: 32px;
    background: var(--primary-gradient);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.75rem;
  }

  .badge {
    font-size: 0.6875rem;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-muted);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
  }

  :global(.dark-mode) .badge {
    background: rgba(255, 255, 255, 0.05);
  }

  .badge.admin {
    background: rgba(139, 92, 246, 0.1);
    color: #8b5cf6;
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

  .form-group input {
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

  .checkbox-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.875rem !important;
    color: var(--text-main) !important;
  }

  .checkbox-label input {
    width: 18px;
    height: 18px;
    accent-color: var(--brand-color);
  }

  .field-note {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin: 0;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    .form-actions {
      flex-direction: column-reverse;
    }

    .form-actions button {
      width: 100%;
    }
  }
  </style>