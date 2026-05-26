import { FORMSPREE_FORM_ID } from '$env/static/private';

interface ContactEmailData {
	name: string;
	email: string;
	company?: string;
	message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
	try {
		const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				company: data.company ?? '',
				message: data.message,
				_subject: `Nieuw contactformulier: ${data.name}`,
				_replyto: data.email
			})
		});

		if (!response.ok) {
			const body = await response.text().catch(() => '');
			console.error('[contact-email] Formspree returned non-OK:', response.status, body);
			return { success: false, error: { status: response.status, body } };
		}

		return { success: true, error: null };
	} catch (err) {
		console.error('[contact-email] Exception while sending:', err);
		return { success: false, error: err };
	}
}
