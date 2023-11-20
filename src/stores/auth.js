import { defineStore } from "pinia"
import {ref} from 'vue'
import authService from "../services/authService"
import {toast} from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () =>{

    const token = ref(null)

    const loguear = (data) =>{
        authService.loguear(data)
        .then(res =>{
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(res)
        })
        .catch(err =>{
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
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
        })
        .catch(err =>{
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(err.response.data.msg)
        })
    }
    
    return{
        token,

        loguear,
        registrar,
        loginEmpleado
    }
})
