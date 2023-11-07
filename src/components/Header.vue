<script setup>
    import {ref} from 'vue'
    import modalMenu from './UI/modalMenu.vue';

    const modal = ref(false)
    const animar = ref(false)

    const props = defineProps({
        scrolled:{
            type: String,
            required:true
        }
    })

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
                <div class="label"><a href="#productos">Productos</a></div>
                <div class="label"><a href="#contacto">Contacto</a></div>
                <div class="label"><a href="#pqr">PQR</a></div>
                <img class="linea" alt="Linea" src="../assets/img/Linea.svg" />
                <img class="avatar" alt="Avatar" src="../assets/img/avatar.svg" />
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
    align-items: flex-end;
    display: inline-flex;
    gap: 534px;
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
    align-items: center;
    display: flex;
    gap: 13px;
    padding: 1px 4px;
    width: 557px;
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
