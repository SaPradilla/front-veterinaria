import { createRouter, createWebHistory } from 'vue-router'
import inicioView from '../views/inicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: inicioView
    }
    , {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/authView.vue')
    },{
      path: '/admin',
      name: 'admin',
      component: () => import('../views/dashboardView.vue'),
      // Ruta protegida
      meta: { requireAuth: true },
    },{
      path: '/mascotas',
      name: 'mascotas',
      component: () => import('../views/mascotasView.vue'),
      // Ruta protegida
      meta: { requireAuth: true },
    },{
      path: '/tiendas',
      name: 'tiendas',
      component: () => import('../views/tiendasView.vue'),
      // Ruta protegida
      meta: { requireAuth: true },
    },{
      path: '/cirugias',
      name: 'cirugias',
      component: () => import('../views/cirugiasView.vue'),
      // Ruta protegida
      meta: { requireAuth: true },
    },{
      path: '/empleados',
      name: 'empleados',
      component: () => import('../views/empleadosView.vue'),
      // Ruta protegida
      meta: { requireAuth: true },
    }
  ]
})

// Validación para las rutas protegidas
router.beforeEach((to, from, next) => {
  //Busca si la la ruta protegida tiene un meta requeriAuth = true y retorna false o true
  if (to.matched.some(record => record.meta.requireAuth)) {

    if (localStorage.getItem('token')) {
      // sigue a la ruta protegida
      next()
    } else {
      // se sale de la ruta porque esta protegida
      next('/')

    }
  } else {
    // Si la ruta no requiere autenticación, permite el acceso
    next()
  }

})


export default router
