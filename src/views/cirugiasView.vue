<script setup>
import menuDashboard from '../components/UI/menuDashboard.vue';
import userAuth from '../components/auth/userAuth.vue';

import { useDashboard } from '../stores/dashboard'

const dashboard = useDashboard()
</script>

<template>
    <div class="contenedor-principal">

        <div class="menu-dashboard">
            <div class="headerUser">
                <userAuth />
            </div>
            <div class="contenido-menu">

                <menuDashboard />
            </div>

        </div>

        <div class="contenedor-dashboard">
            <div class="div"></div>
            <div class="contenido-principal">
                <p>Cirugias</p>
            </div>

        </div>
    </div>
</template>


<style scoped>
.headerUser {
    position: fixed;
    top: 0;
}


h1 {
    text-align: center;
    color: var(--color-morado-general);
    font-size: 2.4em;
    font-weight: bold;
}

.contenedor-principal {
    margin-left: 2vh;
    margin-right: 2vh;

    /* overflow-y: hidden; */
}

.contenedor-dashboard {

    padding: 10px;
    display: grid;
    grid-template-columns: 10% 90%;

    height: 80vh;
}

.menu-dashboard {
    position: fixed;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
}



.contenido-principal {
    margin-top: 10vh;
}
</style>