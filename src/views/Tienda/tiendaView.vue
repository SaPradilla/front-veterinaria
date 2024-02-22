<script setup>
import HeaderVue from '../../components/UI/Header.vue'
import { ref, onMounted, watch } from 'vue'
import { useShop } from '../../stores/shop'
import { ToastActions, toast } from 'vue3-toastify'
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
const carrito = ref(false)
const carritoProducto = ref([])
const Shop = useShop()
const Auth = useAuthStore()
const modal = ref(false)
const animar = ref(false)
const router = useRouter()

const toggleCarrito = () => {
    carrito.value = !carrito.value
}

onMounted(() => {
    Auth.ObtenerToken()
    Shop.verMedicamentos()
    console.log(Shop.medicamentos)

    const carritoStorage = localStorage.getItem('carrito')
    if (carritoStorage) {
        //Convertir el json a arreglo 
        carritoProducto.value = JSON.parse(carritoStorage)
    }

})
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


const toggleModal = () => {
    carrito.value = !carrito.value

}


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
    <Sidebar v-model:visible="carrito" header="carrito" position="right" >
        <template #container="{ closeCallback }">
            <!-- Header carrito -->
            <div class="carrito-header">
                <p>Carrito</p>
                <Button type="button" @click="closeCallback" icon="pi pi-times"  rounded ></Button>
            </div>
            <!-- Contenido carrito -->
            <div class="carrito-screen">

                <div class="contenido-carrito">

                    

                    <div class="no-tiene" v-if="carritoProducto.length <= 0">
                        <h4>No tienes nada </h4>
                        <h4>el carrito de compras</h4>
                    </div>

                    <div v-for="product in carritoProducto" class="productos-carrito">

                        <div class="carta-producto-carrito">
                            <div class="contenedor-carta-carrito">
                                <div>
                                    <img class="imagen"  :src="`http://localhost:6060/uploads/products/${product.imagen}`"/>
                                    <p class="precio">{{ product.accesorioId === null ? product.medicamento.precio :
                                        product.accesorio.precio }} $</p>
                                </div>
                                <div class="detalles-carrito">
                                    <p class="nombre">{{ product.accesorioId === null ? product.medicamento.nombre :
                                        product.accesorio.nombre }}</p>
                                    <p class="tipo">{{ product.accesorioId === null ?
                                        product.medicamento.tipo_medicina.nombre :
                                        product.accesorio.tipo_accesorio.nombre }}</p>
                                    <p class="cantidad"> Cantidad <span>{{ product.cantidad }} </span> </p>
                                    <div class="acciones-carrito">


                                        <div class="contenedor-acciones">
                                            <p class="agregar-carrito" @click="incrementar(product.id)">+</p>
                                            <p v-if="product.cantidad > 1" class="restar-carrito"
                                                @click="decrementar(product.id)">-</p>
                                        </div>


                                        <div @click="eliminar(product.id)" class="borrar-carrito">
                                            <p>x</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>

                    </div>
                </div>
                <div v-if="carritoProducto.length > 0" class="botones-carrito">
                    <!-- <p>Total a Pagar: <span>$60,000 </span></p> -->
                    <div class="boton-carrito">
                        <div class="comprarCarrito">Comprar</div>
                        <div @click="vacear" class="vaciar">Vaciar
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M15.306 12.115h-.385L7.306 4.5h11.106q.651 0 .964.536q.312.535-.026 1.168l-2.78 5.13q-.218.404-.502.593q-.283.188-.762.188Zm-7.998 9q-.614 0-1.057-.433q-.443-.434-.443-1.067q0-.632.443-1.066q.443-.434 1.057-.434q.613 0 1.056.434q.444.434.444 1.066q0 .633-.444 1.067q-.443.433-1.056.433Zm13 .608l-5.62-5.608H7.446q-.87 0-1.3-.726q-.43-.726-.027-1.481l1.435-2.612L5.484 6.9L2.239 3.654l.708-.708l18.07 18.07l-.708.707Zm-6.62-6.608l-3-3H8.215l-1.192 2.231q-.154.289-.01.529q.145.24.433.24h6.242Zm3.004 6q-.613 0-1.056-.433q-.444-.434-.444-1.067q0-.632.444-1.066q.443-.434 1.056-.434q.614 0 1.057.434q.443.434.443 1.066q0 .633-.443 1.067q-.443.433-1.057.433Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        
        </template>
    </Sidebar>
    <!-- Tienda -->
    <div class="contenedor-tienda">

        <!-- Menu -->
        <div class="contenedor-header">

            <div class="header">

                <div class="productos">
                    <div class="titulo" @click="router.push('/')">
                        <img class="icono" src="../../assets/img/pelitos-4.png" alt="" srcset="">
                    </div>
                </div>

                <div class="seleccion ">
                    <div class="opciones">
                        <p>Medicamentos</p>
                        <p>Accesorios</p>
                    </div>
                </div>

                <div class="menu-shop">

                    <p v-if="Auth.token === null">Iniciar Sesion</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512">
                        <path fill="#ffffff"
                            d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8" />
                    </svg>
                    <div @click="toggleCarrito" class="carrito">
                        <svg width="35" height="35" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M34.4 34.4C35.5404 34.4 36.6342 34.853 37.4406 35.6594C38.247 36.4658 38.7 37.5596 38.7 38.7C38.7 39.8404 38.247 40.9342 37.4406 41.7406C36.6342 42.547 35.5404 43 34.4 43C32.0135 43 30.1 41.065 30.1 38.7C30.1 36.3135 32.0135 34.4 34.4 34.4ZM0 0H7.0305L9.0515 4.3H40.85C41.4202 4.3 41.9671 4.52652 42.3703 4.92972C42.7735 5.33292 43 5.87978 43 6.45C43 6.8155 42.8925 7.181 42.742 7.525L35.045 21.4355C34.314 22.747 32.895 23.65 31.2825 23.65H15.265L13.33 27.1545L13.2655 27.4125C13.2655 27.5551 13.3221 27.6918 13.4229 27.7926C13.5237 27.8934 13.6604 27.95 13.803 27.95H38.7V32.25H12.9C10.5135 32.25 8.6 30.315 8.6 27.95C8.6 27.1975 8.7935 26.488 9.116 25.886L12.04 20.6185L4.3 4.3H0V0ZM12.9 34.4C14.0404 34.4 15.1342 34.853 15.9406 35.6594C16.747 36.4658 17.2 37.5596 17.2 38.7C17.2 39.8404 16.747 40.9342 15.9406 41.7406C15.1342 42.547 14.0404 43 12.9 43C10.5135 43 8.6 41.065 8.6 38.7C8.6 36.3135 10.5135 34.4 12.9 34.4ZM32.25 19.35L38.227 8.6H11.051L16.125 19.35H32.25Z"
                                fill="black" />
                        </svg>
                    </div>

                    <div class="menu-mobile" @click="toggleModal">
                        <img src="../../assets/img/MENU.svg" alt="menu">
                    </div>
                </div>


            </div>

        </div>

        <!-- Productos -->
        <div class="listado-medicamentos">

            <div class="contenedor-productos">

                <div v-for="producto in Shop.medicamentos" class="carta-productos">

                    <!-- <div class="fondo">
                        
                    </div> -->
                    <img :src="`http://localhost:6060/uploads/products/${producto.imagen}`" alt="" class="fondo">
                    <div class="info-compra">

                        <div class="detalles">
                            <div class="nombres">
                                <p class="nombre">{{ producto.medicamento.nombre }} </p>
                                <p class="tipo"> {{ producto.medicamento.tipo_medicina.nombre }}</p>
                            </div>
                            <span> {{ producto.medicamento.precio }} $</span>
                        </div>

                        <div class="acciones">
                            <div @click="agregarCarrito(producto)" class="agregar">
                                <p>Añadir</p>
                                <svg viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.95522 7.2381H10.7463V4.52381H13.4328V2.71429H10.7463V0H8.95522V2.71429H6.26866V4.52381H8.95522M5.37313 15.381C4.38806 15.381 3.58209 16.1952 3.58209 17.1905C3.58209 18.1857 4.38806 19 5.37313 19C6.35821 19 7.16418 18.1857 7.16418 17.1905C7.16418 16.1952 6.35821 15.381 5.37313 15.381ZM14.3284 15.381C13.3433 15.381 12.5373 16.1952 12.5373 17.1905C12.5373 18.1857 13.3433 19 14.3284 19C15.3134 19 16.1194 18.1857 16.1194 17.1905C16.1194 16.1952 15.3134 15.381 14.3284 15.381ZM5.55224 12.4857V12.3952L6.35821 10.8571H12.9851C13.6119 10.8571 14.2388 10.4952 14.5075 9.95238L18 3.61905L16.4776 2.71429L12.9851 9.04762H6.71642L2.95522 0.904762H0V2.71429H1.79104L5.01493 9.59048L3.76119 11.7619C3.67164 12.0333 3.58209 12.3048 3.58209 12.6667C3.58209 13.6619 4.38806 14.4762 5.37313 14.4762H16.1194V12.6667H5.73134C5.64179 12.6667 5.55224 12.5762 5.55224 12.4857Z" />
                                </svg>
                            </div>
                            <div class="comprar">
                                <p>Comprar</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped>
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
    /* height: 100vh; */
    /* z-index: 4; */
    background-color: white;

}

