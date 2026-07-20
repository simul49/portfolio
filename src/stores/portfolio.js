import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePortfolioStore = defineStore('portfolio', () => {
  const menuOpen = ref(false)
  const activeSection = ref('home')
  
  const toggleMenu = () => { menuOpen.value = !menuOpen.value }
  const closeMenu = () => { menuOpen.value = false }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Research', path: '/research' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ]

  const personalInfo = {
    name: 'Islam MD Simul',
    title: 'Software Engineer',
    taglines: [
      'Full-Stack Developer',
      'AI & Robotics Researcher',
      'Spring Boot Specialist',
      'Vue.js Enthusiast',
      'NLP Explorer',
    ],
    bio: `I'm a passionate software engineer with expertise in building scalable applications 
          using Java, Spring Boot, and Vue.js. My research interests span autonomous multi-agent 
          systems, 6G edge computing, and swarm robotics. I combine strong engineering fundamentals 
          with cutting-edge AI research to create impactful solutions.`,
    education: {
      degree: 'B.Sc. in Software Engineering',
      university: 'University of Information Technology & Sciences (UITS)',
      period: '2022 - 2026 (Expected)',
      focus: 'Software Engineering, AI, Robotics',
    },
    careerGoals: 'Aspiring to become a leading full-stack software engineer specializing in AI-driven applications. Seeking internship opportunities at top tech companies to apply my skills in real-world projects.',
    internationalExperience: 'Participated in global AI competitions, served as an ICT Olympiad Ambassador, and collaborated with international research communities on multi-agent systems.',
    location: 'Dhaka, Bangladesh',
    email: 'islam.mdsimul@gmail.com',
    github: 'https://github.com/simul-islam',
    linkedin: 'https://linkedin.com/in/simul-islam',
  }

  const skills = {
    programming: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'SQL'],
    frameworks: ['Spring Boot', 'Vue.js 3', 'Django', 'Pinia', 'Vite', 'Tailwind CSS'],
    ai: ['NLP', 'AI Agents', 'Robotics', 'Machine Learning', 'Multi-Agent Systems'],
    tools: ['GitHub', 'IntelliJ IDEA', 'Android Studio', 'Figma', 'Docker', 'VS Code', 'Postman', 'MySQL Workbench'],
  }

  const experiences = [
    {
      id: 1, company: 'Renata Limited', position: 'Software Engineering Intern',
      duration: '2025 - Present', 
      responsibilities: [
        'Develop and maintain enterprise-level Spring Boot applications',
        'Implement RESTful APIs and microservices architecture',
        'Collaborate with cross-functional teams on drug management systems',
        'Optimize database queries and improve application performance',
      ]
    },
    {
      id: 2, company: 'IT Institute', position: 'Junior Instructor (Part-time)',
      duration: '2024 - 2025',
      responsibilities: [
        'Taught programming fundamentals in Java and Python',
        'Mentored students in web development projects',
        'Created curriculum materials for software engineering courses',
      ]
    },
  ]

  const projects = [
    {
      id: 1, title: 'Neusoft BloodBank', description: 'Enterprise blood bank management system built during internship at Neusoft. Features real-time inventory tracking, donor management, and cross-matching algorithms.',
      tech: ['Spring Boot', 'Vue.js', 'MySQL', 'Docker'], github: '#', demo: '#', image: '🩸', featured: true
    },
    {
      id: 2, title: 'FinPal', description: 'AI-powered personal finance assistant that analyzes spending patterns, predicts future expenses, and provides smart budgeting recommendations.',
      tech: ['Spring Boot', 'Python', 'NLP', 'Vue.js'], github: '#', demo: '#', image: '💰', featured: true
    },
    {
      id: 3, title: 'EcoHub AI', description: 'Environmental sustainability platform using AI to track carbon footprints, suggest eco-friendly alternatives, and gamify green habits.',
      tech: ['Django', 'React', 'Machine Learning', 'PostgreSQL'], github: '#', demo: '#', image: '🌿', featured: true
    },
    {
      id: 4, title: 'AI Smart Home System', description: 'IoT-based smart home automation system with voice control, occupancy detection, and energy optimization using ML algorithms.',
      tech: ['Python', 'TensorFlow', 'IoT', 'React Native'], github: '#', demo: '#', image: '🏠', featured: false
    },
    {
      id: 5, title: 'Paradox AI', description: 'Multi-purpose AI agent platform capable of autonomous decision-making, task planning, and natural language interactions.',
      tech: ['Java', 'Spring Boot', 'AI Agents', 'LLM Integration'], github: '#', demo: '#', image: '🤖', featured: true
    },
    {
      id: 6, title: 'AI Vibe and Roast', description: 'Fun social AI app that analyzes user content and provides witty commentary, personality insights, and creative responses.',
      tech: ['Vue.js', 'Node.js', 'NLP', 'OpenAI API'], github: '#', demo: '#', image: '🔥', featured: false
    },
    {
      id: 7, title: 'Battuta AI', description: 'AI-powered travel companion that generates personalized itineraries, provides local insights, and assists with real-time translation.',
      tech: ['Django', 'Vue.js', 'NLP', 'Google Maps API'], github: '#', demo: '#', image: '✈️', featured: true
    },
  ]

  const research = {
    thesis: 'Autonomous Multi-Agent Systems for Edge Computing in 6G Networks',
    topics: [
      { id: 1, name: 'Autonomous Multi-Agent Systems', description: 'Investigating cooperative behavior among AI agents in distributed environments for autonomous decision-making.', status: 'Ongoing' },
      { id: 2, name: '6G Edge Computing', description: 'Researching next-generation edge computing architectures that leverage AI for ultra-low latency and distributed intelligence.', status: 'Ongoing' },
      { id: 3, name: 'Swarm Robotics', description: 'Exploring swarm intelligence algorithms for coordinating autonomous robot teams in dynamic environments.', status: 'Ongoing' },
    ],
    publications: [
      { title: 'Multi-Agent Coordination in Edge Computing Environments', venue: 'IEEE International Conference on AI & Computing, 2025', type: 'Conference Paper' },
    ],
  }

  const achievements = {
    awards: [
      { id: 1, title: 'Douyin AI Innovation Accelerator', organization: 'Douyin / TikTok', year: '2025', description: 'Selected participant in prestigious AI innovation program recognizing top AI developers.' },
      { id: 2, title: 'ICT Olympiad Ambassador', organization: 'ICT Division, Bangladesh', year: '2024', description: 'Appointed as ambassador to promote ICT education and competitive programming among students.' },
      { id: 3, title: 'Robo Tech Valley Ambassador', organization: 'Robo Tech Valley', year: '2024', description: 'Represented robotics community in national technology events and workshops.' },
    ],
    certifications: [
      { title: 'Spring Boot Professional', issuer: 'Spring Academy', year: '2025' },
      { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
      { title: 'Machine Learning Specialization', issuer: 'Coursera / DeepLearning.AI', year: '2024' },
    ],
  }

  return {
    menuOpen, activeSection, navLinks, personalInfo, skills,
    experiences, projects, research, achievements,
    toggleMenu, closeMenu,
  }
})
