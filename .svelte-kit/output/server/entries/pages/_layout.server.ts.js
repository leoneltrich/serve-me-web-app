//#region src/routes/+layout.server.ts
var load = async ({ fetch }) => {
	try {
        const response = await fetch("/auth/me");
		if (response.ok) return { user: await response.json() };
	} catch (error) {
		console.error("Server-side auth check failed:", error);
	}
	return { user: null };
};
//#endregion
export { load };
