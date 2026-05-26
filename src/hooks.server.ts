import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// CSP is handled by SvelteKit's kit.csp config (auto-generates nonces
	// for inline scripts). Only non-CSP security headers are set here.

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	if (event.request.method === 'GET' && !response.headers.has('cache-control')) {
		const contentType = response.headers.get('content-type') ?? '';
		if (contentType.includes('text/html')) {
			response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
		}
	}

	return response;
};
