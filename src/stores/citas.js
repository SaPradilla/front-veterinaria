import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'
import {toast} from 'vue3-toastify'
import {useUltimasPaginas} from './ultimasPaginas'
import citasService from "../services/citasService";
import { useAuthStore } from "./auth";
import { usePaginacion } from "./paginacion";

export const useCita= defineStore('citas',  () =>{

    const Auth = useAuthStore()
    const Paginacion = usePaginacion()

    const citas = ref([])
    const solicitudes = ref([])


    const verCitas = () =>{
        
        return citasService.obtenerCitas(Auth.token,Paginacion.currentPageCita,Paginacion.totalPagesCita)
        .then(res=>{
            citas.value = res.data.CitaMedica
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
            return false
        })
    }

    const verSolicitudes = ()=>{
        citasService.obtenerSolicitudes(Auth.token)
        .then(res=>{
            solicitudes.value = res.data.solicitudes
        }).catch(err => console.log(err))
    }

    const aprobarSolicitud = (id)=>{
        citasService.aprobarSolicitudes(Auth.token,id)
        .then(res=>{

            toast.success('Solicitud Aprobada',{
                position: toast.POSITION.TOP_RIGHT
            })

        }).catch(err => console.log(err))
    }

    return {
        verCitas,
        citas,
        solicitudes,
        verSolicitudes,
        aprobarSolicitud
    }
})
