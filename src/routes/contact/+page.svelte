<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { tick } from "svelte";
  import FaqAccordion from "$lib/components/ui/FaqAccordion.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { inview } from "$lib/actions/inview";
  import { JsonLd } from "svelte-meta-tags";
  import { contactFaqItems } from "$lib/data/contact";
  import Phone from "@lucide/svelte/icons/phone";
  import Mail from "@lucide/svelte/icons/mail";
  import MapPin from "@lucide/svelte/icons/map-pin";
  import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
  import Building2 from "@lucide/svelte/icons/building-2";
  import CalendarDays from "@lucide/svelte/icons/calendar-days";

  const { data } = $props();
  // svelte-ignore state_referenced_locally
  const { form, errors, constraints, message, enhance, delayed } = superForm(
    data.form,
  );

  const CALENDLY_URL =
    "https://calendly.com/joshua-honeylink/advies-gesprek?hide_gdpr_banner=1";

  let showCalendar = $state(false);
  let calendarHovered = $state(false);
  let prewarmed = false;

  $effect(() => {
    if ($message?.type === "success") {
      tick().then(() => document.getElementById("success-heading")?.focus());
    }
  });

  function prewarmCalendar() {
    if (prewarmed) return;
    prewarmed = true;
    calendarHovered = true;
    // Fire-and-forget fetch to populate the HTTP cache so the iframe load is instant
    fetch(CALENDLY_URL, { mode: "no-cors", credentials: "include" }).catch(
      () => {},
    );
  }

  function loadCalendar() {
    if (showCalendar) return;
    showCalendar = true;
    tick().then(() => {
      document.getElementById("calendly-iframe")?.focus();
    });
  }

  function prewarmOnApproach(node: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          prewarmCalendar();
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://calendly.com" crossorigin="anonymous" />
  <link
    rel="preconnect"
    href="https://assets.calendly.com"
    crossorigin="anonymous"
  />
  <link rel="dns-prefetch" href="https://calendly.com" />
  <link rel="dns-prefetch" href="https://assets.calendly.com" />
</svelte:head>

<JsonLd
  schema={{
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://honeylink.nl",
      },
      { "@type": "ListItem", position: 2, name: "Contact" },
    ],
  }}
/>

