import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import empleadoService from "../services/empleadoService"
import { useAuthStore } from "./auth";
import { useModals } from "./modals";
import {toast} from 'vue3-toastify'
import { usePaginacion } from "./paginacion";

export const useEmpleado = defineStore('empleado', () => {
    // Stores
    const Auth = useAuthStore()
    const Modals = useModals()
    const Paginacion = usePaginacion()
    // states
    const empleados = ref([])
    const empleado = ref({})
    
    const perfilEmpleado = ref({})
    // Metodos
    
    const registrarEmpleado = (data) =>{

        empleadoService.registarEmpleado(Auth.token,data)
        .then(res =>{
            console.log(res)
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER

            });
            empleado.value = res.data.empleado
        })
        .catch(err =>{
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(err)
        })
    }

    const verEmpleados =()=>{
        empleadoService.obtenerEmpleados(Auth.token,Paginacion.currentPage,Paginacion.size)
        .then(res =>{
            console.log(res)
            empleados.value = res.data.user
        }).catch(err =>{

            console.log(err)
        })
    }
    return {
        empleados,
        empleado,
        perfilEmpleado,

        registrarEmpleado,
        verEmpleados

    }
})
