<script setup>

    import Login from '../../components/auth/Login.vue';
    import Registro from '../../components/auth/Registro.vue';
    import LoginEmpledos from '../../components/auth/LoginEmpledos.vue';
    import { useModalAuthStore} from '../../stores/modalAuth'
    const Modal = useModalAuthStore()

    import { useAuthStore } from '../../stores/auth';
    const Auth = useAuthStore()


</script>

<template>

    <div class="login">
       
        <div class="contenedor-login">

            <div 
                v-if="Modal.modalLogin.showModalLogin"
                class="contenido-login "
                :class="Modal.modalLogin.animateModalLogin ? 'open' : 'close'"
            >
                <Login />
            </div>

            <div 
                v-else-if="Modal.modalRegister.showModalRegister"
                class="contenido-registro"
                :class="Modal.modalRegister.animateModalRegister ? 'open' : 'close'"
            >
                <Registro/>
            </div>

            <div 
                v-else-if="Modal.modalLoginEmpleado.showModalLoginEmpleado"
                class="contenido-login-empleado"
                :class="Modal.modalLoginEmpleado.animateModalLoginEmpleado ? 'open' : 'close'"
            >
                <LoginEmpledos/>
            </div>
            <div class="fondo-imagen">
                <img src="../../assets/img/fondoLogin.jpg" alt="fondoLogin">
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
    .contenido-login,.contenido-registro,.contenido-login-empleado{ 
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
        z-index: 1000;
    }

    .contenido-login.open,
    .contenido-registro.open,
    .contenido-login-empleado.open {
        opacity: 0;
    }

    .contenido-login.close,
    .contenido-registro.close,
    .contenido-login-empleado.open  {
        opacity: 1;
    }

    @media (max-width: 768px) {
        .login .ellipse{
            height: 100px;
            width: 150px;
            filter: blur(150px);

        }
        .login .ellipse-2{
            left: 200px;
            top: 800px;
            filter: blur(100px);

        }
        .contenedor-login{
            z-index: 1004;
            display: unset;
    
        }
        .fondo-imagen{
            display: none;
        }
    }


</style>