<script setup>
    import Login from '../components/auth/Login.vue';
</script>

<template>
    <div class="login">
        <div class="blur-shapes">
                <div class="ellipse"></div>
                <div class="ellipse-2"></div>
            </div>
        <div class="contenedor-login">
            <div class="contenido-login">
                <Login/>
            </div>
            <div class="fondo-imagen">
                <img src="../assets/img/fondoLogin.jpg" alt="fondoLogin">
            </div>
  
        </div>
    </div>
</template>

<style scoped>

    .login .blur-shapes {
        left: 0;
        position: absolute;
        top: 0;
    }

    .login .ellipse {
        background: linear-gradient(180deg, rgb(90, 15, 195) 0%, rgb(90, 15, 195) 100%);
        border-radius: 164px/160px;
        filter: blur(220px);
        width: 300px;
        height: 200px;
        left: 70px;
        position: absolute;
        top: 250px;
        z-index: 1000;
    }

    .login .ellipse-2 {
        background: linear-gradient(180deg, rgb(90, 15, 195) 0%, rgb(90, 15, 195) 100%);
        border-radius: 164px/160px;
        filter: blur(100px);
        height: 100px;
        width: 150px;
        left: 650px;
        position: absolute;
        top:700px;
        z-index: 1000;

    }
    .login{

        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .contenedor-login{
        z-index: 1004;

        display: grid;
        grid-template-columns: 40% 60%;
    }
    .contenido-login{ 
        z-index: 1004;

        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;

        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 1;

    }
    .fondo-imagen{
        height: 100vh;
    }
    .fondo-imagen img{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 10001;

    }
</style>