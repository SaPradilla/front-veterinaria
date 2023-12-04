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
        console.log(mascota.value)
        console.log(Auth.token)
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
        mascotaService.obtenerMascotas(Auth.token,Paginacion.currentPage,Paginacion.size)
        .then(res=>{
            console.log(res)
            mascotas.value = res.data.Mascotas
        })
    }

    const cambiarEstadoMascota = (token,id) =>{
        
        console.log(token)
        console.log(id)
        mascotaService.cambiarEstado(token,id)

        .then(res=>{
            console.log(res)
             // Mensaje 
             toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
        .catch(err=>{
            console.log(err)
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
