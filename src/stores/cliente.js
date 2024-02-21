import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import clienteService from "../services/clienteService"
import { useAuthStore } from "./auth";
import { useModals } from "./modals";
import {toast} from 'vue3-toastify'
import { useRouter } from "vue-router";
export const useCliente = defineStore('cliente', () => {
    // Stores
    const Auth = useAuthStore()
    const Modals = useModals()
    // states
    const clientes = ref([])
    const cliente = ref({})
    const mascotasCliente = ref([])
    const clienteUpdate = ref({})
    const router = useRouter()
    // Metodos
    
    const actualizarCliente = () => {
        clienteService.editarCliente(Auth.token,clienteUpdate.value.id,clienteUpdate.value)
        
        .then(res =>{
            console.log(res)
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            });
            // se actualiza al token
            Auth.token = res.data.token
            localStorage.setItem('token',res.data.token)
            Auth.extraerUserToken()
            
            setTimeout(()=>{
                router.push({name:'info-perfil'}) 
            },100)

        }).catch(err => console.log(err))
    }

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
        clienteUpdate,

        verCliente,
        verClientes,
        verClienteAdmin,
        verMascotasCliente,
        actualizarCliente,
    }
})
