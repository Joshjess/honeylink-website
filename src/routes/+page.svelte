<script lang="ts">
	import HeroSection from '$lib/components/homepage/HeroSection.svelte';
	import ClientsSection from '$lib/components/homepage/ClientsSection.svelte';
	import ServicesSection from '$lib/components/homepage/ServicesSection.svelte';
	import AiAgentSection from '$lib/components/homepage/AiAgentSection.svelte';
	import TestimonialsSection from '$lib/components/homepage/TestimonialsSection.svelte';
	import CtaSection from '$lib/components/homepage/CtaSection.svelte';
	import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd schema={{
	'@type': 'Organization',
	name: 'HoneyLink',
	url: 'https://honeylink.nl',
	logo: 'https://honeylink.nl/images/logo.png',
	contactPoint: {
		'@type': 'ContactPoint',
		telephone: '+31-20-308-68-40',
		email: 'info@honeylink.nl',
		contactType: 'customer service'
	},
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Marco Polostraat 275-3',
		addressLocality: 'Amsterdam',
		postalCode: '1056DN',
		addressCountry: 'NL'
	}
}} />

<HeroSection />
<ClientsSection />
<ServicesSection />
<AiAgentSection />
<TestimonialsSection />
<CtaSection />
