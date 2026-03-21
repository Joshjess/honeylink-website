import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { contactSchema } from '$lib/schemas/contact';
import { sendContactEmail } from '$lib/server/email';
import type { PageServerLoad, Actions } from './$types';

const limiter = new RateLimiter({
	IP: [5, 'h']
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(contactSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod4(contactSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (await limiter.isLimited(event)) {
			return message(
				form,
				{
					type: 'rate-limit',
					text: 'Te veel verzoeken. Probeer het over een uur opnieuw.'
				},
				{ status: 429 }
			);
		}

		const { name, email, company, message: msg } = form.data;
		const result = await sendContactEmail({ name, email, company, message: msg });

		if (!result.success) {
			return message(
				form,
				{
					type: 'error',
					text: 'Er is iets misgegaan bij het versturen. Probeer het later opnieuw.'
				},
				{ status: 500 }
			);
		}

		return message(form, { type: 'success', text: 'Bedankt voor uw bericht!' });
	}
};
