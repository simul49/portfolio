<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
function onScroll() { visible.value = window.scrollY > 500 }
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      @click="scrollTop"
      class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/30 flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 backdrop-blur-xl"
      aria-label="Back to top"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }
</style>
