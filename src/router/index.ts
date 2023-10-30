import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'layout',
      component: () => import('../layout/UserLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
            path: '/asistente',
            name: 'asistente',
            component: () => import('../views/AsisstantView.vue')
        },
        {
            path: '/base-de-datos',
            name: 'base-de-datos',
            component: () => import('../views/DataBaseView.vue')
        }
      ]
    },

  ]
})

export default router
