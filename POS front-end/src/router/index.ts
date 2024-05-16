import { TurnLeft } from '@mui/icons-material'
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
        default: () => import('../views/pos/PosView.vue'),
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
        default: () => import('../views/product/ProductView.vue'),
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
        default: () => import('../views/employee/EmployeeView.vue'),
        menu: () => import('../components/Navbar.vue')
      },
      meta: {
        layout: 'mainLaout'
      }
    },
    {
      path: '/history',
      name: 'history',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/HistoryView.vue'),
        menu: () => import('../components/Navbar.vue')
      },
      meta: {
        layout: 'mainLaout'
      }
    },
    {
      path: '/chart',
      name: 'chart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/ChartView.vue'),
        menu: () => import('../components/Navbar.vue')
      },
      meta: {
        layout: 'mainLaout'
      }
    },
    {
      path: '/check-in',
      name: 'check-in',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/CheckInCheckOutView.vue'),
        menu: () => import('../components/Navbar.vue')
      },
      meta: {
        layout: 'mainLaout'
      }
    },
    {
      path: '/member',
      name: 'member',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/MemberView.vue'),
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

function isAuthenticated() {
  const employee = localStorage.getItem('employee')
  if (employee) return true
  return false
}

router.beforeEach(async (to, form) => {
  if (!isAuthenticated() && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
