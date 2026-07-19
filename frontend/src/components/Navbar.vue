<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { navLinks } from '../data/social'

const router = useRouter()
const route = useRoute()

const isOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')

function isRouteLink(href) {
  return href && !href.startsWith('#')
}

function isBlogActive() {
  return route.path === '/blog'
}

function handleScroll() {
  scrolled.value = window.scrollY > 50

  if (isBlogActive()) {
    activeSection.value = 'blog'
    return
  }

  const sections = navLinks
    .filter((l) => !isRouteLink(l.href))
    .map((l) => l.href.replace('#', ''))
  let current = sections[0]
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) current = id
    }
  }
  activeSection.value = current
}

function navigate(link) {
  if (isRouteLink(link.href)) {
    router.push(link.href)
    isOpen.value = false
    return
  }

  // Hash anchor — need to be on home page
  const id = link.href.replace('#', '')

  if (isBlogActive()) {
    // Navigate to home first, then scroll after render
    router.push('/')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  } else {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  isOpen.value = false
}

function linkActive(link) {
  if (isRouteLink(link.href)) {
    return isBlogActive()
  }
  return activeSection.value === link.href.replace('#', '')
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-[#050a18]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/30'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18">
        <!-- Brand -->
        <a href="#home" @click.prevent="navigate({ href: '#home' })" class="flex items-center gap-3 group">
          <!-- Logo mark -->
          <div class="relative w-9 h-9 rounded-full border border-primary-400/60 flex items-center justify-center group-hover:border-primary-400 transition-colors duration-300">
            <span class="text-sm font-bold text-primary-400">&lt;/&gt;</span>
          </div>
          <!-- Brand text -->
          <span class="text-2xl sm:text-3xl font-display font-bold tracking-tight bg-gradient-to-r from-primary-400 via-purple-400 to-accent-400 bg-clip-text text-transparent">
            Simul
          </span>
        </a>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="navigate(link)"
            :class="[
              'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              linkActive(link)
                ? 'text-white'
                : 'text-dark-400 hover:text-white',
            ]"
          >
            {{ link.name }}
            <span
              :class="[
                'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300',
                linkActive(link) ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100',
              ]"
            />
          </a>
        </div>

        <!-- Desktop actions -->
        <div class="hidden lg:flex items-center gap-3">
          <!-- Social/Contact icons could go here -->
        </div>

        <!-- Mobile menu button -->
        <button
          class="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors"
          @click="isOpen = !isOpen"
          aria-label="Toggle menu"
        >
          <div class="flex flex-col gap-1.5 w-5">
            <span :class="['block h-0.5 bg-white rounded-full transition-all duration-300 origin-center', isOpen ? 'rotate-45 translate-y-[5px] w-5' : 'w-5']" />
            <span :class="['block h-0.5 bg-white rounded-full transition-all duration-300', isOpen ? 'opacity-0 w-0' : 'w-5']" />
            <span :class="['block h-0.5 bg-white rounded-full transition-all duration-300 origin-center', isOpen ? '-rotate-45 -translate-y-[5px] w-5' : 'w-3 ml-auto']" />
          </div>
        </button>
      </div>

      <!-- Mobile menu -->
      <transition name="slide">
        <div
          v-if="isOpen"
          class="lg:hidden pb-4 border-t border-white/5 mt-2"
        >
          <div class="flex flex-col gap-1 pt-2">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              @click.prevent="navigate(link)"
              :class="[
                'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                linkActive(link)
                  ? 'text-white bg-gradient-to-r from-primary-500/20 to-accent-500/10 border border-primary-500/20'
                  : 'text-dark-400 hover:text-white hover:bg-white/5',
              ]"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
