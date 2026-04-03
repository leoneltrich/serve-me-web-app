import "../../../chunks/index-server.js";
import { b as escape_html, i as ensure_array_like, n as attr_style, o as stringify, r as derived, t as attr_class } from "../../../chunks/server.js";
import { i as getServerService, r as getHealthService, t as getAdminService } from "../../../chunks/context.js";
import { t as authState } from "../../../chunks/auth.state.svelte.js";
//#region src/lib/components/dashboard/StatCard.svelte
function StatCard($$renderer, $$props) {
	let { title, value, icon, colorClass = "users", loading = false } = $$props;
	$$renderer.push(`<div class="stat-card svelte-14oot77" role="presentation"><div class="ripple-effect svelte-14oot77"${attr_style(` background: radial-gradient(600px circle at ${stringify(0)}px ${stringify(0)}px, rgba(255,255,255,0.06), transparent 40%); opacity: ${stringify(0)}; `)}></div> <div${attr_class(`stat-icon ${stringify(colorClass)}`, "svelte-14oot77")}>`);
	icon($$renderer);
	$$renderer.push(`<!----></div> <div class="stat-info svelte-14oot77"><h3 class="svelte-14oot77">${escape_html(title)}</h3> `);
	if (loading) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="value-spinner svelte-14oot77"></div>`);
	} else {
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="stat-number svelte-14oot77">${escape_html(value)}</p>`);
	}
	$$renderer.push(`<!--]--></div></div>`);
}
//#endregion
//#region src/lib/components/dashboard/HealthStatusList.svelte
function HealthStatusList($$renderer, $$props) {
	let { services = {}, loading = false } = $$props;
	const servicesList = derived(() => Object.values(services));
	function getStatusColor(status) {
		switch (status) {
			case "UP": return "var(--status-up, #10b981)";
			case "DOWN": return "var(--status-down, #ef4444)";
			case "DEGRADED": return "var(--status-degraded, #f59e0b)";
			case "STARTING": return "var(--status-starting, #3b82f6)";
			default: return "var(--status-unknown, #9ca3af)";
		}
	}
	$$renderer.push(`<div class="health-container svelte-fnnae3"><div class="health-header svelte-fnnae3"><h2 class="svelte-fnnae3">Service Dependencies</h2> <span class="count svelte-fnnae3">${escape_html(servicesList().length)} monitored</span></div> <div class="services-grid svelte-fnnae3">`);
	if (loading) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<!--[-->`);
		const each_array = ensure_array_like(Array(3));
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			each_array[$$index];
			$$renderer.push(`<div class="service-skeleton svelte-fnnae3"></div>`);
		}
		$$renderer.push(`<!--]-->`);
	} else {
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--[-->`);
		const each_array_1 = ensure_array_like(servicesList());
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let service = each_array_1[$$index_1];
			$$renderer.push(`<div class="service-item svelte-fnnae3"><div class="service-main svelte-fnnae3"><div class="status-indicator svelte-fnnae3"${attr_style(`background: ${stringify(getStatusColor(service.status))}`)}><div class="status-pulse svelte-fnnae3"${attr_style(`background: ${stringify(getStatusColor(service.status))}`)}></div></div> <div class="service-info svelte-fnnae3"><span class="service-name svelte-fnnae3">${escape_html(service.name)}</span> <span class="service-url svelte-fnnae3">${escape_html(service.url)}</span></div></div> <div class="service-meta svelte-fnnae3">`);
			if (service.latency_ms !== null) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="latency svelte-fnnae3"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" class="svelte-fnnae3"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" class="svelte-fnnae3"></polyline></svg> ${escape_html(service.latency_ms)}ms</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="status-text svelte-fnnae3"${attr_style(`color: ${stringify(getStatusColor(service.status))}`)}>${escape_html(service.status)}</div></div> `);
			if (service.message) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="service-message svelte-fnnae3">${escape_html(service.message)}</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
	}
	$$renderer.push(`<!--]--></div></div>`);
}
//#endregion
//#region src/routes/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		getAdminService();
		getServerService();
		getHealthService();
		let userCount = 0;
		let serverCount = 0;
		let systemHealth = "UNKNOWN";
		let servicesHealth = {};
		let isLoading = true;
		const healthColorMap = {
			"UP": "health-up",
			"DOWN": "health-down",
			"DEGRADED": "health-degraded",
			"STARTING": "health-starting",
			"UNKNOWN": "health-unknown"
		};
		$$renderer.push(`<div class="dashboard-header-row svelte-x1i5gj"><h1 class="svelte-x1i5gj">Dashboard</h1> <p class="welcome-text svelte-x1i5gj">Welcome back, <strong>${escape_html(authState.user?.username ?? "User")}</strong>!</p></div> <div class="overview-grid svelte-x1i5gj">`);
		{
			function icon($$renderer) {
				$$renderer.push(`<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`);
			}
			StatCard($$renderer, {
				title: "Total Users",
				value: userCount,
				colorClass: "users",
				loading: isLoading,
				icon,
				$$slots: { icon: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				$$renderer.push(`<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`);
			}
			StatCard($$renderer, {
				title: "Active Servers",
				value: serverCount,
				colorClass: "servers",
				loading: isLoading,
				icon,
				$$slots: { icon: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				$$renderer.push(`<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`);
			}
			StatCard($$renderer, {
				title: "System Health",
				value: systemHealth,
				colorClass: healthColorMap[systemHealth] || "health-unknown",
				loading: isLoading,
				icon,
				$$slots: { icon: true }
			});
		}
		$$renderer.push(`<!----></div> `);
		HealthStatusList($$renderer, {
			services: servicesHealth,
			loading: isLoading
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
