<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({ project: { type: Object, required: true } })
const emit = defineEmits(['close'])

function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4" @click.self="emit('close')">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <!-- Modal -->
      <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass p-0 animate-fade-up rounded-3xl border border-white/10">
        <!-- Header gradient -->
        <div :class="[
          'relative h-48 flex items-center justify-center bg-gradient-to-br',
          project.category === 'ai' ? 'from-purple-500/40 to-pink-500/40' :
          project.category === 'web' ? 'from-blue-500/40 to-cyan-500/40' :
          project.category === 'mobile' ? 'from-green-500/40 to-emerald-500/40' :
          'from-orange-500/40 to-amber-500/40',
        ]">
          <span class="text-6xl font-display font-bold text-white/30">{{ project.title.charAt(0) }}</span>
          <button @click="emit('close')" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-black/30 hover:bg-black/50 text-white/70 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div class="absolute top-4 left-4 flex gap-2">
            <span v-if="project.featured" class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 border border-amber-500/40">Featured</span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20 capitalize">{{ project.category }}</span>
          </div>
        </div>

        <div class="p-8 space-y-6">
          <div>
            <h2 class="text-2xl font-display font-bold text-white">{{ project.title }}</h2>
            <p class="text-dark-400 mt-1">{{ project.year }}</p>
          </div>

          <p class="text-dark-300 leading-relaxed">{{ project.longDescription || project.description }}</p>

          <div>
            <h4 class="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">Technologies</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech" class="tag">{{ tech }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-4 border-t border-white/5">
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Source Code
            </a>
            <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold transition-all shadow-lg shadow-primary-500/25">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
