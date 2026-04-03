//#region \0virtual:env/static/private
/** @type {import('$env/static/private').BACKEND_API_URL} */
var BACKEND_API_URL = "http://localhost:2000";
//#endregion
//#region src/routes/+layout.server.ts
var load = async ({ fetch }) => {
	try {
		const response = await fetch(`${BACKEND_API_URL}/auth/me`);
		if (response.ok) return { user: await response.json() };
	} catch (error) {
		console.error("Server-side auth check failed:", error);
	}
	return { user: null };
};
//#endregion
export { load };
