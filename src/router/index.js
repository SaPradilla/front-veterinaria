import { createRouter, createWebHistory } from 'vue-router'
import inicioView from '../views/inicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: inicioView
    },{
      path: '/auth',
      name: 'auth',
      component: () => import('../views/Auth/authView.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          // Si el usuario está autenticado, redirige a la página de inicio
          next('/');
        } else {
          // Si el usuario no está autenticado, permite el acceso a la página de inicio de sesión
          next();
        }
      }

    },{
      path: '/cita',
      name: 'cita',
      component: () => import('../views/Citas/registrarCitasView.vue')
      
    },
    {
      path: '/solicitud-cita',
      name: 'solicitud-cita',
      component: () => import('../views/Solicitud/registroSolicitudCita.vue')
      
    },
    {
      path: '/tienda',
      name: 'tienda',
      component: () => import('../views/Tienda/tiendaView.vue')
      
    },
    {
      path: '/solicitud-realizada',
      name: 'solicitud-realizada',
      component: () => import('../views/Solicitud/solicitudRealizada.vue')
      
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/adminView.vue'),
      // Ruta protegida
      meta: { requireAuth: true },
      children:[
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard/dashboardView.vue'),
          // Ruta protegida
          meta: { requireAuth: true },
        },
        {
          path: 'mascotas',
          name: 'mascotas',
          component: () => import('../views/Mascota/mascotasView.vue'),
          // Ruta protegida
          meta: { requireAuth: true },
        },
        {
          path:'registrar-mascota',
          name:'registro-mascota',
          component: ()=> import('../views/Mascota/RegistroMascotaView.vue'),
          meta: { requireAuth: true },

        },
        {
          path:'editar-mascota',
          name:'editar-mascota',
          component: ()=> import('../views/Mascota/EditarMascotaView.vue'),
          meta: { requireAuth: true },

        },
        {
          path: 'tiendas',
          name: 'tiendas',
          component: () => import('../views/Tienda/tiendasView.vue'),
          // Ruta protegida
          meta: { requireAuth: true },
        },
        {
          path: 'register-medicina',
          name: 'register-medicina',
          component: () => import('../views/Tienda/RegistroMedicina.vue'),
          // Ruta protegida
          meta: { requireAuth: true },
        },
        {
          path: 'cirugias',
          name: 'cirugias',
          component: () => import('../views/Cirugias/cirugiasView.vue'),
          // Ruta protegida
          meta: { requireAuth: true },
        },
        {
          
          path: 'empleados',
          name: 'empleados',
          component: () => import('../views/Empleados/empleadosView.vue'),
          // Ruta protegida
          meta: { requireAuth: true },
        },
        {
          
          path: 'empleado',
          name: 'empleado',
          component: () => import('../views/Empleados/empleadoView.vue'),
          // Ruta protegida
          meta: { requireAuth: true },
        },
        {
          path:'registro-empleado',
          name:'registro-empleado',
          component: ()=> import('../views/Empleados/RegistroEmpleadoView.vue'),
          meta: { requireAuth: true },

        },
        {
          path:'editar-empleado',
          name:'editar-empleado',
          component: ()=> import('../views/Empleados/EditarEmpleadoView.vue'),
          meta: { requireAuth: true },

        },
        {
          path:'citas',
          name:'citas',
          component: ()=> import('../views/Citas/citasView.vue'),
          meta: { requireAuth: true },

        }
      ]
    }
  ]
})

// Validación para las rutas protegidas
router.beforeEach((to, from, next) => {
  //Busca si la la ruta protegida tiene un meta requeriAuth = true y retorna false o true
  if (to.matched.some(record => record.meta.requireAuth)) {

    if (localStorage.getItem('token')) {
      
      if(localStorage.getItem('rol') === 'cliente'){
        next('/')
      }
      else{

        next()
      }
      
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
