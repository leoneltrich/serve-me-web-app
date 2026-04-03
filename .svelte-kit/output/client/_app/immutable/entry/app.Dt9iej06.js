const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.DjJFPfAX.js","../chunks/DohVbzTv.js","../chunks/8RX006yo.js","../chunks/Dydqc8X_.js","../chunks/DhCOi6OG.js","../chunks/BJgEf1bw.js","../chunks/B2l_R2eB.js","../chunks/BNTimwTx.js","../assets/0.BSTmesBm.css","../nodes/1.CHtJKBbs.js","../chunks/ChxmEFMn.js","../nodes/2.BYwycwUp.js","../chunks/UOgxJkq1.js","../assets/2.cTRFx450.css","../nodes/3.Ce8qmcBH.js","../nodes/4.Cm8hAEXK.js","../assets/4.CWTNeni8.css","../nodes/5.CxQu9-z2.js","../chunks/Cq5zVEV_.js","../assets/Modal.BItmsWkE.css","../assets/5.CDOfRlYE.css","../nodes/6.CszhDsHb.js","../assets/6.BJGSlbh7.css","../nodes/7.BT37XKQ0.js","../assets/7.BS5HfOyr.css"])))=>i.map(i=>d[i]);
import { C as from_html, F as user_pre_effect, H as state, K as pop, L as child, N as template_effect, P as user_effect, R as first_child, S as comment, T as text, U as user_derived, V as set, Z as reset, b as set_text, h as component, i as prop, j as tick, k as get, n as onMount, o as bind_this, q as push, r as asClassComponent, x as append, y as if_block, z as sibling } from "../chunks/DohVbzTv.js";
import { t as __vitePreload } from "../chunks/DHFUdhC5.js";
import "../chunks/BJgEf1bw.js";
//#region .svelte-kit/generated/client-optimized/matchers.js
var matchers = {};
//#endregion
//#region .svelte-kit/generated/root.svelte
var root_7 = from_html(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`);
var root = from_html(`<!> <!>`, 1);
function Root($$anchor, $$props) {
	push($$props, true);
	let components = prop($$props, "components", 23, () => []), data_0 = prop($$props, "data_0", 3, null), data_1 = prop($$props, "data_1", 3, null), data_2 = prop($$props, "data_2", 3, null);
	user_pre_effect(() => $$props.stores.page.set($$props.page));
	user_effect(() => {
		$$props.stores;
		$$props.page;
		$$props.constructors;
		components();
		$$props.form;
		data_0();
		data_1();
		data_2();
		$$props.stores.page.notify();
	});
	let mounted = state(false);
	let navigated = state(false);
	let title = state(null);
	onMount(() => {
		const unsubscribe = $$props.stores.page.subscribe(() => {
			if (get(mounted)) {
				set(navigated, true);
				tick().then(() => {
					set(title, document.title || "untitled page", true);
				});
			}
		});
		set(mounted, true);
		return unsubscribe;
	});
	const Pyramid_2 = user_derived(() => $$props.constructors[2]);
	var fragment = root();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor) => {
		const Pyramid_0 = user_derived(() => $$props.constructors[0]);
		var fragment_1 = comment();
		component(first_child(fragment_1), () => get(Pyramid_0), ($$anchor, Pyramid_0_1) => {
			bind_this(Pyramid_0_1($$anchor, {
				get data() {
					return data_0();
				},
				get form() {
					return $$props.form;
				},
				get params() {
					return $$props.page.params;
				},
				children: ($$anchor, $$slotProps) => {
					var fragment_2 = comment();
					var node_2 = first_child(fragment_2);
					var consequent = ($$anchor) => {
						const Pyramid_1 = user_derived(() => $$props.constructors[1]);
						var fragment_3 = comment();
						component(first_child(fragment_3), () => get(Pyramid_1), ($$anchor, Pyramid_1_1) => {
							bind_this(Pyramid_1_1($$anchor, {
								get data() {
									return data_1();
								},
								get form() {
									return $$props.form;
								},
								get params() {
									return $$props.page.params;
								},
								children: ($$anchor, $$slotProps) => {
									var fragment_4 = comment();
									component(first_child(fragment_4), () => get(Pyramid_2), ($$anchor, Pyramid_2_1) => {
										bind_this(Pyramid_2_1($$anchor, {
											get data() {
												return data_2();
											},
											get form() {
												return $$props.form;
											},
											get params() {
												return $$props.page.params;
											}
										}), ($$value) => components()[2] = $$value, () => components()?.[2]);
									});
									append($$anchor, fragment_4);
								},
								$$slots: { default: true }
							}), ($$value) => components()[1] = $$value, () => components()?.[1]);
						});
						append($$anchor, fragment_3);
					};
					var alternate = ($$anchor) => {
						const Pyramid_1 = user_derived(() => $$props.constructors[1]);
						var fragment_5 = comment();
						component(first_child(fragment_5), () => get(Pyramid_1), ($$anchor, Pyramid_1_2) => {
							bind_this(Pyramid_1_2($$anchor, {
								get data() {
									return data_1();
								},
								get form() {
									return $$props.form;
								},
								get params() {
									return $$props.page.params;
								}
							}), ($$value) => components()[1] = $$value, () => components()?.[1]);
						});
						append($$anchor, fragment_5);
					};
					if_block(node_2, ($$render) => {
						if ($$props.constructors[2]) $$render(consequent);
						else $$render(alternate, -1);
					});
					append($$anchor, fragment_2);
				},
				$$slots: { default: true }
			}), ($$value) => components()[0] = $$value, () => components()?.[0]);
		});
		append($$anchor, fragment_1);
	};
	var alternate_1 = ($$anchor) => {
		const Pyramid_0 = user_derived(() => $$props.constructors[0]);
		var fragment_6 = comment();
		component(first_child(fragment_6), () => get(Pyramid_0), ($$anchor, Pyramid_0_2) => {
			bind_this(Pyramid_0_2($$anchor, {
				get data() {
					return data_0();
				},
				get form() {
					return $$props.form;
				},
				get params() {
					return $$props.page.params;
				}
			}), ($$value) => components()[0] = $$value, () => components()?.[0]);
		});
		append($$anchor, fragment_6);
	};
	if_block(node, ($$render) => {
		if ($$props.constructors[1]) $$render(consequent_1);
		else $$render(alternate_1, -1);
	});
	var node_7 = sibling(node, 2);
	var consequent_3 = ($$anchor) => {
		var div = root_7();
		var node_8 = child(div);
		var consequent_2 = ($$anchor) => {
			var text$1 = text();
			template_effect(() => set_text(text$1, get(title)));
			append($$anchor, text$1);
		};
		if_block(node_8, ($$render) => {
			if (get(navigated)) $$render(consequent_2);
		});
		reset(div);
		append($$anchor, div);
	};
	if_block(node_7, ($$render) => {
		if (get(mounted)) $$render(consequent_3);
	});
	append($$anchor, fragment);
	pop();
}
//#endregion
//#region .svelte-kit/generated/root.js
var root_default = asClassComponent(Root);
//#endregion
//#region .svelte-kit/generated/client-optimized/app.js
var nodes = [
	() => __vitePreload(() => import("../nodes/0.DjJFPfAX.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url),
	() => __vitePreload(() => import("../nodes/1.CHtJKBbs.js"), __vite__mapDeps([9,1,4,2,5,10]), import.meta.url),
	() => __vitePreload(() => import("../nodes/2.BYwycwUp.js"), __vite__mapDeps([11,1,2,3,4,5,10,6,7,12,13]), import.meta.url),
	() => __vitePreload(() => import("../nodes/3.Ce8qmcBH.js"), __vite__mapDeps([14,1,5,10]), import.meta.url),
	() => __vitePreload(() => import("../nodes/4.Cm8hAEXK.js"), __vite__mapDeps([15,1,5,6,7,16]), import.meta.url),
	() => __vitePreload(() => import("../nodes/5.CxQu9-z2.js"), __vite__mapDeps([17,1,5,18,19,7,20]), import.meta.url),
	() => __vitePreload(() => import("../nodes/6.CszhDsHb.js"), __vite__mapDeps([21,1,5,18,19,7,22]), import.meta.url),
	() => __vitePreload(() => import("../nodes/7.BT37XKQ0.js"), __vite__mapDeps([23,1,2,3,5,6,7,12,24]), import.meta.url)
];
var server_loads = [0];
var dictionary = {
	"/": [3],
	"/dashboard": [4, [2]],
	"/dashboard/servers": [5, [2]],
	"/dashboard/users": [6, [2]],
	"/login": [7]
};
var hooks = {
	handleError: (({ error }) => {
		console.error(error);
	}),
	reroute: (() => {}),
	transport: {}
};
var decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
var encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));
var hash = false;
var decode = (type, value) => decoders[type](value);
//#endregion
export { decode, decoders, dictionary, encoders, hash, hooks, matchers, nodes, root_default as root, server_loads };
