<script setup>
import { reactive,ref,onMounted} from 'vue'
import {useAdmin} from '../../stores/admin'
import { useInventario} from '../../stores/inventario'
const Admin = useAdmin()
const Inventario = useInventario()

const fechaHoy = new Date()
onMounted(()=>{
    Inventario.verTipoMedicinas()
})

</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleTienda" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Registro Medicina</h1>
        <div class="formulario">

            <FormKit type="form" id="form" @submit="Inventario.agregarMedicinas" :actions="false"
                incomplete-message="Ingrese todos sus datos para continuar">

                <FormKit v-model="Inventario.medicinaData.nombre" type="text" placeholder="Nombre" name="nombre" validation="required"
                    :validation-messages="{
                        required: 'El Nombre es Obligatorio',
                }" />
                <div class="opciones">

                    <v-select placeholder="Tipo" name="tipo" v-model="Inventario.medicinaData.tipo_medicinaId" :options="Inventario.tipo_medicina" :reduce="tipo => tipo.id" label="nombre">
                        
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

                <FormKit v-model="Inventario.medicinaData.cantidad_total" type="text" placeholder="Cantidad"  name="cantidad"
                    validation="number|require" :validation-messages="{
                        required: 'Cantidad es obligatoria',
                        number: 'No puedes ingresar letras'
                }" />
                <div class="botones">
                    <FormKit style="width: 240px;" type="submit" label="Registrar"/>
                </div>
        
            </FormKit>
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