import "../../../../chunks/index-server.js";
import {
    E as attr,
    O as escape_html,
    d as slot,
    f as spread_props,
    p as stringify,
    s as ensure_array_like,
    t as attr_class,
    u as sanitize_props
} from "../../../../chunks/server.js";
import { i as getServerService } from "../../../../chunks/context.js";
import {t as Icon} from "../../../../chunks/Icon.js";
import {t as Lock} from "../../../../chunks/lock.js";
import {i as Pencil, n as Trash_2, r as Plus, t as ConfirmationModal} from "../../../../chunks/ConfirmationModal.js";
import {t as Server} from "../../../../chunks/server2.js";
import { t as Modal } from "../../../../chunks/Modal.js";

//#region node_modules/lucide-svelte/dist/icons/shield.svelte
function Shield($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "shield"},
        sanitize_props($$props),
        {
            iconNode: [["path", {"d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]],
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
//#region src/lib/components/dashboard/ServerCard.svelte
function ServerCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { server, onaccess, onedit, ondelete } = $$props;
        $$renderer.push(`<div class="glass-card server-card svelte-ldnpbc"><div class="card-header svelte-ldnpbc"><div class="server-icon svelte-ldnpbc">`);
        Server($$renderer, {size: 20});
        $$renderer.push(`<!----></div> <div class="server-name svelte-ldnpbc"><h3 class="svelte-ldnpbc">${escape_html(server.servername)}</h3></div></div> <div class="card-body svelte-ldnpbc"><div class="info-row svelte-ldnpbc"><span class="label svelte-ldnpbc">Port</span> <code class="svelte-ldnpbc">${escape_html(server.port)}</code></div> <div class="info-row svelte-ldnpbc"><span class="label svelte-ldnpbc">Protocol</span> <span class="badge svelte-ldnpbc">${escape_html(server.protocol)}</span></div></div> <div class="card-actions svelte-ldnpbc"><button class="action-btn action-btn-card btn-access-primary svelte-ldnpbc" title="Access Status">`);
        Lock($$renderer, {size: 18});
        $$renderer.push(`<!----> <span>Status</span></button> <div class="secondary-actions svelte-ldnpbc"><button class="action-btn action-btn-card svelte-ldnpbc" title="Edit">`);
        Pencil($$renderer, {size: 18});
        $$renderer.push(`<!----></button> <button class="action-btn action-btn-card btn-delete svelte-ldnpbc" title="Delete">`);
        Trash_2($$renderer, {size: 18});
        $$renderer.push(`<!----></button></div></div></div>`);
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
        let isDeleteModalOpen = false;
		let currentServer = {
			servername: "",
			port: 8080,
			protocol: "TCP"
		};
        let serverToDelete = null;
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

        function openDeleteModal(name) {
            serverToDelete = name;
            isDeleteModalOpen = true;
        }

        async function handleDelete() {
            if (!serverToDelete) return;
			isActionLoading = true;
			try {
                await serverService.deleteServer(serverToDelete);
				await loadServers();
                isDeleteModalOpen = false;
                serverToDelete = null;
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

        $$renderer.push(`<div class="page-header svelte-ue5lhs"><div class="svelte-ue5lhs"><h1 class="svelte-ue5lhs">Servers</h1> <p class="subtitle svelte-ue5lhs">Manage servers and access to them.</p></div> <button class="primary-button svelte-ue5lhs">`);
        Plus($$renderer, {size: 18});
        $$renderer.push(`<!----> Add Server</button></div> `);
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
                    ondelete: () => openDeleteModal(server.servername)
				});
			}
            $$renderer.push(`<!--]--></div> <div class="glass-list desktop-only svelte-ue5lhs"><div class="table-container svelte-ue5lhs"><table class="servers-table svelte-ue5lhs"><thead class="svelte-ue5lhs"><tr class="svelte-ue5lhs"><th class="svelte-ue5lhs">Server Name</th><th class="svelte-ue5lhs">Port</th><th class="svelte-ue5lhs">Protocol</th><th class="actions-cell svelte-ue5lhs">Actions</th></tr></thead><tbody class="svelte-ue5lhs"><!--[-->`);
			const each_array_2 = ensure_array_like(servers);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let server = each_array_2[$$index_2];
                $$renderer.push(`<tr class="svelte-ue5lhs"><td class="name-cell svelte-ue5lhs"><div class="server-icon svelte-ue5lhs">`);
                Server($$renderer, {size: 16});
                $$renderer.push(`<!----></div> ${escape_html(server.servername)}</td><td class="svelte-ue5lhs"><code class="svelte-ue5lhs">${escape_html(server.port)}</code></td><td class="svelte-ue5lhs"><span class="badge svelte-ue5lhs">${escape_html(server.protocol)}</span></td><td class="actions-cell svelte-ue5lhs"><div class="action-group svelte-ue5lhs"><button class="action-btn action-btn-table btn-access svelte-ue5lhs" title="Access Status">`);
                Shield($$renderer, {size: 16});
                $$renderer.push(`<!----></button> <button class="action-btn action-btn-table svelte-ue5lhs" title="Edit">`);
                Pencil($$renderer, {size: 16});
                $$renderer.push(`<!----></button> <button class="action-btn action-btn-table btn-delete svelte-ue5lhs" title="Delete">`);
                Trash_2($$renderer, {size: 16});
                $$renderer.push(`<!----></button></div></td></tr>`);
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
                $$renderer.push(`</div> <div class="form-actions svelte-ue5lhs"><button type="button" class="modal-btn-cancel svelte-ue5lhs">Cancel</button> <button type="submit" class="primary-button svelte-ue5lhs"${attr("disabled", isActionLoading, true)}>${escape_html(isActionLoading ? "Saving..." : isCreateModalOpen ? "Create Server" : "Save Changes")}</button></div></form>`);
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
        $$renderer.push(`<!----> `);
        ConfirmationModal($$renderer, {
            isOpen: isDeleteModalOpen,
            title: "Delete Server",
            message: `Are you sure you want to delete ${stringify(serverToDelete)}? This action cannot be undone.`,
            confirmLabel: "Delete Server",
            isDanger: true,
            isLoading: isActionLoading,
            onconfirm: handleDelete,
            onclose: () => {
                isDeleteModalOpen = false;
                serverToDelete = null;
            }
        });
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
