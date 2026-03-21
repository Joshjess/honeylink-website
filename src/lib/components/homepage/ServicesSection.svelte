<script lang="ts">
	import { inview } from '$lib/actions/inview';

	const services = [
		{
			title: 'Bedrijfsproces automatisering',
			description:
				"Wij helpen je van losstaande handelingen in verschillende systemen een geautomatiseerd proces te maken door API-koppelingen toe te passen. Hiermee kunnen twee verschillende softwareprogramma's met elkaar communiceren en gegevens uitwisselen. Bijvoorbeeld door het automatisch versturen van bestellingen of het genereren van facturen. Deze koppelingen zijn toepasbaar in onder andere je administratie, sales, marketing en operations.",
			color: 'bg-accent-yellow',
			icon: 'api'
		},
		{
			title: 'AI-Agents',
			description:
				'Handmatig werk is verleden tijd als wij aan de slag gaan met jouw bedrijfsprocessen. We geven je een compleet beeld van de mogelijkheden van AI. Een eerlijk verhaal met realistische doelstellingen die waarde creëren.',
			color: 'bg-accent-purple',
			icon: 'ai',
			bullets: [
				'Klantenservice: nooit meer een onbemande, e-mails worden automatisch beantwoord of een chatbot helpt klanten direct',
				'Budgetadvies: automatisch budgetadvies na het opstellen van een begroting.',
				'Sales & Planning: leads opvolgen of afspraken automatisch inplannen.',
				'Dataverwerking: informatie uit verschillende systemen verwerken, koppelen en analyseren.'
			]
		}
	];
</script>

<section
	use:inview
	class="px-4 py-16 md:py-24 bg-brand-white opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-7xl">
		<h2
			class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-brand-black"
		>
			Jouw specialist in<br />Automations & AI-Agents
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
			{#each services as service}
				<div class="{service.color} rounded-2xl p-8 md:p-10">
					<h3 class="font-heading text-xl md:text-2xl font-bold mb-4 text-brand-black">
						{service.title}
					</h3>
					<p class="text-brand-gray-dark leading-relaxed mb-4">
						{service.description}
					</p>
					{#if service.bullets}
						<ul class="space-y-2 text-brand-gray-dark">
							{#each service.bullets as bullet}
								<li class="flex gap-2">
									<span class="text-brand-purple font-bold mt-0.5 shrink-0">-</span>
									<span>{bullet}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
