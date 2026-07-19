<script setup>
import { ref, computed } from 'vue'
import { projects, projectCategories } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'
import ScrollReveal from '../components/ScrollReveal.vue'

const activeFilter = ref('all')

const filteredProjects = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter.value)
)
</script>

<template>
  <div class="pt-24 pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <ScrollReveal>
        <div class="text-center mb-16">
          <h1 class="section-title">Projects</h1>
          <p class="section-subtitle">
            A collection of my work spanning AI, web development, and research
          </p>
        </div>
      </ScrollReveal>

      <!-- Filters -->
      <ScrollReveal :delay="100">
        <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            v-for="cat in projectCategories"
            :key="cat.value"
            @click="activeFilter = cat.value"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
              activeFilter === cat.value
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                : 'text-dark-400 hover:text-white border border-white/5 hover:bg-white/5',
            ]"
          >
            {{ cat.label }}
          </button>
        </div>
      </ScrollReveal>

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal
          v-for="project in filteredProjects"
          :key="project.id"
          :delay="150"
        >
          <ProjectCard :project="project" />
        </ScrollReveal>
      </div>

      <div v-if="filteredProjects.length === 0" class="text-center py-20">
        <p class="text-dark-500 text-lg">No projects found in this category.</p>
      </div>
    </div>
  </div>
</template>
