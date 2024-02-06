<script setup>
import { reactive,ref,onMounted} from 'vue'
import {useAdmin} from '../../stores/admin'
import { useInventario} from '../../stores/inventario'
const Admin = useAdmin()
const Inventario = useInventario()

import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';

const fechaHoy = new Date()
const tipoModal = ref(false)
const nuevoTipo = ref('')

const handleTipoModal = ()=>{
    tipoModal.value = !tipoModal.value
}
const agregarTipo = ()=>{   
    Inventario.agregarTipoMedicamento({nombre:nuevoTipo.value})
    handleTipoModal()
    nuevoTipo.value = ''
}
onMounted(()=>{
    Inventario.verTipoMedicinas()
})

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

let minMonth = (month + 2) % 12;
let minYear = year + Math.floor((month + 2) / 12);

const minDate = ref(new Date(minYear, minMonth, 1)); // Establecer el primer día del mes permitido
const maxDate = ref();
</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleTienda" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Registro Medicina</h1>
        <div class="formulario">
            <form>
                <InputText type="text" v-model="Inventario.medicinaData.nombre" placeholder="Nombre" />

                <div class="select">
                    <Dropdown v-model="Inventario.medicinaData.tipo_medicinaId" :options="Inventario.tipo_medicina" checkmark  optionLabel="nombre" showClear   placeholder="Tipo de medicina" />

                    <small @click="handleTipoModal"> Agregar </small>

                    <InputGroup v-if="tipoModal">
                        <InputText v-model="nuevoTipo" placeholder="Agregar Tipo" />
                        <Button @click="handleTipoModal" outlined  icon="pi pi-times" severity="danger"  />
                        <Button @click="agregarTipo" icon="pi pi-check" />
                    </InputGroup>
                </div>

                <InputNumber v-model="Inventario.medicinaData.precio" inputId="currency-us" mode="currency" currency="COP" locale="es-ES" placeholder="Precio" />
                <Calendar v-model="Inventario.medicinaData.fecha_venciminento" placeholder="Fecha de  Caducación" :minDate="minDate"  :manualInput="false" />
                <div class="volumen">
                    <Dropdown v-model="Inventario.tipoVolumen" editable  :options="['cm','gr']"  checkmark placeholder="Tipo de volumen" />
                    
                    <InputNumber v-model="Inventario.medicinaData.volumen" :suffix="Inventario.tipoVolumen"   placeholder="Volumen" />
                </div>
                
                <InputNumber v-model.number="Inventario.medicinaData.cantidad_total" placeholder="Cantidad" />
                <Slider v-model="Inventario.medicinaData.cantidad_total"  />

                <Button @click="Inventario.agregarMedicinas"  label="Agregar" />

                <!-- <FormKit
                    type="date"
                    placeholder="Fecha"
                    v-model="Inventario.medicinaData.fecha_venciminento2"
                    :validation="`required|date_after:${fechaHoy}`"
                    validation-visibility="live"
                    :validation-messages="{
                        required:'Fecha es requerida',
                        date_after:'Solo se permite fechas proximas a la actual'
                    }"
                /> -->
            </form>
            <!-- <FormKit type="form" id="form" @submit="Inventario.agregarMedicinas" :actions="false"
                incomplete-message="Ingrese todos sus datos para continuar">

                <FormKit v-model="" type="text" placeholder="Nombre" name="nombre" validation="required"
                    :validation-messages="{
                        required: 'El Nombre es Obligatorio',
                }" />
                <div class="opciones">

                    <v-select placeholder="Tipo" name="tipo" v-model="" :options="Inventario.tipo_medicina" :reduce="tipo => tipo.id" label="nombre">
                        
                    </v-select>
                </div>


                <FormKit v-model="Inventario.medicinaData.precio" type="text" placeholder="Precio $$$"  name="precio"
                    validation="number|require" :validation-messages="{
                        required: 'Precio es obligatorio',
                        number: 'No puedes ingresar letras'
                }" />

                <FormKit
                    type="date"
                    placeholder="Fecha"
                    v-model="Inventario.medicinaData.fecha_venciminento"
                    :validation="`required|date_after:${fechaHoy}`"
                    validation-visibility="live"
                    :validation-messages="{
                        required:'Fecha es requerida',
                        date_after:'Solo se permite fechas proximas a la actual'
                    }"
                />
                <FormKit v-model="Inventario.medicinaData.volumen" type="text" placeholder="Volumen  ej: mg,cm " name="volumen" validation="required"
                    :validation-messages="{
                        required: 'El Volumen es Obligatorio',
                }" />

                <FormKit v-model="" type="text" placeholder="Cantidad"  name="cantidad"
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

    .volumen{
        width: max-content;
        width: 100%;
        display: grid;
        grid-template-columns: 30% 70%;
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