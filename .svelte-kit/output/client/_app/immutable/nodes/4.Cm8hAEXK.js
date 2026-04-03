import { B as proxy, C as from_html, D as delegated, E as delegate, H as state, K as pop, L as child, N as template_effect, O as event, R as first_child, S as comment, U as user_derived, V as set, X as next, Z as reset, _ as each, b as set_text, f as set_style, g as snippet, i as prop, k as get, n as onMount, o as bind_this, p as set_class, q as push, v as index, w as from_svg, x as append, y as if_block, z as sibling } from "../chunks/DohVbzTv.js";
import "../chunks/BJgEf1bw.js";
import { i as getServerService, r as getHealthService, t as getAdminService } from "../chunks/BNTimwTx.js";
import { t as authState } from "../chunks/B2l_R2eB.js";
//#region src/lib/components/dashboard/StatCard.svelte
var root_1$1 = from_html(`<div class="value-spinner svelte-14oot77"></div>`);
var root_2$2 = from_html(`<p class="stat-number svelte-14oot77"> </p>`);
var root$2 = from_html(`<div class="stat-card svelte-14oot77" role="presentation"><div class="ripple-effect svelte-14oot77"></div> <div><!></div> <div class="stat-info svelte-14oot77"><h3 class="svelte-14oot77"> </h3> <!></div></div>`);
function StatCard($$anchor, $$props) {
	let colorClass = prop($$props, "colorClass", 3, "users"), loading = prop($$props, "loading", 3, false);
	let cardRef;
	let mouseX = state(0);
	let mouseY = state(0);
	let opacity = state(0);
	function handleMouseMove(e) {
		if (!cardRef) return;
		const rect = cardRef.getBoundingClientRect();
		set(mouseX, e.clientX - rect.left);
		set(mouseY, e.clientY - rect.top);
		set(opacity, 1);
	}
	function handleMouseLeave() {
		set(opacity, 0);
	}
	var div = root$2();
	var div_1 = child(div);
	var div_2 = sibling(div_1, 2);
	snippet(child(div_2), () => $$props.icon);
	reset(div_2);
	var div_3 = sibling(div_2, 2);
	var h3 = child(div_3);
	var text = child(h3, true);
	reset(h3);
	var node_1 = sibling(h3, 2);
	var consequent = ($$anchor) => {
		append($$anchor, root_1$1());
	};
	var alternate = ($$anchor) => {
		var p = root_2$2();
		var text_1 = child(p, true);
		reset(p);
		template_effect(() => set_text(text_1, $$props.value));
		append($$anchor, p);
	};
	if_block(node_1, ($$render) => {
		if (loading()) $$render(consequent);
		else $$render(alternate, -1);
	});
	reset(div_3);
	reset(div);
	bind_this(div, ($$value) => cardRef = $$value, () => cardRef);
	template_effect(() => {
		set_style(div_1, `
      background: radial-gradient(600px circle at ${get(mouseX) ?? ""}px ${get(mouseY) ?? ""}px, rgba(255,255,255,0.06), transparent 40%);
      opacity: ${get(opacity) ?? ""};
    `);
		set_class(div_2, 1, `stat-icon ${colorClass() ?? ""}`, "svelte-14oot77");
		set_text(text, $$props.title);
	});
	delegated("mousemove", div, handleMouseMove);
	event("mouseleave", div, handleMouseLeave);
	append($$anchor, div);
}
delegate(["mousemove"]);
//#endregion
//#region src/lib/components/dashboard/HealthStatusList.svelte
var root_2$1 = from_html(`<div class="service-skeleton svelte-fnnae3"></div>`);
var root_5 = from_html(`<div class="latency svelte-fnnae3"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" class="svelte-fnnae3"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" class="svelte-fnnae3"></polyline></svg> </div>`);
var root_6 = from_html(`<div class="service-message svelte-fnnae3"> </div>`);
var root_4 = from_html(`<div class="service-item svelte-fnnae3"><div class="service-main svelte-fnnae3"><div class="status-indicator svelte-fnnae3"><div class="status-pulse svelte-fnnae3"></div></div> <div class="service-info svelte-fnnae3"><span class="service-name svelte-fnnae3"> </span> <span class="service-url svelte-fnnae3"> </span></div></div> <div class="service-meta svelte-fnnae3"><!> <div class="status-text svelte-fnnae3"> </div></div> <!></div>`);
var root$1 = from_html(`<div class="health-container svelte-fnnae3"><div class="health-header svelte-fnnae3"><h2 class="svelte-fnnae3">Service Dependencies</h2> <span class="count svelte-fnnae3"> </span></div> <div class="services-grid svelte-fnnae3"><!></div></div>`);
function HealthStatusList($$anchor, $$props) {
	let services = prop($$props, "services", 19, () => ({})), loading = prop($$props, "loading", 3, false);
	const servicesList = user_derived(() => Object.values(services()));
	function getStatusColor(status) {
		switch (status) {
			case "UP": return "var(--status-up, #10b981)";
			case "DOWN": return "var(--status-down, #ef4444)";
			case "DEGRADED": return "var(--status-degraded, #f59e0b)";
			case "STARTING": return "var(--status-starting, #3b82f6)";
			default: return "var(--status-unknown, #9ca3af)";
		}
	}
	var div = root$1();
	var div_1 = child(div);
	var span = sibling(child(div_1), 2);
	var text = child(span);
	reset(span);
	reset(div_1);
	var div_2 = sibling(div_1, 2);
	var node = child(div_2);
	var consequent = ($$anchor) => {
		var fragment = comment();
		each(first_child(fragment), 16, () => Array(3), index, ($$anchor, _) => {
			append($$anchor, root_2$1());
		});
		append($$anchor, fragment);
	};
	var alternate = ($$anchor) => {
		var fragment_1 = comment();
		each(first_child(fragment_1), 17, () => get(servicesList), index, ($$anchor, service) => {
			var div_4 = root_4();
			var div_5 = child(div_4);
			var div_6 = child(div_5);
			var div_7 = child(div_6);
			reset(div_6);
			var div_8 = sibling(div_6, 2);
			var span_1 = child(div_8);
			var text_1 = child(span_1, true);
			reset(span_1);
			var span_2 = sibling(span_1, 2);
			var text_2 = child(span_2, true);
			reset(span_2);
			reset(div_8);
			reset(div_5);
			var div_9 = sibling(div_5, 2);
			var node_3 = child(div_9);
			var consequent_1 = ($$anchor) => {
				var div_10 = root_5();
				var text_3 = sibling(child(div_10));
				reset(div_10);
				template_effect(() => set_text(text_3, ` ${get(service).latency_ms ?? ""}ms`));
				append($$anchor, div_10);
			};
			if_block(node_3, ($$render) => {
				if (get(service).latency_ms !== null) $$render(consequent_1);
			});
			var div_11 = sibling(node_3, 2);
			var text_4 = child(div_11, true);
			reset(div_11);
			reset(div_9);
			var node_4 = sibling(div_9, 2);
			var consequent_2 = ($$anchor) => {
				var div_12 = root_6();
				var text_5 = child(div_12, true);
				reset(div_12);
				template_effect(() => set_text(text_5, get(service).message));
				append($$anchor, div_12);
			};
			if_block(node_4, ($$render) => {
				if (get(service).message) $$render(consequent_2);
			});
			reset(div_4);
			template_effect(($0, $1, $2) => {
				set_style(div_6, `background: ${$0 ?? ""}`);
				set_style(div_7, `background: ${$1 ?? ""}`);
				set_text(text_1, get(service).name);
				set_text(text_2, get(service).url);
				set_style(div_11, `color: ${$2 ?? ""}`);
				set_text(text_4, get(service).status);
			}, [
				() => getStatusColor(get(service).status),
				() => getStatusColor(get(service).status),
				() => getStatusColor(get(service).status)
			]);
			append($$anchor, div_4);
		});
		append($$anchor, fragment_1);
	};
	if_block(node, ($$render) => {
		if (loading()) $$render(consequent);
		else $$render(alternate, -1);
	});
	reset(div_2);
	reset(div);
	template_effect(() => set_text(text, `${get(servicesList).length ?? ""} monitored`));
	append($$anchor, div);
}
//#endregion
//#region src/routes/dashboard/+page.svelte
var root_1 = from_svg(`<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`);
var root_2 = from_svg(`<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`);
var root_3 = from_svg(`<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`);
var root = from_html(`<div class="dashboard-header-row svelte-x1i5gj"><h1 class="svelte-x1i5gj">Dashboard</h1> <p class="welcome-text svelte-x1i5gj">Welcome back, <strong> </strong>!</p></div> <div class="overview-grid svelte-x1i5gj"><!> <!> <!></div> <!>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	const adminService = getAdminService();
	const serverService = getServerService();
	const healthService = getHealthService();
	let userCount = state(0);
	let serverCount = state(0);
	let systemHealth = state("UNKNOWN");
	let servicesHealth = state(proxy({}));
	let isLoading = state(true);
	const healthColorMap = {
		"UP": "health-up",
		"DOWN": "health-down",
		"DEGRADED": "health-degraded",
		"STARTING": "health-starting",
		"UNKNOWN": "health-unknown"
	};
	onMount(async () => {
		const [users, servers, health] = await Promise.all([
			adminService.getUsers(),
			serverService.getServers(),
			healthService.getHealth()
		]);
		set(userCount, users.length, true);
		set(serverCount, servers.length, true);
		set(systemHealth, health.status, true);
		set(servicesHealth, health.services, true);
		set(isLoading, false);
	});
	var fragment = root();
	var div = first_child(fragment);
	var p = sibling(child(div), 2);
	var strong = sibling(child(p));
	var text = child(strong, true);
	reset(strong);
	next();
	reset(p);
	reset(div);
	var div_1 = sibling(div, 2);
	var node = child(div_1);
	{
		const icon = ($$anchor) => {
			append($$anchor, root_1());
		};
		StatCard(node, {
			title: "Total Users",
			get value() {
				return get(userCount);
			},
			colorClass: "users",
			get loading() {
				return get(isLoading);
			},
			icon,
			$$slots: { icon: true }
		});
	}
	var node_1 = sibling(node, 2);
	{
		const icon = ($$anchor) => {
			append($$anchor, root_2());
		};
		StatCard(node_1, {
			title: "Active Servers",
			get value() {
				return get(serverCount);
			},
			colorClass: "servers",
			get loading() {
				return get(isLoading);
			},
			icon,
			$$slots: { icon: true }
		});
	}
	var node_2 = sibling(node_1, 2);
	{
		const icon = ($$anchor) => {
			append($$anchor, root_3());
		};
		let $0 = user_derived(() => healthColorMap[get(systemHealth)] || "health-unknown");
		StatCard(node_2, {
			title: "System Health",
			get value() {
				return get(systemHealth);
			},
			get colorClass() {
				return get($0);
			},
			get loading() {
				return get(isLoading);
			},
			icon,
			$$slots: { icon: true }
		});
	}
	reset(div_1);
	HealthStatusList(sibling(div_1, 2), {
		get services() {
			return get(servicesHealth);
		},
		get loading() {
			return get(isLoading);
		}
	});
	template_effect(() => set_text(text, authState.user?.username ?? "User"));
	append($$anchor, fragment);
	pop();
}
//#endregion
export { _page as component };
