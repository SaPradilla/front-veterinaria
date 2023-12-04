import { defineStore } from "pinia";
import { ref, reactive,computed,watch} from 'vue'
import { useMascota } from "./mascota";
import { useAuthStore } from "./auth";

export const usePaginacion = defineStore('paginacion', () => {
    
    //stores
    const Mascota = useMascota()
    const Auth = useAuthStore()

    // states
    const size = ref(4);
    const currentPage = ref(1); 
    const totalPages = ref(1)

  
    const CalculartotalPages = computed(() => {
        // Calcular el número total de páginas
       

    })
  
    const cambiarPagina = () => {
        // Cambiar a la página seleccionada
        currentPage.value += 1;

        Mascota.obtenerMascotas(Auth.token,currentPage.value,size.value)
         
    };
    const cambiarPaginaAnterior = () => {
        // Cambiar a la página seleccionada
        currentPage.value -= 1;
        Mascota.obtenerMascotas(Auth.token,currentPage.value,size.value)
         
    };

    watch(() => currentPage.value, (newPage) => {
        console.log('se ejecuto')
        totalPages.value =  Math.ceil(Mascota.mascotas.length / size.value);
        console.log(Mascota.mascotas.length)
    }
    )
    // Metodos
    
    return {
        size,
        currentPage,
        totalPages,
        cambiarPagina,
        cambiarPaginaAnterior
        

    }
})
