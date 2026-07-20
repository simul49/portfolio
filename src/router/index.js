import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
  },
  {
    path: '/research',
    name: 'Research',
    component: () => import('../views/Research.vue'),
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('../views/Education.vue'),
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('../views/Achievements.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
