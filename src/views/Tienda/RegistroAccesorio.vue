<script setup>
import { reactive,ref,onMounted} from 'vue'
import {useAdmin} from '../../stores/admin'
import { useInventario} from '../../stores/inventario'

import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

import InputGroupAddon from 'primevue/inputgroupaddon';
    // import FloatLabel from 'primevue/floatlabel';

const Admin = useAdmin()
const Inventario = useInventario()

const fechaHoy = new Date()

onMounted(()=>{
    Inventario.verTipoAccesorio()
})
// const value = ref(100)
const tipoModal = ref(false)
const nuevoTipo = ref('')

const handleTipoModal = ()=>{
    tipoModal.value = !tipoModal.value
}
const agregarTipo = ()=>{   
    Inventario.agregarTipoAccesorio({nombre:nuevoTipo.value})
    handleTipoModal()
    nuevoTipo.value = ''
}
</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleTienda" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Registro Accesorio</h1>
        <div class="formulario">
            <form>

                <InputText type="text" v-model="Inventario.accesoryData.nombre" placeholder="Nombre" />
                <div class="select">

                    <Dropdown v-model="Inventario.accesoryData.tipo_accesorioId" :options="Inventario.tipo_accesorio" checkmark  optionLabel="nombre" showClear   placeholder="Tipo de accesorio" />
                    
                    <small @click="handleTipoModal"> Agregar </small>
                    
                    <InputGroup v-if="tipoModal">
                        <InputText v-model="nuevoTipo" placeholder="Agregar Tipo" />
                        <Button @click="handleTipoModal" outlined  icon="pi pi-times" severity="danger"  />

                        <Button @click="agregarTipo" icon="pi pi-check" />
                    </InputGroup>
                </div>
                
                <InputNumber v-model="Inventario.accesoryData.precio" inputId="currency-us" mode="currency" currency="COP" locale="es-ES" placeholder="Precio" />
                
                <!-- <InputText type="text" v-model="value" placeholder="Nombre"/> -->
                <InputText v-model.number="Inventario.accesoryData.cantidad_total" placeholder="Cantidad" />
                <Slider v-model="Inventario.accesoryData.cantidad_total"  />
                
                <Textarea v-model="Inventario.accesoryData.descripcion" rows="3" cols="30" placeholder="Descripcion" />
                <Button @click="Inventario.agregarAccesorio"  label="Agregar" />


            </form>
            <!-- <FormKit type="form" id="form" @submit="Inventario.agregarAccesorio" :actions="false"
                incomplete-message="Ingrese todos sus datos para continuar">

                <FormKit v-model="" type="text" placeholder="Nombre" name="nombre" validation="required"
                    :validation-messages="{
                        required: 'El Nombre es Obligatorio',
                }" />
                <div class="opciones">

                    <v-select placeholder="Tipo" name="tipo" v-model="I" :options="Inventario.tipo_accesorio" :reduce="tipo => tipo.id" label="nombre">
                        
                    </v-select>
                </div>
                
                <FormKit v-model=" type="text" placeholder="Precio $$$"  name="precio"
                    validation="number|require" :validation-messages="{
                        required: 'Precio es obligatorio',
                        number: 'No puedes ingresar letras'
                }" />

                <FormKit v-model="" type="text" placeholder="Cantidad"  name= "cantidad"
                    validation="number|require" :validation-messages="{
                        required: 'Cantidad es obligatoria',
                        number: 'No puedes ingresar letras'
                }" />
                <div class="botones">
                    <FormKit style="width: 240px;" type="submit" label="Registrar"/>
                </div>
        
            </FormKit> -->

        </div>
    </div>
</template>
<style scoped>
    h1{
        color: var(--color-morado-claro-general);
    }
    .contenido-registro{
        gap: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .formulario{
        width: 40%;
    }
    .formulario form{
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
    .select{
        display: flex;
        flex-direction: column;
        align-items: left;
        gap: 10px;
    }
    .select small{
        text-align: left;
        color: #5f5f5fee;
        cursor: pointer;
    }
    .con{
        position: absolute;
        top: 25vh;
        right: 0;
        
    }
    .opciones{
       margin-bottom: 2vh;
       margin-bottom: 2vh;
    }
</style>