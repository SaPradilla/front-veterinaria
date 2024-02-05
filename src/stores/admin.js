import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'
import {useMascota} from './mascota'
import { useEmpleado } from "./empleado";
export const useAdmin = defineStore('admin',  () =>{

    const router = useRouter ()
    const Mascota = useMascota()
    const Empleado = useEmpleado()
    // states


    // Metodos

    const handleMascota = ()=>{
        router.push({name:'mascotas'})
    }
    const handleRegistroMascota = ()=>{
        router.push({name:'registro-mascota'})

    }
    const handleEmpleado = () =>{
        router.push({name:'empleados'})
    }
    const handleRegistroEmpleado = ()=>{
        router.push({name:'registro-empleado'})
    }

    const handleDashboard = () =>{
        router.push({name:'dashboard'})
    }
    const handleTienda = () =>{
        router.push({name:'tiendas'})
    }
    const handleCirugia = () =>{
        router.push({name:'cirugias'})
    }
    const handlRegistrarMedicinas = () =>{
        router.push({name:'register-medicina'})
    }
    const handlRegistrarAccesorio = () =>{
        router.push({name:'register-accesorio'})
    }
    const handlCitas = () =>{
        router.push({name:'citas'})
    }

    return {
        handleMascota,
        handleTienda,
        handleCirugia,
        handleDashboard,
        handleEmpleado,
        handleRegistroMascota,
        handleRegistroEmpleado,
        handlRegistrarAccesorio,
        handlRegistrarMedicinas,
        handlCitas,
    }
})
