import type { ServicePageData } from '$lib/types';

export const pageData: ServicePageData = {
	title: 'Wij automatiseren jouw kantoor',
	subtitle:
		'Elke dag hetzelfde liedje. Excel openen, gegevens overtypen naar je CRM, factuur maken, mail versturen. Terwijl jouw concurrent allang zijn processen heeft geautomatiseerd en nieuwe klanten binnenhaalt.',
	sections: [
		{
			heading: 'Wij automatiseren 30% van jouw bedrijfsprocessen',
			body: 'Bij HoneyLink maken we procesautomatisering toegankelijk voor elk MKB-bedrijf. Of je nu eenvoudig wilt beginnen of je complete bedrijf wilt automatiseren: wij ontwikkelen oplossingen die perfect aansluiten bij jouw werkwijze. Het automatiseren van bedrijfsprocessen hoeft niet ingewikkeld te zijn.',
			type: 'value-proposition'
		},
		{
			heading: 'Hoe doen we dat?',
			body: 'Bij HoneyLink maken we automatisering simpel. Geen IT-afdeling nodig. Geen miljoeneninvesteringen. Gewoon je bedrijf automatiseren zoals het hoort: stap voor stap, meetbaar resultaat.',
			type: 'features',
			items: [
				{
					title: 'Geen tijd meer kwijt met orders uit de mail naar Excel kopiëren',
					description: 'Orders direct in systeem, jij checkt alleen de uitzonderingen.',
					accentColor: 'bg-accent-purple'
				},
				{
					title: 'Wat was ook alweer afgesproken met die klant?',
					description:
						'Elk contact, elke afspraak, elk mailtje wij maken het direct vindbaar.',
					accentColor: 'bg-accent-teal'
				},
				{
					title: 'Oh nee, die klant had ik vorige maand een verlengingsmail moeten sturen\u2026',
					description:
						'Herkenbaar? Je bent niet de enige. Mis geen maandelijks verlengingen door handmatige opvolging.',
					accentColor: 'bg-accent-blue'
				},
				{
					title: 'Die 5-sterren recensie die je nooit kreeg',
					description:
						'Want je vergat te vragen, dit had procesautomatisering kunnen voorkomen.',
					accentColor: 'bg-accent-green'
				}
			]
		},
		{
			heading: 'Automatisering in de praktijk',
			body: '',
			type: 'examples',
			items: [
				{
					title: 'Contactformulier naar CRM',
					description:
						'Een ingevuld contactformulier automatisch een klantrecord aanmaken in je CRM, een API-koppeling tussen je webshop en boekhoudsysteem zorgt dat facturen direct worden verwerkt en klanten ontvangen automatisch een follow-up e-mail.'
				},
				{
					title: 'Chatbot voor klantenservice',
					description:
						'Een chatbot transformeert je klantenservice door 24/7 beschikbaar te zijn voor vragen en ondersteuning. Op maat getraind voor jouw bedrijf, kan de chatbot productadvies geven, bestellingen opvolgen en veelgestelde vragen beantwoorden.'
				},
				{
					title: 'AI-agent voor personeelsplanning',
					description:
						'Een AI-agent helpt bij personeelsplanning: analyseer drukke dagen, check beschikbaarheid van personeel en stel automatisch een weekschema op.'
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
