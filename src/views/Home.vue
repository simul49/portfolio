<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { personalInfo } from '../data/personal'
import { projects } from '../data/projects'
import { groupedSkills as skills } from '../data/skills'
import { experiences, education } from '../data/experience'
import { achievements } from '../data/achievements'

import ScrollReveal from '../components/ScrollReveal.vue'
import ParticleBackground from '../components/ParticleBackground.vue'

const featuredProjects = projects.slice(0, 4)

const getLatestYear = (item) => {
  const str = item.year || item.organization || ''
  const years = [...str.matchAll(/\d{4}/g)].map(m => parseInt(m[0]))
  return years.length ? Math.max(...years) : 0
}
const sortByYear = (items) => [...items].sort((a, b) => getLatestYear(b) - getLatestYear(a))

const certificates = sortByYear(achievements.filter((a) => a.type === 'certification'))
const awards = sortByYear(achievements.filter((a) => a.type === 'award' || a.type === 'competition'))
const volunteer = sortByYear(achievements.filter((a) => a.type === 'volunteer'))

const researchInterests = [
  'Foundation Models & Generative AI',
  'Large Language Models (LLMs) & NLP',
  'Agentic AI & Multi-Agent Systems',
  'Computer Vision & Embodied Intelligence',
  'Edge Intelligence, 6G & Swarm Robotics',
  'Digital Healthcare & Intelligent IoT',
]



const latestWork = {
  title: 'Autonomous Multi-Agent Orchestration for Self-Healing Distributed Systems',
  description: 'A research project exploring AI-powered distributed systems where multiple agents collaborate to detect failures, generate recovery strategies, and enable autonomous system repair using LLMs, AIOps, and intelligent orchestration.',
  date: 'July 2026',
  tech: ['AI Agents', 'LLMs', 'Multi-Agent Systems', 'Distributed Systems', 'AIOps','Real-Time Deployment'],
}

// --- Animated particle-network globe ---
const globePoints = ref([])
const globeBrightPoints = ref([])
const globeLines = ref([])
const globeAngle = ref(0)
let rafId = null

const GLOBE_RADIUS = 190
const GLOBE_CENTER = 250

function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}
function normalize(v) {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
  return len ? { x: v.x / len, y: v.y / len, z: v.z / len } : v
}

function randomInCone(cx, cy, cz, spread) {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * v
  const z = u * (1 - Math.cos(spread)) + Math.cos(spread)
  const r = Math.sqrt(1 - z * z)
  const x = r * Math.cos(theta)
  const y = r * Math.sin(theta)
  const zAxis = normalize({ x: cx, y: cy, z: cz })
  const tmp = Math.abs(zAxis.x) < 0.9 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 }
  const xAxis = normalize(cross(tmp, zAxis))
  const yAxis = cross(zAxis, xAxis)
  return normalize({
    x: zAxis.x * z + xAxis.x * x + yAxis.x * y,
    y: zAxis.y * z + xAxis.y * x + yAxis.y * y,
    z: zAxis.z * z + xAxis.z * x + yAxis.z * y,
  })
}

function addCluster(pts, lat, lon, count, spread) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = lon * (Math.PI / 180)
  const cx = Math.sin(phi) * Math.cos(theta)
  const cy = Math.cos(phi)
  const cz = Math.sin(phi) * Math.sin(theta)
  for (let i = 0; i < count; i++) {
    const p = randomInCone(cx, cy, cz, spread)
    pts.push({
      x: p.x,
      y: p.y,
      z: p.z,
      pulseDelay: Math.random() * 3,
      bright: Math.random() < 0.15,
    })
  }
}

function buildBasePoints() {
  const pts = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  // Uniform base layer
  const baseCount = 95
  for (let i = 0; i < baseCount; i++) {
    const y = 1 - (i / (baseCount - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    pts.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      pulseDelay: Math.random() * 3,
      bright: Math.random() < 0.08,
    })
  }

  // Continent-like clusters
  addCluster(pts, 45, -100, 80, 0.55) // North America
  addCluster(pts, 50, 10, 70, 0.48) // Europe
  addCluster(pts, 35, 100, 120, 0.65) // Asia
  addCluster(pts, -15, -60, 60, 0.55) // South America
  addCluster(pts, 0, 20, 75, 0.58) // Africa
  addCluster(pts, -25, 135, 42, 0.42) // Australia

  return pts
}

