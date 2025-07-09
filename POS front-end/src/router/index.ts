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
        default: () => import('../views/pos/PosView.vue'),
        menu: () => import('../components/NavbarComponent.vue')
      },

      meta: {
        layout: 'mainLayout'
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
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
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
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
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
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
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
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
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
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
      }
    },
    {
      path: '/member',
      name: 'member',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/member/MemberView.vue'),
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
      }
    },
    {
      path: '/promotion',
      name: 'promotion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/promotion/PromotionView.vue'),
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout',
        role: ['admin', 'manager']
      }
    },
    {
      path: '/raw-material',
      name: 'raw-material',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/rawMaterial/RawMaterialView.vue'),
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
      }
    },
    {
      path: '/stock',
      name: 'stock',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/stock/StockView.vue'),
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
      }
    },
    {
      path: '/utility-bill',
      name: 'utility-bill',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/utility bill/UtilityBillView.vue'),
        menu: () => import('../components/NavbarComponent.vue')
      },
      meta: {
        layout: 'mainLayout'
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

router.beforeEach(async (to) => {
  if (!isAuthenticated() && to.name !== 'login') {
    return { name: 'login' }
  }
})

// router.beforeEach((to, from, next) => {
//   const userRole = localStorage.getItem('role') // ดึง role ของผู้ใช้จาก local storage

//   // ตรวจสอบว่า role ของผู้ใช้เป็น 'admin' หรือ 'editor'
//   if (to.meta.role && to.meta.role.includes(userRole)) {
//     next() // อนุญาตให้เข้าถึง route นั้น
//   } else {
//     next('/unauthorized') // หาก role ไม่ตรงให้ redirect ไปหน้า unauthorized
//   }
// })
export default router
