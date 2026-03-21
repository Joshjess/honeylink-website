import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';

/**
 * Stub out optional peer dependencies of sveltekit-superforms adapters.
 * Only the zod4 adapter is used; the rest (valibot, arktype, etc.) are
 * unused but get pulled in by the barrel export in adapters/index.js.
 */
function stubOptionalPeerDeps(): Plugin {
	const optionalDeps = new Set([
		'valibot',
		'@valibot/to-json-schema',
		'arktype',
		'@effect/schema',
		'joi',
		'yup',
		'@vinejs/vine',
		'@sinclair/typebox',
		'superstruct',
		'class-validator',
		'class-transformer'
	]);

	return {
		name: 'stub-optional-peer-deps',
		enforce: 'pre',
		resolveId(source) {
			if (optionalDeps.has(source)) {
				return { id: `\0stub:${source}`, moduleSideEffects: false };
			}
		},
		load(id) {
			if (id.startsWith('\0stub:')) {
				return {
					code: 'export default new Proxy({}, { get: (_, name) => name === "__esModule" ? true : () => {} });',
					syntheticNamedExports: 'default'
				};
			}
		}
	};
}

export default defineConfig({
	plugins: [
		stubOptionalPeerDeps(),
		enhancedImages(),
		tailwindcss(),
		sveltekit()
	]
});
