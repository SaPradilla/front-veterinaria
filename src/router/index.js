import { createRouter, createWebHistory } from 'vue-router'
import inicioView from '../views/inicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas principales
    {
      path: '/',
      name: 'home',
      component: inicioView
    }, {
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

    },
    {
      path: '/tienda',
      name: 'tienda',
      component: () => import('../views/Tienda/tiendaView.vue'),
      children:[
        {
          path:'medicamentos',
          name:'medicamentos',
          component: ()=> import('../views/Tienda/MedicamentosView.vue')
        },
        {
          path:'accesorios',
          name:'accesorios',
          component: ()=> import('../views/Tienda/AccesoriosView.vue')
        },
      ]
    },
    // rutas de Administrador
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/adminView.vue'),
      // Ruta protegida
      meta: { requireAuth: true, allowedRoles: ['admin'] },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard/dashboardView.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'mascotas',
          name: 'mascotas',
          component: () => import('../views/Mascota/mascotasView.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'mascota',
          name: 'mascota',
          component: () => import('../views/Mascota/PerfilMascotaView.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'registrar-mascota',
          name: 'registro-mascota',
          component: () => import('../views/Mascota/RegistroMascotaView.vue'),
          meta: { requireAuth: true, allowedRoles: ['admin'] }

        },
        {
          path: 'editar-mascota',
          name: 'editar-mascota',
          component: () => import('../views/Mascota/EditarMascotaView.vue'),
          meta: { requireAuth: true, allowedRoles: ['admin'] }

        },
        {
          path: 'tiendas',
          name: 'tiendas',
          component: () => import('../views/Tienda/tiendasView.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'register-medicina',
          name: 'register-medicina',
          component: () => import('../views/Tienda/RegistroMedicina.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'editar-medicina',
          name: 'editar-medicina',
          component: () => import('../views/Tienda/EditarMedicina.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'register-accesorio',
          name: 'register-accesorio',
          component: () => import('../views/Tienda/RegistroAccesorio.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'editar-accesorio',
          name: 'editar-accesorio',
          component: () => import('../views/Tienda/EditarAcessorio.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'cirugias',
          name: 'cirugias',
          component: () => import('../views/Cirugias/cirugiasView.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {

          path: 'empleados',
          name: 'empleados',
          component: () => import('../views/Empleados/empleadosView.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {

          path: 'empleado',
          name: 'empleado',
          component: () => import('../views/Empleados/empleadoView.vue'),
          // Ruta protegida
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'registro-empleado',
          name: 'registro-empleado',
          component: () => import('../views/Empleados/RegistroEmpleadoView.vue'),
          meta: { requireAuth: true, allowedRoles: ['admin'] }

        },
        {
          path: 'editar-empleado',
          name: 'editar-empleado',
          component: () => import('../views/Empleados/EditarEmpleadoView.vue'),
          meta: { requireAuth: true, allowedRoles: ['admin'] }

        },
        {
          path: 'citas',
          name: 'citas',
          component: () => import('../views/Citas/citasView.vue'),
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'registrar-citas',
          name: 'registrar-citas',
          component: () => import('../views/Citas/registrarCitasView.vue'),
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        },
        {
          path: 'aceptar-citas',
          name: 'aceptar-citas',
          component: () => import('../views/Citas/AceptarCitaView.vue'),
          meta: { requireAuth: true, allowedRoles: ['admin'] }
        }
      ]
    },
    // rutas del cliente o usuario
    {
      path: '/cita',
      name: 'cita',
      component: () => import('../views/Citas/registrarCitasView.vue'),
      meta: { requireAuth: true, allowedRoles: ['cliente', 'admin'] }
    },
    {
      path: '/solicitud-cita',
      name: 'solicitud-cita',
      component: () => import('../views/Solicitud/registroSolicitudCita.vue'),
      meta: { requireAuth: true, allowedRoles: ['cliente', 'admin'] }

    },
    {
      path: '/solicitud-realizada',
      name: 'solicitud-realizada',
      component: () => import('../views/Solicitud/solicitudRealizada.vue'),
      meta: { requireAuth: true, allowedRoles: ['cliente', 'admin'] }

    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/User/PerfilUserView.vue'),
      meta: { requireAuth: true, requireRole: 'cliente' },
      children: [
        {
          path: '/perfil',
          name: 'info-perfil',
          component: () => import('../views/User/InfoUser.vue'),
          meta: { requireAuth: true, requireRole: 'cliente' },
        }
      ]
    },{
      path: '/registro-mascota',
      name: 'registro-mascota-user',
      component: () => import('../views/User/RegistrarMascota.vue'),
      meta: { requireAuth: true, requireRole: 'cliente' },


    }, {
      path: '/editar-mascota',
      name: 'editar-mascota-user',
      component: () => import('../views/User/EditarMascota.vue'),
      meta: { requireAuth: true, requireRole: 'cliente' },

    }, {
      path: '/aceptar-cita-medica/:id_cita/:id_cliente/:id_solicitud',
      name: 'aceptar-cita-medica',
      component: () => import('../views/Citas/AceptarCitaClienteView.vue'),
      meta: { requireAuth: true, requireRole: 'cliente' },

      props: true
    },
    {
      path: '/editar-perfil',
      name: 'editar-perfil',
      component: () => import('../views/User/EditarPerfilView.vue'),
      meta: { requireAuth: true, requireRole: 'cliente' },

    }
  ]
})

// Validación para las rutas protegidas
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (localStorage.getItem('token')) {
      if (to.matched.some(record => record.meta.allowedRoles)) {
        const userRole = localStorage.getItem('rol');
        const allowedRoles = to.meta.allowedRoles;
        if (allowedRoles.includes(userRole)) {
          next();
        } else {
          next('/');
        }
      } else {
        next();
      }
    } else {
      next('/');
    }
  } else {
    next();
  }
});
export default router
