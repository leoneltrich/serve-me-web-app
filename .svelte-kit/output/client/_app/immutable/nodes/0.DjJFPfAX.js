import { C as from_html, F as user_pre_effect, H as state, I as $window, K as pop, L as child, N as template_effect, O as event, P as user_effect, R as first_child, V as set, X as next, Z as reset, f as set_style, g as snippet, k as get, q as push, x as append, z as sibling } from "../chunks/DohVbzTv.js";
import { t as goto } from "../chunks/8RX006yo.js";
import "../chunks/BJgEf1bw.js";
import { t as page } from "../chunks/DhCOi6OG.js";
import "../chunks/Dydqc8X_.js";
import { a as setAdminService, c as setServerService, o as setAuthService, s as setHealthService } from "../chunks/BNTimwTx.js";
import { t as authState } from "../chunks/B2l_R2eB.js";
//#region \0virtual:env/static/public
/** @type {import('$env/static/public').PUBLIC_API_BASE_URL} */
var PUBLIC_API_BASE_URL = "/api/v1";
//#endregion
//#region src/lib/services/api/fetch-api-client.ts
var FetchApiClient = class {
	baseUrl;
	constructor(baseUrl = PUBLIC_API_BASE_URL) {
		this.baseUrl = baseUrl;
	}
	async post(path, body) {
		try {
			const response = await fetch(`${this.baseUrl}${path}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include"
			});
			return this.handleResponse(response);
		} catch (error) {
			return {
				status: 500,
				error: error instanceof Error ? error.message : "Network connection failed"
			};
		}
	}
	async get(path) {
		try {
			const response = await fetch(`${this.baseUrl}${path}`, {
				method: "GET",
				credentials: "include"
			});
			return this.handleResponse(response);
		} catch (error) {
			return {
				status: 500,
				error: error instanceof Error ? error.message : "Network connection failed"
			};
		}
	}
	async put(path, body) {
		try {
			const response = await fetch(`${this.baseUrl}${path}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include"
			});
			return this.handleResponse(response);
		} catch (error) {
			return {
				status: 500,
				error: error instanceof Error ? error.message : "Network connection failed"
			};
		}
	}
	async delete(path) {
		try {
			const response = await fetch(`${this.baseUrl}${path}`, {
				method: "DELETE",
				credentials: "include"
			});
			return this.handleResponse(response);
		} catch (error) {
			return {
				status: 500,
				error: error instanceof Error ? error.message : "Network connection failed"
			};
		}
	}
	async handleResponse(response) {
		const status = response.status;
		if (!response.ok) {
			let error = response.statusText;
			try {
				const body = await response.json();
				error = body.message || body.error || error;
			} catch {}
			return {
				status,
				error
			};
		}
		try {
			return {
				status,
				data: await response.json()
			};
		} catch {
			return {
				status,
				data: {}
			};
		}
	}
};
//#endregion
//#region src/lib/services/auth/backend-auth.service.ts
var BackendAuthService = class {
	client;
	constructor(client) {
		this.client = client;
	}
	async login(username, password) {
		const response = await this.client.post("/auth/login", {
			username,
			password
		});
		if (response.error || !response.data) throw new Error(response.error || "Authentication failed");
		return {
			...response.data,
			username
		};
	}
	async logout() {
		await this.client.post("/auth/logout", {});
	}
	async getCurrentUser() {
		const response = await this.client.get("/auth/me");
		if (response.status === 200 && response.data) return response.data;
		return null;
	}
};
//#endregion
//#region src/lib/services/auth/backend-admin.service.ts
var BackendAdminService = class {
	client;
	constructor(client) {
		this.client = client;
	}
	async getUsers() {
		const response = await this.client.get("/admin/users");
		if (response.error || !response.data) throw new Error(response.error || "Failed to fetch users");
		return response.data.data;
	}
	async createUser(user) {
		const response = await this.client.post("/admin/users", user);
		if (response.error) throw new Error(response.error);
	}
	async updateUser(user) {
		const response = await this.client.put("/admin/users", user);
		if (response.error) throw new Error(response.error);
	}
	async deleteUser(username) {
		const response = await this.client.delete(`/admin/users/${username}`);
		if (response.error) throw new Error(response.error);
	}
};
//#endregion
//#region src/lib/services/auth/backend-server.service.ts
var BackendServerService = class {
	client;
	constructor(client) {
		this.client = client;
	}
	async getServers() {
		const response = await this.client.get("/admin/servers");
		if (response.error || !response.data) throw new Error(response.error || "Failed to fetch servers");
		return response.data;
	}
	async getServer(name) {
		const response = await this.client.get(`/admin/servers/${name}`);
		if (response.error || !response.data) throw new Error(response.error || "Failed to fetch server");
		return response.data;
	}
	async createServer(server) {
		const response = await this.client.post("/admin/servers", server);
		if (response.error) throw new Error(response.error);
	}
	async updateServer(name, server) {
		const response = await this.client.put(`/admin/servers/${name}`, server);
		if (response.error) throw new Error(response.error);
	}
	async deleteServer(name) {
		const response = await this.client.delete(`/admin/servers/${name}`);
		if (response.error) throw new Error(response.error);
	}
	async requestAccess(serverId) {
		const response = await this.client.post("/users/access", { server_id: serverId });
		if (response.error || !response.data) throw new Error(response.error || "Failed to request access");
		return response.data;
	}
	async checkAccessStatus(server) {
		const response = await this.client.get(`/users/access/${server}/status`);
		if (response.error || !response.data) throw new Error(response.error || "Failed to check access status");
		return response.data;
	}
};
//#endregion
//#region src/lib/services/auth/backend-health.service.ts
var BackendHealthService = class {
	client;
	constructor(client) {
		this.client = client;
	}
	async getHealth() {
		const response = await this.client.get("/health");
		if (response.error || !response.data) throw new Error(response.error || "Failed to fetch system health");
		return response.data;
	}
	async getServicesHealth() {
		const response = await this.client.get("/health/services");
		if (response.error || !response.data) throw new Error(response.error || "Failed to fetch detailed services health");
		return response.data;
	}
};
//#endregion
//#region src/routes/+layout.svelte
var root = from_html(`<div class="ambient-container"><div class="mouse-glow"></div> <div class="ambient-orb orb-1"></div> <div class="ambient-orb orb-2"></div> <div class="ambient-texture"></div></div> <!>`, 1);
function _layout($$anchor, $$props) {
	push($$props, true);
	const apiClient = new FetchApiClient();
	const authService = new BackendAuthService(new FetchApiClient(""));
	const adminService = new BackendAdminService(apiClient);
	const serverService = new BackendServerService(apiClient);
	const healthService = new BackendHealthService(apiClient);
	setAuthService(authService);
	setAdminService(adminService);
	setServerService(serverService);
	setHealthService(healthService);
	user_pre_effect(() => {
		authState.setUser($$props.data.user);
	});
	user_effect(() => {
		const isLoginPage = page.url.pathname === "/login";
		const isRoot = page.url.pathname === "/";
		if (authState.isAuthenticated) {
			if (isLoginPage || isRoot) goto("/dashboard");
		} else if (!isLoginPage) goto("/login");
	});
	let mouseX = state(0);
	let mouseY = state(0);
	function handleMouseMove(e) {
		set(mouseX, e.clientX, true);
		set(mouseY, e.clientY, true);
	}
	var fragment = root();
	event("mousemove", $window, handleMouseMove);
	var div = first_child(fragment);
	var div_1 = child(div);
	next(6);
	reset(div);
	snippet(sibling(div, 2), () => $$props.children);
	template_effect(() => set_style(div_1, `transform: translate(calc(${get(mouseX) ?? ""}px - 50%), calc(${get(mouseY) ?? ""}px - 50%));`));
	append($$anchor, fragment);
	pop();
}
//#endregion
export { _layout as component };
