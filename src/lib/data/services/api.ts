import type { ServicePageData } from '$lib/types';

export const pageData: ServicePageData = {
	title: 'API Integratie: Wij koppelen je systemen zonder zorgen',
	subtitle:
		'Moderne bedrijven werken met gemiddeld 12 verschillende softwaretools. Zonder koppelingen betekent dit constant schakelen tussen systemen, dubbel werk en het risico op fouten. Het integreren van deze systemen via API\u2019s lost dit op door je systemen met elkaar te laten praten.',
	sections: [
		{
			heading:
				'Stop met werken in eilandjes. Verbind al je tools tot \u00e9\u00e9n krachtig ecosysteem dat automatisch communiceert.',
			body: 'Denk bijvoorbeeld aan het proces na een online aankoop. Zonder koppelingen moet je handmatig de factuur maken in Exact, de voorraad bijwerken in Shopify en de klant toevoegen aan je nieuwsbrief in Mailchimp. Met onze API-koppeling gebeurt dit allemaal automatisch op het moment dat de klant op \u2018kopen\u2019 klikt. Het resultaat: geen handmatige fouten meer en uren bespaarde tijd per week.',
			type: 'value-proposition'
		},
		{
			heading: 'De Kracht van Verbonden Systemen',
			body: 'Bij HoneyLink bouwen API-koppelingen die toegankelijk zijn voor elk MKB-bedrijf. Of je nu eenvoudig wilt beginnen of je complete werkproces wilt koppelen: wij ontwikkelen oplossingen die perfect aansluiten bij jouw werkwijze.',
			type: 'features',
			items: [
				{
					title: 'Tijdwinst die je direct voelt',
					description:
						'Geen handmatige export en import meer. Geen dubbele invoer. Geen vergeten updates. Je team kan zich focussen op werk dat er echt toe doet.',
					accentColor: 'bg-accent-blue'
				},
				{
					title: 'Actuele informatie, overal',
					description:
						'Een wijziging in je CRM? Direct zichtbaar in je mailcampagnes. Een nieuwe bestelling? Meteen verwerkt in je voorraad \u00e9n boekhouding. Real-time synchronisatie houdt alles up-to-date.',
					accentColor: 'bg-accent-green'
				},
				{
					title: 'Groei zonder groeipijn',
					description:
						'Je bedrijf schaalt op, maar je processen blijven soepel lopen. Nieuwe systemen? We koppelen ze gewoon aan je bestaande infrastructuur.',
					accentColor: 'bg-accent-purple'
				}
			]
		},
		{
			heading: 'Van losse systemen naar \u00e9\u00e9n ge\u00efntegreerd platform',
			body: '',
			type: 'examples',
			items: [
				{
					title: 'Analyse van je software landschap',
					description:
						'We inventariseren welke systemen je gebruikt: van webshop tot boekhouding, van CRM tot planningstools. We identificeren waar handmatige overdracht plaatsvindt en waar automatisering de grootste impact heeft en welke software we met een API kunnen koppelen.'
				},
				{
					title: 'Een slimme API architectuur',
					description:
						'We ontwerpen een slimme koppeling tussen jouw systemen. Orders vanuit Shopify naar Exact, klantdata van HubSpot naar Mailchimp, afspraken uit Calendly naar je facturatiesysteem, allemaal hoe jij het in gedachten had!'
				},
				{
					title: 'Plug & Play Integratie',
					description:
						'De koppeling werkt naadloos samen met je bestaande processen. Data stroomt automatisch van systeem naar systeem, volgens de regels die jij bepaalt.'
				},
				{
					title: 'Real-time Synchronisatie & Monitoring',
					description:
						'Wijzigingen worden direct doorgevoerd in alle gekoppelde systemen. Een nieuwe order? Direct in je boekhouding \u00e9n voorraad. Klantupdate in CRM? Meteen zichtbaar in alle systemen. We monitoren 24/7 of alles soepel verloopt en grijpen in bij storingen.'
				}
			]
		}
	],
	faq: [
		{
			question: 'Wat zijn praktische voorbeelden van diensten die HoneyLink aanbiedt?',
			answer: 'Een automation kan je effici\u00ebnter laten werken door het vereenvoudigen van administratie en het verbinden van je systemen. Zo kan een ingevuld contactformulier automatisch een klantrecord aanmaken in je CRM, een API-koppeling tussen je webshop en boekhoudsysteem zorgt dat facturen direct worden verwerkt en klanten ontvangen automatisch een follow-up e-mail.\n\nEen chatbot transformeert je klantenservice door 24/7 beschikbaar te zijn voor vragen en ondersteuning. Op maat getraind voor jouw bedrijf, kan de chatbot productadvies geven, bestellingen opvolgen, veelgestelde vragen beantwoorden en klanten ontzorgen bij routinematige problemen.\n\nEen AI-agent helpt bij personeelsplanning (zoals voor een restaurant): analyseer drukke dagen, check beschikbaarheid van personeel en stel automatisch een weekschema op.'
		},
		{
			question: 'Welke bedrijven hebben baat bij een samenwerking met HoneyLink?',
			answer: 'Elk MKB-bedrijf dat tijd verliest aan repetitieve taken kan baat hebben bij automatisering. Of je nu een webshop runt, een dienstverlenend bedrijf hebt of in de B2B-sector werkt \u2014 als je processen handmatig uitvoert die ook automatisch kunnen, helpen wij je verder.'
		},
		{
			question: 'Wat kan ik verwachten van een adviesgesprek?',
			answer: 'In een gratis adviesgesprek duiken we diep in jouw bedrijfsprocessen. We kijken waar je tijd verliest, waar fouten ontstaan en waar groeikansen liggen. Je krijgt concrete suggesties en een helder beeld van wat automatisering voor jouw bedrijf kan betekenen.'
		},
		{
			question:
				'Hoe ziet de samenwerking eruit nadat ik klant ben geworden bij HoneyLink?',
			answer: 'Na het adviesgesprek starten we met een concrete pilot die binnen 2 weken meetbare resultaten oplevert. Stap voor stap automatiseren we jouw processen. Je team blijft gewoon doorwerken terwijl wij de techniek regelen. We blijven beschikbaar voor ondersteuning en optimalisatie.'
		},
		{
			question: 'Wat is een workflow automation?',
			answer: 'Een workflow automation is het automatisch laten verlopen van bedrijfsprocessen die normaal handmatig worden uitgevoerd. Denk aan het automatisch aanmaken van facturen, het versturen van follow-up e-mails of het synchroniseren van klantgegevens tussen verschillende systemen.'
		}
	]
};
