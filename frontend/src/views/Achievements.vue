<script setup>
import { ref, computed } from 'vue'
import { achievements, achievementTypes } from '../data/achievements'
import ScrollReveal from '../components/ScrollReveal.vue'

const activeType = ref('all')

const filtered = computed(() =>
  activeType.value === 'all'
    ? achievements
    : achievements.filter((a) => a.type === activeType.value)
)

const typeLabels = {
  award: 'Award',
  competition: 'Competition',
  certification: 'Certification',
}

const typeColors = {
  award: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20',
  competition: 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20',
  certification: 'from-primary-500/10 via-primary-500/5 to-transparent border-primary-500/20',
}

const typeIcons = {
  award: '🏆',
  competition: '🥇',
  certification: '📜',
}

const typeBadgeColors = {
  award: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  competition: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  certification: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
}
</script>

<template>
  <div class="pt-24 pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <ScrollReveal>
        <div class="text-center mb-16">
          <h1 class="section-title">Achievements</h1>
          <p class="section-subtitle">
            5 certifications, 3 competition awards, and 2 honors earned across my academic and professional journey
          </p>
        </div>
      </ScrollReveal>

      <!-- Type Filter -->
      <ScrollReveal :delay="100">
        <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            v-for="t in achievementTypes"
            :key="t.value"
            @click="activeType = t.value"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border',
              activeType === t.value
                ? 'bg-primary-500/10 text-primary-400 border-primary-500/30 shadow-lg shadow-primary-500/10'
                : 'text-dark-400 hover:text-white border-white/5 hover:bg-white/5',
            ]"
          >
            {{ t.label }}
          </button>
        </div>
      </ScrollReveal>

      <!-- Timeline Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal
          v-for="ach in filtered"
          :key="ach.title"
          :delay="150"
        >
          <div
            class="glass-card group h-full flex flex-col"
            :class="typeColors[ach.type] || typeColors.certification"
          >
            <div class="flex items-start gap-3 mb-4">
              <span class="text-2xl flex-shrink-0">{{ typeIcons[ach.type] || '⭐' }}</span>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-white group-hover:text-primary-400 transition-colors leading-snug">
                  {{ ach.title }}
                </h3>
                <p class="text-sm text-accent-400 mt-0.5">{{ ach.organization }}</p>
              </div>
            </div>
            <p class="text-dark-400 text-sm leading-relaxed mb-4 flex-1">
              {{ ach.description }}
            </p>
            <div class="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
              <span
                class="px-2.5 py-1 rounded-full text-xs font-medium border"
                :class="typeBadgeColors[ach.type] || typeBadgeColors.certification"
              >
                {{ typeLabels[ach.type] || ach.type }}
              </span>
              <span class="text-xs text-dark-500 font-mono">{{ ach.year }}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <!-- Empty State -->
      <div v-if="filtered.length === 0" class="text-center py-20">
        <p class="text-dark-500 text-lg">No achievements in this category yet.</p>
      </div>
    </div>
  </div>
</template>
