import type { FaqItemData } from '$lib/types';

export interface TeamMemberData {
	name: string;
	role: string;
	image: string;
}

export const missionHeading = 'Ons doel is om jouw manier van werken efficienter te maken.';

export const missionParagraphs = [
	'HoneyLink is de specialist in digitale procesautomatisering voor de ondernemer of afdelingsmanager. Zie jij kansen binnen jouw werk? dan is HoneyLink de juiste partij. Onze missie is zorgen voor meer werkplezier door processen efficienter in te richten.',
	'Dat doen wij door complexe processen te vereenvoudigen en te automatiseren. De recente ontwikkelingen op het gebied van AI hebben de mogelijkheden exponentieel vergroot. We nemen je mee in de wereld van innovatieve technologieen en zorgen voor een implementatieplan afgestemd op jouw specifieke behoeften.',
	'Zo kun jij je bevrijden van deze slaapverwekkende, routinematige taken die veel tijd kosten. Je kan je weer focussen op waar het echt om draait: ondernemen.',
	'Dit is waar HoneyLink het verschil maakt. Ons developmentteam staat klaar om met jouw ideeen aan de slag te gaan. Geen uitdaging gaan wij uit de weg.'
];

export const missionSubtext =
	"Onze missie is om zoveel mogelijk 'saaie' en repetitieve taken te automatiseren, daardoor het werk leuker te maken en jouw bedrijf efficienter";

export const teamMembers: TeamMemberData[] = [
	{
		name: 'Joshua Offermans',
		role: 'Founder | Automation Consultant',
		image: '/images/team/joshua-offermans.webp'
	},
	{
		name: 'Maurits Dijk',
		role: 'Automation Developer',
		image: '/images/team/maurits-dijk.webp'
	}
];

export const faqItems: FaqItemData[] = [
	{
		question: 'Wat zijn praktische voorbeelden van diensten die HoneyLink aanbiedt?',
		answer: 'Een automation kan je efficienter laten werken door het vereenvoudigen van administratie en het verbinden van je systemen. Zo kan een ingevuld contactformulier automatisch een klantrecord aanmaken in je CRM, een API-koppeling tussen je webshop en boekhoudsysteem zorgt dat facturen direct worden verwerkt en klanten ontvangen automatisch een follow-up e-mail.\n\nEen chatbot transformeert je klantenservice door 24/7 beschikbaar te zijn voor vragen en ondersteuning. Op maat getraind voor jouw bedrijf, kan de chatbot productadvies geven, bestellingen opvolgen, veelgestelde vragen beantwoorden en klanten ontzorgen bij routinematige problemen. Dit bespaart niet alleen tijd voor je team, maar zorgt ook voor consistente antwoorden en hogere klanttevredenheid. Bijvoorbeeld voor productdocumentatie: in plaats van handleidingen die niemand leest, biedt een chatbot interactieve hulp, precies wanneer je klanten het nodig hebben.\n\nEen AI-agent helpt bij personeelsplanning (zoals voor een restaurant): analyseer drukke dagen, check beschikbaarheid van personeel en stel automatisch een weekschema op. Interesse? Vraag een gratis intakegesprek aan!'
	},
	{
		question: 'Welke bedrijven hebben baat bij een samenwerking met HoneyLink?',
		answer: 'Elk bedrijf dat repetitieve taken uitvoert, kan profiteren van automatisering. Of je nu een MKB-ondernemer bent met een webshop, een dienstverlenend bedrijf met veel klantcommunicatie, of een groeiend bedrijf dat moeite heeft om processen schaalbaar te houden -- HoneyLink helpt je verder. Denk aan e-commerce, horeca, adviesbureaus, maakbedrijven en zorginstellingen. Van kleine ondernemers tot middelgrote bedrijven: als je merkt dat je team te veel tijd kwijt is aan handmatige processen, is HoneyLink de juiste partner.'
	},
	{
		question: 'Wat kan ik verwachten van een adviesgesprek?',
		answer: 'Tijdens een gratis adviesgesprek bespreken we jouw huidige werkprocessen en waar je tegenaan loopt. We kijken samen naar de mogelijkheden voor automatisering en AI binnen jouw bedrijf. Na het gesprek ontvang je een helder overzicht van de kansen en een voorstel voor de volgende stappen. Er zijn geen verplichtingen aan verbonden -- het gesprek is bedoeld om te ontdekken hoe we je het beste kunnen helpen.'
	},
	{
		question: 'Hoe ziet de samenwerking eruit nadat ik klant ben geworden bij HoneyLink?',
		answer: 'Na het adviesgesprek stellen we samen een plan van aanpak op, afgestemd op jouw specifieke behoeften. Ons team gaat vervolgens aan de slag met de implementatie, waarbij we je stap voor stap meenemen in het proces. Je krijgt een vast aanspreekpunt en regelmatige updates over de voortgang. Na oplevering bieden we ondersteuning en zorgen we ervoor dat alles soepel blijft draaien. We denken ook proactief mee over verdere optimalisaties.'
	},
	{
		question: 'Wat is een workflow automation?',
		answer: 'Een workflow automation is het automatiseren van een reeks taken die normaal handmatig worden uitgevoerd. Denk aan het automatisch verwerken van bestellingen, het versturen van herinneringsmails, of het synchroniseren van gegevens tussen verschillende systemen. Door deze processen te automatiseren bespaar je tijd, verminder je fouten en kun je je focussen op de taken die er echt toe doen. HoneyLink ontwerpt en bouwt deze workflows op maat voor jouw bedrijf.'
	}
];
