<script setup>
import menuDashboard from '../components/UI/menuDashboard.vue';
import userAuth from '../components/auth/userAuth.vue';
import modalCliente from '../components/UI/modalCliente.vue';
import PerfilMascota from '../components/Mascotas/PerfilMascota.vue';
import { useModals } from '../stores/modals';
import PerfilEmpleado from '../components/Empleados/perfilEmpleado.vue'
const Modals = useModals()
</script>

<template>
    <div class="fondo-admin">

        <div class="modals" v-if="Modals.modalEmpleado">
            <PerfilEmpleado />
        </div>
        <div class="modals" v-if="Modals.modalMascotaPerfil">
            <PerfilMascota />
        </div>
        <div class="modals" v-if="Modals.modalCliente">
            <modalCliente />
        </div>
        <div class="contenedor-principal">
    
            <div class="menu-dashboard">
                <div class="contenido-menu">
                    <menuDashboard />
                </div>
            </div>
    
            <div class="user">
                <userAuth />
            </div>
    
            <div class="contenedor-dashboard">
                <div class=""></div>
                <div class="contenido-principal">
                    <RouterView />
                </div>
    
            </div>
        </div>
    </div>
</template>


<style scoped>
.fondo-admin{
    /* background: url('../assets/img/fondoxd.jpg'); */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: hidden;
   
}
.modals {
    z-index: 1200;
}

.user {

    max-height: clamp(3vh, 6vw, 15vh);
    z-index: 1100;
    width: 100%;
    position: fixed;
    /* height: 100px; */

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
    right: 0;

}

.contenedor-principal {

    height: 100vh;
    /* width: 100%; */
    overflow-y: auto;
}

.contenedor-dashboard {

    padding: 10px;
    display: grid;
    grid-template-columns: 10% 90%;
    height: 80vh;
}

.menu-dashboard {
    /* background-color: var(--color-morado-general); */
    /* background-image: linear-gradient(to right, #e9e0ff, #ece5ff, #efeaff, #f2eeff, #f5f3ff); */
    background-color: white;
    backdrop-filter: blur(70px);
    box-shadow: 0px 2px 15px 1px #e9e0ff;
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
    margin-top: 20vh;
    /* background: rgba(255, 255, 255, 0.041) ;
    backdrop-filter: blur(70px);
    border-radius: 30px;
    padding: 20px;
    box-shadow: 0px 2px 4px -3px rgba(0, 0, 0, 0.914); */

}


.registro-mascota {
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    gap: 6vh;
    justify-content: center;
    align-items: center;

}

.mascotas {
    /* overflow-y: scroll; */

    border-radius: 5px;
    padding: 40px;

}
</style>