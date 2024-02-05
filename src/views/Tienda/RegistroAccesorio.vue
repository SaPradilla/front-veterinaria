<script setup>
import { reactive,ref,onMounted} from 'vue'
import {useAdmin} from '../../stores/admin'
import { useInventario} from '../../stores/inventario'
const Admin = useAdmin()
const Inventario = useInventario()

const fechaHoy = new Date()

onMounted(()=>{
    Inventario.verTipoAccesorio()
})

</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleTienda" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Registro Accesorio</h1>
        <div class="formulario">

            <FormKit type="form" id="form" @submit="Inventario.agregarAccesorio" :actions="false"
                incomplete-message="Ingrese todos sus datos para continuar">

                <FormKit v-model="Inventario.accesoryData.nombre" type="text" placeholder="Nombre" name="nombre" validation="required"
                    :validation-messages="{
                        required: 'El Nombre es Obligatorio',
                }" />
                <div class="opciones">

                    <v-select placeholder="Tipo" name="tipo" v-model="Inventario.accesoryData.tipo_accesorioId" :options="Inventario.tipo_accesorio" :reduce="tipo => tipo.id" label="nombre">
                        
                    </v-select>
                </div>
                
                <FormKit v-model="Inventario.accesoryData.precio" type="text" placeholder="Precio $$$"  name="precio"
                    validation="number|require" :validation-messages="{
                        required: 'Precio es obligatorio',
                        number: 'No puedes ingresar letras'
                }" />

                <FormKit v-model="Inventario.accesoryData.cantidad_total" type="text" placeholder="Cantidad"  name="cantidad"
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