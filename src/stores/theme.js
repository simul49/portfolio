import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  function init() {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      isDark.value = false
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  watch(isDark, (val) => {
    document.documentElement.classList.toggle('dark', val)
  })

  return { isDark, init, toggle }
})
