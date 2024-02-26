<script setup>
import Breadcrumb from 'primevue/breadcrumb';
import Image from 'primevue/image'
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import InputNumber from 'primevue/inputnumber';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

import { useShop } from '../../stores/shop';
import { useRouter } from 'vue-router';
import { ref, onMounted, defineProps } from 'vue'
import productoService from '../../services/productoService'
import { useFormatear } from '../../stores/formatear';


const props = defineProps(['id_producto'])

const producto = ref({})
const cantidad = ref(1)
onMounted(() => {
    if (props.id_producto) {
        productoService.obtenerProducto(props.id_producto)
            .then(res => {
                producto.value = res.data.producto
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    } else {
        router.push({ name: 'todo' })
    }

})

const Shop = useShop()
const router = useRouter()
const Formato = useFormatear()

const home = ref({
    icon: 'pi pi-home'
});

</script>

<template>
    <div class="contenedor-producto-compra">
        
        <div class="volver">
            <Button style=" display: flex; gap: 1em;" icon="pi pi-angle-left" @click="router.push({name:'todo'})" outlined label="Seguir comprando" />
        </div>
        <div class="producto-info">
            

            <div class="imagen">
                <Image :src="`http://localhost:6060/uploads/products/${producto.imagen}`" alt=""
                    width="500"  preview />
            </div>

            <div class="detalles" v-if="producto.medicamento || producto.accesorio">
                <Tag class="tag-estado" :value="producto.estado"
                    :severity="producto.estado !== 'Agotado' ? 'success' : 'warning'" />

                <h2> {{ producto.medicamento ? producto.medicamento.nombre : producto.accesorio.nombre }} </h2>
                <small> <strong>Categoria: </strong> {{ producto.medicamento ? producto.medicamento.tipo_medicina.nombre :
                    producto.accesorio.tipo_accesorio.nombre }}</small>
                <span> {{ producto.medicamento ? Formato.formatoDinero(producto.medicamento.precio) : Formato.formatoDinero(
                    producto.accesorio.precio) }} </span>
                <small> <strong>Disponibles: </strong> {{ producto.unidades_disponibles }}</small>


                <div class="acciones">

                    <div class="cantidad">

                        <InputNumber v-model="cantidad" showButtons buttonLayout="horizontal" style="width: 20px;" :min="0"
                            :max="99">

                            <template #incrementbuttonicon>
                                <li class="pi pi-plus"></li>
                                <!-- <span class="pi pi-plus"  /> -->
                            </template>

                            <template #decrementbuttonicon>
                                <li class="pi pi-minus"></li>
                            </template>
                        </InputNumber>
                    </div>

                    <Button style="display: flex; gap: 1em;" :disabled="producto.estado !== 'Disponible'"
                        icon="pi pi-cart-plus" @click="Shop.agregarCarrito(producto)" outlined
                        :badge="Shop.cantidadItemCarrito(producto.id)" label="Añadir" />
                </div>
                <div class="mas-info">
                    <!-- <strong></strong> -->
                    <Accordion :activeIndex="0">
                        <AccordionTab header="Detalles">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est
                                laborum.
                            </p>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.volver{
    width: 100vh;
    display: flex;
    justify-content: end;
}
.acciones {
    display: flex;
    justify-content: space-between;
    gap: 3em;
}

.imagen {
    display: flex;
    justify-content: center;
}

.producto-info {
    /* height: 100vh; */
    /* display: flex;
    flex-direction: column; */
    /* flex-direction: colum; */
    display: flex;
    gap: 1em;
}

.contenedor-producto-compra {
    /* margin-top: 4vh; */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2vh;
}

.detalles {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 20em;
    height: 50vh;
    gap: 1em;
}</style>