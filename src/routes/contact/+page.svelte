<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { tick } from 'svelte';
	import FaqAccordion from '$lib/components/ui/FaqAccordion.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { inview } from '$lib/actions/inview';
	import { JsonLd } from 'svelte-meta-tags';
	import { contactFaqItems, contactDetails } from '$lib/data/contact';

	let { data } = $props();
	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form);

	$effect(() => {
		if ($message?.type === 'success') {
			tick().then(() => document.getElementById('success-heading')?.focus());
		}
	});
</script>

<JsonLd schema={{
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://honeylink.nl' },
		{ '@type': 'ListItem', position: 2, name: 'Contact' }
	]
}} />

<section class="mx-auto max-w-7xl px-4 py-16 md:py-24">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
		<!-- Left column: Contact info -->
		<div
			use:inview
			class="opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
		>
			<h1 class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-brand-black mb-6">
				Meer weten? Plan een adviesgesprek.
			</h1>
			<p class="text-lg text-brand-gray-dark leading-relaxed mb-4">
				Ontdek de verborgen kansen in jouw bedrijf. Door het implementeren van AI kan je
				efficienter werken en kosten besparen. We werken volgens onze kernwaarden: Vlot,
				eenvoudig en resultaatgericht.
			</p>
			<p class="text-lg text-brand-gray-dark leading-relaxed mb-8">
				In een vrijblijvend adviesgesprek kijken we samen naar mogelijkheden, afgestemd op jouw
				specifieke situatie.
			</p>

			<div class="space-y-6 mt-8">
				{#each contactDetails as detail}
					<div class="flex items-start gap-4">
						<div class="flex-shrink-0 text-brand-black">
							{#if detail.icon === 'phone'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									/>
								</svg>
							{:else if detail.icon === 'email'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<rect width="20" height="16" x="2" y="4" rx="2" />
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
								</svg>
							{:else if detail.icon === 'address'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
							{:else if detail.icon === 'kvk'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
									<path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
									<path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
									<path d="M10 6h4" />
									<path d="M10 10h4" />
									<path d="M10 14h4" />
									<path d="M10 18h4" />
								</svg>
							{:else if detail.icon === 'btw'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
									/>
									<path d="M13 5v2" />
									<path d="M13 17v2" />
									<path d="M13 11v2" />
								</svg>
							{/if}
						</div>
						<div>
							<p class="font-accent font-medium text-sm text-brand-gray-dark">
								{detail.label}
							</p>
							{#if detail.href}
								<a
									href={detail.href}
									class="text-base text-brand-black hover:text-brand-purple transition-colors duration-200"
								>
									{detail.value}
								</a>
							{:else}
								<p class="text-base text-brand-black">{detail.value}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right column: Form card -->
		<div
			use:inview
			class="opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
		>
			<div class="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
				{#if $message?.type === 'success'}
					<div
						class="bg-green-50 border border-green-200 rounded-2xl p-8 text-center opacity-0 transition-opacity duration-300 ease-out"
						class:opacity-100={true}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mx-auto text-green-600"
						>
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
							<polyline points="22 4 12 14.01 9 11.01" />
						</svg>
						<h3
							id="success-heading"
							tabindex="-1"
							class="font-heading text-2xl font-medium text-green-800 mt-4"
						>
							Bedankt voor uw bericht!
						</h3>
						<p class="text-green-800 mt-2">We nemen zo snel mogelijk contact met u op.</p>
					</div>
				{:else}
					<h2 class="font-heading text-2xl font-medium text-brand-black mb-6">
						Stuur ons een bericht
					</h2>

					{#if $message?.type === 'error'}
						<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
							<p class="text-red-600 text-sm font-medium">{$message.text}</p>
						</div>
					{/if}

					{#if $message?.type === 'rate-limit'}
						<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
							<p class="text-yellow-800 text-sm font-medium">{$message.text}</p>
						</div>
					{/if}

					<form method="POST" use:enhance>
						<!-- Name field -->
						<div class="mb-4">
							<label
								for="contact-name"
								class="block text-sm font-accent font-medium text-brand-black mb-2"
							>
								Naam
							</label>
							<input
								id="contact-name"
								type="text"
								name="name"
								placeholder="Uw volledige naam"
								bind:value={$form.name}
								aria-invalid={$errors.name ? 'true' : undefined}
								aria-describedby={$errors.name ? 'name-error' : undefined}
								{...$constraints.name}
								class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 {$errors.name ? 'border-red-500' : 'border-gray-300'}"
							/>
							{#if $errors.name}
								<p id="name-error" class="mt-2 text-sm text-red-600">{$errors.name}</p>
							{/if}
						</div>

						<!-- Email field -->
						<div class="mb-4">
							<label
								for="contact-email"
								class="block text-sm font-accent font-medium text-brand-black mb-2"
							>
								E-mail
							</label>
							<input
								id="contact-email"
								type="email"
								name="email"
								placeholder="uw@email.nl"
								bind:value={$form.email}
								aria-invalid={$errors.email ? 'true' : undefined}
								aria-describedby={$errors.email ? 'email-error' : undefined}
								{...$constraints.email}
								class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 {$errors.email ? 'border-red-500' : 'border-gray-300'}"
							/>
							{#if $errors.email}
								<p id="email-error" class="mt-2 text-sm text-red-600">{$errors.email}</p>
							{/if}
						</div>

						<!-- Company field -->
						<div class="mb-4">
							<label
								for="contact-company"
								class="block text-sm font-accent font-medium text-brand-black mb-2"
							>
								Bedrijf <span class="text-brand-gray-dark font-normal">(optioneel)</span>
							</label>
							<input
								id="contact-company"
								type="text"
								name="company"
								placeholder="Uw bedrijfsnaam (optioneel)"
								bind:value={$form.company}
								aria-invalid={$errors.company ? 'true' : undefined}
								aria-describedby={$errors.company ? 'company-error' : undefined}
								{...$constraints.company}
								class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 {$errors.company ? 'border-red-500' : 'border-gray-300'}"
							/>
							{#if $errors.company}
								<p id="company-error" class="mt-2 text-sm text-red-600">
									{$errors.company}
								</p>
							{/if}
						</div>

						<!-- Message field -->
						<div class="mb-4">
							<label
								for="contact-message"
								class="block text-sm font-accent font-medium text-brand-black mb-2"
							>
								Bericht
							</label>
							<textarea
								id="contact-message"
								name="message"
								rows="5"
								placeholder="Hoe kunnen we u helpen?"
								bind:value={$form.message}
								aria-invalid={$errors.message ? 'true' : undefined}
								aria-describedby={$errors.message ? 'message-error' : undefined}
								{...$constraints.message}
								class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 resize-y {$errors.message ? 'border-red-500' : 'border-gray-300'}"
							></textarea>
							{#if $errors.message}
								<p id="message-error" class="mt-2 text-sm text-red-600">
									{$errors.message}
								</p>
							{/if}
						</div>

						<!-- Submit button -->
						<div class="mt-6">
							<Button
								type="submit"
								variant="primary"
								size="lg"
								disabled={$delayed}
								class="w-full lg:w-auto {$delayed ? 'opacity-50 cursor-not-allowed' : ''}"
							>
								{$delayed ? 'Versturen...' : 'Verstuur bericht'}
							</Button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- FAQ section -->
<FaqAccordion items={contactFaqItems} heading="Veelgestelde vragen." />
