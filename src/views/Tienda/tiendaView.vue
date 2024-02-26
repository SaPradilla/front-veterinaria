<script setup>
import HeaderVue from '../../components/UI/Header.vue'
import { ref, onMounted, watch,computed } from 'vue'
import { useShop } from '../../stores/shop'
import { ToastActions, toast } from 'vue3-toastify'
import { useAuthStore } from '../../stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { useFormatear } from '../../stores/formatear'
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';


const carrito = ref(false)


const Shop = useShop()
const Auth = useAuthStore()
const Formato = useFormatear()

const modal = ref(false)
const animar = ref(false)
const router = useRouter()
const route = useRoute()

const toggleCarrito = () => {
    carrito.value = !carrito.value
}

onMounted(() => {
    Auth.ObtenerToken()

    const carritoStorage = localStorage.getItem('carrito')
    if (carritoStorage) {
        //Convertir el json a arreglo 
        Shop.carritoProducto = JSON.parse(carritoStorage)
    }

})
const toggleModal = () => {
    carrito.value = !carrito.value

}
const totalPagar = computed(() => {

    return Shop.carritoProducto.reduce((total, producto) => {
        
        const precioProducto = producto.medicamento ? producto.medicamento.precio : producto.accesorio.precio;
        return total + (producto.cantidad * precioProducto);
    
    }, 0);
});

</script>

