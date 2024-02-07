import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import empleadoService from "../services/empleadoService"
import { useAuthStore } from "./auth";
import { useModals } from "./modals";
import {toast} from 'vue3-toastify'
import { usePaginacion } from "./paginacion";
import { useRouter} from 'vue-router'

export const useEmpleado = defineStore('empleado', () => {

    const router = useRouter()

    // Stores
    const Auth = useAuthStore()
    const Modals = useModals()
    const Paginacion = usePaginacion()
    // states
    const empleados = ref([])
    const empleado = ref({})
    const empleadoUpdate = ref({
        nombre: '',
        apellido: '',
        numero_celular: '',
        email: '',
        rol: '',
        isAdmin: null,
    })
    const perfilEmpleado = ref({})
    // Metodos
    
    const registrarEmpleado = (data) =>{

        empleadoService.registarEmpleado(Auth.token,data)
        .then(res =>{

            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER

            });
            // empleado.value = res.data.empleado
            setTimeout(()=>{
                router.push({name:'empleados'}) 
            },1000)
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data)
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(err)
        })
    }

    const verEmpleados = ()=>{
        empleadoService.obtenerEmpleados(Auth.token)
        .then(res=>{
            empleados.value = res.data.user
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
            return false
        })
    }

    const editarEmpleado = ()=>{
        empleadoService.editarEmpleado(Auth.token,empleadoUpdate.value.id,empleadoUpdate.value)
        .then(res =>{

            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            });
            Object.assign(empleadoUpdate.value,{
                nombre: '',
                apellido: '',
                numero_celular: '',
                email: '',
                rol: '',
                isAdmin: null,
            })
            setTimeout(()=>{
                router.push({name:'empleados'})
            },1000)
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data)
            toast.error(err.response.data.msg,{
                position: toast.POSITION.TOP_LEFT,
            });
            console.log(err)
        })
    }

    const cambiarEstadoEmpleado = (token,id) =>{
        const findEmpleado = empleados.value.find(empleado => empleado.id === id)
        if(findEmpleado){
            findEmpleado.isActive = !findEmpleado.isActive
        }
        empleadoService.cambiarEstado(token,id)

        .then(res=>{
             // Mensaje 
             toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
        .catch(err=>{
            Auth.verificarSesion(err.response.data)
            console.log(err)
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }

    const redigiriEditarEmpleado = (empleado)=>{
        empleadoUpdate.value = empleado
        router.push({name:'editar-empleado'})
    }
    const verPerfilEmpleado = (empleadoData)=>{

        empleado.value = empleadoData
        console.log(empleado)
        Modals.toggleModalEmpleado()

    }   
    const verEmpleado = (empleadoData)=>{

        perfilEmpleado.value = empleadoData

        router.push({name:'empleado'})


    }
    return {
        empleados,
        empleado,
        perfilEmpleado,
        empleadoUpdate,

        registrarEmpleado,
        verEmpleados,
        cambiarEstadoEmpleado,
        redigiriEditarEmpleado,
        editarEmpleado,
        verPerfilEmpleado,
        verEmpleado

    }
})