<!-- Hero section: two columns -->
<section class="mx-auto max-w-7xl px-4 py-16 md:py-24">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    <!-- Left column: Info + contact details -->
    <div
      use:inview
      class="opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
    >
      <h1
        class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-brand-black mb-6"
      >
        Meer weten? <br /> Plan een adviesgesprek.
      </h1>
      <p class="text-lg text-brand-gray-dark leading-relaxed mb-4">
        Ontdek de verborgen kansen in jouw bedrijf. Door het implementeren van
        AI kan je efficienter werken en kosten besparen. We werken volgens onze
        kernwaarden: Vlot, eenvoudig en resultaatgericht.
      </p>
      <p class="text-lg text-brand-gray-dark leading-relaxed mb-4">
        In een vrijblijvend adviesgesprek kijken we samen naar mogelijkheden,
        afgestemd op jouw specifieke situatie.
      </p>
      <p class="text-lg text-brand-gray-dark leading-relaxed mb-8">
        Plan je adviesgesprek in via de agenda
      </p>

      <!-- Phone & Email side by side -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="flex items-start gap-3">
          <Phone size={20} class="flex-shrink-0 mt-0.5 text-brand-black" />
          <div>
            <p class="font-accent font-medium text-sm text-brand-gray-dark">
              Bel Ons
            </p>
            <a
              href="tel:+31203086840"
              class="text-base text-brand-black hover:text-brand-purple transition-colors duration-200"
              >020 308 68 40</a
            >
          </div>
        </div>
        <div class="flex items-start gap-3">
          <Mail size={20} class="shrink-0 mt-0.5 text-brand-black" />
          <div>
            <p class="font-accent font-medium text-sm text-brand-gray-dark">
              E-mail
            </p>
            <a
              href="mailto:info@honeylink.nl"
              class="text-base text-brand-black hover:text-brand-purple transition-colors duration-200"
              >info@honeylink.nl</a
            >
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mb-8">
        <!-- Address block -->
        <div class="flex items-start gap-3 mb-4">
          <MapPin size={20} class="flex-shrink-0 mt-0.5 text-brand-black" />
          <div>
            <p class="font-accent font-medium text-sm text-brand-gray-dark">
              Adres
            </p>
            <p class="text-base text-brand-black">Marco Polostraat 275-3</p>
            <p class="text-base text-brand-black">1056DN, Amsterdam</p>
          </div>
        </div>
        <!-- KvK & BTW -->
        <div class="flex items-start gap-3 mb-4">
          <Building2 size={20} class="shrink-0 mt-0.5 text-brand-black" />
          <div>
            <p class="font-accent font-medium text-sm text-brand-gray-dark">
              Bedrijfsgegevens:
            </p>
            <p class="text-base text-brand-black">KvK: 96561556</p>
            <p class="text-base text-brand-black">Btw-nummer: NL005216613B11</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right column: Calendly embed (click-to-load) -->
    <div use:prewarmOnApproach class="relative" style="height: 700px">
      {#if showCalendar}
        <iframe
          id="calendly-iframe"
          src={CALENDLY_URL}
          title="Plan een adviesgesprek met HoneyLink"
          width="100%"
          height="700"
          frameborder="0"
          loading="eager"
          class="block rounded-2xl"
        ></iframe>
      {:else}
        <button
          type="button"
          onclick={loadCalendar}
          onpointerdown={prewarmCalendar}
          onmouseenter={prewarmCalendar}
          onfocus={prewarmCalendar}
          ontouchstart={prewarmCalendar}
          aria-label="Laad de agenda om een adviesgesprek te plannen"
          class="group relative h-full w-full overflow-hidden rounded-2xl bg-brand-gray-light text-left transition-all duration-200 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple/40"
        >
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-brand-purple text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
              <CalendarDays size={40} strokeWidth={1.75} />
            </div>
            <div class="text-center">
              <p class="font-heading text-2xl md:text-3xl font-bold text-brand-black mb-2">
                Plan je adviesgesprek
              </p>
              <p class="text-base text-brand-gray-dark max-w-sm">
                Klik om de agenda te openen en direct een tijd te kiezen.
              </p>
            </div>
            <span class="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3 font-accent font-medium text-sm text-white transition-transform duration-200 group-hover:scale-105">
              {calendarHovered ? "Bezig met laden…" : "Agenda openen"}
            </span>
          </div>
        </button>
      {/if}
    </div>
  </div>
</section>

<!-- Contact form section -->
<section class="mx-auto max-w-7xl px-4 pb-16 md:pb-24">
  <div
    use:inview
    class="opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0 max-w-2xl mx-auto"
  >
    <div
      class="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100"
    >
      {#if $message?.type === "success"}
        <div
          class="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
        >
          <CheckCircle2 size={48} class="mx-auto text-green-600" />
          <h3
            id="success-heading"
            tabindex="-1"
            class="font-heading text-2xl font-medium text-green-800 mt-4"
          >
            Bedankt voor uw bericht!
          </h3>
          <p class="text-green-800 mt-2">
            We nemen zo snel mogelijk contact met u op.
          </p>
        </div>
      {:else}
        <h2
          class="font-heading text-2xl font-medium text-brand-black mb-2 text-center"
        >
          Of stuur ons een bericht
        </h2>
        <p class="text-brand-gray-dark text-center mb-6">
          Liever een bericht sturen? Vul het formulier in en we nemen zo snel
          mogelijk contact op.
        </p>

        {#if $message?.type === "error"}
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p class="text-red-600 text-sm font-medium">{$message.text}</p>
          </div>
        {/if}

        {#if $message?.type === "rate-limit"}
          <div
            class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
          >
            <p class="text-yellow-800 text-sm font-medium">{$message.text}</p>
          </div>
        {/if}

        <form method="POST" use:enhance>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                for="contact-name"
                class="block text-sm font-accent font-medium text-brand-black mb-2"
                >Naam</label
              >
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Uw volledige naam"
                bind:value={$form.name}
                aria-invalid={$errors.name ? "true" : undefined}
                aria-describedby={$errors.name ? "name-error" : undefined}
                {...$constraints.name}
                class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 {$errors.name
                  ? 'border-red-500'
                  : 'border-gray-300'}"
              />
              {#if $errors.name}
                <p id="name-error" class="mt-2 text-sm text-red-600">
                  {$errors.name}
                </p>
              {/if}
            </div>
            <div>
              <label
                for="contact-email"
                class="block text-sm font-accent font-medium text-brand-black mb-2"
                >E-mail</label
              >
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="uw@email.nl"
                bind:value={$form.email}
                aria-invalid={$errors.email ? "true" : undefined}
                aria-describedby={$errors.email ? "email-error" : undefined}
                {...$constraints.email}
                class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 {$errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'}"
              />
              {#if $errors.email}
                <p id="email-error" class="mt-2 text-sm text-red-600">
                  {$errors.email}
                </p>
              {/if}
            </div>
          </div>

          <div class="mb-4">
            <label
              for="contact-company"
              class="block text-sm font-accent font-medium text-brand-black mb-2"
            >
              Bedrijf <span class="text-brand-gray-dark font-normal"
                >(optioneel)</span
              >
            </label>
            <input
              id="contact-company"
              type="text"
              name="company"
              placeholder="Uw bedrijfsnaam (optioneel)"
              bind:value={$form.company}
              aria-invalid={$errors.company ? "true" : undefined}
              aria-describedby={$errors.company ? "company-error" : undefined}
              {...$constraints.company}
              class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 {$errors.company
                ? 'border-red-500'
                : 'border-gray-300'}"
            />
            {#if $errors.company}
              <p id="company-error" class="mt-2 text-sm text-red-600">
                {$errors.company}
              </p>
            {/if}
          </div>

          <div class="mb-4">
            <label
              for="contact-message"
              class="block text-sm font-accent font-medium text-brand-black mb-2"
              >Bericht</label
            >
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              placeholder="Hoe kunnen we u helpen?"
              bind:value={$form.message}
              aria-invalid={$errors.message ? "true" : undefined}
              aria-describedby={$errors.message ? "message-error" : undefined}
              {...$constraints.message}
              class="w-full px-3 py-3 min-h-[44px] bg-brand-gray-light border rounded-lg text-base text-brand-black placeholder:text-brand-gray-dark hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-colors duration-200 resize-y {$errors.message
                ? 'border-red-500'
                : 'border-gray-300'}"
            ></textarea>
            {#if $errors.message}
              <p id="message-error" class="mt-2 text-sm text-red-600">
                {$errors.message}
              </p>
            {/if}
          </div>

          <div class="mt-6 text-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={$delayed}
              class="w-full md:w-auto {$delayed
                ? 'opacity-50 cursor-not-allowed'
                : ''}"
            >
              {$delayed ? "Versturen..." : "Verstuur bericht"}
            </Button>
          </div>
        </form>
      {/if}
    </div>
  </div>
</section>

<!-- FAQ section -->
<FaqAccordion items={contactFaqItems} heading="Veelgestelde vragen." />