const baseGlobePoints = buildBasePoints()

function dist3(a, b) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

function precomputeNeighbors(points, k) {
  const pairs = new Set()
  for (let i = 0; i < points.length; i++) {
    const neighbors = points
      .map((p, idx) => ({ idx, d: dist3(points[i], p) }))
      .filter((n) => n.idx !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
    for (const n of neighbors) {
      const key = [i, n.idx].sort((a, b) => a - b).join('-')
      pairs.add(key)
    }
  }
  return Array.from(pairs).map((key) => {
    const [i, j] = key.split('-').map(Number)
    return { i, j }
  })
}

const neighborPairs = precomputeNeighbors(baseGlobePoints, 5)

function projectGlobe(angle) {
  const cosA = Math.cos(angle)
  const sinA = Math.sin(angle)
  const projected = new Map()
  const bright = []
  const normal = []

  for (let idx = 0; idx < baseGlobePoints.length; idx++) {
    const p = baseGlobePoints[idx]
    const rx = p.x * cosA - p.z * sinA
    const rz = p.x * sinA + p.z * cosA
    const ry = p.y

    if (rz < -0.35) continue

    const scale = 300 / (300 + rz * 90)
    const r = p.bright
      ? Math.max(1.0, 2.0 * scale)
      : Math.max(0.3, 0.85 * scale)
    const opacity = 0.35 + 0.65 * ((rz + 1) / 1.35)

    const point = {
      x: GLOBE_CENTER + rx * GLOBE_RADIUS * scale,
      y: GLOBE_CENTER - ry * GLOBE_RADIUS * scale,
      r,
      opacity,
      pulseDelay: p.pulseDelay,
      z: rz,
      idx,
    }

    projected.set(idx, point)
    if (p.bright) bright.push(point)
    else normal.push(point)
  }

  return {
    normal: normal.sort((a, b) => a.z - b.z),
    bright: bright.sort((a, b) => a.z - b.z),
    projected,
  }
}

function buildConnections(projected) {
  const lines = []
  for (const pair of neighborPairs) {
    const a = projected.get(pair.i)
    const b = projected.get(pair.j)
    if (!a || !b) continue
    const dx = a.x - b.x
    const dy = a.y - b.y
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < 55) {
      const opacity = (1 - d / 55) * 0.45 * Math.min(a.opacity, b.opacity)
      lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, opacity })
    }
  }
  return lines
}

function updateGlobe() {
  const { normal, bright, projected } = projectGlobe(globeAngle.value)
  globePoints.value = normal
  globeBrightPoints.value = bright
  globeLines.value = buildConnections(projected)
}

onMounted(() => {
  updateGlobe()
})

onUnmounted(() => {})
</script>

