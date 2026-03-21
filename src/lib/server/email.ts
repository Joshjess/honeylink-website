import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

interface ContactEmailData {
	name: string;
	email: string;
	company?: string;
	message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
	const esc = (s: string) =>
		s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

	try {
		const { error } = await resend.emails.send({
			from: 'HoneyLink Contact <noreply@honeylink.nl>',
			to: 'info@honeylink.nl',
			replyTo: data.email,
			subject: `Nieuw contactformulier: ${data.name}`,
			html: `
				<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #1a1a1a;">Nieuw bericht via honeylink.nl</h2>
					<table style="width: 100%; border-collapse: collapse;">
						<tr><td style="padding: 8px; font-weight: bold;">Naam:</td><td style="padding: 8px;">${esc(data.name)}</td></tr>
						<tr><td style="padding: 8px; font-weight: bold;">E-mail:</td><td style="padding: 8px;">${esc(data.email)}</td></tr>
						<tr><td style="padding: 8px; font-weight: bold;">Bedrijf:</td><td style="padding: 8px;">${esc(data.company ?? '-')}</td></tr>
					</table>
					<h3 style="color: #1a1a1a; margin-top: 24px;">Bericht:</h3>
					<p style="white-space: pre-wrap;">${esc(data.message)}</p>
				</div>
			`
		});
		return { success: !error, error };
	} catch (err) {
		return { success: false, error: err };
	}
}
