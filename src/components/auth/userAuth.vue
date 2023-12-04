<script setup>
    import {onMounted} from 'vue'
    import { useAuthStore } from '../../stores/auth';
    import {usePermisosUser} from '../../stores/permisosUser';

    const Auth = useAuthStore()
    const PermisoUser = usePermisosUser()
    onMounted(()=>{
        Auth.ObtenerToken()
    })

</script>

<template>
    <div class="container">
        
        <div class="contenedor-principal">
            <div></div>
            <!-- <img class="pelitos" alt="Pelitos" src="../../assets/img/pelitos-4.png" /> -->
            <div class="contenedor-user">
                <img  class="perfil" src="../../assets/img/avatar.svg" alt="" srcset="">
                <div class="info-user">
                    <p class="nombrePerfil">{{PermisoUser.userLogin.nombre ? PermisoUser.userLogin.nombre : ''}} </p>
                    <p class="nombrePerfil"> {{PermisoUser.userLogin.apellido ? PermisoUser.userLogin.apellido : ''}}</p>
                    <p class="rol">{{PermisoUser.userLogin.rol ?PermisoUser.userLogin.rol : ''}}</p>
                </div>
            </div>
       
        </div>
    </div>
</template>

<style scoped>
    .contenedor-principal{

        padding: 10px;
 
    }
    .pelitos {
        
        width: 70px;
        
    }

    .contenedor-user{
        /* margin-top: 2vh; */
        display: flex;
        flex-direction: column;
        gap: 1vh;
        /* justify-content: right; */
        align-items: center;
    }
    .info-user{
        display: flex;
        flex-direction: column;
        align-items: left;
        text-align: center;
    }
    p.nombrePerfil{
        font-size: 1em;
        font-weight: bold;
    }
    img{
        height: 50px;
        width: 50px;
    }
</style>