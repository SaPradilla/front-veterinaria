<script setup>
    import {ref} from 'vue'
    import modalMenu from './UI/modalMenu.vue';
    import { useAuthStore } from '../stores/auth';
    import { useRouter } from 'vue-router'
    const router = useRouter ()
    // States
    const modal = ref(false)
    const animar = ref(false)
    // Props
    const props = defineProps({
        scrolled:{
            type: String,
            required:true
        }
    })
    // Store
    const Auth = useAuthStore()


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
    const redirigirLogin = () =>{
    const router = useRouter ()
        router.push({name:'auth'})
    }

</script>

<template>
    <modalMenu
    v-if="modal"
    :animar="animar"
    @toggleModal="toggleModal"
    />
    <div class="nav-bar" :class="scrolled">
        <div class="frame">
            <img class="pelitos" alt="Pelitos" src="../assets/img/pelitos-4.png" />
            <div class="menu-container">
                <div class="label"> <a href="#nosotros">Nosotros</a></div>
                <div class="label"> <a href="#servicios">Servicios</a></div>
                <div class="label"><a href="#testimonios">Testimonios</a></div>
                <div class="label"><a href="#contacto">Contacto</a></div>
                <div class="label"><a href="#pqr">PQR</a></div>

                <img class="linea" alt="Linea" src="../assets/img/Linea.svg" />
                <div class="label shop"><a href="#productos">Tienda</a></div>
                
                <img v-if="Auth.token" class="avatar" alt="Avatar" src="../assets/img/avatar.svg" />
                <div v-else class="label singIn"><a @click="redirigirLogin">Iniciar Sesion</a></div>
            </div>
            <div 
            @click="toggleModal"
            
            class="menu-mobile">
                <img v-if="modal" class="x-menu"  src="../assets/img/X.svg" alt="menu">
                <img v-else src="../assets/img/MENU.svg" alt="menu">
            </div>
        </div>
    </div>
</template>
<style>
.frame{
    width: 100%;
}
.menu-mobile img{
    height: 60px;
    width: 60px;
    display: none;
}
.menu-mobile .x-menu{
    z-index: 1000;
    position: relative;
}

.nav-bar {
    overflow-x: hidden;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 50px;
    box-shadow: 3px 3px 10px #00000040;
    height: 60px;
    width: 1350px;
    color:#5a0fc3;
}
.scrolled{
    background-color: #ffffff17;
    color: rgb(0, 0, 0);
    box-shadow: 5px 5px 10px #00000040;

}

.nav-bar .frame {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

}
.frame a{
    all: unset;
}

.nav-bar .pelitos {
    height: 52px;
    width: 85px;
    margin-left: 20px;
    
}

.nav-bar .menu-container {
    margin: 0 auto;
    display: flex;   
    gap: 13px;
    margin-right: 5vh;
    align-items: center;
}

.nav-bar .label {
    cursor: pointer;
    color: var(--black);
    font-family: var(--button-text-font-family);
    font-size: var(--button-text-font-size);
    font-style: var(--button-text-font-style);
    font-weight: var(--button-text-font-weight);
    letter-spacing: var(--button-text-letter-spacing);
    line-height: var(--button-text-line-height);
    position: relative;
    text-align: center;
    transition: all 0.2s ease;
    white-space: nowrap;
    width: fit-content;
}

.label:hover {
    transform: scale(0.9);
}
.label.shop{
  
    color: white;
    padding: 10px ;
    border-radius: 10px;
    width: 60px;
    background-color: #5a0fc3;
}
.label.singIn{
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
    .menu-mobile img{
        display: unset;
        color: red;
    }
    .menu-container .label , .menu-container .linea , .avatar{
        display: none;
    }
    .nav-bar{
        overflow-x: unset;
        background-color: unset;
        box-shadow: none;
        width: 100%;
        
    }
    .nav-bar .frame{
        width: 100%;
        display: flex;
        gap: 80px;
    }
 }
</style>
