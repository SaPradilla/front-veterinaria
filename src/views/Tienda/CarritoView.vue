<script setup>
import { onMounted, computed } from 'vue'
import { useShop } from '../../stores/shop';
import Button from 'primevue/button';
import Image from 'primevue/image';
import InputNumber from 'primevue/inputnumber';
import { useRouter } from 'vue-router';
import { useFormatear } from '../../stores/formatear';

onMounted(() => {
    const carritoStorage = localStorage.getItem('carrito')
    if (carritoStorage) {
        //Convertir el json a arreglo 
        Shop.carritoProducto = JSON.parse(carritoStorage)
    }

})

const Shop = useShop()
const router = useRouter()
const Formato = useFormatear()

const totalPagar = computed(() => {

    return Shop.carritoProducto.reduce((total, producto) => {

        const precioProducto = producto.medicamento ? producto.medicamento.precio : producto.accesorio.precio;
        return total + (producto.cantidad * precioProducto);

    }, 0);
});
</script>

<template>
    <div class="Carrito">
        <div class="contenedor-carrito">

            <div class="titulo-carrito">
                <h1>Tu Carrito</h1>
                <Button style=" display: flex; gap: 1em;" icon="pi pi-angle-left" @click="router.push({ name: 'todo' })"
                    outlined label="Seguir comprando" />
            </div>
            <div class="content-carrito">

                <div class="items">
                    <div class="producto" v-for="producto in Shop.carritoProducto">
                        <img :src="`http://localhost:6060/uploads/products/${producto.imagen}`" alt="">
                        <div class="info">
                            <p class="nombre">{{ producto.accesorioId === null ? producto.medicamento.nombre :
                                producto.accesorio.nombre }}</p>
                            <p class="precio">{{ producto.accesorioId ? Formato.formatoDinero(producto.accesorio.precio) :
                                Formato.formatoDinero(producto.medicamento.precio) }} $</p>
                            <div class="acciones">
                                <div class="cantidad">
                                    <li class="pi pi-plus" @click="Shop.incrementar(producto.id)"></li>
                                    <span> {{ producto.cantidad }} </span>
                                    <li class="pi pi-minus" @click="Shop.decrementar(producto.id)"></li>
                                </div>
                                <Button icon="pi pi-trash" @click="Shop.eliminar(producto.id)"
                                    rounded text />
                            </div>
                        </div>

                    </div>
                    <!-- <div class="producto" v-for="producto in Shop.carritoProducto">
                        <img :src="`http://localhost:6060/uploads/products/${producto.imagen}`" alt="">
                        <div class="info">
                            <p class="nombre">{{ producto.accesorioId === null ? producto.medicamento.nombre : producto.accesorio.nombre }}</p>
                            <p class="precio">{{ producto.accesorioId ?  Formato.formatoDinero(producto.accesorio.precio) :  Formato.formatoDinero(producto.medicamento.precio) }} $</p>
                        </div>
                    </div> -->
                </div>

                <Divider layout="vertical" />

                <div class="pago">
                    <div class="total">
                        <p>Total </p>
                        <strong> {{ Formato.formatoDinero(totalPagar) }}</strong>
                    </div>
                    <Button style=" width: 100%; font-size: 1.2em;" icon="pi pi-angle-left" @click="router.push({name:'pagar'})" label="Pagar" />

                </div>
            </div>
        </div>

    </div>
</template>


<style scoped>
.acciones{
    display: flex;
    gap: 20px;
}
.cantidad {
    /* background-color: var(--color-morado-muy-claro); */
    /* box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1); */
    border: 1px solid;
    border-radius: 20px;
    width: 100px;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.cantidad li {
    cursor: pointer;
    color: var(--color-gris-oscuro);
}

.info {
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.info .nombre {
    font-weight: 700;
}

.producto {
    display: flex;
    align-items: center;
    gap: 2em;
}

.Carrito {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: url('../../assets/img/perfil_background.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
    height: 100vh;
    width: 100%;
}

.titulo-carrito {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1em;
}

.contenedor-carrito {
    margin-top: 20vh;

    display: flex;
    height: 100vh;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    gap: 3em;


}

h1 {
    font-size: 3em;
    color: var(--color-morado-general);
}

.content-carrito {
    /* background-color: white;
    padding: 3em;
    border-radius: 60px;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1); */
    display: flex;
    justify-content: center;
    gap: 10em;
    /* width:100vh; */

}

.total {
    color: var(--color-gris-oscuro);
    /* display: flex; */
    display: flex;
    justify-content: space-between;
    font-size: 1.3em;
    /* flex-direction: column; */
}

.pago {
    position: sticky;
    width: 30vh;
    display: flex;
    flex-direction: column;
    gap: 3em;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 3em;
    overflow-y: auto;
}

.items img {

    border-radius: 20px;
    width: 100px;
}</style>