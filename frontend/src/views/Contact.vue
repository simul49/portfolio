<script setup>
import { ref, computed } from 'vue'
import { personalInfo } from '../data/personal'
import { socialLinks } from '../data/social'
import ScrollReveal from '../components/ScrollReveal.vue'
import emailjs from '@emailjs/browser'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const statusMessage = ref('')

const isFormValid = computed(
  () => form.value.name.trim() && form.value.email.trim() && form.value.message.trim()
)

async function handleSubmit() {
  if (!isFormValid.value) return

  status.value = 'sending'
  statusMessage.value = ''

  try {
    // Using EmailJS - configure with your own keys in production
    // For now, show success simulation
    await new Promise((resolve) => setTimeout(resolve, 1500))
    status.value = 'sent'
    statusMessage.value = "Thanks for reaching out! I'll get back to you soon."
    form.value = { name: '', email: '', subject: '', message: '' }
    setTimeout(() => {
      status.value = 'idle'
      statusMessage.value = ''
    }, 5000)
  } catch {
    status.value = 'error'
    statusMessage.value = 'Something went wrong. Please email me directly.'
  }
}

const contactInfo = [
  {
    icon: '📧',
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: '🛡️',
    label: 'QQ Email',
    value: personalInfo.emailAlt,
    href: `mailto:${personalInfo.emailAlt}`,
  },
  {
    icon: '📱',
    label: 'Phone / WhatsApp',
    value: personalInfo.phone,
    href: `https://wa.me/${personalInfo.phoneWhatsApp.replace(/\+/g, '')}`,
  },
  {
    icon: '📍',
    label: 'Location',
    value: `${personalInfo.location}, ${personalInfo.zipCode}`,
    href: null,
  },
]
</script>

<template>
  <div class="pt-24 pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <ScrollReveal>
        <div class="text-center mb-16">
          <h1 class="section-title">Get In Touch</h1>
          <p class="section-subtitle">
            Have a project, internship opportunity, or research collaboration in mind? Let's talk.
          </p>
        </div>
      </ScrollReveal>

      <div class="grid lg:grid-cols-5 gap-12">
        <!-- Contact Info -->
        <div class="lg:col-span-2 space-y-6">
          <ScrollReveal :delay="100">
            <div class="glass p-6 space-y-4">
              <h3 class="text-lg font-display font-semibold mb-4">Contact Information</h3>
              <a
                v-for="info in contactInfo"
                :key="info.label"
                :href="info.href ?? undefined"
                :class="[
                  'flex items-center gap-3 p-3 rounded-xl transition-all duration-300',
                  info.href ? 'hover:bg-white/5 cursor-pointer' : '',
                ]"
                :target="info.href?.startsWith('http') ? '_blank' : undefined"
                :rel="info.href?.startsWith('http') ? 'noopener' : undefined"
              >
                <span class="text-xl">{{ info.icon }}</span>
                <div>
                  <p class="text-xs text-dark-500">{{ info.label }}</p>
                  <p class="text-sm text-white/80">{{ info.value }}</p>
                </div>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal :delay="200">
            <div class="glass p-6">
              <h3 class="text-lg font-display font-semibold mb-4">Follow Me</h3>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="link in socialLinks"
                  :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                  class="px-4 py-2 rounded-lg bg-white/5 hover:bg-primary-500/20 text-dark-400 hover:text-primary-400 transition-all duration-300 text-sm flex items-center gap-2"
                >
                  {{ link.name }}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <ScrollReveal :delay="300">
            <div class="glass p-8">
              <form @submit.prevent="handleSubmit" class="space-y-5">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-medium text-dark-300 mb-2">Name *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="Your name"
                      class="w-full px-4 py-3 bg-dark-800 border border-white/5 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-dark-300 mb-2">Email *</label>
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      class="w-full px-4 py-3 bg-dark-800 border border-white/5 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-dark-300 mb-2">Subject</label>
                  <input
                    v-model="form.subject"
                    type="text"
                    placeholder="What's this about?"
                    class="w-full px-4 py-3 bg-dark-800 border border-white/5 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-dark-300 mb-2">Message *</label>
                  <textarea
                    v-model="form.message"
                    required
                    rows="5"
                    placeholder="Tell me about your project or opportunity..."
                    class="w-full px-4 py-3 bg-dark-800 border border-white/5 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="!isFormValid || status === 'sending'"
                  :class="[
                    'w-full py-4 rounded-xl font-semibold text-base transition-all duration-300',
                    isFormValid && status === 'idle'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]'
                      : 'bg-dark-700 text-dark-500 cursor-not-allowed',
                  ]"
                >
                  <span v-if="status === 'idle'">Send Message</span>
                  <span v-else-if="status === 'sending'" class="flex items-center justify-center gap-2">
                    <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                  <span v-else-if="status === 'sent'" class="text-green-400">✓ Message Sent!</span>
                  <span v-else>Try Again</span>
                </button>

                <p
                  v-if="statusMessage"
                  :class="[
                    'text-sm text-center',
                    status === 'sent' ? 'text-green-400' : 'text-red-400',
                  ]"
                >
                  {{ statusMessage }}
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </div>
</template>
