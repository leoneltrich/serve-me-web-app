import "../../../../chunks/index-server.js";
import { b as escape_html, i as ensure_array_like, r as derived, t as attr_class, y as attr } from "../../../../chunks/server.js";
import { t as getAdminService } from "../../../../chunks/context.js";
import { t as Modal } from "../../../../chunks/Modal.js";
//#region src/lib/components/dashboard/UserCard.svelte
function UserCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { user, onedit, ondelete } = $$props;
		const initials = derived(() => user.username.charAt(0).toUpperCase());
		$$renderer.push(`<div class="user-card svelte-1qjuy4g"><div class="card-header svelte-1qjuy4g"><div class="avatar-wrapper svelte-1qjuy4g"><div class="user-avatar svelte-1qjuy4g">${escape_html(initials())}</div> `);
		if (user.is_admin) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="admin-indicator svelte-1qjuy4g" title="Administrator"><svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="3" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="user-info svelte-1qjuy4g"><h3 class="svelte-1qjuy4g">${escape_html(user.username)}</h3> <div${attr_class("role-status svelte-1qjuy4g", void 0, { "admin": user.is_admin })}><span class="status-dot svelte-1qjuy4g"></span> <span class="role-text svelte-1qjuy4g">${escape_html(user.is_admin ? "Administrator" : "Standard User")}</span></div></div></div> <div class="card-actions svelte-1qjuy4g"><button class="action-btn edit svelte-1qjuy4g" title="Edit User"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> <span>Edit Profile</span></button> <button class="action-btn delete svelte-1qjuy4g" title="Delete User"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></div>`);
	});
}
//#endregion
//#region src/routes/dashboard/users/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const adminService = getAdminService();
		let users = [];
		let isLoading = true;
		let error = null;
		let successMessage = null;
		let isCreateModalOpen = false;
		let isEditModalOpen = false;
		let currentUser = {
			username: "",
			is_admin: false,
			password: ""
		};
		let isActionLoading = false;
		async function loadUsers() {
			isLoading = true;
			try {
				users = await adminService.getUsers();
			} catch (err) {
				error = "Failed to load users";
			} finally {
				isLoading = false;
			}
		}
		function openEditModal(user) {
			user.username;
			currentUser = {
				...user,
				password: ""
			};
			isEditModalOpen = true;
		}
		async function handleDelete(username) {
			if (!confirm(`Are you sure you want to delete user ${username}?`)) return;
			isActionLoading = true;
			try {
				await adminService.deleteUser(username);
				await loadUsers();
				showSuccess("User deleted");
			} catch (err) {
				error = "Failed to delete user";
			} finally {
				isActionLoading = false;
			}
		}
		function showSuccess(msg) {
			successMessage = msg;
			setTimeout(() => successMessage = null, 3e3);
		}
		$$renderer.push(`<div class="page-header svelte-1m3dwdc"><div class="svelte-1m3dwdc"><h1 class="svelte-1m3dwdc">Users</h1> <p class="subtitle svelte-1m3dwdc">Manage system users and permissions.</p></div> <button class="primary-button svelte-1m3dwdc"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" class="svelte-1m3dwdc"><line x1="12" y1="5" x2="12" y2="19" class="svelte-1m3dwdc"></line><line x1="5" y1="12" x2="19" y2="12" class="svelte-1m3dwdc"></line></svg> Add User</button></div> `);
		if (error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner error svelte-1m3dwdc">${escape_html(error)} <button class="svelte-1m3dwdc">×</button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (successMessage) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner success svelte-1m3dwdc">${escape_html(successMessage)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="users-container svelte-1m3dwdc">`);
		if (isLoading) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="loading-grid svelte-1m3dwdc"><!--[-->`);
			const each_array = ensure_array_like(Array(3));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				each_array[$$index];
				$$renderer.push(`<div class="card-skeleton svelte-1m3dwdc"></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (users.length === 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="empty-state svelte-1m3dwdc"><p class="svelte-1m3dwdc">No users found.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="users-grid mobile-only svelte-1m3dwdc"><!--[-->`);
			const each_array_1 = ensure_array_like(users);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let user = each_array_1[$$index_1];
				UserCard($$renderer, {
					user,
					onedit: () => openEditModal(user),
					ondelete: () => handleDelete(user.username)
				});
			}
			$$renderer.push(`<!--]--></div> <div class="users-card desktop-only svelte-1m3dwdc"><div class="table-container svelte-1m3dwdc"><table class="users-table svelte-1m3dwdc"><thead class="svelte-1m3dwdc"><tr class="svelte-1m3dwdc"><th class="svelte-1m3dwdc">Username</th><th class="svelte-1m3dwdc">Role</th><th class="actions-cell svelte-1m3dwdc">Actions</th></tr></thead><tbody class="svelte-1m3dwdc"><!--[-->`);
			const each_array_2 = ensure_array_like(users);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let user = each_array_2[$$index_2];
				$$renderer.push(`<tr class="svelte-1m3dwdc"><td class="name-cell svelte-1m3dwdc"><div class="user-avatar-small svelte-1m3dwdc">${escape_html(user.username.charAt(0).toUpperCase())}</div> ${escape_html(user.username)}</td><td class="svelte-1m3dwdc"><span${attr_class("badge svelte-1m3dwdc", void 0, { "admin": user.is_admin })}>${escape_html(user.is_admin ? "Admin" : "User")}</span></td><td class="actions-cell svelte-1m3dwdc"><div class="action-group svelte-1m3dwdc"><button class="action-btn edit svelte-1m3dwdc" title="Edit"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-1m3dwdc"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" class="svelte-1m3dwdc"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" class="svelte-1m3dwdc"></path></svg></button> <button class="action-btn delete svelte-1m3dwdc" title="Delete"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-1m3dwdc"><polyline points="3 6 5 6 21 6" class="svelte-1m3dwdc"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" class="svelte-1m3dwdc"></path></svg></button></div></td></tr>`);
			}
			$$renderer.push(`<!--]--></tbody></table></div></div>`);
		}
		$$renderer.push(`<!--]--></div> `);
		Modal($$renderer, {
			isOpen: isCreateModalOpen || isEditModalOpen,
			title: isCreateModalOpen ? "Add New User" : "Edit User",
			onclose: () => {
				isCreateModalOpen = false;
				isEditModalOpen = false;
			},
			children: ($$renderer) => {
				$$renderer.push(`<form class="modal-form svelte-1m3dwdc"><div class="form-group svelte-1m3dwdc"><label for="username" class="svelte-1m3dwdc">Username</label> <input type="text" id="username"${attr("value", currentUser.username)} placeholder="e.g. johndoe" required=""${attr("disabled", isActionLoading || isEditModalOpen, true)} class="svelte-1m3dwdc"/> `);
				if (isEditModalOpen) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="field-note svelte-1m3dwdc">Username cannot be changed.</p>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="form-group svelte-1m3dwdc"><label for="password" class="svelte-1m3dwdc">${escape_html(isEditModalOpen ? "New Password (leave blank to keep current)" : "Password")}</label> <input type="password" id="password"${attr("value", currentUser.password)} placeholder="••••••••"${attr("required", isCreateModalOpen, true)}${attr("disabled", isActionLoading, true)} class="svelte-1m3dwdc"/></div> <div class="form-group checkbox-group svelte-1m3dwdc"><label class="checkbox-label svelte-1m3dwdc"><input type="checkbox"${attr("checked", currentUser.is_admin, true)}${attr("disabled", isActionLoading, true)} class="svelte-1m3dwdc"/> <span class="svelte-1m3dwdc">Administrator Privileges</span></label> <p class="field-note svelte-1m3dwdc">Admins can manage servers and other users.</p></div> <div class="form-actions svelte-1m3dwdc"><button type="button" class="secondary-button svelte-1m3dwdc">Cancel</button> <button type="submit" class="primary-button svelte-1m3dwdc"${attr("disabled", isActionLoading, true)}>${escape_html(isActionLoading ? "Saving..." : isCreateModalOpen ? "Create User" : "Save Changes")}</button></div></form>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
