<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";

	let {
		question,
		answer
	}: {
		question: string;
		answer: string;
	} = $props();

	let isOpen = $state(false);
	const answerId = `faq-answer-${Math.random().toString(36).slice(2, 9)}`;

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="border-b border-gray-200">
	<button
		class="w-full flex items-center justify-between py-4 text-left"
		onclick={toggle}
		aria-expanded={isOpen}
		aria-controls={answerId}
	>
		<span class="font-heading font-bold text-brand-black">{question}</span>
		<ChevronDown
			class="w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4 {isOpen
				? 'rotate-180'
				: ''}"
		/>
	</button>
	<div
		id={answerId}
		role="region"
		class="overflow-hidden transition-[max-height] duration-300 ease-out"
		style="max-height: {isOpen ? '500px' : '0'}"
	>
		<p class="pb-4 text-brand-gray-dark leading-relaxed">{answer}</p>
	</div>
</div>
