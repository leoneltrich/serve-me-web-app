<script lang="ts">
  import {onMount} from 'svelte';
  import {getAdminService} from '$lib/services/context';
  import type {AdminUser} from '$lib/services/interfaces';
  import Modal from '$lib/components/dashboard/Modal.svelte';
  import ConfirmationModal from '$lib/components/dashboard/ConfirmationModal.svelte';
  import UserCard from '$lib/components/dashboard/UserCard.svelte';
  import {Pencil, Plus, Trash2} from 'lucide-svelte';

  const adminService = getAdminService();

  let users = $state<AdminUser[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  // Modal states
  let isCreateModalOpen = $state(false);
  let isEditModalOpen = $state(false);
  let isDeleteModalOpen = $state(false);
  
  // Form states
  let currentUser = $state<AdminUser & { password?: string }>({ username: '', is_admin: false, password: '' });
  let userToDelete = $state<string | null>(null);
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
    currentUser = { ...user, password: '' };
    isEditModalOpen = true;
  }

  function openDeleteModal(username: string) {
    userToDelete = username;
    isDeleteModalOpen = true;
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

  async function handleDelete() {
    if (!userToDelete) return;
    
    isActionLoading = true;
    try {
      await adminService.deleteUser(userToDelete);
      await loadUsers();
      isDeleteModalOpen = false;
      userToDelete = null;
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
    <Plus size={18}/>
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

<div class="users-container">
  {#if isLoading}
    <div class="loading-grid">
      {#each Array(3) as _}
        <div class="card-skeleton"></div>
      {/each}
    </div>
  {:else if users.length === 0}
    <div class="empty-state">
      <p>No users found.</p>
    </div>
  {:else}
    <!-- Mobile Grid View -->
    <div class="users-grid mobile-only">
      {#each users as user}
        <UserCard 
          {user}
          onedit={() => openEditModal(user)}
          ondelete={() => openDeleteModal(user.username)}
        />
      {/each}
    </div>

    <!-- Desktop Table View -->
    <div class="users-card desktop-only">
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
                <td class="name-cell">
                  <div class="user-avatar-small">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  {user.username}
                </td>
                <td>
                  <span class="badge" class:admin={user.is_admin}>
                    {user.is_admin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td class="actions-cell">
                  <div class="action-group">
                    <button class="action-btn edit" onclick={() => openEditModal(user)} title="Edit">
                      <Pencil size={16}/>
                    </button>
                    <button class="action-btn delete" onclick={() => openDeleteModal(user.username)} title="Delete">
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

<!-- Delete Confirmation Modal -->
<ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete User"
        message="Are you sure you want to delete user {userToDelete}? This action cannot be undone."
        confirmLabel="Delete User"
        isDanger={true}
        isLoading={isActionLoading}
        onconfirm={handleDelete}
        onclose={() => { isDeleteModalOpen = false; userToDelete = null; }}
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
    filter: brightness(1.05);
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

  .users-grid {
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
    height: 160px;
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
  }

  .users-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .users-table th {
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
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

  .empty-state {
    padding: 4rem 2rem;
    text-align: center;
    color: var(--text-muted);
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