<script lang="ts">
  import type {AdminUser} from '$lib/services/interfaces';
  import {Pencil, ShieldCheck, Trash2} from 'lucide-svelte';

  let { user, onedit, ondelete } = $props<{
    user: AdminUser;
    onedit: () => void;
    ondelete: () => void;
  }>();

  const initials = $derived(user.username.charAt(0).toUpperCase());
</script>

<div class="glass-card user-card">
  <div class="card-header">
    <div class="avatar-wrapper">
      <div class="user-avatar">
        {initials}
      </div>
      {#if user.is_admin}
        <div class="admin-indicator" title="Administrator">
          <ShieldCheck size={12} strokeWidth={3}/>
        </div>
      {/if}
    </div>
    
    <div class="user-info">
      <h3>{user.username}</h3>
      <div class="role-status" class:admin={user.is_admin}>
        <span class="status-dot"></span>
        <span class="role-text">{user.is_admin ? 'Administrator' : 'Standard User'}</span>
      </div>
    </div>
  </div>

  <div class="card-actions">
    <button class="action-btn edit" onclick={onedit} title="Edit User">
      <Pencil size={18}/>
      <span>Edit Profile</span>
    </button>
    <button class="action-btn delete" onclick={ondelete} title="Delete User">
      <Trash2 size={18}/>
    </button>
  </div>
</div>

<style>
  .user-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (max-width: 640px) {
    .user-card {
      padding: 0.875rem;
      gap: 0.875rem;
      border-radius: 14px;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  @media (max-width: 640px) {
    .card-header {
      gap: 0.625rem;
    }
  }

  .avatar-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .user-avatar {
    width: 52px;
    height: 52px;
    background: var(--primary-gradient);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.5rem;
  }

  @media (max-width: 640px) {
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      font-size: 1rem;
    }
  }

  .admin-indicator {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 20px;
    height: 20px;
    background: var(--brand-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--card-bg);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  @media (max-width: 640px) {
    .admin-indicator {
      width: 14px;
      height: 14px;
      bottom: -2px;
      right: -2px;
      border-width: 1.5px;
    }

    :global(.admin-indicator svg) {
      width: 8px;
      height: 8px;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .user-info h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  @media (max-width: 640px) {
    .user-info h3 {
      font-size: 0.9375rem;
    }
  }

  .role-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: #94a3b8;
    border-radius: 50%;
  }

  @media (max-width: 640px) {
    .status-dot {
      width: 5px;
      height: 5px;
    }
  }

  .role-text {
    font-size: 0.8125rem;
    font-weight: 500;
  }

  @media (max-width: 640px) {
    .role-text {
      font-size: 0.7rem;
    }
  }

  .role-status.admin {
    color: var(--brand-color);
  }

  .role-status.admin .status-dot {
    background: var(--brand-color);
    box-shadow: 0 0 8px var(--brand-color);
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1.25rem;
    border-top: none;
  }
  @media (max-width: 640px) {
    .card-actions {
      padding-top: 0.75rem;
      gap: 0.5rem;
    }
  }

  .action-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.625rem;
    border-radius: 12px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .action-btn.edit {
    background: var(--brand-bg);
    color: var(--brand-color);
    padding: 0.625rem 1.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    flex: 1;
  }

  @media (max-width: 640px) {
    .action-btn.edit {
      padding: 0.45rem 1rem;
      font-size: 0.75rem;
      border-radius: 8px;
    }

    :global(.action-btn.edit svg) {
      width: 16px;
      height: 16px;
    }

    .action-btn.delete {
      padding: 0.5rem;
    }

    :global(.action-btn.delete svg) {
      width: 16px;
      height: 16px;
    }
  }

  .action-btn.edit:hover {
    filter: brightness(0.95);
  }

  .action-btn.delete:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  :global(.dark-mode) .action-btn.edit:hover {
    background: rgba(56, 189, 248, 0.15);
  }
</style>
