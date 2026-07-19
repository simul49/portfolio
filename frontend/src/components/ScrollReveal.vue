<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  threshold: { type: Number, default: 0.15 },
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const revealed = ref(false)
let observer = null

onMounted(() => {
  if (!el.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          revealed.value = true
        }, props.delay)
        observer?.unobserve(entry.target)
      }
    },
    { threshold: props.threshold }
  )
  observer.observe(el.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div
    ref="el"
    :class="[
      'transition-all duration-700',
      revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]"
  >
    <slot />
  </div>
</template>
