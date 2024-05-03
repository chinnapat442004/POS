import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/LoginView.vue')
      },
      meta: {
        layout: 'fullLaout'
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
    // {
    //   path: '/login',
    //   name: 'login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   components: {
    //     default: () => import('../views/LoginView.vue')
    //   },
    //   meta: {
    //     layout: 'fullLaout'
    //   }
    // }
  ]
})

export default router
