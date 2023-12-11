<script setup>
    import { useMascota } from '../stores/mascota';
    import { useDashboard } from '../stores/dashboard';
    import {useFormatear} from '../stores/formatear'
    const Mascota = useMascota()
    const dashboard = useDashboard()
    const Formato = useFormatear()
</script>

<template>
    <div class="contenedor-mascota">
        <div class="header-mascota">
            <div></div>

            <div class="info-mascota">
                <h2>{{ Mascota.perfilMascota.nombre}}</h2>
                <img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
                <p>{{  Mascota.perfilMascota.tipo_mascota }} | {{  Mascota.perfilMascota.edad }} Años</p>
                <p class="id">ID: {{ Mascota.perfilMascota.id }}</p>
            </div>

            <!-- <div class="boton">
                <button @click="dashboard.handleVolver()" class="botonVolver"> Volver </button>
            </div> -->
        </div>



    </div>
</template>


<style scoped>
    

</style>