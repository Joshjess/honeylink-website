<script lang="ts">
	import { inview } from '$lib/actions/inview';

	const capabilities = [
		{
			label: 'Waarnemen',
			description: 'gegevens verzamelen uit de omgeving.'
		},
		{
			label: 'Beslissen',
			description: 'keuze maken op basis van jouw instructies en eerder verzamelde gegevens.'
		},
		{
			label: 'Uitvoeren',
			description:
				'automatisch taken uitvoeren, zoals een e-mail sturen of een berekening maken.'
		},
		{
			label: 'Leren',
			description: 'reacties aanpassen op basis van feedback en nieuwe informatie.'
		}
	];
</script>

<section
	use:inview
	class="px-4 py-16 md:py-24 bg-brand-gray-light opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-7xl">
		<h2
			class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-brand-black"
		>
			Wat is een AI-Agent?
		</h2>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<p class="text-brand-gray-dark text-lg leading-relaxed mb-8">
					Een assistent die geen behoefte heeft aan een pauze of slaap, dat klinkt ideaal. Maar wat
					kan deze digitale collega voor jou betekenen? Waarin een AI-agent verschilt van 'gewone'
					software is dat deze zelf vervolgstappen onderneemt.
				</p>

				<div class="space-y-4">
					{#each capabilities as capability}
						<div class="flex gap-3">
							<div
								class="w-2 h-2 rounded-full bg-brand-purple mt-2.5 shrink-0"
							></div>
							<p class="text-brand-gray-dark">
								<span class="font-bold text-brand-black">{capability.label}:</span>
								{capability.description}
							</p>
						</div>
					{/each}
				</div>

				<p class="text-brand-gray-dark leading-relaxed mt-8">
					Net als Agile werken, draait een AI-agent om continu verbeteren: testen, feedback ophalen
					en implementeren. De AI-agent en Agile werken versterken elkaar. Samen maken we een
					AI-implementatieplan dat ervoor zorgt dat jij 's ochtends verder kan gaan waar AI is
					gebleven. Het is software op maat, zodat jij achter de schermen het creatieve denkwerk kunt
					blijven doen.
				</p>
			</div>

			<div class="flex justify-center">
				<enhanced:img
					src="$lib/assets/homepage/ai-agent.png"
					alt="Smart chatbot solution for seamless interactions."
					class="w-full max-w-md rounded-2xl"
					sizes="(min-width: 1024px) 50vw, 100vw"
				/>
			</div>
		</div>
	</div>
</section>
