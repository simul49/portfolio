<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const theme = useThemeStore()

onMounted(() => {
  theme.init()
})
</script>

<template>
  <div class="min-h-screen bg-dark-950 text-white flex flex-col">
    <Navbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
