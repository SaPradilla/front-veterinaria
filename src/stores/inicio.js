import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'
import {toast} from 'vue3-toastify'
import {useUltimasPaginas} from './ultimasPaginas'


export const useInicio = defineStore('inicio',  () =>{
    
    const Pagina = useUltimasPaginas()
    const Router = useRouter()
    const scrolled = (false)
    const modalOptions = ref()

    const handleMenu = (event) => {
        console.log(event)
        modalOptions.value.toggle(event);
    }

    const redirigirSolicitudCita = ()=>{

        Pagina.ultimaPagina = 'solicitud-cita'
        if (localStorage.getItem('rol') && localStorage.getItem('token')) {
            Router.push({name:'solicitud-cita'})

        }
        else{
            toast.warn('Inicia sesion para continuar',{
                position: toast.POSITION.TOP_CENTER
            })
            setTimeout(()=>{
                Router.push({name:'auth'})
            },1000)
        }
    }
    
    return {
        redirigirSolicitudCita,
        scrolled,
        handleMenu,
        modalOptions
    }
})
