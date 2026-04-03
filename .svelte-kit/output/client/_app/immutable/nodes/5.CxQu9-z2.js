import { B as proxy, C as from_html, D as delegated, E as delegate, H as state, K as pop, L as child, N as template_effect, O as event, R as first_child, S as comment, U as user_derived, V as set, Z as reset, _ as each, b as set_text, c as bind_value, d as bind_select_value, k as get, l as remove_input_defaults, n as onMount, p as set_class, q as push, v as index, x as append, y as if_block, z as sibling } from "../chunks/DohVbzTv.js";
import "../chunks/BJgEf1bw.js";
import { i as getServerService } from "../chunks/BNTimwTx.js";
import { t as Modal } from "../chunks/Cq5zVEV_.js";
//#region src/lib/components/dashboard/ServerCard.svelte
var root$1 = from_html(`<div class="server-card svelte-ldnpbc"><div class="card-header svelte-ldnpbc"><div class="server-icon svelte-ldnpbc"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg></div> <div class="server-name svelte-ldnpbc"><h3 class="svelte-ldnpbc"> </h3></div></div> <div class="card-body svelte-ldnpbc"><div class="info-row svelte-ldnpbc"><span class="label svelte-ldnpbc">Port</span> <code class="svelte-ldnpbc"> </code></div> <div class="info-row svelte-ldnpbc"><span class="label svelte-ldnpbc">Protocol</span> <span class="badge svelte-ldnpbc"> </span></div></div> <div class="card-actions svelte-ldnpbc"><button class="action-btn access svelte-ldnpbc" title="Access Status"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span>Status</span></button> <div class="secondary-actions svelte-ldnpbc"><button class="action-btn edit svelte-ldnpbc" title="Edit"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button> <button class="action-btn delete svelte-ldnpbc" title="Delete"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></div></div>`);
function ServerCard($$anchor, $$props) {
	push($$props, true);
	var div = root$1();
	var div_1 = child(div);
	var div_2 = sibling(child(div_1), 2);
	var h3 = child(div_2);
	var text = child(h3, true);
	reset(h3);
	reset(div_2);
	reset(div_1);
	var div_3 = sibling(div_1, 2);
	var div_4 = child(div_3);
	var code = sibling(child(div_4), 2);
	var text_1 = child(code, true);
	reset(code);
	reset(div_4);
	var div_5 = sibling(div_4, 2);
	var span = sibling(child(div_5), 2);
	var text_2 = child(span, true);
	reset(span);
	reset(div_5);
	reset(div_3);
	var div_6 = sibling(div_3, 2);
	var button = child(div_6);
	var div_7 = sibling(button, 2);
	var button_1 = child(div_7);
	var button_2 = sibling(button_1, 2);
	reset(div_7);
	reset(div_6);
	reset(div);
	template_effect(() => {
		set_text(text, $$props.server.servername);
		set_text(text_1, $$props.server.port);
		set_text(text_2, $$props.server.protocol);
	});
	delegated("click", button, function(...$$args) {
		$$props.onaccess?.apply(this, $$args);
	});
	delegated("click", button_1, function(...$$args) {
		$$props.onedit?.apply(this, $$args);
	});
	delegated("click", button_2, function(...$$args) {
		$$props.ondelete?.apply(this, $$args);
	});
	append($$anchor, div);
	pop();
}
delegate(["click"]);
//#endregion
//#region src/routes/dashboard/servers/+page.svelte
var root_1 = from_html(`<div class="banner error svelte-ue5lhs"> <button class="svelte-ue5lhs">&times;</button></div>`);
var root_2 = from_html(`<div class="banner success svelte-ue5lhs"> </div>`);
var root_4 = from_html(`<div class="card-skeleton svelte-ue5lhs"></div>`);
var root_3 = from_html(`<div class="loading-grid svelte-ue5lhs"></div>`);
var root_5 = from_html(`<div class="empty-state svelte-ue5lhs"><p class="svelte-ue5lhs">No servers found. Add your first server to get started.</p></div>`);
var root_8 = from_html(`<tr class="svelte-ue5lhs"><td class="name-cell svelte-ue5lhs"><div class="server-icon svelte-ue5lhs"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" class="svelte-ue5lhs"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2" class="svelte-ue5lhs"></rect><line x1="6" y1="6" x2="6.01" y2="6" class="svelte-ue5lhs"></line><line x1="6" y1="18" x2="6.01" y2="18" class="svelte-ue5lhs"></line></svg></div> </td><td class="svelte-ue5lhs"><code class="svelte-ue5lhs"> </code></td><td class="svelte-ue5lhs"><span class="badge svelte-ue5lhs"> </span></td><td class="actions-cell svelte-ue5lhs"><div class="action-group svelte-ue5lhs"><button class="action-btn access svelte-ue5lhs" title="Access Status"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" class="svelte-ue5lhs"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" class="svelte-ue5lhs"></path></svg></button> <button class="action-btn edit svelte-ue5lhs" title="Edit"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" class="svelte-ue5lhs"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" class="svelte-ue5lhs"></path></svg></button> <button class="action-btn delete svelte-ue5lhs" title="Delete"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><polyline points="3 6 5 6 21 6" class="svelte-ue5lhs"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" class="svelte-ue5lhs"></path></svg></button></div></td></tr>`);
var root_6 = from_html(`<div class="servers-grid mobile-only svelte-ue5lhs"></div> <div class="servers-card desktop-only svelte-ue5lhs"><div class="table-container svelte-ue5lhs"><table class="servers-table svelte-ue5lhs"><thead class="svelte-ue5lhs"><tr class="svelte-ue5lhs"><th class="svelte-ue5lhs">Server Name</th><th class="svelte-ue5lhs">Port</th><th class="svelte-ue5lhs">Protocol</th><th class="actions-cell svelte-ue5lhs">Actions</th></tr></thead><tbody class="svelte-ue5lhs"></tbody></table></div></div>`, 1);
var root_9 = from_html(`<form class="modal-form svelte-ue5lhs"><div class="form-group svelte-ue5lhs"><label for="servername" class="svelte-ue5lhs">Server Name</label> <input type="text" id="servername" placeholder="e.g. media-server" required="" class="svelte-ue5lhs"/></div> <div class="form-group svelte-ue5lhs"><label for="port" class="svelte-ue5lhs">Port</label> <input type="number" id="port" min="1" max="65535" required="" class="svelte-ue5lhs"/></div> <div class="form-group svelte-ue5lhs"><label for="protocol" class="svelte-ue5lhs">Protocol</label> <select id="protocol" class="svelte-ue5lhs"><option class="svelte-ue5lhs">TCP</option><option class="svelte-ue5lhs">UDP</option><option class="svelte-ue5lhs">TCP/UDP</option></select></div> <div class="form-actions svelte-ue5lhs"><button type="button" class="secondary-button svelte-ue5lhs">Cancel</button> <button type="submit" class="primary-button svelte-ue5lhs"> </button></div></form>`);
var root_12 = from_html(`<div class="info-item svelte-ue5lhs"><label class="svelte-ue5lhs">Expires In</label> <p class="svelte-ue5lhs"> </p></div>`);
var root_11 = from_html(`<div class="access-details svelte-ue5lhs"><div><div class="indicator-dot svelte-ue5lhs"></div> <span class="svelte-ue5lhs"> </span></div> <div class="info-grid svelte-ue5lhs"><div class="info-item svelte-ue5lhs"><label class="svelte-ue5lhs">Target Server</label> <p class="svelte-ue5lhs"> </p></div> <div class="info-item svelte-ue5lhs"><label class="svelte-ue5lhs">Your IP</label> <p class="svelte-ue5lhs"> </p></div> <!></div> <div class="modal-actions-full svelte-ue5lhs"><button class="primary-button full-width svelte-ue5lhs"> </button></div></div>`);
var root_13 = from_html(`<div class="loading-state svelte-ue5lhs"><div class="spinner svelte-ue5lhs"></div> <p class="svelte-ue5lhs">Checking status...</p></div>`);
var root = from_html(`<div class="page-header svelte-ue5lhs"><div class="svelte-ue5lhs"><h1 class="svelte-ue5lhs">Servers</h1> <p class="subtitle svelte-ue5lhs">Manage firewall rules and server access.</p></div> <button class="primary-button svelte-ue5lhs"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><line x1="12" y1="5" x2="12" y2="19" class="svelte-ue5lhs"></line><line x1="5" y1="12" x2="19" y2="12" class="svelte-ue5lhs"></line></svg> Add Server</button></div> <!> <!> <div class="servers-container svelte-ue5lhs"><!></div> <!> <!>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	const serverService = getServerService();
	let servers = state(proxy([]));
	let isLoading = state(true);
	let error = state(null);
	let successMessage = state(null);
	let isCreateModalOpen = state(false);
	let isEditModalOpen = state(false);
	let isAccessModalOpen = state(false);
	let currentServer = state(proxy({
		servername: "",
		port: 8080,
		protocol: "TCP"
	}));
	let editingServerName = state("");
	let accessStatus = state(null);
	let isActionLoading = state(false);
	async function loadServers() {
		set(isLoading, true);
		try {
			set(servers, await serverService.getServers(), true);
		} catch (err) {
			set(error, "Failed to load servers");
		} finally {
			set(isLoading, false);
		}
	}
	onMount(loadServers);
	function openCreateModal() {
		set(currentServer, {
			servername: "",
			port: 8080,
			protocol: "TCP"
		}, true);
		set(isCreateModalOpen, true);
	}
	function openEditModal(server) {
		set(editingServerName, server.servername, true);
		set(currentServer, { ...server }, true);
		set(isEditModalOpen, true);
	}
	async function handleCreate() {
		set(isActionLoading, true);
		try {
			await serverService.createServer(get(currentServer));
			await loadServers();
			set(isCreateModalOpen, false);
			showSuccess("Server created successfully");
		} catch (err) {
			set(error, "Failed to create server");
		} finally {
			set(isActionLoading, false);
		}
	}
	async function handleUpdate() {
		set(isActionLoading, true);
		try {
			await serverService.updateServer(get(editingServerName), get(currentServer));
			await loadServers();
			set(isEditModalOpen, false);
			showSuccess("Server updated successfully");
		} catch (err) {
			set(error, "Failed to update server");
		} finally {
			set(isActionLoading, false);
		}
	}
	async function handleDelete(name) {
		if (!confirm(`Are you sure you want to delete ${name}?`)) return;
		set(isActionLoading, true);
		try {
			await serverService.deleteServer(name);
			await loadServers();
			showSuccess("Server deleted");
		} catch (err) {
			set(error, "Failed to delete server");
		} finally {
			set(isActionLoading, false);
		}
	}
	async function handleRequestAccess(name) {
		set(isActionLoading, true);
		try {
			showSuccess((await serverService.requestAccess(name)).message);
			if (get(isAccessModalOpen)) set(accessStatus, await serverService.checkAccessStatus(name), true);
		} catch (err) {
			set(error, "Failed to request access");
		} finally {
			set(isActionLoading, false);
		}
	}
	async function openAccessModal(name) {
		set(isAccessModalOpen, true);
		set(accessStatus, null);
		try {
			set(accessStatus, await serverService.checkAccessStatus(name), true);
		} catch (err) {
			set(error, "Failed to check access status");
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
		each(div_7, 21, () => get(servers), index, ($$anchor, server) => {
			ServerCard($$anchor, {
				get server() {
					return get(server);
				},
				onaccess: () => openAccessModal(get(server).servername),
				onedit: () => openEditModal(get(server)),
				ondelete: () => handleDelete(get(server).servername)
			});
		});
		reset(div_7);
		var div_8 = sibling(div_7, 2);
		var div_9 = child(div_8);
		var table = child(div_9);
		var tbody = sibling(child(table));
		each(tbody, 21, () => get(servers), index, ($$anchor, server) => {
			var tr = root_8();
			var td = child(tr);
			var text_2 = sibling(child(td));
			reset(td);
			var td_1 = sibling(td);
			var code = child(td_1);
			var text_3 = child(code, true);
			reset(code);
			reset(td_1);
			var td_2 = sibling(td_1);
			var span = child(td_2);
			var text_4 = child(span, true);
			reset(span);
			reset(td_2);
			var td_3 = sibling(td_2);
			var div_10 = child(td_3);
			var button_2 = child(div_10);
			var button_3 = sibling(button_2, 2);
			var button_4 = sibling(button_3, 2);
			reset(div_10);
			reset(td_3);
			reset(tr);
			template_effect(() => {
				set_text(text_2, ` ${get(server).servername ?? ""}`);
				set_text(text_3, get(server).port);
				set_text(text_4, get(server).protocol);
			});
			delegated("click", button_2, () => openAccessModal(get(server).servername));
			delegated("click", button_3, () => openEditModal(get(server)));
			delegated("click", button_4, () => handleDelete(get(server).servername));
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
		else if (get(servers).length === 0) $$render(consequent_3, 1);
		else $$render(alternate, -1);
	});
	reset(div_3);
	var node_3 = sibling(div_3, 2);
	{
		let $0 = user_derived(() => get(isCreateModalOpen) || get(isEditModalOpen));
		let $1 = user_derived(() => get(isCreateModalOpen) ? "Add New Server" : "Edit Server");
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
				var div_11 = child(form);
				var input = sibling(child(div_11), 2);
				remove_input_defaults(input);
				reset(div_11);
				var div_12 = sibling(div_11, 2);
				var input_1 = sibling(child(div_12), 2);
				remove_input_defaults(input_1);
				reset(div_12);
				var div_13 = sibling(div_12, 2);
				var select = sibling(child(div_13), 2);
				var option = child(select);
				option.value = option.__value = "TCP";
				var option_1 = sibling(option);
				option_1.value = option_1.__value = "UDP";
				var option_2 = sibling(option_1);
				option_2.value = option_2.__value = "TCP/UDP";
				reset(select);
				reset(div_13);
				var div_14 = sibling(div_13, 2);
				var button_5 = child(div_14);
				var button_6 = sibling(button_5, 2);
				var text_5 = child(button_6, true);
				reset(button_6);
				reset(div_14);
				reset(form);
				template_effect(() => {
					input.disabled = get(isActionLoading);
					input_1.disabled = get(isActionLoading);
					select.disabled = get(isActionLoading);
					button_6.disabled = get(isActionLoading);
					set_text(text_5, get(isActionLoading) ? "Saving..." : get(isCreateModalOpen) ? "Create Server" : "Save Changes");
				});
				event("submit", form, (e) => {
					e.preventDefault();
					get(isCreateModalOpen) ? handleCreate() : handleUpdate();
				});
				bind_value(input, () => get(currentServer).servername, ($$value) => get(currentServer).servername = $$value);
				bind_value(input_1, () => get(currentServer).port, ($$value) => get(currentServer).port = $$value);
				bind_select_value(select, () => get(currentServer).protocol, ($$value) => get(currentServer).protocol = $$value);
				delegated("click", button_5, () => {
					set(isCreateModalOpen, false);
					set(isEditModalOpen, false);
				});
				append($$anchor, form);
			},
			$$slots: { default: true }
		});
	}
	Modal(sibling(node_3, 2), {
		get isOpen() {
			return get(isAccessModalOpen);
		},
		title: "Access Status",
		onclose: () => set(isAccessModalOpen, false),
		children: ($$anchor, $$slotProps) => {
			var fragment_3 = comment();
			var node_5 = first_child(fragment_3);
			var consequent_5 = ($$anchor) => {
				var div_15 = root_11();
				var div_16 = child(div_15);
				let classes;
				var span_1 = sibling(child(div_16), 2);
				var text_6 = child(span_1, true);
				reset(span_1);
				reset(div_16);
				var div_17 = sibling(div_16, 2);
				var div_18 = child(div_17);
				var p = sibling(child(div_18), 2);
				var text_7 = child(p, true);
				reset(p);
				reset(div_18);
				var div_19 = sibling(div_18, 2);
				var p_1 = sibling(child(div_19), 2);
				var text_8 = child(p_1, true);
				reset(p_1);
				reset(div_19);
				var node_6 = sibling(div_19, 2);
				var consequent_4 = ($$anchor) => {
					var div_20 = root_12();
					var p_2 = sibling(child(div_20), 2);
					var text_9 = child(p_2, true);
					reset(p_2);
					reset(div_20);
					template_effect(() => set_text(text_9, get(accessStatus).time_remaining));
					append($$anchor, div_20);
				};
				if_block(node_6, ($$render) => {
					if (get(accessStatus).is_active) $$render(consequent_4);
				});
				reset(div_17);
				var div_21 = sibling(div_17, 2);
				var button_7 = child(div_21);
				var text_10 = child(button_7, true);
				reset(button_7);
				reset(div_21);
				reset(div_15);
				template_effect(() => {
					classes = set_class(div_16, 1, "status-indicator svelte-ue5lhs", null, classes, { active: get(accessStatus).is_active });
					set_text(text_6, get(accessStatus).is_active ? "Access Active" : "No Access");
					set_text(text_7, get(accessStatus).server);
					set_text(text_8, get(accessStatus).ip);
					button_7.disabled = get(isActionLoading);
					set_text(text_10, get(isActionLoading) ? "Processing..." : get(accessStatus).is_active ? "Extend Access" : "Request Access");
				});
				delegated("click", button_7, () => handleRequestAccess(get(accessStatus).server));
				append($$anchor, div_15);
			};
			var alternate_1 = ($$anchor) => {
				append($$anchor, root_13());
			};
			if_block(node_5, ($$render) => {
				if (get(accessStatus)) $$render(consequent_5);
				else $$render(alternate_1, -1);
			});
			append($$anchor, fragment_3);
		},
		$$slots: { default: true }
	});
	delegated("click", button, openCreateModal);
	append($$anchor, fragment);
	pop();
}
delegate(["click"]);
//#endregion
export { _page as component };
