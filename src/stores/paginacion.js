import { defineStore } from "pinia";
import { ref, reactive,computed,watch} from 'vue'
import { useMascota } from "./mascota";
import { useAuthStore } from "./auth";
import { useEmpleado } from "./empleado";
import {toast} from 'vue3-toastify'
import { useShop } from "./shop";
import { useCita } from "./citas";

export const usePaginacion = defineStore('paginacion', () => {
    
    //stores
    const Mascota = useMascota()
    const Auth = useAuthStore()
    const Empleado = useEmpleado()
    const Shop = useShop()
    const Citas = useCita()
    // states

    const size = ref(4);
    const currentPageMascota = ref(1); 
    const totalPagesMascota = ref(1)

    const currentPageEmpleado = ref(1); 
    const totalPagesEmpleado= ref(1)
  
    const sizeShop = ref(12)
    const currentPageShopMedicine = ref(1)
    const totalPagesShopMedicine = ref(1)

    const currentPageShopAccesory = ref(1)
    const totalPagesShopAccesory = ref(1)


    const currentPageCita = ref(1)
    const totalPagesCita= ref(1)

    // Empleado
    const cambiarPaginaEmpleado = () => {
        
        currentPageEmpleado.value += 1;

        Empleado.verEmpleados(Auth.token,currentPageEmpleado.value,size.value)
        .then(resultado => {
            if (!resultado) {
                currentPageEmpleado.value -= 1;
                toast.error('No hay mas informacion',{
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }).catch(err=>{
            Auth.verificarSesion(err.response.data)
        })
         
    };
    const cambiarPaginaAnteriorEmpleado = () => {
        
        currentPageEmpleado.value -= 1;
        Empleado.verEmpleados(Auth.token,currentPageEmpleado.value,size.value)
         
    };
    // Mascota 
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
        }).catch(err =>{
            Auth.verificarSesion(err.response.data)
        })
    };
    const cambiarPaginaAnteriorMascota = () => {
        
        currentPageMascota.value -= 1;
        Mascota.obtenerMascotas(Auth.token,currentPageMascota.value,size.value)
         
    };
    // Medicamento
    const cambiarPaginaMedicamento = ()=>{
        currentPageShopMedicine.value += 1
        Shop.verMedicamentos()
        .then(resultado => {
            if (!resultado) {
                currentPageShopMedicine.value -= 1;
                toast.error('No hay mas informacion',{
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }).catch(err =>{
            Auth.verificarSesion(err.response.data)
        })
    }
    const cambiarPaginaAnteriorMedicamento = () =>{
        currentPageShopMedicine.value -= 1
        Shop.verMedicamentos()
    }

    // Cita
    const cambiarPaginaCita = ()=>{
        currentPageCita.value += 1
        Citas.verCitas()
        .then(resultado => {
            if (!resultado) {
                currentPageCita.value -= 1;
                toast.error('No hay mas informacion',{
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }).catch(err =>{
            Auth.verificarSesion(err.response.data)
        })
    }
    const cambiarPaginaAnteriorCita = () =>{
        currentPageCita.value -= 1
        Citas.verCitas()
    }

    watch(() => currentPageCita.value, (newPage) => {
        
        totalPagesCita.value =  Math.ceil(Citas.citas.length / size.value);
        
    })


    watch(() => currentPageMascota.value, (newPage) => {
        
        totalPagesEmpleado.value =  Math.ceil(Mascota.mascotas.length / size.value);
        
    })
    watch(() => currentPageEmpleado.value, (newPage) => {
        
        totalPagesEmpleado.value =  Math.ceil(Empleado.empleados.length / size.value);
        
    })
    watch(() => currentPageShopMedicine.value, (newPage) => {
        
        totalPagesShopMedicine.value =  Math.ceil(Shop.medicamentos.length / sizeShop.value);
        
    })
    watch(() => currentPageShopAccesory.value, (newPage) => {
        
        totalPagesShopAccesory.value =  Math.ceil(Shop.accesorios.length / sizeShop.value);
        
    })

    
    
    return {
        currentPageCita,
        totalPagesCita,
        size,
        currentPageMascota,
        totalPagesMascota,
        currentPageEmpleado,
        totalPagesEmpleado,
        cambiarPaginaMascota,
        cambiarPaginaAnteriorMascota,
        cambiarPaginaEmpleado,
        cambiarPaginaAnteriorEmpleado,
        sizeShop,
        totalPagesShopMedicine,
        currentPageShopMedicine,
        totalPagesShopAccesory,
        currentPageShopAccesory,
        cambiarPaginaMedicamento,
        cambiarPaginaAnteriorMedicamento,
        cambiarPaginaCita,
        cambiarPaginaAnteriorCita,
    }
})
