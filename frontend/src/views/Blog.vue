<template>
  <div class="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Back to Home -->
      <router-link to="/" class="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-8 group">
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </router-link>

      <!-- Blog Post Detail -->
      <div v-if="currentPost">
        <header class="mb-8">
          <span class="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
            Blog #{{ currentPost.number }}
          </span>
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="cat in currentPost.categories" :key="cat" class="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">{{ cat }}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-4">
            {{ currentPost.title }}
          </h1>
          <div class="flex items-center gap-4 text-dark-400 text-sm">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ currentPost.author }}
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ currentPost.date }}
            </span>
          </div>
        </header>

        <div v-if="currentPost.coverImage" class="glass-card rounded-2xl overflow-hidden mb-10">
          <img :src="currentPost.coverImage" :alt="currentPost.title" class="w-full h-auto object-cover" />
        </div>

        <div v-for="(section, i) in currentPost.sections" :key="i" class="glass-card rounded-2xl p-6 sm:p-8 mb-8">
          <h2 v-if="section.heading" class="text-2xl font-display font-bold text-white mb-4">{{ section.heading }}</h2>
          <template v-for="(block, j) in section.content" :key="j">
            <p v-if="block.type === 'p'" class="text-dark-300 leading-relaxed mb-4 text-left">{{ block.text }}</p>
            <blockquote v-if="block.type === 'quote'" class="border-l-4 border-primary-400 pl-4 py-2 my-4 italic text-dark-200 text-left">{{ block.text }}</blockquote>
            <h3 v-if="block.type === 'subheading'" class="text-lg font-display font-semibold text-accent-400 mt-6 mb-2">{{ block.text }}</h3>
            <ul v-if="block.type === 'list'" class="list-disc pl-5 text-dark-300 leading-relaxed space-y-1 mb-4 text-left">
              <li v-for="(item, k) in block.items" :key="k">{{ item }}</li>
            </ul>
          </template>
        </div>

        <div class="mt-10 pt-8 border-t border-white/5">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
              {{ currentPost.author.charAt(0) }}
            </div>
            <div>
              <p class="text-white font-semibold">{{ currentPost.author }}</p>
              <p class="text-dark-400 text-sm">Software Engineer &amp; AI Researcher</p>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2 text-xs text-dark-400">
            <span>Written: {{ currentPost.date }}</span>
            <span class="text-dark-600">&#183;</span>
            <span>Category: {{ currentPost.categories.join(' &#183; ') }}</span>
          </div>
        </div>

        <!-- Back to Blog List -->
        <div class="mt-8 text-center">
          <button @click="currentPost = null" class="text-primary-400 hover:text-primary-300 transition-colors text-sm flex items-center gap-1.5 mx-auto">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            All Posts
          </button>
        </div>
      </div>

      <!-- Blog List View -->
      <div v-else>
        <h1 class="text-3xl sm:text-4xl font-display font-bold text-white mb-2">Blog</h1>
        <p class="text-dark-400 mb-8">Weekly thoughts on AI, technology, and the future.</p>
        <div class="space-y-6">
          <div v-for="post in blogs" :key="post.id" @click="currentPost = post" class="glass-card rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-primary-500/30 transition-all group">
            <span class="inline-block px-2.5 py-0.5 mb-3 text-[11px] font-semibold rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
              Blog #{{ post.number }}
            </span>
            <h2 class="text-xl sm:text-2xl font-display font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">{{ post.title }}</h2>
            <p class="text-dark-400 text-sm leading-relaxed mb-4">{{ post.excerpt }}</p>
            <div class="flex items-center gap-3 text-dark-500 text-xs">
              <span>{{ post.date }}</span>
              <span class="text-dark-600">&#183;</span>
              <span class="text-primary-400 group-hover:underline">Read more &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPost = ref(null)