<template>
    <!-- Menu mobile -->
    <div class="modal" v-if="modal" :class="animar ? 'animar' : 'cerrar'">
        <img @click="toggleModal" class="x-menu" src="../../assets/img/X.svg" alt="menu">
        <div class="opciones-menu-mobile">
            <p>Medicamentos</p>
            <hr>
            <p>Accesorios</p>
        </div>
    </div>


    <!-- Carrito -->
    <Sidebar v-model:visible="carrito" header="carrito" position="right">
        <template #container="{ closeCallback }">
            <!-- Header carrito -->
            <div class="carrito-header">
                <div class="titulo-carrito">
                    <li class="pi pi-shopping-bag"></li>
                    <p>Carrito</p>
                </div>
                <Button type="button" @click="closeCallback" icon="pi pi-times" rounded></Button>
            </div>
            <!-- Contenido carrito -->
            <div class="carrito-screen">

                <div class="no-tiene" v-if="Shop.carritoProducto.length <= 0">
                    <h4>No tienes nada en </h4>
                    <h4>el carrito de compras</h4>
                </div>
                <div class="content-carrito">
                    <div v-for="product in Shop.carritoProducto" class="productos-carrito">
    
                        <div class="carta-producto-carrito">
                            <div class="contenedor-carta-carrito">
                                <div>
                                    <img class="imagen" :src="`http://localhost:6060/uploads/products/${product.imagen}`" />
                                    <p class="precio">{{ product.accesorioId ?  Formato.formatoDinero(product.accesorio.precio) :  Formato.formatoDinero(product.medicamento.precio) }} $</p>
                                </div>
                                <div class="detalles-carrito">
                                    <p class="nombre">{{ product.accesorioId === null ? product.medicamento.nombre : product.accesorio.nombre }}</p>
                                    <p class="tipo">{{ product.accesorioId === null ?
                                        product.medicamento.tipo_medicina.nombre :
                                        product.accesorio.tipo_accesorio.nombre }}</p>
                                    <p class="cantidad"> Cantidad <span>{{ product.cantidad }} </span> </p>
                                    <div class="acciones-carrito">
    
    
                                        <div class="contenedor-acciones">
                                            <p class="agregar-carrito" @click="Shop.incrementar(product.id)">+</p>
                                            <p v-if="product.cantidad > 1" class="restar-carrito"
                                                @click="Shop.decrementar(product.id)">-</p>
                                        </div>
    
    
                                        <div @click="Shop.eliminar(product.id)" class="borrar-carrito">
                                            <p>x</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
    
                    </div>

                </div>

                <!-- Botones del carrito -->
                <div v-if="Shop.carritoProducto.length > 0" class="botones-carrito">
                    <!-- <p>Total a Pagar: <span>$60,000 </span></p> -->
                    <div>

                        <p >Total: <strong> {{  Formato.formatoDinero(totalPagar) }} </strong> </p>
                        
                    </div>
                    <div class="boton-carrito">
                        <Button type="button"  @click="router.push({name:'pagar'})" label="Comprar" severity="success" rounded style="width: 100%;"/>
                    
                        <Button type="button" @click="router.push({name:'carrito'})" label="Ver Carrito" severity="success" rounded outlined style="width: 100%;" text />
                    </div>

                </div>

            </div>

        </template>
    </Sidebar>

    <!-- Tienda -->
    <div class="contenedor-tienda">

        <!-- Menu -->
        <div class="contenedor-header">
            <div class="anuncio">Los pedidos superiores a 60,000$ incluyen un cuido GRATIS.</div>
            <div class="header">

                <div class="productos">
                    <div class="titulo" @click="router.push('/')">
                        <img class="icono" src="../../assets/img/pelitos-4.png" alt="" srcset="">
                    </div>
                </div>

                <div class="seleccion ">
                    <div class="opciones">
                        <p @click="router.push({name:'todo'})"
                        :class="route.name === 'todo' ? 'selected' : '' "
                        >Ver todo</p>
                        <p 
                        :class="route.name === 'medicamentos' ? 'selected' : '' "
                        @click="router.push({name:'medicamentos'})">Medicamentos</p>
                        <p 
                        :class="route.name === 'accesorios' ? 'selected' : '' "
                        @click="router.push({name:'accesorios'})"
                        >Accesorios</p>
                    </div>
                </div>

                <div class="menu-shop">

                    <p v-if="Auth.token === null">Iniciar Sesion</p>

                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512">
                        <path fill="#ffffff"
                            d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8" />
                    </svg>
                    <Button @click="toggleCarrito" :badge="Shop.carritoProducto.length" icon="pi pi-shopping-bag"  rounded outlined="" /> 
                    <!-- <div  class="carrito">
                        <svg width="35" height="35" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M34.4 34.4C35.5404 34.4 36.6342 34.853 37.4406 35.6594C38.247 36.4658 38.7 37.5596 38.7 38.7C38.7 39.8404 38.247 40.9342 37.4406 41.7406C36.6342 42.547 35.5404 43 34.4 43C32.0135 43 30.1 41.065 30.1 38.7C30.1 36.3135 32.0135 34.4 34.4 34.4ZM0 0H7.0305L9.0515 4.3H40.85C41.4202 4.3 41.9671 4.52652 42.3703 4.92972C42.7735 5.33292 43 5.87978 43 6.45C43 6.8155 42.8925 7.181 42.742 7.525L35.045 21.4355C34.314 22.747 32.895 23.65 31.2825 23.65H15.265L13.33 27.1545L13.2655 27.4125C13.2655 27.5551 13.3221 27.6918 13.4229 27.7926C13.5237 27.8934 13.6604 27.95 13.803 27.95H38.7V32.25H12.9C10.5135 32.25 8.6 30.315 8.6 27.95C8.6 27.1975 8.7935 26.488 9.116 25.886L12.04 20.6185L4.3 4.3H0V0ZM12.9 34.4C14.0404 34.4 15.1342 34.853 15.9406 35.6594C16.747 36.4658 17.2 37.5596 17.2 38.7C17.2 39.8404 16.747 40.9342 15.9406 41.7406C15.1342 42.547 14.0404 43 12.9 43C10.5135 43 8.6 41.065 8.6 38.7C8.6 36.3135 10.5135 34.4 12.9 34.4ZM32.25 19.35L38.227 8.6H11.051L16.125 19.35H32.25Z"
                                fill="black" />
                        </svg>
                    </div> -->

                    <div class="menu-mobile" @click="toggleModal">
                        <img src="../../assets/img/MENU.svg" alt="menu">
                    </div>
                </div>

            </div>

        </div>

        <!-- Productos -->
        <div class="listado-productos">
            <RouterView/>
        </div>
        

    </div>

</template>

<style scoped>

.ver-carro{
    text-align: center;
    padding: 20px;
    font-size: 1em;
}
.anuncio{
    padding: 10px;
    color: white;
    text-align: center;
    background-color: var(--color-morado-general);
    font-size: .8em;
}
.titulo-carrito{
    display: flex;
    align-items: center;
    font-size: .8em;
    gap: 1vh;
}
.selected{
    color: var(--color-morado-general);
}
.modal {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(14px) brightness(100%);
    background-color: rgba(90, 15, 195, 0.5);
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;

}

.modal.animar {
    opacity: 1;
}

.modal.cerrar {
    opacity: 0;
}

.x-menu {
    cursor: pointer;
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px;
}

.menu-mobile {
    display: none;
    cursor: pointer;
}

.opciones-menu-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 700;
    color: white;
    font-size: 2em;
    gap: 20px;
}

