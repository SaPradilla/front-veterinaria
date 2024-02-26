import { defineStore } from "pinia";
import { ref, reactive,watch,computed,onMounted } from 'vue'
import productoService from "../services/productoService";
import { usePaginacion } from "./paginacion";
import { useAuthStore } from "./auth";
import { toast} from "vue3-toastify";
import { useRouter } from "vue-router";
import { usePermisosUser } from "./permisosUser";

export const useShop = defineStore('shop', () => {

    // const Paginacion = usePaginacion()
    const Auth = useAuthStore()
    const router = useRouter()

    // States
    const medicamentos = ref([])
    const accesorios = ref([])
    const productos = ref([])
    const carritoProducto = ref([])
    const producto = ref({})
    const Permisos = usePermisosUser()

    onMounted(()=>{
        Auth.ObtenerToken()
        Auth.extraerUserToken()
    })

    const ComprarCarrito = ()=>{
        console.log(Permisos.userLogin)
        productoService.comprarProductos(Auth.token,carritoProducto.value,Permisos.userLogin.id)
        .then(res=>{
            console.log(res)
            
            router.push({name:'pago-realizado'})
            
            vacear()

        }).catch(err=>{
            console.log(err)
        })
    }

    const verProductos = ()=>{
        productoService.obtenerProductos()
        .then(res=>{
            console.log(res)
            productos.value = res.data.producto
        }).catch(err=>{
            console.log(err)
        })
    }

    const verMedicamentos = ()=>{
        productoService.obtenerMedicamentos()
        .then(res=>{
            // console.log()
            medicamentos.value = res.data.productos
            return true
        })
        .catch(err =>{

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
        
        console.log(existeCarrito)
        if (existeCarrito >= 0) {
            carritoProducto.value[existeCarrito].cantidad++
            console.log('se ejecuto')
        } else {
            producto.cantidad = 1
            carritoProducto.value.push(producto)

            toast.success('Producto Agregado al Carrito', {
                position: toast.POSITION.TOP_CENTER,
                transition: toast.TRANSITIONS.BOUNCE,
                autoClose: 555,
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


    const cantidadItemCarrito = (id)=>{
        const index = carritoProducto.value.findIndex(producto => producto.id == id)
        if(carritoProducto.value[index]){
            return carritoProducto.value[index].cantidad.toString() 
        }
        return 
    }

    return {
        medicamentos,
        accesorios,
        carritoProducto,
        productos,
        producto,
        
        cantidadItemCarrito,
        decrementar,
        incrementar,
        eliminar,
        vacear,

        verProductos,
        verMedicamentos,
        agregarCarrito,
        verAccesorios,
        ComprarCarrito,
    }   
})
