import { defineStore } from "pinia";
import { ref, reactive, onMounted} from 'vue'
import {toast} from 'vue3-toastify'
import mascotaService from "../services/mascotaService";
import { useAuthStore } from "./auth";
import { usePaginacion } from "./paginacion";
export const useMascota = defineStore('mascota', () => {
    // Stores
    const Paginacion = usePaginacion()

    const Auth = useAuthStore()
    // states
    const mascota = ref({
        clienteId: null,
        tipo_mascota: '',
        nombre: '',
        genero: null,
        edad: '',
        raza: '',
        vacunas:'',
    });
    const perfilMascota = ref({})

    const mascotas = ref([])

    // Metodos

    const registrarMascota = () =>{
        mascota.value.vacunas = JSON.stringify(mascota.value.vacunas)
        mascotaService.registarMascota(mascota.value,Auth.token)
        .then( res =>{
            console.log(res)
            // Mensaje 
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            })
            Object.assign(mascota.value,{
                clienteId: 1,
                tipo_mascota: '',
                nombre: '',
                genero: null,
                edad: '',
                raza: '',
                vacunas:'',
            })
        })
        .catch(err =>{
            console.log(err)
              // Mensaje 
              toast.error('Error al Registrar la Mascota',{
                position: toast.POSITION.TOP_CENTER
            })
        })
    }

    const obtenerMascotas = ()=>{
        return mascotaService.obtenerMascotas(Auth.token,Paginacion.currentPageMascota,Paginacion.size)
        .then(res=>{
            mascotas.value = res.data.Mascotas
            return true
        })
        .catch(err =>{
            return false
        })
    }

    const cambiarEstadoMascota = (token,id) =>{
        const findMascota = mascotas.value.find(mascota => mascota.id === id)
        if(findMascota){
            findMascota.isActive = !findMascota.isActive
        }
        mascotaService.cambiarEstado(token,id)

        .then(res=>{

             // Mensaje 
             toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
        .catch(err=>{
            console.log(err)
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }
    return {
        mascota,
        mascotas,
        perfilMascota,

        registrarMascota,
        obtenerMascotas,
        cambiarEstadoMascota

    }
})
