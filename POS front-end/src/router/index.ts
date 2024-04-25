import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'fullLayout'
      }
    },
    {
      path: '/pos',
      name: 'pos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/PosView.vue'),
        menu: () => import('../components/Navbar.vue')
      },

      meta: {
        layout: 'mainLaout'
      }
    },
    {
      path: '/product',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/ProductView.vue'),
        menu: () => import('../components/Navbar.vue')
      },
      meta: {
        layout: 'mainLaout'
      }
    },
    {
      path: '/employee',
      name: 'employee',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/EmployeeView.vue'),
        menu: () => import('../components/Navbar.vue')
      },
      meta: {
        layout: 'mainLaout'
      }
    }
  ]
})

export default router
