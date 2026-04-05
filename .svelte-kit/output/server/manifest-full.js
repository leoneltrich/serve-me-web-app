export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
    assets: new Set(["serve-me-logo.svg"]),
    mimeTypes: {".svg": "image/svg+xml"},
	_: {
        client: {
            start: "_app/immutable/entry/start.DdL0rdpE.js",
            app: "_app/immutable/entry/app.CZoHpshs.js",
            imports: ["_app/immutable/entry/start.DdL0rdpE.js", "_app/immutable/chunks/-w2SGnk9.js", "_app/immutable/chunks/Dweq9PLV.js", "_app/immutable/entry/app.CZoHpshs.js", "_app/immutable/chunks/Dweq9PLV.js", "_app/immutable/chunks/DxLN9Q9A.js", "_app/immutable/chunks/v_jBEYI6.js"],
            stylesheets: [],
            fonts: [],
            uses_env_dynamic_public: true
        },
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/dashboard/servers",
				pattern: /^\/dashboard\/servers\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard/users",
				pattern: /^\/dashboard\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