.opciones-menu-mobile hr {
    width: 200px;
}


.opciones {
    display: flex;
    gap: 20px;
}


.carrito-screen {
    height: 100%;
    /* z-index: 4; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    /* background-color: white; */
    overflow-y: hidden;
}
.content-carrito{
    overflow-y: auto;
}

.botones-carrito {
    /* padding: 10px; */
    display: flex;
    flex-direction: column;
    gap:1em;
    /* position: absolute; */
    /* bottom: 0; */
}

.botones-carrito p {
    /* font-size: 1.6em; */
    text-align: center;
}

.botones-carrito span {
    font-weight: 700;
}

.boton-carrito {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* gap: 10px; */
    padding: 20px;
    gap: 1em;
}

.comprarCarrito,
.vaciar {
    border-radius: 30px;
    padding: 10px;
    width: 90px;
    text-align: center;
    /* font-size: 1em; */
}

.comprarCarrito {
    font-weight: 700;
    color: white;
    font-size: .9em;
    background-color: rgba(52, 135, 65, 1);
    cursor: pointer;

}

.vaciar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background-color: rgb(136, 136, 136);
    font-weight: 700;
    color: white;
    font-size: .9em;
    cursor: pointer;

}

.carrito-header {
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 2em;
    /* padding: 10px; */
    align-items: center;
    padding: 20px;
    background-color: var(--color-morado-general);
}

.carrito-header p {
    cursor: pointer;
}

.no-tiene {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
}

.no-tiene h4 {
    color: rgba(138, 124, 121, 1);
    font-weight: 600;
}

.productos-carrito {
    display: flex;
    flex-direction: column;
}

.contenedor-carta-carrito {
    display: flex;
    padding: 20px;
    gap: 10px;
}

p.precio {
    margin-top: 10px;
    text-align: left;
    font-weight: 500;
    color: rgba(183, 183, 183, 1);
}

.carta-producto-carrito .imagen {
    height: 15vh;
    width: 120px;
    border-radius: 7px;
    background-color: rgba(217, 217, 217, 1);
}

.productos-carrito hr {
    /* width: 350px; */
    margin: 0 auto;
}

.detalles-carrito {
    display: flex;
    width: 20vh;
    flex-direction: column;
    gap: 10px;
}


.acciones-carrito {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

.contenedor-acciones {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
}

p.agregar-carrito {
    font-size: 2em;
    color: rgba(52, 135, 65, 1);
    font-weight: 600;
}

p.restar-carrito {
    font-size: 2.5em;
    color: var(--color-rojo);
    font-weight: 600;
    margin-bottom: 4px;
}

.borrar-carrito {
    background-color: var(--color-rojo);
    border-radius: 100%;
    height: 30px;
    width: 30px;
    padding: 2px;
    cursor: pointer;

}

.borrar-carrito p {
    color: white;
    font-weight: 600;
    font-size: 1.3em;
    text-align: center;
}

.contenedor-tienda {
    /* padding: 40px; */
}

.contenedor-header {
    /* z-index: 1000; */
    position: fixed;
    background-color: rgba(255, 255, 255, 0.828);
    width: 100%;
    height: max-content;
    border-bottom: solid 1px #eee;
    /* box-shadow: 0px 15px 15px -3px rgba(0, 0, 0, 0.1); */
}

h2 {
    font-size: 2.2em;
    font-weight: 600;
}

.header {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    align-items: center;
}

.icono {
    /* display: flex;
    align-items: center;
    gap: 2vh; */

}

.menu-shop {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
}

.menu-shop path {
    fill: black;
}

.titulo {
    cursor: pointer;
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.titulo h1 {
    font-weight: 600;
    font-size: 3em;
}

.titulo p {}


.seleccion {
    margin-top: 1vh;
    display: flex;
    gap: 5vh;
}

.seleccion p {
    cursor: pointer;
    font-weight: 600;
    /* color: black; */
    /* rgba(138, 124, 121, 1) */
    font-size: 20px;
}



p.nombre {
    align-self: stretch;

    font-size: clamp(0.5em, 5vw, 1em);
    font-weight: 700;
}

p.tipo {
    font-weight: 600;
}

p.cantidad {
    font-weight: 500;

    font-size: 1.2em;
}

p.cantidad span {
    font-weight: 700;
    color: var(--color-morado-general);
}
@media (max-width: 768px) {
    .opciones {
        display: none;
    }

    .menu-mobile {
        display: inline;
    }
}
</style>
