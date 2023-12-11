import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import productoService from "../services/productoService";
import { usePaginacion } from "./paginacion";
import { useAuthStore } from "./auth";

export const useShop = defineStore('shop', () => {

    const Paginacion = usePaginacion()
    const Auth = useAuthStore()
    // States
    const medicamentos = ref([])
    const accesorios = ref([])

    const verMedicamentos = ()=>{
        return productoService.obtenerMedicamentos(Paginacion.currentPageShopMedicine,Paginacion.sizeShop)
        .then(res=>{
            // console.log()
            medicamentos.value = res.data.productos
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
            return false
        })
    }
    return {
        medicamentos,
        accesorios,
        verMedicamentos
    }   
})
