<script setup>
import { ref,onMounted } from 'vue'
import modalMenu from './modalMenu.vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router'
const router = useRouter()
import SplitButton from 'primevue/splitbutton';
import Avatar from 'primevue/avatar';

import { usePermisosUser } from '../../stores/permisosUser';
// States
const modal = ref(false)
const animar = ref(false)
const userModal = ref(false)
const adminOpcion = ref(false)
// Props
const props = defineProps({
    scrolled: {
        type: String,
        required: true
    }
})
// Store
const Auth = useAuthStore()
const Permisos = usePermisosUser()
onMounted(()=>{
    Auth.extraerUserToken()
    if(localStorage.getItem('rol')){
       if( localStorage.getItem('rol') === 'admin') adminOpcion.value = true
    }
})

// Metodos
const toggleModal = () => {
    if (!modal.value) {
        modal.value = true;
        setTimeout(() => {
            animar.value = true;
        }, 300);
    } else {
        animar.value = false;
        setTimeout(() => {
            modal.value = false;
        }, 300);
    }
}
const redirigirLogin = () => {

    router.push({ name: 'auth' })
}
const redirigirTienda = () => {

    router.push({ name: 'tienda' })
}
const toggleUserModal = () => {
    userModal.value = !userModal.value
}
const items = [
    {
        label:'',

    }
]

</script>

<template>
    
    <modalMenu v-if="modal" :animar="animar" @toggleModal="toggleModal" />

    <div class="nav-bar" :class="{ 'scrolled' : scrolled && !modal }" >

        <div class="frame">
            <a href="#inicio" >
                <img class="pelitos" alt="Pelitos" src="../../assets/img/pelitos-4.png" />
            </a>
            <div class="menu-container">
                <div class="label"> <a href="#nosotros">Nosotros</a></div>
                <div class="label"> <a href="#servicios">Servicios</a></div>
                <div class="label"><a href="#testimonios">Testimonios</a></div>
                <div class="label"><a href="#contacto">Contacto</a></div>
                <!-- <div class="label"><a href="#pqr">PQR</a></div> -->

                <img class="linea" alt="Linea" src="../../assets/img/Linea.svg" />
                <div @click="redirigirTienda" class="label shop">
                    <a>Tienda</a>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="#ffffff"
                            d="M11.15 22.825L1.175 12.85L11.975 2h10v10zM17.475 8q.625 0 1.063-.437t.437-1.063q0-.625-.437-1.062T17.475 5q-.625 0-1.062.438T15.975 6.5q0 .625.438 1.063T17.475 8" />
                    </svg>
                </div>

                <div v-if="Auth.token === null" class="label singIn"><a @click="redirigirLogin">Iniciar Sesion</a></div>
                
                <div v-else class="avatar" @click="toggleUserModal" >
                    <Avatar :label="Permisos.userLogin.nombre.substr(-20, 2)" class="mr-2" size="large" shape="circle"  style=" cursor: pointer; background-color: var(--color-morado-claro-general); color: white"  />
                
                </div>
                <!-- <img  v-else  alt="Avatar" src="../../assets/img/avatar.svg" /> -->
            </div>
            <div @click="toggleModal" class="menu-mobile">
                
                <img v-if="modal" class="x-menu" src="../../assets/img/X.svg" alt="menu">

                <img v-else src="../../assets/img/MENU.svg" alt="menu">
            </div>

        </div>
        <div @click="toggleUserModal" v-if="userModal" class="menu-user">

            <div class="menu">
                <div class="user-cuenta" @click="router.push({name:'perfil'})">
                    <p class="arriba">Ver Cuenta</p>
                    <i class="pi pi-user" style="color: var(--color-morado-claro-general); font-size: 1.2em;"></i>
                </div>
                <!-- <hr> -->
                <div v-if="adminOpcion" class="admin-menu" @click="router.push({name:'admin'})">
                    <p>Adminstrar</p>
                    <li class="pi pi-cog" style="color: var(--color-morado-claro-general); font-size: 1.2em;"></li>
                    <!-- <hr> -->
                </div>
                <div @click="Auth.cerroSesion">
                    <div class="cerrar-sesion">
                        <p class="abajo">Cerrar Sesion</p>
                        <li class="pi pi-sign-out" style="color: var(--color-morado-claro-general); font-size: 1.2em;"></li>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.user-cuenta,.cerrar-sesion,.admin-menu{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.menu-user {
    float: right;
    width: 200px;
}

.menu {
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: left;
    gap: 1vh;
    border-radius: 15px;
    position: absolute;
    border: 1px solid #eee;
    background: #f7f7f7;
}


.menu-user p {
    cursor: pointer;
    font-size: 1em;
    color: var(--color-morado-claro-general);
    /* padding: 10px; */
}

.menu-user .user-cuenta {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

}

.menu-user .cerrar-sesion {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.menu-user .user-cuenta,
.menu-user .cerrar-sesion,
.menu-user .admin-menu{
    /* background-color: var(--color-morado-oscuro-general);
    color: white; */
    padding: 10px;
    /* border: 1px solid; */
}

.menu-user .user-cuenta:hover,
.menu-user .cerrar-sesion:hover,
.menu-user .admin-menu:hover{
    background-color: var(--color-morado-oscuro-general);
    color: white;
    /* padding: 10px; */
}

.frame {
    width: 100%;
    display: flex;

}

.menu-mobile img {
    cursor: pointer;
    height: 60px;
    width: 60px;
    display: none;
}

.menu-mobile .x-menu {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    /* position: relative; */
}

.nav-bar {

    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 0em 0em 2.5em 2.5em;
    box-shadow: 3px 3px 20px #0000001b;
    height: 70px;
    width: 70em;
    color: #5a0fc3;
}

.scrolled {
    background-color: #ffffff17;
    color: rgb(0, 0, 0);
    box-shadow: 3px 3px 20px #0000001b;
    backdrop-filter: blur(10px);
}

.nav-bar .frame {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

}

.frame a {
    all: unset;
}

.nav-bar .pelitos {
    height: 52px;
    width: 85px;
    margin-left: 20px;
    cursor: pointer;

}

.nav-bar .menu-container {
    margin: 0 auto;
    display: flex;
    gap: 13px;
    margin-right: 5vh;
    align-items: center;
}

.label a {
    font-weight: 600;
    font-size: 1.1em;
}

.label {
    cursor: pointer;
    color: var(--black);
    text-align: center;
    transition: all 0.3s ease;
    white-space: nowrap;
    width: fit-content;
}

.label:hover {
    transform: scale(0.98);
}

.shop {
    color: white;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    width: max-content;
    align-items: center;
    background-color: #5a0fc3;
    justify-content: center;
    gap: 10px;
}

.shop svg {
    width: 1.6em;

}

.label.singIn {
    color: black;
    font-weight: 600;
}

.nav-bar .linea {
    height: 20px;
    position: relative;
    width: 1.5px;
}

.nav-bar .avatar {
    height: 40px;
    position: relative;
    width: 40px;
    transition: all 0.2s ease;

}

.avatar:hover {
    transform: scale(0.9);
}

@media (max-width: 768px) {
    .menu-mobile img {
        display: unset;
        color: red;
    }
    .menu-container .label,
    .menu-container .linea,
    .avatar {
        display: none;
    }

    .nav-bar {
        overflow-x: unset;
        background-color: unset;
        box-shadow: none;
        width: 100%;

    }

    .nav-bar .frame {
        width: 100%;
        display: flex;
        gap: 80px;
    }
}</style>