.botones-carrito {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 3vh;
}

.botones-carrito p {
    font-size: 1.6em;
}

.botones-carrito span {
    font-weight: 700;
}

.boton-carrito {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
}

.comprarCarrito,
.vaciar {
    border-radius: 30px;
    padding: 10px;
    width: 90px;
    text-align: center;
}

.comprarCarrito {
    font-weight: 700;
    color: white;
    font-size: 1.2em;
    background-color: rgba(52, 135, 65, 1);

}

.vaciar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background-color: rgb(136, 136, 136);
    font-weight: 700;
    color: white;
    font-size: 1.2em;
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
    width: 350px;
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

.listado-medicamentos {
    display: flex;
    /* width: 100%; */
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.contenedor-productos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin-top: 15vh;
    place-items: center;
    width: 100%;
    /* gap: 2vh; */
}

.seleccion {
    margin-top: 1vh;
    display: flex;
    gap: 5vh;
}

.seleccion p {
    cursor: pointer;
    font-weight: 600;
    color: black;
    /* rgba(138, 124, 121, 1) */
    font-size: 20px;
}



.carta-productos {
    /* width: 100px; */
    height: max-content;
    margin: 5px;
    /* margin: 0 auto; */
    box-sizing: border-box;

}

.carta-productos .fondo {
    width: 200px;
    height: 200px;
    border-radius: 7px;
    /* background-color: rgba(217, 217, 217, 1); */
}

