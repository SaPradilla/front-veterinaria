import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import productoService from "../services/productoService";
import { useAuthStore } from "./auth";
import {toast} from 'vue3-toastify'

export const useInventario = defineStore('inventario', () => {

    // Stores
    const Auth = useAuthStore()

    // states
    const medicinaData = ref({
        nombre:'',
        tipo_medicinaId:null,
        precio:'',
        volumen:'',
        fecha_venciminento:'',
        cantidad_total:''
    })

    const tipo_medicina = ref([])

    // Metodos
    
    const agregarMedicinas = ()=>{
        
        productoService.registrarMedicina(Auth.token,medicinaData.value)
        .then(res =>{
            console.log(res)
            toast.success('Medicina Registrada',{
                position: toast.POSITION.TOP_CENTER
            })
            Object.assign(medicinaData.value,{
                nombre:'',
                tipo_medicinaId:null,
                precio:'',
                volumen:'',
                fecha_venciminento:'',
                cantidad_total:''
            })
        })
        .catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
            toast.error('Error al Registrar la medicina',{
                position: toast.POSITION.TOP_CENTER
            })
        })

    }

    const verTipoMedicinas = ()=>{
        productoService.obtenerTipoMedicamentos(Auth.token)
        .then(res=>{
            tipo_medicina.value = res.data.tipo_medicina
        }).catch(err =>{
            // Auth.verificarSesion(err.)
            console.log(err)
        })
    }

    return {
        medicinaData,
        tipo_medicina,
        agregarMedicinas,
        verTipoMedicinas

    }
})
