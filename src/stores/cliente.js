import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import clienteService from "../services/clienteService"
import { useAuthStore } from "./auth";
import { useModals } from "./modals";
export const useCliente = defineStore('cliente', () => {
    // Stores
    const Auth = useAuthStore()
    const Modals = useModals()
    // states
    const clientes = ref([])
    const cliente = ref({})
    // Metodos
    
    const verClientes = ()=>{
        clienteService.obtenerClientes(Auth.token)
        .then(res =>{
            console.log(res)
            clientes.value = res.data.Cliente
        }).catch(err =>{
            console.log(err)
        })
    }
    const verCliente = (id,token) =>{
        clienteService.obtenerCliente(id,token)
        .then(res =>{
            console.log(res)
            cliente.value = res.data.Cliente
            Modals.toggleModalCliente()
        }).catch(err =>{
            console.log(err)
        })
    }
    return {
        clientes,
        cliente,

        verClientes,
        verCliente,

    }
})
