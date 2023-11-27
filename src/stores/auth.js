import { defineStore } from "pinia"
import {ref,onMounted} from 'vue'
import authService from "../services/authService"
import {toast} from 'vue3-toastify'
import {useModalAuthStore} from './modalAuth'
import { usePermisosUser } from "./permisosUser"
import { useRouter } from "vue-router"

export const useAuthStore = defineStore('auth', () =>{
    const router = useRouter ()

    const Permisos = usePermisosUser()

    const Modal = useModalAuthStore()

    const token = ref(null)

    const loguear = (data) =>{
        authService.loguear(data)
        .then(res =>{
            // Mensaje 
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_LEFT
            })
            console.log(res)
            // Guarda token
            localStorage.setItem('token', res.data.data.token)
        })
        .catch(err =>{
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT
            })
            console.log(err.response.data.msg)
        })
    }
    
    const registrar = (data)=>{
        authService.registar(data)
        .then(res =>{
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(res)
            Modal.handleClickModal()
        })
        .catch(err =>{
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(err)
        })
    }
    const loginEmpleado = (data)=>{
        authService.loguearEmpleado(data)
        .then(res =>{
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });

            console.log(res)
            localStorage.setItem('token', res.data.data.token)

            Permisos.rolUser = res.data.data.rol
            localStorage.setItem('rol', res.data.rol)

            router.push({name:res.data.rol})

        })
        .catch(err =>{
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(err.response.data.msg)
        })
    }
    
    const ObtenerToken = () => {
        // Obtiene el token de localstorage y si es existe
        if (localStorage.getItem('token')) {
          // Guarda el token en setToken y lo asigna a state
          token.value = localStorage.getItem('token')
        }
        return
    }
    const validarAdmin = (isAdmin) =>{

    }
    return{
        token,

        loguear,
        registrar,
        loginEmpleado
    }
})