<template>
  <div>
    <ParticleBackground />

    <!-- Hero -->
    <section id="home" class="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal class="order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-6">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Software & Java Developer | AI & NLP Enthusiast
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
              Hi, I'm <span class="gradient-text"> Simul</span>
            </h1>
            <h2 class="text-2xl sm:text-3xl font-display font-semibold text-white/90 mb-4">
              Building Intelligent Systems That Solve Real-World Problems
            </h2>
            <p class="text-dark-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
             I research, build, and deploy AI-powered software that transforms complex real-world challenges into practical, scalable solutions.
            </p>



            <div class="flex flex-wrap gap-4">
              <a href="#projects" class="btn-primary inline-flex items-center gap-2">
                View My Projects
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="/resume.pdf" download class="btn-outline inline-flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Resume
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal class="order-1 lg:order-2" delay="200">
            <div class="flex flex-col lg:flex-row items-center justify-center gap-6">
              <!-- Globe -->
              <div class="relative w-64 h-64 sm:w-80 sm:h-80 shrink-0">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-3xl" />
                <svg viewBox="0 0 500 500" class="relative w-full h-full drop-shadow-2xl">
                  <defs>
                    <clipPath id="globeClip">
                      <circle cx="250" cy="250" r="190" />
                    </clipPath>
                    <radialGradient id="globeGrad" cx="25%" cy="20%">
                      <stop offset="0%" stop-color="rgba(59,130,246,0.06)" />
                      <stop offset="40%" stop-color="rgba(6,182,212,0.02)" />
                      <stop offset="100%" stop-color="#050a18" />
                    </radialGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="brightGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  
                </svg>
              </div>

              <!-- Research card -->
              <div class="w-500px h-70 flex flex-col glass-card py-6 px-8 shadow-2xl shadow-primary-500/10 border-2 border-white/15">
                <h3 class="text-lg font-semibold mb-4 text-white">Research Interests</h3>
                <ul class="space-y-3 flex-1">
                  <li v-for="interest in researchInterests" :key="interest" class="flex items-start gap-3 text-sm text-dark-200 leading-relaxed whitespace-nowrap">
                    <span class="w-2 h-2 mt-1.5 rotate-45 bg-gradient-to-br from-primary-400 to-accent-400 rounded-sm flex-shrink-0" />
                    {{ interest }}
                  </li>
                </ul>
                <div class="mt-4 pt-4 border-t border-white/10">
                  <h3 class="text-lg font-semibold mb-3 text-white">Ongoing Work</h3>
                  <div class="rounded-xl bg-dark-800/60 border border-white/10 p-4 hover:border-primary-500/20 transition-colors">
                    <h4 class="text-sm font-semibold text-primary-400 mb-1 leading-snug text-balance hyphens-none">{{ latestWork.title }}</h4>
                    <p class="text-xs text-dark-300 leading-relaxed mb-2 hyphens-none" style="text-wrap: pretty;">{{ latestWork.description }}</p>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="t in latestWork.tech" :key="t" class="text-[10px] px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">{{ t }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- ==================== ABOUT ME SECTION ==================== -->
    <section id="about" class="relative py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-display font-bold">About <span class="gradient-text">Me</span></h2>
          </div>
        </ScrollReveal>

        <!-- About + Education Bento -->
        <div class="grid grid-cols-1 gap-6 mb-8">
          <!-- Bio & Identity -->
          <ScrollReveal>
            <div class="glass-card h-full">
              <div class="space-y-4">
                <p v-for="(paragraph, i) in personalInfo.bio" :key="i" class="text-dark-400 text-base leading-relaxed">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <!-- Education -->
          <ScrollReveal delay="100">
            <div class="glass-card h-full">
              <h2 class="text-3xl sm:text-4xl font-display font-bold text-left mb-4 gradient-text">Education</h2>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(edu, i) in education" :key="i" class="flex items-start gap-3">
                  <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0 border border-white/5">
                    🎓
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-display font-semibold text-base text-white">{{ edu.institution }}</h4>
                    <p class="text-primary-400 text-sm">{{ edu.field }}</p>
                    <p class="text-dark-400 text-xs mt-1">{{ edu.location }}</p>
                    <p class="text-dark-400 text-xs">{{ edu.duration }}</p>
                    <div v-if="edu.gpa" class="flex items-center gap-1.5 mt-1.5">
                      <span class="text-sm text-amber-400">🏆 GPA:</span>
                      <span class="text-base font-display font-bold text-amber-400">{{ edu.gpa }}</span>
                      <span class="text-xs text-dark-400">/ 4.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <!-- Experience -->
        <ScrollReveal delay="150">
          <div class="glass-card mb-8">
            <h2 class="text-3xl sm:text-4xl font-display font-bold text-left mb-6 gradient-text">Professional Experience</h2>
            <div class="relative">
              <div class="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500/50 to-transparent hidden sm:block" />
              <div class="space-y-6">
                <div v-for="(exp, i) in experiences" :key="i" class="relative pl-0 sm:pl-12">
                  <!-- Timeline dot (desktop) -->
                  <div class="absolute left-[12px] top-2 w-[15px] h-[15px] rounded-full border-2 border-primary-400 bg-[#050a18] hidden sm:block" />
                  <div class="glass-panel rounded-xl p-5 hover:border-primary-500/20 transition-all">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 class="text-base font-display font-semibold text-white">{{ exp.company }}</h4>
                      <span class="text-xs text-dark-500 whitespace-nowrap">{{ exp.duration }}</span>
                    </div>
                    <p class="text-sm text-primary-400 mb-2">{{ exp.role }} &bull; {{ exp.location }}</p>
                    <div class="flex flex-wrap gap-1.5 mb-3">
                      <span v-for="tech in exp.technologies" :key="tech" class="text-[10px] px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                        {{ tech }}
                      </span>
                    </div>
                    <ul class="space-y-1.5">
                      <li v-for="(highlight, hi) in exp.highlights" :key="hi" class="flex items-start gap-2 text-xs text-dark-300">
                        <span class="text-primary-400 mt-0.5 shrink-0">▸</span>
                        {{ highlight }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- ==================== SKILLS SECTION ==================== -->
    <section id="skills" class="relative py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div class="text-center mb-12">
            <h2 class="text-4xl sm:text-5xl font-display font-extrabold mb-3 gradient-text">Technical Skills</h2>
            <p class="text-dark-400 text-sm max-w-2xl mx-auto">
              A comprehensive collection of programming languages, frameworks, AI technologies, databases, and development tools that I use to design, build, test, and deploy intelligent, scalable software solutions.
            </p>
          </div>
        </ScrollReveal>

        <div class="space-y-8">
          <!-- Skill categories -->
          <ScrollReveal>
            <div class="glass-card">
              <div class="space-y-6">
                <div v-for="group in skills" :key="group.title">
                  <div class="flex items-center gap-3 mb-3 pb-2.5 border-b border-white/[0.06]">
                    <span class="w-1 h-5 rounded-full bg-gradient-to-b from-primary-400 to-accent-400 shrink-0"></span>
                    <span class="text-[15px] font-display font-bold gradient-text">{{ group.title }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skill in group.skills"
                      :key="skill"
                      class="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 text-dark-300 hover:text-white hover:border-primary-500/30 hover:bg-primary-500/5 transition-all"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- ==================== PROJECTS SECTION ==================== -->
    <section id="projects" class="relative py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-display font-bold mb-3">My <span class="gradient-text">Projects</span></h2>
            <p class="text-dark-400 text-sm max-w-2xl mx-auto">
              A collection of projects that showcase my expertise in AI, full-stack development, and IoT systems.
            </p>
          </div>
        </ScrollReveal>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollReveal v-for="project in projects" :key="project.id" :delay="100">
            <div class="glass-card group h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
              <div class="h-40 rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10 mb-4 flex items-center justify-center overflow-hidden border border-white/5">
                <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <span v-else class="text-5xl">{{ project.icon || '📁' }}</span>
              </div>
              <h4 class="font-display font-semibold mb-2 group-hover:text-primary-400 transition-colors">{{ project.title }}</h4>
              <p class="text-dark-400 text-xs leading-relaxed mb-4 flex-1">{{ project.description }}</p>
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span v-for="tag in project.technologies" :key="tag" class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-dark-300 border border-white/5">
                  {{ tag }}
                </span>
              </div>
              <div class="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                <span class="text-[10px] text-dark-500">{{ project.year }}</span>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- ==================== ACHIEVEMENTS SECTION ==================== -->
    <section id="achievements" class="relative py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-display font-bold mb-3">My <span class="gradient-text">Achievements</span></h2>
            <p class="text-dark-400 text-sm max-w-2xl mx-auto">
              Milestones that reflect my academic excellence, leadership, innovation, and contributions to software engineering, artificial intelligence, and technology communities.
            </p>
          </div>
        </ScrollReveal>

        <div class="glass-card">
          <!-- Certifications -->
          <h3 class="text-sm font-semibold text-dark-300 mb-4 flex items-center gap-2">
            <span>📜</span> Certifications
          </h3>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div
              v-for="cert in certificates"
              :key="cert.title"
              class="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/20 transition-all group"
            >
              <div class="flex items-start gap-3">
                <span class="text-xl shrink-0">{{ cert.icon }}</span>
                <div class="min-w-0">
                  <h5 class="text-sm font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">{{ cert.title }}</h5>
                  <p class="text-[11px] text-primary-400">{{ cert.organization }}</p>
                  <p class="text-[10px] text-dark-500">{{ cert.year }}</p>
                  <p v-if="cert.description" class="text-[11px] text-dark-400 mt-1">{{ cert.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Community & Volunteer -->
          <h3 class="text-sm font-semibold text-dark-300 mb-4 flex items-center gap-2">
            <span>&#x1F91D;</span> Community &amp; Volunteer
          </h3>
          <div class="grid sm:grid-cols-2 gap-4 mb-8">
            <div
              v-for="vol in volunteer"
              :key="vol.title"
              class="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/20 transition-all group"
            >
              <div class="flex items-start gap-3">
                <span class="text-xl shrink-0">{{ vol.icon }}</span>
                <div class="min-w-0">
                  <h5 class="text-sm font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">{{ vol.title }}</h5>
                  <p class="text-[11px] text-primary-400">{{ vol.organization }}</p>
                  <p class="text-[10px] text-dark-500">{{ vol.year }}</p>
                  <p v-if="vol.description" class="text-[11px] text-dark-400 mt-1">{{ vol.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Awards & Competitions -->
          <h3 class="text-sm font-semibold text-dark-300 mb-4 flex items-center gap-2">
            <span>🏆</span> Awards &amp; Recognition
          </h3>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="award in awards"
              :key="award.title"
              class="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/20 transition-all group"
            >
              <div class="flex items-start gap-3">
                <span class="text-xl shrink-0">{{ award.icon }}</span>
                <div class="min-w-0">
                  <h5 class="text-sm font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">{{ award.title }}</h5>
                  <p class="text-[11px] text-primary-400">{{ award.organization }}</p>
                  <p class="text-[10px] text-dark-500">{{ award.year }}</p>
                  <p v-if="award.description" class="text-[11px] text-dark-400 mt-1">{{ award.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== CONTACT SECTION ==================== -->
    <section id="contact" class="relative py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div class="text-center mb-8">
            <h2 class="text-3xl sm:text-4xl font-display font-bold mb-2">Let's <span class="gradient-text">Connect</span></h2>
            <p class="text-dark-400 text-sm max-w-2xl mx-auto">Open for opportunities, collaborations, and meaningful conversations.</p>
          </div>
        </ScrollReveal>

        <div class="glass-card rounded-2xl px-6 py-8 sm:px-12 sm:py-10">
          <p class="text-dark-400 text-sm sm:text-base leading-relaxed mb-8 text-center">
            Seeking fully funded Master's opportunities in Artificial Intelligence and Software Engineering. Also open to AI research collaborations, internships, and software engineering roles. Let's build innovative solutions together.
          </p>

          <!-- Contact Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a :href="'mailto:' + personalInfo.email" class="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.06] transition-all group">
              <div class="flex items-center gap-3">
                <span class="text-lg shrink-0 w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-all">📧</span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-x-2 gap-y-1 text-sm text-dark-100 flex-wrap">
                    <span class="group-hover:text-primary-400 transition-colors break-all">{{ personalInfo.email }}</span>
                    <span class="text-dark-500 shrink-0">|</span>
                    <span class="group-hover:text-primary-400 transition-colors break-all">{{ personalInfo.emailPersonal }}</span>
                  </div>
                </div>
              </div>
            </a>

            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.06] transition-all group">
              <div class="flex items-center gap-3">
                <span class="text-lg shrink-0 w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-all">📱</span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-x-2 gap-y-1 text-sm text-dark-100 flex-wrap">
                    <a :href="'tel:' + personalInfo.phone.replace(/\s/g, '')" class="hover:text-primary-400 transition-colors break-all">{{ personalInfo.phone }}</a>
                    <span class="text-dark-500 shrink-0">|</span>
                    <a :href="'https://wa.me/' + personalInfo.phoneWhatsApp.replace(/[\s+]/g, '')" target="_blank" rel="noopener" class="hover:text-green-400 transition-colors break-all">{{ personalInfo.phoneWhatsApp }}</a>
                    <span class="text-xs text-green-500/70 shrink-0">WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.06] transition-all group">
              <div class="flex items-center gap-3">
                <span class="text-lg shrink-0 w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">💬</span>
                <div class="min-w-0 flex-1">
                  <div class="text-sm text-dark-100 flex items-center gap-2 flex-wrap">
                    <span><span class="text-dark-500">WeChat:</span> simul49</span>
                    <span class="text-dark-600">|</span>
                    <span><span class="text-dark-500">Telegram:</span> Simul49</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.06] transition-all group">
              <div class="flex items-center gap-3">
                <span class="text-lg shrink-0 w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">🐧</span>
                <div class="min-w-0 flex-1">
                  <div class="text-sm text-dark-100 flex items-center gap-2 flex-wrap">
                    <span><span class="text-dark-500">QQ:</span> 394355360</span>
                    <span class="text-dark-600">|</span>
                    <span><span class="text-dark-500">QQMail:</span> 394355360@qq.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
