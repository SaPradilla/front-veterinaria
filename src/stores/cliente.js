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
    const mascotasCliente = ref([])
    // Metodos
    
    const verClientes = ()=>{
        clienteService.obtenerClientes(Auth.token)
        .then(res =>{
            // console.log(res)
            
            clientes.value = res.data.Cliente
        }).catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
        })
    }
    const verClienteAdmin = (id,token) =>{
        clienteService.obtenerClienteAdmin(id,token)
        .then(res =>{
            // console.log(res)
            cliente.value = res.data.Cliente
            Modals.toggleModalCliente()
        }).catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
        })
    }
    const verCliente = (id,token) =>{

        clienteService.obtenerCliente(id,token)
        .then(res =>{
            // console.log(res)
            cliente.value = res.data.Cliente
            Modals.toggleModalCliente()
            
        }).catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
        })
    }
    const verMascotasCliente = (id) => {
        clienteService.obtenerMascotasCliente(Auth.token,id)

        .then(res =>{
            console.log(res)
            mascotasCliente.value = res.data.Pets 
            
        }).catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
        })
    }
    return {
        clientes,
        cliente,
        mascotasCliente,

        verCliente,
        verClientes,
        verClienteAdmin,
        verMascotasCliente,
    }
})
