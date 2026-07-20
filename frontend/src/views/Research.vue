<script setup>
import { thesis, researchInterests, researchGoals } from '../data/research'
import ScrollReveal from '../components/ScrollReveal.vue'

const iconMap = {
  MessageSquare: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  Hand: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3a1.5 1.5 0 013 0v5m-3-5a1.5 1.5 0 013 0',
  Bot: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  Heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
}

const goalIcons = [
  'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  'M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
]
</script>

<template>
  <div class="pt-24 pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <ScrollReveal>
        <div class="text-center mb-16">
          <h1 class="section-title">Research</h1>
          <p class="section-subtitle">
            Exploring the frontiers of AI, multi-agent systems, and human-machine interaction
          </p>
        </div>
      </ScrollReveal>

      <!-- Thesis Section - Hero Card -->
      <ScrollReveal :delay="100">
        <div class="glass p-8 md:p-12 mb-16 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
          <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1.5 bg-primary-500/10 text-primary-400 text-xs font-semibold rounded-full border border-primary-500/20">
                B.Sc. Thesis
              </span>
              <span class="text-dark-500 text-xs">2025</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-snug">
              {{ thesis.title }}
            </h2>
            <p class="text-dark-300 text-base leading-relaxed max-w-4xl mb-6">
              {{ thesis.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="d in thesis.domains" :key="d" class="px-3 py-1.5 bg-dark-800/60 text-dark-300 text-xs rounded-lg border border-white/5">
                {{ d }}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <!-- Research Interests -->
      <ScrollReveal :delay="150">
        <h2 class="text-2xl font-display font-bold mb-8 text-center">
          Research <span class="text-accent-400">Interests</span>
        </h2>
      </ScrollReveal>

      <div class="grid sm:grid-cols-2 gap-6 mb-16">
        <ScrollReveal
          v-for="(interest, i) in researchInterests"
          :key="interest.title"
          :delay="200 + i * 50"
        >
          <div class="glass-card group h-full flex flex-col">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="iconMap[interest.icon] || iconMap.Bot" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {{ interest.title }}
                </h3>
              </div>
            </div>
            <p class="text-dark-400 text-sm leading-relaxed mb-4 flex-1">
              {{ interest.description }}
            </p>
            <div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
              <span v-for="k in interest.keywords" :key="k" class="px-2 py-1 bg-dark-800/40 text-dark-400 text-xs rounded-md">
                {{ k }}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <!-- Future Research Goals -->
      <ScrollReveal :delay="300">
        <h2 class="text-2xl font-display font-bold mb-8 text-center">
          Future <span class="text-primary-400">Goals</span>
        </h2>
      </ScrollReveal>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScrollReveal
          v-for="(goal, i) in researchGoals"
          :key="goal.title"
          :delay="350 + i * 50"
        >
          <div class="glass-card group h-full flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="goalIcons[i] || goalIcons[0]" />
              </svg>
            </div>
            <h4 class="text-sm font-semibold text-white mb-2">{{ goal.title }}</h4>
            <p class="text-dark-500 text-xs leading-relaxed">{{ goal.description }}</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</template>
