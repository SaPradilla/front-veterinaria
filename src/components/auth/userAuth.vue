<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth';
import { usePermisosUser } from '../../stores/permisosUser';
import OverlayPanel from 'primevue/overlaypanel';
import { useRouter } from 'vue-router';
import Avatar from 'primevue/avatar';

const Auth = useAuthStore()
const PermisoUser = usePermisosUser()
const router = useRouter()
const modalMenu = ref()

onMounted(() => {
    Auth.ObtenerToken()
})
// const handleMenu = ()=> modalMenu.value = !modalMenu.value
const handleMenu = (event) => {
    modalMenu.value.toggle(event);
}
</script>

<template>
    <div class="container">

        <div class="contenedor-principal-user">

            <div class="saludo">
                <p class="nombrePerfil"> <span>Hola, </span> {{ PermisoUser.userLogin.nombre ? PermisoUser.userLogin.nombre :
                    '' }} 👋</p>
            </div>

            <!-- <img class="pelitos" alt="Pelitos" src="../../assets/img/pelitos-4.png" /> -->
            <div class="contenedor-user" @click="handleMenu">
                <img class="perfil" src="../../assets/img/avatar.svg" alt="" srcset="">
                <div class="info-user">
                    <!-- <p class="nombrePerfil"> {{PermisoUser.userLogin.apellido ? PermisoUser.userLogin.apellido : ''}}</p> -->
                    <p class="rol">{{ PermisoUser.userLogin.rol ? PermisoUser.userLogin.rol : '' }}</p>
                </div>
            </div>

            <OverlayPanel ref="modalMenu" style="padding: 0; margin: 0;">
                <div class="opciones" @click="router.push({name:'home'})">
                    <p>Inicio</p>
                    <li class="pi pi-home"></li>
                </div>

                <div class="opciones">
                    <p>Configuracion</p>
                    <li class="pi pi-cog"></li>
                </div>
                <div class="opciones" @click="Auth.cerroSesion">
                    <p>Cerrar sesion</p>
                    <li class="pi pi-sign-out"></li>

                </div>
            </OverlayPanel>
            

        </div>
    </div>
</template>

<style scoped>
.opciones{
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between  ;
    padding: 10px;
}
.opciones:hover{

    background-color: rgb(227, 227, 227);
}
.container {
    /* z-index: 1400; */
    /* max-height: clamp(3vh,6vw,15vh); */
    border-bottom: solid 1px rgb(197, 197, 197);
    background-color: var(--color-morado-general);
    
    box-shadow: 0px 2px 4px -3px rgba(0, 0, 0, 0.5);
}

.admin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
}

.admin img {
    height: 40px;
    width: 60px;
}

.admin h2 {
    text-align: center;
    text-transform: uppercase;
    font-size: 1.2em;
    color: rgb(227, 227, 227);
}

p.rol {
    color: rgb(227, 227, 227);
    font-style: italic;
}

.contenedor-principal-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5em;
    width: 100%;
    /* max-height: clamp(3vh,6vw,15vh); */

}

.saludo {
    margin-left: clamp(5vh, 1vw, 20vh);
}

.pelitos {

    width: 70px;

}

.contenedor-user {
    margin-right: 5vh;
    /* margin-top: 2vh; */
    display: flex;
    flex-direction: column;
    gap: 1vh;
    /* justify-content: right; */
    align-items: center;
    cursor: pointer;

}

.info-user {
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: center;
}

p.nombrePerfil {
    color: white;
    font-size: clamp(1em, 5vw, 1.7em);
    font-weight: 600;
}

span {
    /* font-size: 1em; */
    font-weight: bold;

}

img {
    /* height: 50px;
        width: 50px; */
}</style>