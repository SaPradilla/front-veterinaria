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

const minDate = ref(new Date(minYear, minMonth, 1)); 
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
                <InputText type="text" v-model="Inventario.updateMedicinadata.nombre" placeholder="Nombre" />

                <div class="select">
                    <Dropdown v-model="Inventario.updateMedicinadata.tipo_medicinaId" :options="Inventario.tipo_medicina" checkmark  optionLabel="nombre" placeholder="Tipo de medicina" />

                    <small @click="handleTipoModal"> Agregar </small>

                    <InputGroup v-if="tipoModal">
                        <InputText v-model="nuevoTipo" placeholder="Agregar Tipo" />
                        <Button @click="handleTipoModal" outlined  icon="pi pi-times" severity="danger"  />
                        <Button @click="agregarTipo" icon="pi pi-check" />
                    </InputGroup>
                </div>

                <InputNumber v-model="Inventario.updateMedicinadata.precio" inputId="currency-us" mode="currency" currency="COP" locale="es-ES" placeholder="Precio" />
                <Calendar v-model="Inventario.updateMedicinadata.fecha_venciminento" placeholder="Fecha de  Caducación" :minDate="minDate"  :manualInput="false" />
                <div class="volumen">
                    <Dropdown :value="Inventario.tipoxd " v-model="Inventario.tipoVolumen" editable  :options="['cm','gr','mg']"  checkmark placeholder="Tipo de volumen" />
                    
                    <InputNumber v-model="Inventario.updateMedicinadata.volumen" :suffix="Inventario.tipoVolumen"   placeholder="Volumen" />
                </div>
                
                <InputNumber v-model.number="Inventario.updateMedicinadata.cantidad_total" placeholder="Cantidad" />
                <Slider v-model="Inventario.updateMedicinadata.cantidad_total"  />

                <Button @click="Inventario.actualizarMedicina"  label="Agregar" />

              
            </form>
        
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