.info-compra {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    /* height: 100px; */
    width: max-content;
}

.detalles {
    display: flex;
    /* height: 100px; */
    width: 200px;
    flex-direction: column;
    justify-content: space-between;
}

.detalles p {
    font-weight: 700;
}

.detalles span {
    font-weight: 700;
    color: rgba(183, 183, 183, 1);
}

.nombres {
    /* display: flex; */
    /* width: ; */
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

.acciones {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

}

.agregar {
    font-size: 0.9em;
    font-weight: 700;
    display: flex;
    padding: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: rgba(223, 200, 255, 0.37);
    color: var(--color-morado-general);
    /* gap: 10px; */
    cursor: pointer;
    gap: 20px;
    transition: all 0.3s ease;
    /* box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25); */
}

.agregar:hover {
    background: rgba(241, 231, 255, 0.622);
    color: rgba(184, 134, 255, 0.37);
}

.agregar:hover path {

    fill: rgba(184, 134, 255, 0.37);
}

.agregar svg {
    height: 1em;
}

.agregar path {
    transition: all 0.3s ease;

    fill: var(--color-morado-general);
}

.comprar {
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: white;
    padding: 7px;
    font-size: 0.8em;
    background-color: rgba(52, 135, 65, 1);
    transition: all 0.3s ease;
}

.comprar:hover {
    color: #eee;
    background-color: rgba(52, 135, 64, 0.386);
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
