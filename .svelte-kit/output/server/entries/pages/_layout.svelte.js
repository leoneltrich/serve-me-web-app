import {r as public_env} from "../../chunks/shared-server.js";
import {n as attr_style, p as stringify} from "../../chunks/server.js";
import "../../chunks/state.js";
import "../../chunks/navigation.js";
import { a as setAdminService, c as setServerService, o as setAuthService, s as setHealthService } from "../../chunks/context.js";
import "../../chunks/auth.state.svelte.js";
//#region src/lib/services/api/fetch-api-client.ts
var FetchApiClient = class {
	baseUrl;

    constructor(baseUrl = public_env.PUBLIC_API_BASE_URL || "/api/v1") {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
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
//#region src/lib/services/base.service.ts
var BaseService = class {
	client;
	constructor(client) {
		this.client = client;
	}

    /**
     * Performs an API request and handles basic error conditions.
     * @param method The API method to call on the client
     * @param path The API endpoint path
     * @param body Optional request body
     * @param options Configuration for response handling
     */
    async request(method, path, body, options = {unwrapData: false}) {
        const response = await this.client[method](path, body);
        if (response.error) throw new Error(response.error);
        if (response.data === void 0 && response.status !== 204) {
            if (method !== "delete") throw new Error("No data received from server");
        }
        if (options.unwrapData && response.data && typeof response.data === "object" && "data" in response.data) return response.data.data;
        return response.data;
    }

    async get(path, options) {
        return this.request("get", path, void 0, options);
    }

    async post(path, body, options) {
        return this.request("post", path, body, options);
    }

    async put(path, body, options) {
        return this.request("put", path, body, options);
    }

    async delete(path, options) {
        return this.request("delete", path, void 0, options);
    }
};
//#endregion
//#region src/lib/services/auth/backend-auth.service.ts
var BackendAuthService = class extends BaseService {
    constructor(client) {
        super(client);
    }
	async login(username, password) {
        return {
            ...await this.post("/auth/login", {
                username,
                password
            }),
			username
		};
	}
	async logout() {
        await this.post("/auth/logout", {});
	}
	async getCurrentUser() {
        try {
            return await this.get("/auth/me");
        } catch (error) {
            return null;
        }
	}
};
//#endregion
//#region src/lib/services/backend-admin.service.ts
var BackendAdminService = class extends BaseService {
	constructor(client) {
        super(client);
	}
	async getUsers() {
        return this.get("/admin/users", {unwrapData: true});
	}
	async createUser(user) {
        await this.post("/admin/users", user);
	}
	async updateUser(user) {
        await this.put("/admin/users", user);
	}
	async deleteUser(username) {
        await this.delete(`/admin/users/${username}`);
	}
};
//#endregion
//#region src/lib/services/backend-server.service.ts
var BackendServerService = class extends BaseService {
	constructor(client) {
        super(client);
	}
	async getServers() {
        return this.get("/admin/servers");
	}
	async getServer(name) {
        return this.get(`/admin/servers/${name}`);
	}
	async createServer(server) {
        await this.post("/admin/servers", server);
	}
	async updateServer(name, server) {
        await this.put(`/admin/servers/${name}`, server);
	}
	async deleteServer(name) {
        await this.delete(`/admin/servers/${name}`);
	}
	async requestAccess(serverId) {
        return this.post("/users/access", {server_id: serverId});
	}
	async checkAccessStatus(server) {
        return this.get(`/users/access/${server}/status`);
	}
};
//#endregion
//#region src/lib/services/backend-health.service.ts
var BackendHealthService = class extends BaseService {
	constructor(client) {
        super(client);
	}
	async getHealth() {
        return this.get("/health");
	}
	async getServicesHealth() {
        return this.get("/health/services");
	}
};
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, children } = $$props;
        const apiBaseUrl = public_env.PUBLIC_API_BASE_URL || "";
        const isFullUrl = apiBaseUrl.startsWith("http");
        const authApiClient = new FetchApiClient(isFullUrl ? apiBaseUrl : "");
        const apiClient = new FetchApiClient(isFullUrl ? `${apiBaseUrl}/api/v1` : "/api/v1");
        const authService = new BackendAuthService(authApiClient);
		const adminService = new BackendAdminService(apiClient);
		const serverService = new BackendServerService(apiClient);
		const healthService = new BackendHealthService(apiClient);
		setAuthService(authService);
		setAdminService(adminService);
		setServerService(serverService);
		setHealthService(healthService);
		$$renderer.push(`<div class="ambient-container"><div class="mouse-glow"${attr_style(`transform: translate(calc(${stringify(0)}px - 50%), calc(${stringify(0)}px - 50%));`)}></div> <div class="ambient-orb orb-1"></div> <div class="ambient-orb orb-2"></div> <div class="ambient-texture"></div></div> `);
		children($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _layout as default };
