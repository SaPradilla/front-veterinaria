<script setup>
import menuDashboard from '../components/UI/menuDashboard.vue';
import Mascotas from '../components/Mascotas.vue';
import userAuth from '../components/auth/userAuth.vue';
import RegistroMascota from '../components/RegistroMascota.vue';
import Mascota from '../components/Mascota.vue';
import modalCliente from '../components/UI/modalCliente.vue';
import { useDashboard } from '../stores/dashboard'
import { useModals } from '../stores/modals';
const Modals = useModals()
const dashboard = useDashboard()
</script>

<template>
    <div  v-if="Modals.modalCliente" class="modalCliente">
        <modalCliente
        />
    </div>
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

                <div class="mascota">

                    <div v-if="dashboard.inicioMascota" class="mascotas">
                        <Mascotas />
                    </div>

                    <div v-if="dashboard.registroMascota" class="registro-mascota">
                        <RegistroMascota />
                    </div>
                    
                    <div v-if="dashboard.verMascota" class="ver-mascota">
                        <Mascota />
                    </div>

                </div>
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

.header {
    position: fixed;
    top: 0;
    right:0;

}
.contenido-header{
    
    display: flex;
    justify-content: space-between;
    gap: 50px;
    align-items: center;
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

.contenido-menu {
    /* overflow-y: hidden; */
    /* position: relative; */
}

.contenido-principal {
    margin-top: 10vh;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* gap:35vh; */
    align-items: center;

}

.registro-mascota {
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    gap: 6vh;
    justify-content: center;
    align-items: center;

}

.mascota {
    /* overflow-y: scroll; */

}
</style>