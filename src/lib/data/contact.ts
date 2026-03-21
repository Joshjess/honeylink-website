import type { FaqItemData } from '$lib/types';

export interface ContactDetail {
	label: string;
	value: string;
	href?: string;
	icon: 'phone' | 'email' | 'address' | 'kvk' | 'btw';
}

export const contactDetails: ContactDetail[] = [
	{ label: 'Bel Ons', value: '020 308 68 40', href: 'tel:+31203086840', icon: 'phone' },
	{ label: 'E-mail', value: 'info@honeylink.nl', href: 'mailto:info@honeylink.nl', icon: 'email' },
	{ label: 'Adres', value: 'Marco Polostraat 275-3, 1056DN Amsterdam', icon: 'address' },
	{ label: 'KvK', value: '96561556', icon: 'kvk' },
	{ label: 'Btw-nummer', value: 'NL005216613B11', icon: 'btw' }
];

export const contactFaqItems: FaqItemData[] = [
	{
		question: 'Wat zijn praktische voorbeelden van diensten die HoneyLink aanbiedt?',
		answer: 'Een automation kan je efficienter laten werken door het vereenvoudigen van administratie en het verbinden van je systemen. Zo kan een ingevuld contactformulier automatisch een klantrecord aanmaken in je CRM, een API-koppeling tussen je webshop en boekhoudsysteem zorgt dat facturen direct worden verwerkt en klanten ontvangen automatisch een follow-up e-mail.\n\nEen chatbot transformeert je klantenservice door 24/7 beschikbaar te zijn voor vragen en ondersteuning. Op maat getraind voor jouw bedrijf, kan de chatbot productadvies geven, bestellingen opvolgen, veelgestelde vragen beantwoorden en klanten ontzorgen bij routinematige problemen.\n\nEen AI-agent helpt bij personeelsplanning (zoals voor een restaurant): analyseer drukke dagen, check beschikbaarheid van personeel en stel automatisch een weekschema op. Interesse? Vraag een gratis intakegesprek aan!'
	},
	{
		question: 'Welke bedrijven hebben baat bij een samenwerking met HoneyLink?',
		answer: 'Elk bedrijf dat repetitieve processen wil automatiseren of slimmer wil werken met AI heeft baat bij HoneyLink. Denk aan MKB-bedrijven die hun administratie willen stroomlijnen, e-commerce bedrijven die hun klantenservice willen opschalen, of dienstverleners die hun offerteproces willen versnellen. Onze oplossingen zijn schaalbaar en worden op maat gemaakt voor jouw specifieke situatie.'
	},
	{
		question: 'Wat kan ik verwachten van een adviesgesprek?',
		answer: 'In een vrijblijvend adviesgesprek van ongeveer 30 minuten bespreken we jouw huidige werkprocessen en identificeren we kansen voor automatisering. We kijken samen naar welke taken veel tijd kosten en hoe die efficienter kunnen. Na het gesprek ontvang je een concreet voorstel met mogelijke oplossingen en een indicatie van de investering.'
	},
	{
		question: 'Hoe ziet de samenwerking eruit nadat ik klant ben geworden bij HoneyLink?',
		answer: 'Na het adviesgesprek stellen we een projectplan op met duidelijke mijlpalen en tijdlijn. Tijdens de implementatie houden we je wekelijks op de hoogte van de voortgang. Na oplevering bieden we ondersteuning en onderhoud zodat alles soepel blijft draaien. Onze kernwaarden zijn vlot, eenvoudig en resultaatgericht -- dat merk je in elke fase van de samenwerking.'
	},
	{
		question: 'Wat is een workflow automation?',
		answer: 'Een workflow automation is het automatisch laten verlopen van een reeks stappen die normaal handmatig worden uitgevoerd. Denk aan het automatisch verwerken van inkomende e-mails, het aanmaken van taken in je projectmanagement tool, of het synchroniseren van data tussen verschillende systemen. Dit bespaart tijd, vermindert fouten en zorgt dat je team zich kan richten op werk dat er echt toe doet.'
	}
];
