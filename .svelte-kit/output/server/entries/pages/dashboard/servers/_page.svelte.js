import "../../../../chunks/index-server.js";
import { b as escape_html, i as ensure_array_like, t as attr_class, y as attr } from "../../../../chunks/server.js";
import { i as getServerService } from "../../../../chunks/context.js";
import { t as Modal } from "../../../../chunks/Modal.js";
//#region src/lib/components/dashboard/ServerCard.svelte
function ServerCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { server, onaccess, onedit, ondelete } = $$props;
		$$renderer.push(`<div class="server-card svelte-ldnpbc"><div class="card-header svelte-ldnpbc"><div class="server-icon svelte-ldnpbc"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg></div> <div class="server-name svelte-ldnpbc"><h3 class="svelte-ldnpbc">${escape_html(server.servername)}</h3></div></div> <div class="card-body svelte-ldnpbc"><div class="info-row svelte-ldnpbc"><span class="label svelte-ldnpbc">Port</span> <code class="svelte-ldnpbc">${escape_html(server.port)}</code></div> <div class="info-row svelte-ldnpbc"><span class="label svelte-ldnpbc">Protocol</span> <span class="badge svelte-ldnpbc">${escape_html(server.protocol)}</span></div></div> <div class="card-actions svelte-ldnpbc"><button class="action-btn access svelte-ldnpbc" title="Access Status"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span>Status</span></button> <div class="secondary-actions svelte-ldnpbc"><button class="action-btn edit svelte-ldnpbc" title="Edit"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button> <button class="action-btn delete svelte-ldnpbc" title="Delete"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></div></div>`);
	});
}
//#endregion
//#region src/routes/dashboard/servers/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const serverService = getServerService();
		let servers = [];
		let isLoading = true;
		let error = null;
		let successMessage = null;
		let isCreateModalOpen = false;
		let isEditModalOpen = false;
		let isAccessModalOpen = false;
		let currentServer = {
			servername: "",
			port: 8080,
			protocol: "TCP"
		};
		let accessStatus = null;
		let isActionLoading = false;
		async function loadServers() {
			isLoading = true;
			try {
				servers = await serverService.getServers();
			} catch (err) {
				error = "Failed to load servers";
			} finally {
				isLoading = false;
			}
		}
		function openEditModal(server) {
			server.servername;
			currentServer = { ...server };
			isEditModalOpen = true;
		}
		async function handleDelete(name) {
			if (!confirm(`Are you sure you want to delete ${name}?`)) return;
			isActionLoading = true;
			try {
				await serverService.deleteServer(name);
				await loadServers();
				showSuccess("Server deleted");
			} catch (err) {
				error = "Failed to delete server";
			} finally {
				isActionLoading = false;
			}
		}
		async function openAccessModal(name) {
			isAccessModalOpen = true;
			accessStatus = null;
			try {
				accessStatus = await serverService.checkAccessStatus(name);
			} catch (err) {
				error = "Failed to check access status";
			}
		}
		function showSuccess(msg) {
			successMessage = msg;
			setTimeout(() => successMessage = null, 3e3);
		}
		$$renderer.push(`<div class="page-header svelte-ue5lhs"><div class="svelte-ue5lhs"><h1 class="svelte-ue5lhs">Servers</h1> <p class="subtitle svelte-ue5lhs">Manage firewall rules and server access.</p></div> <button class="primary-button svelte-ue5lhs"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><line x1="12" y1="5" x2="12" y2="19" class="svelte-ue5lhs"></line><line x1="5" y1="12" x2="19" y2="12" class="svelte-ue5lhs"></line></svg> Add Server</button></div> `);
		if (error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner error svelte-ue5lhs">${escape_html(error)} <button class="svelte-ue5lhs">×</button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (successMessage) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner success svelte-ue5lhs">${escape_html(successMessage)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="servers-container svelte-ue5lhs">`);
		if (isLoading) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="loading-grid svelte-ue5lhs"><!--[-->`);
			const each_array = ensure_array_like(Array(3));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				each_array[$$index];
				$$renderer.push(`<div class="card-skeleton svelte-ue5lhs"></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (servers.length === 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="empty-state svelte-ue5lhs"><p class="svelte-ue5lhs">No servers found. Add your first server to get started.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="servers-grid mobile-only svelte-ue5lhs"><!--[-->`);
			const each_array_1 = ensure_array_like(servers);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let server = each_array_1[$$index_1];
				ServerCard($$renderer, {
					server,
					onaccess: () => openAccessModal(server.servername),
					onedit: () => openEditModal(server),
					ondelete: () => handleDelete(server.servername)
				});
			}
			$$renderer.push(`<!--]--></div> <div class="servers-card desktop-only svelte-ue5lhs"><div class="table-container svelte-ue5lhs"><table class="servers-table svelte-ue5lhs"><thead class="svelte-ue5lhs"><tr class="svelte-ue5lhs"><th class="svelte-ue5lhs">Server Name</th><th class="svelte-ue5lhs">Port</th><th class="svelte-ue5lhs">Protocol</th><th class="actions-cell svelte-ue5lhs">Actions</th></tr></thead><tbody class="svelte-ue5lhs"><!--[-->`);
			const each_array_2 = ensure_array_like(servers);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let server = each_array_2[$$index_2];
				$$renderer.push(`<tr class="svelte-ue5lhs"><td class="name-cell svelte-ue5lhs"><div class="server-icon svelte-ue5lhs"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" class="svelte-ue5lhs"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2" class="svelte-ue5lhs"></rect><line x1="6" y1="6" x2="6.01" y2="6" class="svelte-ue5lhs"></line><line x1="6" y1="18" x2="6.01" y2="18" class="svelte-ue5lhs"></line></svg></div> ${escape_html(server.servername)}</td><td class="svelte-ue5lhs"><code class="svelte-ue5lhs">${escape_html(server.port)}</code></td><td class="svelte-ue5lhs"><span class="badge svelte-ue5lhs">${escape_html(server.protocol)}</span></td><td class="actions-cell svelte-ue5lhs"><div class="action-group svelte-ue5lhs"><button class="action-btn access svelte-ue5lhs" title="Access Status"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" class="svelte-ue5lhs"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" class="svelte-ue5lhs"></path></svg></button> <button class="action-btn edit svelte-ue5lhs" title="Edit"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" class="svelte-ue5lhs"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" class="svelte-ue5lhs"></path></svg></button> <button class="action-btn delete svelte-ue5lhs" title="Delete"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="svelte-ue5lhs"><polyline points="3 6 5 6 21 6" class="svelte-ue5lhs"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" class="svelte-ue5lhs"></path></svg></button></div></td></tr>`);
			}
			$$renderer.push(`<!--]--></tbody></table></div></div>`);
		}
		$$renderer.push(`<!--]--></div> `);
		Modal($$renderer, {
			isOpen: isCreateModalOpen || isEditModalOpen,
			title: isCreateModalOpen ? "Add New Server" : "Edit Server",
			onclose: () => {
				isCreateModalOpen = false;
				isEditModalOpen = false;
			},
			children: ($$renderer) => {
				$$renderer.push(`<form class="modal-form svelte-ue5lhs"><div class="form-group svelte-ue5lhs"><label for="servername" class="svelte-ue5lhs">Server Name</label> <input type="text" id="servername"${attr("value", currentServer.servername)} placeholder="e.g. media-server" required=""${attr("disabled", isActionLoading, true)} class="svelte-ue5lhs"/></div> <div class="form-group svelte-ue5lhs"><label for="port" class="svelte-ue5lhs">Port</label> <input type="number" id="port"${attr("value", currentServer.port)} min="1" max="65535" required=""${attr("disabled", isActionLoading, true)} class="svelte-ue5lhs"/></div> <div class="form-group svelte-ue5lhs"><label for="protocol" class="svelte-ue5lhs">Protocol</label> `);
				$$renderer.select({
					id: "protocol",
					value: currentServer.protocol,
					disabled: isActionLoading,
					class: ""
				}, ($$renderer) => {
					$$renderer.option({
						value: "TCP",
						class: ""
					}, ($$renderer) => {
						$$renderer.push(`TCP`);
					}, "svelte-ue5lhs");
					$$renderer.option({
						value: "UDP",
						class: ""
					}, ($$renderer) => {
						$$renderer.push(`UDP`);
					}, "svelte-ue5lhs");
					$$renderer.option({
						value: "TCP/UDP",
						class: ""
					}, ($$renderer) => {
						$$renderer.push(`TCP/UDP`);
					}, "svelte-ue5lhs");
				}, "svelte-ue5lhs");
				$$renderer.push(`</div> <div class="form-actions svelte-ue5lhs"><button type="button" class="secondary-button svelte-ue5lhs">Cancel</button> <button type="submit" class="primary-button svelte-ue5lhs"${attr("disabled", isActionLoading, true)}>${escape_html(isActionLoading ? "Saving..." : isCreateModalOpen ? "Create Server" : "Save Changes")}</button></div></form>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Modal($$renderer, {
			isOpen: isAccessModalOpen,
			title: "Access Status",
			onclose: () => isAccessModalOpen = false,
			children: ($$renderer) => {
				if (accessStatus) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="access-details svelte-ue5lhs"><div${attr_class("status-indicator svelte-ue5lhs", void 0, { "active": accessStatus.is_active })}><div class="indicator-dot svelte-ue5lhs"></div> <span class="svelte-ue5lhs">${escape_html(accessStatus.is_active ? "Access Active" : "No Access")}</span></div> <div class="info-grid svelte-ue5lhs"><div class="info-item svelte-ue5lhs"><label class="svelte-ue5lhs">Target Server</label> <p class="svelte-ue5lhs">${escape_html(accessStatus.server)}</p></div> <div class="info-item svelte-ue5lhs"><label class="svelte-ue5lhs">Your IP</label> <p class="svelte-ue5lhs">${escape_html(accessStatus.ip)}</p></div> `);
					if (accessStatus.is_active) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="info-item svelte-ue5lhs"><label class="svelte-ue5lhs">Expires In</label> <p class="svelte-ue5lhs">${escape_html(accessStatus.time_remaining)}</p></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="modal-actions-full svelte-ue5lhs"><button class="primary-button full-width svelte-ue5lhs"${attr("disabled", isActionLoading, true)}>${escape_html(isActionLoading ? "Processing..." : accessStatus.is_active ? "Extend Access" : "Request Access")}</button></div></div>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="loading-state svelte-ue5lhs"><div class="spinner svelte-ue5lhs"></div> <p class="svelte-ue5lhs">Checking status...</p></div>`);
				}
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
