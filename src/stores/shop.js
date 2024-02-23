import { defineStore } from "pinia";
import { ref, reactive,watch } from 'vue'
import productoService from "../services/productoService";
import { usePaginacion } from "./paginacion";
import { useAuthStore } from "./auth";
import { toast} from "vue3-toastify";
export const useShop = defineStore('shop', () => {

    // const Paginacion = usePaginacion()
    const Auth = useAuthStore()
    // States
    const medicamentos = ref([])
    const accesorios = ref([])

    const carritoProducto = ref([])


    const verMedicamentos = ()=>{
        productoService.obtenerMedicamentos()
        .then(res=>{
            // console.log()
            medicamentos.value = res.data.productos
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
            return false
        })
    }
    
    const verAccesorios = ()=>{
        productoService.obtenerAcesorios()
        .then(res=>{

            accesorios.value = res.data.productos
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
            return false
        })
    }
    
    watch(carritoProducto, () => {
        guardarLocalStorage()
    }, {
        deep: true
    })
    const guardarLocalStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(carritoProducto.value))
    }

    const agregarCarrito = (producto) => {

        const existeCarrito = carritoProducto.value.findIndex(findProducto => findProducto.id == producto.id)
    
        if (existeCarrito >= 0) {
            carritoProducto.value[existeCarrito].cantidad++
        } else {
            producto.cantidad = 1
            carritoProducto.value.push(producto)
            toast.success('Producto Agregado al Carrito', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const decrementar = (id) => {

        const index = carritoProducto.value.findIndex(producto => producto.id == id)
        if (carritoProducto.value[index].cantidad <= 1) return
        carritoProducto.value[index].cantidad--
    }
    const incrementar = (id) => {
        //Encuentra la posicion cuando la condicion se cumpla
        const index = carritoProducto.value.findIndex(producto => producto.id == id)
        carritoProducto.value[index].cantidad++
    }
    const eliminar = (id) => {
        //Trae los registros segun la condicion 
        carritoProducto.value = carritoProducto.value.filter(producto => producto.id !== id)
    }
    const vacear = () => {
        carritoProducto.value = []
    }


    return {
        medicamentos,
        accesorios,
        carritoProducto,

        decrementar,
        incrementar,
        eliminar,
        vacear,

        verMedicamentos,
        agregarCarrito,
        verAccesorios
    }   
})