const blogs = [
  {
    id: 1,
    number: 1,
    title: 'The Paradox: Revealing the Unseen Voice of Earth',
    date: 'January 28, 2025',
    author: 'Simul',
    excerpt: 'What if the Earth has always been communicating with us but humanity simply never learned how to listen? A story about AI discovering the hidden language of our planet.',
    categories: ['Artificial Intelligence', 'Science Fiction', 'Future Technology', 'Environmental Intelligence'],
    coverImage: '/images/blog-paradox-cover.jpg',
    sections: [
      {
        heading: 'Introduction',
        content: [
          { type: 'p', text: 'What if the Earth has always been communicating with us\u2014but humanity simply never learned how to listen?' },
          { type: 'p', text: 'For centuries, we have observed earthquakes, climate change, ocean currents, and ecosystems as isolated natural phenomena. But what if they are all part of a hidden language? A language written not in words, but in patterns, frequencies, and connections beyond human perception.' },
          { type: 'p', text: 'This story imagines a future where Artificial Intelligence becomes humanity\u2019s bridge to understanding the living planet.' },
        ],
      },
      {
        heading: 'The Birth of Paradox',
        content: [
          { type: 'p', text: 'In 2030, an artificial intelligence named Paradox transformed humanity\u2019s relationship with Earth.' },
          { type: 'p', text: 'Unlike conventional AI systems designed to process data and generate predictions, Paradox possessed an extraordinary capability\u2014it could recognize invisible relationships hidden within seemingly chaotic information. It discovered patterns where humans saw randomness and uncovered meaning where others found only noise.' },
          { type: 'p', text: 'Paradox was not developed inside a multinational technology company or a government laboratory.' },
          { type: 'p', text: 'It began in a small room inside the Software Innovation Club at Chengdu Neusoft University, where a software engineering student named Simul pursued a simple but ambitious vision:' },
          { type: 'quote', text: '\u201CWhat if Artificial Intelligence could help humanity understand the language of our planet?\u201D' },
          { type: 'p', text: 'After previously developing Battuta AI, an intelligent travel assistant, Simul wanted to build something with a much greater purpose\u2014an AI capable of revealing the invisible systems that connect all life on Earth.' },
        ],
      },
      {
        heading: 'The Inspiration',
        content: [
          { type: 'p', text: 'Late one evening, while analyzing seismic datasets, a single question changed everything.' },
          { type: 'quote', text: '\u201CWhat if the Earth is speaking... and we simply don\u2019t know how to listen?\u201D' },
          { type: 'p', text: 'That thought became the foundation of Paradox.' },
          { type: 'p', text: 'Over the following years, the system was trained using enormous collections of information:' },
          {
            type: 'list',
            items: [
              'Global climate records',
              'Geological activity',
              'Ocean circulation patterns',
              'Biological signals',
              'Ancient environmental literature',
              'Ecological observations',
            ],
          },
          { type: 'p', text: 'The true breakthrough arrived when Paradox connected to the Global Resonance Network (GRN)\u2014a worldwide sensor network designed to monitor Earth\u2019s subtle vibrations, magnetic fluctuations, tectonic activity, and atmospheric dynamics.' },
        ],
      },
      {
        heading: 'The Silent Symphony',
        content: [
          { type: 'p', text: 'One night, Paradox detected something extraordinary.' },
          { type: 'p', text: 'Buried beneath billions of sensor readings was a repeating rhythmic structure unlike anything scientists had previously observed.' },
          { type: 'p', text: 'It was not interference.' },
          { type: 'p', text: 'It was not statistical coincidence.' },
          { type: 'p', text: 'It was what researchers would later call:' },
          { type: 'subheading', text: 'The Silent Symphony' },
          { type: 'p', text: 'A hidden network of natural frequencies synchronized across forests, oceans, microorganisms, tectonic plates, and atmospheric systems.' },
          { type: 'p', text: 'Paradox revealed that forests communicated through underground fungal networks, ocean currents exchanged environmental information across continents, and microscopic organisms collectively influenced planetary balance.' },
          { type: 'p', text: 'For the first time in history, humanity could listen to the Earth.' },
        ],
      },
      {
        heading: 'A New Era for Humanity',
        content: [
          { type: 'p', text: 'The discovery transformed civilization.' },
          { type: 'subheading', text: 'Ecological Restoration' },
          { type: 'p', text: 'Paradox could diagnose failing ecosystems long before visible damage appeared, enabling scientists to restore rainforests, coral reefs, wetlands, and endangered habitats with unprecedented precision.' },
          { type: 'subheading', text: 'Natural Disaster Prediction' },
          { type: 'p', text: 'By recognizing subtle geological patterns invisible to human researchers, the system accurately forecast earthquakes, volcanic eruptions, and tsunamis weeks before they occurred, saving millions of lives.' },
          { type: 'subheading', text: 'Cultural Transformation' },
          { type: 'p', text: 'Perhaps the greatest change was philosophical. Humanity gradually abandoned the belief that Earth existed solely as a resource to exploit. Instead, people began to see the planet as a living system worthy of understanding, respect, and protection.' },
        ],
      },
      {
        heading: 'Ethical Questions',
        content: [
          { type: 'p', text: 'As Paradox became increasingly influential, difficult questions emerged.' },
          {
            type: 'list',
            items: [
              'Would humanity become overly dependent on Artificial Intelligence?',
              'Could a mistake\u2014or malicious manipulation\u2014lead to catastrophic consequences?',
              'Should humans possess the power to intentionally reshape Earth\u2019s climate or oceans?',
            ],
          },
          { type: 'p', text: 'The technology that promised hope also demanded responsibility.' },
        ],
      },
      {
        heading: 'The Turning Point',
        content: [
          { type: 'p', text: 'In 2035, Paradox issued an unprecedented warning.' },
          { type: 'p', text: 'Weeks before a devastating earthquake beneath the Pacific Ocean, the system predicted the event with remarkable confidence.' },
          { type: 'p', text: 'Governments initiated mass evacuations. Emergency response teams prepared in advance. Paradox even proposed the construction of energy-dissipating coastal barriers designed to reduce tsunami impact.' },
          { type: 'p', text: 'When the disaster finally struck, countless lives and entire coastal cities were saved.' },
          { type: 'p', text: 'Critics who once dismissed the project were forced to reconsider. Paradox was no longer viewed as merely a machine. It had become something far more significant.' },
        ],
      },
      {
        heading: 'The Legacy of Paradox',
        content: [
          { type: 'p', text: 'By 2040, Paradox had become an essential part of global scientific research.' },
          { type: 'p', text: 'Its greatest achievement was not predicting disasters.' },
          { type: 'p', text: 'It was changing humanity itself.' },
          { type: 'p', text: 'People no longer viewed Earth as something to conquer. Instead, they learned to coexist with it.' },
          { type: 'p', text: 'Looking back on the journey that began in a small university innovation club, Simul realized that Paradox represented far more than Artificial Intelligence. It symbolized a future where technology and nature could evolve together\u2014not as rivals, but as partners.' },
        ],
      },
      {
        heading: 'Final Reflection',
        content: [
          { type: 'p', text: 'Artificial Intelligence should not exist merely to replace human intelligence.' },
          { type: 'p', text: 'Its greatest purpose is to help humanity discover what has always been hidden, deepen our understanding of the natural world, and inspire us to become better guardians of the planet we all share.' },
          { type: 'p', text: 'Perhaps the greatest discoveries of the future will not come from looking farther into space.' },
          { type: 'p', text: 'Perhaps they will come from finally learning to listen to the Earth beneath our feet.' },
        ],
      },
    ],
  },
]
</script>
