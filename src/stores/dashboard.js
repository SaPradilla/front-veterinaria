import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'
import {useMascota} from './mascota'
import { useEmpleado } from "./empleado";
export const useDashboard = defineStore('dashboard',  () =>{
    const router = useRouter ()
    const Mascota = useMascota()
    const Empleado = useEmpleado()
    // states


    // Vistas generales
    const mascota = ref(false)
    const dashboard = ref(false)
    const tienda = ref(false)
    const cirugias = ref(false)
    const empleados = ref(false)

    // Vistas hijas
    const registroMascota = ref(false)
    const inicioMascota = ref(true)
    const verMascota = ref(false)
    const verEmpleado = ref(false)

    const registroEmpleado = ref(false)
    const inicioEmpleado = ref(true)

    // Metodos

    const handleMascota = ()=>{
        dashboard.value = false
        tienda.value = false
        empleados.value = false
        
        mascota.value = true
        inicioMascota.value = true
        registroMascota.value = false
        verMascota.value = false
        router.push({name:'mascotas'})
    }
    const handleRegistroMascota = ()=>{
        inicioMascota.value = false
        registroMascota.value = true
    }
    const handleVolver = () =>{   
        inicioMascota.value = true
        registroMascota.value = false
        verMascota.value = false   
    }

    const handleVolverEmpleado = () =>{   
        registroEmpleado.value = false
        verEmpleado.value = false
        inicioEmpleado.value = true
    }
    const handleVerMascota = (mascota) =>{
        registroMascota.value = false
        inicioMascota.value = false
        verMascota.value = true
        console.log(mascota)
        Mascota.perfilMascota = mascota
        
    }

    const handleDashboard = () =>{
        dashboard.value = true
        tienda.value = false
        cirugias.value = false
        empleados.value = false
        mascota.value = false
        inicioMascota.value = false
        registroMascota.value = false
        verMascota.value = false
        router.push({name:'admin'})
    }

    const handleTienda = () =>{
        tienda.value = true
        cirugias.value = false
        empleados.value = false
        dashboard.value = false
        mascota.value = false
        inicioMascota.value = false
        registroMascota.value = false
        verMascota.value = false
        router.push({name:'tiendas'})
    }

    const handleCirugia = () =>{
        cirugias.value = true
        empleados.value = false
        tienda.value = false
        dashboard.value = false
        mascota.value = false
        inicioMascota.value = false
        registroMascota.value = false
        verMascota.value = false
        router.push({name:'cirugias'})
    }

    const handleEmpleados = () =>{
        empleados.value = true
        mascota.value = false
        cirugias.value = false
        tienda.value = false
        dashboard.value = false
        mascota.value = false
        inicioMascota.value = false
        registroMascota.value = false
        verMascota.value = false
        router.push({name:'empleados'})
    }

    const handleRegistroEmpleado = () =>{

        registroEmpleado.value = true
        
        inicioEmpleado.value = false
        mascota.value = false
        cirugias.value = false
        tienda.value = false
        dashboard.value = false
        mascota.value = false
        inicioMascota.value = false
        registroMascota.value = false
        verMascota.value = false

    }
    const handleVerEmpleado = (empleado)=>{
        verEmpleado.value = true
        inicioEmpleado.value = false
        Empleado.perfilEmpleado = empleado
    }
    return {
        mascota,
        registroMascota,
        dashboard,
        inicioMascota,
        verMascota,
        tienda,
        cirugias,
        empleados,
        inicioEmpleado,
        registroEmpleado,
        verEmpleado,
        
        handleMascota,
        handleRegistroMascota,
        handleVolver,
        handleVerMascota,
        handleDashboard,
        handleTienda,
        handleCirugia,
        handleEmpleados,
        handleRegistroEmpleado,
        handleVolverEmpleado,
        handleVerEmpleado,
        
    }
})
