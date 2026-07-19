<script setup>
import { education } from '../data/experience'
import { socialLinks } from '../data/social'
import ScrollReveal from '../components/ScrollReveal.vue'

const languages = [
  { name: 'English', proficiency: 95, flag: '🇬🇧' },
  { name: 'Bengali (Native)', proficiency: 100, flag: '🇧🇩' },
  { name: 'Chinese (Mandarin)', proficiency: 70, flag: '🇨🇳' },
  { name: 'Hindi', proficiency: 75, flag: '🇮🇳' },
  { name: 'Urdu', proficiency: 60, flag: '🇵🇰' },
]
</script>

<template>
  <div class="pt-24 pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <ScrollReveal>
        <div class="text-center mb-16">
          <h1 class="section-title">Education</h1>
          <p class="section-subtitle">
            Academic journey, coursework, and language skills
          </p>
        </div>
      </ScrollReveal>

      <!-- University & College -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <div v-for="edu in education" :key="edu.institution">
          <ScrollReveal :delay="100">
            <div class="glass p-8 md:p-10 relative overflow-hidden h-full">
              <div class="absolute top-0 right-0 w-48 h-48 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div class="relative h-full flex flex-col">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 class="text-2xl md:text-3xl font-display font-bold text-white">{{ edu.institution }}</h2>
                    <p class="text-accent-400 text-lg font-medium mt-1">{{ edu.degree }} in {{ edu.field }}</p>
                  </div>
                  <div class="flex flex-col items-start sm:items-end gap-2">
                    <span class="tag text-sm">{{ edu.duration }}</span>
                    <span class="text-xs text-dark-500">{{ edu.location }}</span>
                  </div>
                </div>

                <template v-if="edu.courses">
                  <div class="grid md:grid-cols-3 gap-8 flex-1">
                    <!-- Highlights -->
                    <div class="md:col-span-1 space-y-3">
                      <h3 class="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">Highlights</h3>
                      <div v-for="h in edu.highlights" :key="h" class="flex items-start gap-2 text-dark-300 text-sm">
                        <svg class="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                        {{ h }}
                      </div>
                    </div>
                    <!-- Courses -->
                    <div class="md:col-span-2">
                      <h3 class="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">Relevant Coursework</h3>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="c in edu.courses" :key="c" class="tag">{{ c }}</span>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- No courses — highlights only -->
                <template v-else>
                  <div class="space-y-3 flex-1">
                    <h3 class="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">Highlights</h3>
                    <div v-for="h in edu.highlights" :key="h" class="flex items-start gap-2 text-dark-300 text-sm">
                      <svg class="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                      {{ h }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <!-- Languages -->
      <ScrollReveal :delay="200">
        <h2 class="text-2xl font-display font-bold mb-8 text-center">
          Language <span class="text-primary-400">Proficiency</span>
        </h2>
      </ScrollReveal>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <ScrollReveal v-for="lang in languages" :key="lang.name" :delay="250">
          <div class="glass-card text-center group">
            <span class="text-3xl block mb-3">{{ lang.flag }}</span>
            <h4 class="text-sm font-semibold text-white mb-2">{{ lang.name }}</h4>
            <div class="h-1 bg-dark-800 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                :style="{ width: `${lang.proficiency}%` }"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <!-- References -->
      <div class="mt-20">
        <ScrollReveal :delay="300">
          <h2 class="text-2xl font-display font-bold mb-8 text-center">
            Academic <span class="text-accent-400">References</span>
          </h2>
        </ScrollReveal>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <template v-for="ref in [
            { name: 'Prof. Li Jian', title: 'Dean & Professor', dept: 'School of Software Engineering' },
            { name: 'Prof. Wang Yue', title: 'Associate Professor', dept: 'AI & Machine Learning Dept.' },
            { name: 'Prof. Zhang Hong', title: 'Professor', dept: 'Computer Science Department' },
            { name: 'Prof. Chen Wei', title: 'Advisor & Lecturer', dept: 'Software Engineering Program' },
          ]" :key="ref.name">
            <ScrollReveal :delay="350">
              <div class="glass-card">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 font-semibold text-sm">
                    {{ ref.name.split(' ')[1][0] }}{{ ref.name.split(' ')[2]?.[0] || '' }}
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-white">{{ ref.name }}</h4>
                    <p class="text-xs text-accent-400">{{ ref.title }}</p>
                  </div>
                </div>
                <p class="text-xs text-dark-500">{{ ref.dept }}</p>
                <p class="text-xs text-dark-600 mt-1">Chengdu Neusoft University</p>
              </div>
            </ScrollReveal>
          </template>
        </div>
      </div>

      <!-- Download Resume CTA -->
      <div class="mt-20 text-center">
        <ScrollReveal :delay="400">
          <div class="glass p-10 max-w-2xl mx-auto">
            <h3 class="text-xl font-display font-bold mb-3">Want More Details?</h3>
            <p class="text-dark-400 text-sm mb-6">
              Download my full academic CV with complete course listings, project details, and references.
            </p>
            <a
              href="/resume.pdf"
              download
              class="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download Resume (PDF)
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</template>
