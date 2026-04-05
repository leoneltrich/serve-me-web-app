import "../../../../chunks/index-server.js";
import {
    E as attr,
    O as escape_html,
    a as derived,
    d as slot,
    f as spread_props,
    p as stringify,
    s as ensure_array_like,
    t as attr_class,
    u as sanitize_props
} from "../../../../chunks/server.js";
import { t as getAdminService } from "../../../../chunks/context.js";
import {t as Icon} from "../../../../chunks/Icon.js";
import {i as Pencil, n as Trash_2, r as Plus, t as ConfirmationModal} from "../../../../chunks/ConfirmationModal.js";
import { t as Modal } from "../../../../chunks/Modal.js";

//#region node_modules/lucide-svelte/dist/icons/shield-check.svelte
function Shield_check($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "shield-check"},
        sanitize_props($$props),
        {
            iconNode: [["path", {"d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}], ["path", {"d": "m9 12 2 2 4-4"}]],
            children: ($$renderer) => {
                $$renderer.push(`<!--[-->`);
                slot($$renderer, $$props, "default", {}, null);
                $$renderer.push(`<!--]-->`);
            },
            $$slots: {default: true}
        }
    ]));
}

//#endregion
//#region src/lib/components/dashboard/UserCard.svelte
function UserCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { user, onedit, ondelete } = $$props;
		const initials = derived(() => user.username.charAt(0).toUpperCase());
        $$renderer.push(`<div class="glass-card user-card svelte-1qjuy4g"><div class="card-header svelte-1qjuy4g"><div class="avatar-wrapper svelte-1qjuy4g"><div class="user-avatar svelte-1qjuy4g">${escape_html(initials())}</div> `);
		if (user.is_admin) {
			$$renderer.push("<!--[0-->");
            $$renderer.push(`<div class="admin-indicator svelte-1qjuy4g" title="Administrator">`);
            Shield_check($$renderer, {
                size: 12,
                strokeWidth: 3
            });
            $$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
        $$renderer.push(`<!--]--></div> <div class="user-info svelte-1qjuy4g"><h3 class="svelte-1qjuy4g">${escape_html(user.username)}</h3> <div${attr_class("role-status svelte-1qjuy4g", void 0, {"admin": user.is_admin})}><span class="status-dot svelte-1qjuy4g"></span> <span class="role-text svelte-1qjuy4g">${escape_html(user.is_admin ? "Administrator" : "Standard User")}</span></div></div></div> <div class="card-actions svelte-1qjuy4g"><button class="action-btn action-btn-card btn-edit-primary svelte-1qjuy4g" title="Edit User">`);
        Pencil($$renderer, {size: 18});
        $$renderer.push(`<!----> <span>Edit Profile</span></button> <button class="action-btn action-btn-card btn-delete svelte-1qjuy4g" title="Delete User">`);
        Trash_2($$renderer, {size: 18});
        $$renderer.push(`<!----></button></div></div>`);
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
        let isDeleteModalOpen = false;
		let currentUser = {
			username: "",
			is_admin: false,
			password: ""
		};
        let userToDelete = null;
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
			currentUser = {
				...user,
				password: ""
			};
			isEditModalOpen = true;
		}

        function openDeleteModal(username) {
            userToDelete = username;
            isDeleteModalOpen = true;
        }

        async function handleDelete() {
            if (!userToDelete) return;
			isActionLoading = true;
			try {
                await adminService.deleteUser(userToDelete);
				await loadUsers();
                isDeleteModalOpen = false;
                userToDelete = null;
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

        $$renderer.push(`<div class="page-header svelte-1m3dwdc"><div class="svelte-1m3dwdc"><h1 class="svelte-1m3dwdc">Users</h1> <p class="subtitle svelte-1m3dwdc">Manage system users and permissions.</p></div> <button class="primary-button svelte-1m3dwdc">`);
        Plus($$renderer, {size: 18});
        $$renderer.push(`<!----> Add User</button></div> `);
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
                    ondelete: () => openDeleteModal(user.username)
				});
			}
            $$renderer.push(`<!--]--></div> <div class="glass-list desktop-only svelte-1m3dwdc"><div class="table-container svelte-1m3dwdc"><table class="users-table svelte-1m3dwdc"><thead class="svelte-1m3dwdc"><tr class="svelte-1m3dwdc"><th class="svelte-1m3dwdc">Username</th><th class="svelte-1m3dwdc">Role</th><th class="actions-cell svelte-1m3dwdc">Actions</th></tr></thead><tbody class="svelte-1m3dwdc"><!--[-->`);
			const each_array_2 = ensure_array_like(users);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let user = each_array_2[$$index_2];
                $$renderer.push(`<tr class="svelte-1m3dwdc"><td class="name-cell svelte-1m3dwdc"><div class="user-avatar-small svelte-1m3dwdc">${escape_html(user.username.charAt(0).toUpperCase())}</div> ${escape_html(user.username)}</td><td class="svelte-1m3dwdc"><span${attr_class("badge svelte-1m3dwdc", void 0, {"admin": user.is_admin})}>${escape_html(user.is_admin ? "Admin" : "User")}</span></td><td class="actions-cell svelte-1m3dwdc"><div class="action-group svelte-1m3dwdc"><button class="action-btn action-btn-table svelte-1m3dwdc" title="Edit">`);
                Pencil($$renderer, {size: 16});
                $$renderer.push(`<!----></button> <button class="action-btn action-btn-table btn-delete svelte-1m3dwdc" title="Delete">`);
                Trash_2($$renderer, {size: 16});
                $$renderer.push(`<!----></button></div></td></tr>`);
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
                $$renderer.push(`<!--]--></div> <div class="form-group svelte-1m3dwdc"><label for="password" class="svelte-1m3dwdc">${escape_html(isEditModalOpen ? "New Password (leave blank to keep current)" : "Password")}</label> <input type="password" id="password"${attr("value", currentUser.password)} placeholder="••••••••"${attr("required", isCreateModalOpen, true)}${attr("disabled", isActionLoading, true)} class="svelte-1m3dwdc"/></div> <div class="form-group checkbox-group svelte-1m3dwdc"><label class="checkbox-label svelte-1m3dwdc"><input type="checkbox"${attr("checked", currentUser.is_admin, true)}${attr("disabled", isActionLoading, true)} class="svelte-1m3dwdc"/> <span class="svelte-1m3dwdc">Administrator Privileges</span></label> <p class="field-note svelte-1m3dwdc">Admins can manage servers and other users.</p></div> <div class="form-actions svelte-1m3dwdc"><button type="button" class="modal-btn-cancel svelte-1m3dwdc">Cancel</button> <button type="submit" class="primary-button svelte-1m3dwdc"${attr("disabled", isActionLoading, true)}>${escape_html(isActionLoading ? "Saving..." : isCreateModalOpen ? "Create User" : "Save Changes")}</button></div></form>`);
			},
			$$slots: { default: true }
		});
        $$renderer.push(`<!----> `);
        ConfirmationModal($$renderer, {
            isOpen: isDeleteModalOpen,
            title: "Delete User",
            message: `Are you sure you want to delete user ${stringify(userToDelete)}? This action cannot be undone.`,
            confirmLabel: "Delete User",
            isDanger: true,
            isLoading: isActionLoading,
            onconfirm: handleDelete,
            onclose: () => {
                isDeleteModalOpen = false;
                userToDelete = null;
            }
        });
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
