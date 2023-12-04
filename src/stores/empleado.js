import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import empleadoService from "../services/empleadoService"
import { useAuthStore } from "./auth";
import { useModals } from "./modals";
import {toast} from 'vue3-toastify'

export const useEmpleado = defineStore('empleado', () => {
    // Stores
    const Auth = useAuthStore()
    const Modals = useModals()
    // states
    const empleados = ref([])
    const empleado = ref({})
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

    // const verClientes = ()=>{
    //     clienteService.obtenerClientes(Auth.token)
    //     .then(res =>{
    //         console.log(res)
    //         clientes.value = res.data.Cliente
    //     }).catch(err =>{
    //         console.log(err)
    //     })
    // }
    // const verCliente = (id,token) =>{
    //     clienteService.obtenerCliente(id,token)
    //     .then(res =>{
    //         console.log(res)
    //         cliente.value = res.data.Cliente
    //         Modals.toggleModalCliente()
    //     }).catch(err =>{
    //         console.log(err)
    //     })
    // }



    return {
        empleados,
        empleado,

        registrarEmpleado

    }
})
