import { B as proxy, C as from_html, D as delegated, E as delegate, H as state, K as pop, L as child, N as template_effect, O as event, R as first_child, U as user_derived, V as set, X as next, Z as reset, _ as each, b as set_text, c as bind_value, k as get, l as remove_input_defaults, n as onMount, p as set_class, q as push, s as bind_checked, v as index, x as append, y as if_block, z as sibling } from "../chunks/DohVbzTv.js";
import "../chunks/BJgEf1bw.js";
import { t as getAdminService } from "../chunks/BNTimwTx.js";
import { t as Modal } from "../chunks/Cq5zVEV_.js";
//#region src/lib/components/dashboard/UserCard.svelte
var root_1$1 = from_html(`<div class="admin-indicator svelte-1qjuy4g" title="Administrator"><svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="3" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>`);
var root$1 = from_html(`<div class="user-card svelte-1qjuy4g"><div class="card-header svelte-1qjuy4g"><div class="avatar-wrapper svelte-1qjuy4g"><div class="user-avatar svelte-1qjuy4g"> </div> <!></div> <div class="user-info svelte-1qjuy4g"><h3 class="svelte-1qjuy4g"> </h3> <div><span class="status-dot svelte-1qjuy4g"></span> <span class="role-text svelte-1qjuy4g"> </span></div></div></div> <div class="card-actions svelte-1qjuy4g"><button class="action-btn edit svelte-1qjuy4g" title="Edit User"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> <span>Edit Profile</span></button> <button class="action-btn delete svelte-1qjuy4g" title="Delete User"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></div>`);
function UserCard($$anchor, $$props) {
	push($$props, true);
	const initials = user_derived(() => $$props.user.username.charAt(0).toUpperCase());
	var div = root$1();
	var div_1 = child(div);
	var div_2 = child(div_1);
	var div_3 = child(div_2);
	var text = child(div_3, true);
	reset(div_3);
	var node = sibling(div_3, 2);
	var consequent = ($$anchor) => {
		append($$anchor, root_1$1());
	};
	if_block(node, ($$render) => {
		if ($$props.user.is_admin) $$render(consequent);
	});
	reset(div_2);
	var div_5 = sibling(div_2, 2);
	var h3 = child(div_5);
	var text_1 = child(h3, true);
	reset(h3);
	var div_6 = sibling(h3, 2);
	let classes;
	var span = sibling(child(div_6), 2);
	var text_2 = child(span, true);
	reset(span);
	reset(div_6);
	reset(div_5);
	reset(div_1);
	var div_7 = sibling(div_1, 2);
	var button = child(div_7);
	var button_1 = sibling(button, 2);
	reset(div_7);
	reset(div);
	template_effect(() => {
		set_text(text, get(initials));
		set_text(text_1, $$props.user.username);
		classes = set_class(div_6, 1, "role-status svelte-1qjuy4g", null, classes, { admin: $$props.user.is_admin });
		set_text(text_2, $$props.user.is_admin ? "Administrator" : "Standard User");
	});
	delegated("click", button, function(...$$args) {
		$$props.onedit?.apply(this, $$args);
	});
	delegated("click", button_1, function(...$$args) {
		$$props.ondelete?.apply(this, $$args);
	});
	append($$anchor, div);
	pop();
}
delegate(["click"]);
//#endregion
//#region src/routes/dashboard/users/+page.svelte
var root_1 = from_html(`<div class="banner error svelte-1m3dwdc"> <button class="svelte-1m3dwdc">&times;</button></div>`);
var root_2 = from_html(`<div class="banner success svelte-1m3dwdc"> </div>`);
var root_4 = from_html(`<div class="card-skeleton svelte-1m3dwdc"></div>`);
var root_3 = from_html(`<div class="loading-grid svelte-1m3dwdc"></div>`);
var root_5 = from_html(`<div class="empty-state svelte-1m3dwdc"><p class="svelte-1m3dwdc">No users found.</p></div>`);
var root_8 = from_html(`<tr class="svelte-1m3dwdc"><td class="name-cell svelte-1m3dwdc"><div class="user-avatar-small svelte-1m3dwdc"> </div> </td><td class="svelte-1m3dwdc"><span> </span></td><td class="actions-cell svelte-1m3dwdc"><div class="action-group svelte-1m3dwdc"><button class="action-btn edit svelte-1m3dwdc" title="Edit"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-1m3dwdc"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" class="svelte-1m3dwdc"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" class="svelte-1m3dwdc"></path></svg></button> <button class="action-btn delete svelte-1m3dwdc" title="Delete"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-1m3dwdc"><polyline points="3 6 5 6 21 6" class="svelte-1m3dwdc"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" class="svelte-1m3dwdc"></path></svg></button></div></td></tr>`);
var root_6 = from_html(`<div class="users-grid mobile-only svelte-1m3dwdc"></div> <div class="users-card desktop-only svelte-1m3dwdc"><div class="table-container svelte-1m3dwdc"><table class="users-table svelte-1m3dwdc"><thead class="svelte-1m3dwdc"><tr class="svelte-1m3dwdc"><th class="svelte-1m3dwdc">Username</th><th class="svelte-1m3dwdc">Role</th><th class="actions-cell svelte-1m3dwdc">Actions</th></tr></thead><tbody class="svelte-1m3dwdc"></tbody></table></div></div>`, 1);
var root_10 = from_html(`<p class="field-note svelte-1m3dwdc">Username cannot be changed.</p>`);
var root_9 = from_html(`<form class="modal-form svelte-1m3dwdc"><div class="form-group svelte-1m3dwdc"><label for="username" class="svelte-1m3dwdc">Username</label> <input type="text" id="username" placeholder="e.g. johndoe" required="" class="svelte-1m3dwdc"/> <!></div> <div class="form-group svelte-1m3dwdc"><label for="password" class="svelte-1m3dwdc"> </label> <input type="password" id="password" placeholder="••••••••" class="svelte-1m3dwdc"/></div> <div class="form-group checkbox-group svelte-1m3dwdc"><label class="checkbox-label svelte-1m3dwdc"><input type="checkbox" class="svelte-1m3dwdc"/> <span class="svelte-1m3dwdc">Administrator Privileges</span></label> <p class="field-note svelte-1m3dwdc">Admins can manage servers and other users.</p></div> <div class="form-actions svelte-1m3dwdc"><button type="button" class="secondary-button svelte-1m3dwdc">Cancel</button> <button type="submit" class="primary-button svelte-1m3dwdc"> </button></div></form>`);
var root = from_html(`<div class="page-header svelte-1m3dwdc"><div class="svelte-1m3dwdc"><h1 class="svelte-1m3dwdc">Users</h1> <p class="subtitle svelte-1m3dwdc">Manage system users and permissions.</p></div> <button class="primary-button svelte-1m3dwdc"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" class="svelte-1m3dwdc"><line x1="12" y1="5" x2="12" y2="19" class="svelte-1m3dwdc"></line><line x1="5" y1="12" x2="19" y2="12" class="svelte-1m3dwdc"></line></svg> Add User</button></div> <!> <!> <div class="users-container svelte-1m3dwdc"><!></div> <!>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	const adminService = getAdminService();
	let users = state(proxy([]));
	let isLoading = state(true);
	let error = state(null);
	let successMessage = state(null);
	let isCreateModalOpen = state(false);
	let isEditModalOpen = state(false);
	let currentUser = state(proxy({
		username: "",
		is_admin: false,
		password: ""
	}));
	let editingUsername = state("");
	let isActionLoading = state(false);
	async function loadUsers() {
		set(isLoading, true);
		try {
			set(users, await adminService.getUsers(), true);
		} catch (err) {
			set(error, "Failed to load users");
		} finally {
			set(isLoading, false);
		}
	}
	onMount(loadUsers);
	function openCreateModal() {
		set(currentUser, {
			username: "",
			is_admin: false,
			password: ""
		}, true);
		set(isCreateModalOpen, true);
	}
	function openEditModal(user) {
		set(editingUsername, user.username, true);
		set(currentUser, {
			...user,
			password: ""
		}, true);
		set(isEditModalOpen, true);
	}
	async function handleCreate() {
		set(isActionLoading, true);
		try {
			await adminService.createUser(get(currentUser));
			await loadUsers();
			set(isCreateModalOpen, false);
			showSuccess("User created successfully");
		} catch (err) {
			set(error, "Failed to create user");
		} finally {
			set(isActionLoading, false);
		}
	}
	async function handleUpdate() {
		set(isActionLoading, true);
		try {
			await adminService.updateUser(get(currentUser));
			await loadUsers();
			set(isEditModalOpen, false);
			showSuccess("User updated successfully");
		} catch (err) {
			set(error, "Failed to update user");
		} finally {
			set(isActionLoading, false);
		}
	}
	async function handleDelete(username) {
		if (!confirm(`Are you sure you want to delete user ${username}?`)) return;
		set(isActionLoading, true);
		try {
			await adminService.deleteUser(username);
			await loadUsers();
			showSuccess("User deleted");
		} catch (err) {
			set(error, "Failed to delete user");
		} finally {
			set(isActionLoading, false);
		}
	}
	function showSuccess(msg) {
		set(successMessage, msg, true);
		setTimeout(() => set(successMessage, null), 3e3);
	}
	var fragment = root();
	var div = first_child(fragment);
	var button = sibling(child(div), 2);
	reset(div);
	var node = sibling(div, 2);
	var consequent = ($$anchor) => {
		var div_1 = root_1();
		var text = child(div_1);
		var button_1 = sibling(text);
		reset(div_1);
		template_effect(() => set_text(text, `${get(error) ?? ""} `));
		delegated("click", button_1, () => set(error, null));
		append($$anchor, div_1);
	};
	if_block(node, ($$render) => {
		if (get(error)) $$render(consequent);
	});
	var node_1 = sibling(node, 2);
	var consequent_1 = ($$anchor) => {
		var div_2 = root_2();
		var text_1 = child(div_2, true);
		reset(div_2);
		template_effect(() => set_text(text_1, get(successMessage)));
		append($$anchor, div_2);
	};
	if_block(node_1, ($$render) => {
		if (get(successMessage)) $$render(consequent_1);
	});
	var div_3 = sibling(node_1, 2);
	var node_2 = child(div_3);
	var consequent_2 = ($$anchor) => {
		var div_4 = root_3();
		each(div_4, 20, () => Array(3), index, ($$anchor, _) => {
			append($$anchor, root_4());
		});
		reset(div_4);
		append($$anchor, div_4);
	};
	var consequent_3 = ($$anchor) => {
		append($$anchor, root_5());
	};
	var alternate = ($$anchor) => {
		var fragment_1 = root_6();
		var div_7 = first_child(fragment_1);
		each(div_7, 21, () => get(users), index, ($$anchor, user) => {
			UserCard($$anchor, {
				get user() {
					return get(user);
				},
				onedit: () => openEditModal(get(user)),
				ondelete: () => handleDelete(get(user).username)
			});
		});
		reset(div_7);
		var div_8 = sibling(div_7, 2);
		var div_9 = child(div_8);
		var table = child(div_9);
		var tbody = sibling(child(table));
		each(tbody, 21, () => get(users), index, ($$anchor, user) => {
			var tr = root_8();
			var td = child(tr);
			var div_10 = child(td);
			var text_2 = child(div_10, true);
			reset(div_10);
			var text_3 = sibling(div_10);
			reset(td);
			var td_1 = sibling(td);
			var span = child(td_1);
			let classes;
			var text_4 = child(span, true);
			reset(span);
			reset(td_1);
			var td_2 = sibling(td_1);
			var div_11 = child(td_2);
			var button_2 = child(div_11);
			var button_3 = sibling(button_2, 2);
			reset(div_11);
			reset(td_2);
			reset(tr);
			template_effect(($0) => {
				set_text(text_2, $0);
				set_text(text_3, ` ${get(user).username ?? ""}`);
				classes = set_class(span, 1, "badge svelte-1m3dwdc", null, classes, { admin: get(user).is_admin });
				set_text(text_4, get(user).is_admin ? "Admin" : "User");
			}, [() => get(user).username.charAt(0).toUpperCase()]);
			delegated("click", button_2, () => openEditModal(get(user)));
			delegated("click", button_3, () => handleDelete(get(user).username));
			append($$anchor, tr);
		});
		reset(tbody);
		reset(table);
		reset(div_9);
		reset(div_8);
		append($$anchor, fragment_1);
	};
	if_block(node_2, ($$render) => {
		if (get(isLoading)) $$render(consequent_2);
		else if (get(users).length === 0) $$render(consequent_3, 1);
		else $$render(alternate, -1);
	});
	reset(div_3);
	var node_3 = sibling(div_3, 2);
	{
		let $0 = user_derived(() => get(isCreateModalOpen) || get(isEditModalOpen));
		let $1 = user_derived(() => get(isCreateModalOpen) ? "Add New User" : "Edit User");
		Modal(node_3, {
			get isOpen() {
				return get($0);
			},
			get title() {
				return get($1);
			},
			onclose: () => {
				set(isCreateModalOpen, false);
				set(isEditModalOpen, false);
			},
			children: ($$anchor, $$slotProps) => {
				var form = root_9();
				var div_12 = child(form);
				var input = sibling(child(div_12), 2);
				remove_input_defaults(input);
				var node_4 = sibling(input, 2);
				var consequent_4 = ($$anchor) => {
					append($$anchor, root_10());
				};
				if_block(node_4, ($$render) => {
					if (get(isEditModalOpen)) $$render(consequent_4);
				});
				reset(div_12);
				var div_13 = sibling(div_12, 2);
				var label = child(div_13);
				var text_5 = child(label, true);
				reset(label);
				var input_1 = sibling(label, 2);
				remove_input_defaults(input_1);
				reset(div_13);
				var div_14 = sibling(div_13, 2);
				var label_1 = child(div_14);
				var input_2 = child(label_1);
				remove_input_defaults(input_2);
				next(2);
				reset(label_1);
				next(2);
				reset(div_14);
				var div_15 = sibling(div_14, 2);
				var button_4 = child(div_15);
				var button_5 = sibling(button_4, 2);
				var text_6 = child(button_5, true);
				reset(button_5);
				reset(div_15);
				reset(form);
				template_effect(() => {
					input.disabled = get(isActionLoading) || get(isEditModalOpen);
					set_text(text_5, get(isEditModalOpen) ? "New Password (leave blank to keep current)" : "Password");
					input_1.required = get(isCreateModalOpen);
					input_1.disabled = get(isActionLoading);
					input_2.disabled = get(isActionLoading);
					button_5.disabled = get(isActionLoading);
					set_text(text_6, get(isActionLoading) ? "Saving..." : get(isCreateModalOpen) ? "Create User" : "Save Changes");
				});
				event("submit", form, (e) => {
					e.preventDefault();
					get(isCreateModalOpen) ? handleCreate() : handleUpdate();
				});
				bind_value(input, () => get(currentUser).username, ($$value) => get(currentUser).username = $$value);
				bind_value(input_1, () => get(currentUser).password, ($$value) => get(currentUser).password = $$value);
				bind_checked(input_2, () => get(currentUser).is_admin, ($$value) => get(currentUser).is_admin = $$value);
				delegated("click", button_4, () => {
					set(isCreateModalOpen, false);
					set(isEditModalOpen, false);
				});
				append($$anchor, form);
			},
			$$slots: { default: true }
		});
	}
	delegated("click", button, openCreateModal);
	append($$anchor, fragment);
	pop();
}
delegate(["click"]);
//#endregion
export { _page as component };
