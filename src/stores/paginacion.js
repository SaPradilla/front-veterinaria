import { defineStore } from "pinia";
import { ref, reactive,computed,watch} from 'vue'
import { useMascota } from "./mascota";
import { useAuthStore } from "./auth";
import { useEmpleado } from "./empleado";
import {toast} from 'vue3-toastify'

export const usePaginacion = defineStore('paginacion', () => {
    
    //stores
    const Mascota = useMascota()
    const Auth = useAuthStore()
    const Empleado = useEmpleado()

    // states
    const size = ref(4);
    const currentPageMascota = ref(1); 
    const totalPagesMascota = ref(1)

    const currentPageEmpleado = ref(1); 
    const totalPagesEmpleado= ref(1)
  
    const CalculartotalPages = computed(() => {
        // Calcular el número total de páginas
       
    })

    const cambiarPaginaEmpleado = () => {
        
        currentPageEmpleado.value += 1;

        Empleado.verEmpleados(Auth.token,currentPageEmpleado.value,size.value)
         
    };
    const cambiarPaginaAnteriorEmpleado = () => {
        
        currentPageEmpleado.value -= 1;
        Empleado.verEmpleados(Auth.token,currentPageEmpleado.value,size.value)
         
    };
    const validarPagina = () =>{

    }
    const cambiarPaginaMascota = () => {
                
        currentPageMascota.value += 1;
        Mascota.obtenerMascotas(Auth.token,currentPageMascota.value,size.value)
        .then(resultado => {
            if (!resultado) {
                currentPageMascota.value -= 1;
                toast.error('No hay mas informacion',{
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        });
        
         
    };
    const cambiarPaginaAnteriorMascota = () => {
        
        currentPageMascota.value -= 1;
        Mascota.obtenerMascotas(Auth.token,currentPageMascota.value,size.value)
         
    };

    watch(() => currentPageMascota.value, (newPage) => {
        
        totalPagesEmpleado.value =  Math.ceil(Mascota.mascotas.length / size.value);
        
    })
    watch(() => currentPageEmpleado.value, (newPage) => {
        
        totalPagesEmpleado.value =  Math.ceil(Empleado.empleados.length / size.value);
        
    })
    // Metodos
    
    return {
        size,
        currentPageMascota,
        totalPagesMascota,
        currentPageEmpleado,
        totalPagesEmpleado,
        cambiarPaginaMascota,
        cambiarPaginaAnteriorMascota,
        cambiarPaginaEmpleado,
        cambiarPaginaAnteriorEmpleado
        

    }
})
