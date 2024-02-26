<script setup>
import { ref, computed, watch, onMounted,onUpdated} from 'vue'
import Divider from 'primevue/divider';
import { useRouter } from 'vue-router';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
// import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Badge from 'primevue/badge';
import InputMask from 'primevue/inputmask';

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

import Departamentos from '../../mocks/colombia.json'
import { useShop } from '../../stores/shop';
import { useFormatear } from '../../stores/formatear';

const router = useRouter()

onMounted(()=>{

    const carritoStorage = localStorage.getItem('carrito')

    if (carritoStorage) {
        //Convertir el json a arreglo 
        Shop.carritoProducto = JSON.parse(carritoStorage)

        if (JSON.parse(carritoStorage).length <=0) {
            router.push({name:'todo'})    
        }

    }else{
        router.push({name:'todo'})

    }
})
onUpdated(()=>{
   
})

const Shop = useShop()
const Formato = useFormatear()
const envio = ref(0)
const metodo = ref(0)

const seleccionDeparmento = ref({
    ciudades: []
})
const seleccionCiudad = ref()

const persona = ref({
    nombres: '',
    apellidos: '',
    direccion: '',
    codigo_postal: '',
    numero: '',
})
const tarjeta = ref({
    numero:'',
    fecha:'',
    codigo:'',
    nombre:''
})

const metodoTarjetaValidate = computed(()=>{
    if(tarjeta.value.numero === '') return true
    if(tarjeta.value.fecha === '') return true
    if(tarjeta.value.codigo === '') return true
    if(tarjeta.value.nombre === '') return true
})

const totalPagar = computed(() => {

return Shop.carritoProducto.reduce((total, producto) => {

    const precioProducto = producto.medicamento ? producto.medicamento.precio : producto.accesorio.precio;
    return total + (producto.cantidad * precioProducto);

}, 0);
});
</script>

