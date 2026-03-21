import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().min(2, 'Naam is verplicht (min 2 tekens)'),
	email: z.email('Ongeldig e-mailadres'),
	company: z.string().optional(),
	message: z.string().min(10, 'Bericht moet minimaal 10 tekens bevatten')
});

export type ContactFormData = z.infer<typeof contactSchema>;
