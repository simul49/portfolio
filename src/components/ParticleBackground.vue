<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)

let particles = []
let animId = 0

function createParticles() {
  if (!canvas.value) return
  const w = window.innerWidth
  const h = window.innerHeight
  particles = []
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    })
  }
}

function draw() {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  particles.forEach((p, i) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0) p.x = canvas.value.width
    if (p.x > canvas.value.width) p.x = 0
    if (p.y < 0) p.y = canvas.value.height
    if (p.y > canvas.value.height) p.y = 0

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
    ctx.fill()

    particles.forEach((p2, j) => {
      if (i === j) return
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 120)})`
        ctx.stroke()
      }
    })
  })

  animId = requestAnimationFrame(draw)
}

function handleResize() {
  createParticles()
}

onMounted(() => {
  createParticles()
  draw()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 pointer-events-none z-0" />
</template>
