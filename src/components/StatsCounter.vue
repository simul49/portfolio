<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  end: { type: Number, required: true },
  suffix: { type: String, required: true },
  label: { type: String, required: true },
  duration: { type: Number, default: 2000 },
})

const count = ref(0)
const revealed = ref(false)
let observer = null

function animate() {
  const duration = props.duration
  const start = performance.now()
  function step(time) {
    const elapsed = time - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    count.value = Math.round(eased * props.end)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        revealed.value = true
        animate()
        observer?.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  const el = document.querySelector(`[data-stat="${props.label}"]`)
  if (el) observer.observe(el)
})
</script>

<template>
  <div :data-stat="label" class="text-center">
    <div class="text-3xl sm:text-4xl md:text-5xl font-display font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
      {{ count }}{{ suffix }}
    </div>
    <div class="text-sm text-gray-500 mt-2 font-medium dark:text-dark-400">{{ label }}</div>
  </div>
</template>