<template>
    <div class="contenedor-compra">

        <div class="header">
            <div class="titulo" @click="router.push({ name: 'todo' })">
                <img class="icono" src="../../assets/img/pelitos-4.png" alt="" srcset="">
                <div class="texto-titulo">
                    <h1>Store</h1>
                    <li class="pi pi-shopping-bag"></li>
                </div>
            </div>
        </div>

        <Divider />

        <div class="producto-compra">

            <div class="pagar">
                <h2>Envio</h2>
                <div class="envio">

                    <div class="card-envio">
                        <Accordion v-model:activeIndex="envio" expandIcon="none" collapseIcon="none">
                            <AccordionTab>
                                <template #header>
                                    <div class="envio-opcion">

                                        <Button icon="pi pi-check" rounded :outlined="envio === 1" />

                                        <!-- <Checkbox v-model="modalLocal" binary /> -->
                                        <span>En local</span>

                                    </div>
                                </template>
                                <p class="m-0">
                                    <!-- <li class="pi pi-home"></li> -->
                                    Recogeras tu compra en el local
                                </p>
                            </AccordionTab>
                            <AccordionTab>
                                <template #header>
                                    <div class="envio-opcion">

                                        <Button icon="pi pi-check" rounded :outlined="envio === 0" />

                                        <span>Envio a Direccion</span>

                                    </div>
                                </template>
                                <div class="form-envio">

                                    <Dropdown filter v-model="seleccionDeparmento" :options="Departamentos"
                                        optionLabel="departamento" placeholder="Selecciona Departamento" checkmark
                                        :highlightOnSelect="false" class="w-full md:w-14rem" />

                                    <Dropdown filter :disabled="!seleccionDeparmento" v-model="seleccionCiudad"
                                        :options="seleccionDeparmento.ciudades" optionLabel="ciudad"
                                        placeholder="Selecciona Ciudad" checkmark :highlightOnSelect="false"
                                        class="w-full md:w-14rem" />
                                    <div class="nombres">
                                        <InputText type="text" v-model="persona.nombres" placeholder="Nombres" />

                                        <InputText type="text" v-model="persona.apellidos" placeholder="Apellidos" />

                                    </div>

                                    <InputText type="text" v-model="persona.direccion" placeholder="Dirección" />

                                    <InputText type="text" v-model="persona.codigo_postal" placeholder="Codigo Postal" />

                                    <InputText type="text" v-model="persona.numero" placeholder="Celular (opcional)" />


                                </div>

                            </AccordionTab>

                        </Accordion>
                    </div>


                </div>
                <h2>Metodo de pago</h2>
                <div class="metodo-pago">

                    <div class="card-envio">
                        <Accordion v-model:activeIndex="metodo" expandIcon="none" collapseIcon="none">
                            <AccordionTab>
                                <template #header>
                                    <div class="envio-opcion">

                                        <Button icon="pi pi-check" rounded :outlined="metodo !== 0" />

                                        <!-- <Checkbox v-model="modalLocal" binary /> -->
                                        <span>Tarjeta de credito</span>

                                    </div>
                                </template>
                                <div class="tarjeta">
                                    <InputGroup>
                                        <InputText placeholder="Numero Tarjeta" v-model="tarjeta.numero" />
                                        <InputGroupAddon>
                                            <i class="pi pi-credit-card"></i>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <div class="more">
                                        <InputMask style="width: 100%;" id="basic" v-model="tarjeta.fecha"
                                            placeholder="Fecha de Expiracion (MM/YY)" mask="99/99" slotChar="mm/yy" />
                                        <InputText placeholder="Codigo de Seguridad" v-model="tarjeta.codigo" />
                                    </div>
                                    <InputGroup>
                                        <InputText placeholder="Nombre en la Tarjeta"  v-model="tarjeta.nombre"/>
                                        <InputGroupAddon>
                                            <i class="pi pi-user"></i>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </AccordionTab>
                            <AccordionTab>
                                <template #header>
                                    <div class="envio-opcion">

                                        <Button icon="pi pi-check" rounded :outlined="metodo !== 1" />

                                        <span>PayPal</span>

                                    </div>
                                </template>
                                <div class="form-pago">


                                </div>

                            </AccordionTab>
                            <AccordionTab>
                                <template #header>
                                    <div class="envio-opcion">

                                        <Button icon="pi pi-check" rounded :outlined="metodo !== 2" />

                                        <span>Google Pay</span>

                                    </div>
                                </template>
                                <div class="form-pago">


                                </div>

                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
                <Button 
                :label=" metodo === 0 ? 'Pagar con Tarjeta' : metodo === 1 ? 'Pagar con PayPal' : 'Pagar con Google Pay' " 
                :disabled="metodoTarjetaValidate"
                @click="Shop.ComprarCarrito" 
                
                />
            </div>

            
            <div class="productos">
          

                <div v-for="producto in Shop.carritoProducto" class="producto">

                    <div class="descripcion">
                        <div class="imagen">
                            <Badge style="position: absolute;" :value="producto.cantidad"></Badge>
                            <img :src="`http://localhost:6060/uploads/products/${producto.imagen}`" />
                        </div>
                        <div class="info">
                            <strong class="nombre">{{ producto.accesorioId === null ? producto.medicamento.nombre :
                                producto.accesorio.nombre }}</strong>
                            <small class="tipo">{{ producto.accesorioId === null ?
                                producto.medicamento.tipo_medicina.nombre :
                                producto.accesorio.tipo_accesorio.nombre }}</small>
                        </div>

                    </div>
                    <div class="precio">
                        <p class="precio">{{ producto.accesorioId ?  Formato.formatoDinero(producto.accesorio.precio) :  Formato.formatoDinero(producto.medicamento.precio) }} $</p>
                    </div>

                </div>

                <div class="total">
                    <div class="subtotal ">
                        <p>Subtotal</p>
                        <strong> {{ Formato.formatoDinero(totalPagar) }} </strong>
                    </div>
                    <div class="total-envio ">
                        <p>Envio</p>
                        <strong> {{ Formato.formatoDinero(15000) }}</strong>
                    </div>
                    <div class="total-pagar ">
                        <p>Total</p>
                        <strong>{{ Formato.formatoDinero(totalPagar+15000) }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style  scoped>
.total{
    display: flex;
    flex-direction: column;
    gap: 1em;
}
.subtotal,
.total-envio,
.total-pagar{
    display: flex;
    justify-content: space-between;
}
.total-pagar p{
    font-weight: 600;
}
.total-pagar strong{
    font-size: 1.2em;
}
.info{
    display: flex;
    flex-direction: column;
}
.descripcion{
    display: flex;
    align-items: center;
    gap: 1em;
}
.producto{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.productos{
    width: 60vh;
    gap: 2em;
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.pagar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 100vh; */
    gap: 3em;
    width: 60vh;
    border-right: 1px solid #eee ;
    padding-right: 30px;
}
.producto-compra {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 20px;
    width: 100%;
}

.imagen{
    border: 1px solid #eee;
    border-radius: 20px;
}
.imagen img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
}

.nombres {
    display: flex;
    justify-content: space-between;
}

.form-envio {
    display: flex;
    flex-direction: column;
    gap: 1em;

}

.envio-opcion {
    display: flex;
    align-items: center;
    gap: 2em;
}



.header {
    display: grid;
    place-content: center;
    cursor: pointer;
    padding: 20px;
}

.texto-titulo {
    display: flex;
    align-items: center;
    gap: 5px;
}

.titulo {

    width: 70vh;
    display: flex;
    align-items: center;
    justify-content: left;
    color: var(--color-morado-general);
    gap: 1em;
}

li {
    font-size: 1.5em;
}

.producto-compra {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    margin-top: 3em;
}



.pagar h2 {}

.tarjeta {

    display: flex;
    flex-direction: column;
    gap: 1em;
}

.more {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: space-between;
}</style>