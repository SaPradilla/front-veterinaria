<script setup>
import { onMounted,ref } from 'vue';
import { usePermisosUser } from '../../stores/permisosUser';
import { useAuthStore } from '../../stores/auth';
import { useCliente } from '../../stores/cliente';

// Primevue 
import Button from 'primevue/button';



const Permisos = usePermisosUser()
const Auth = useAuthStore()
const Cliente = useCliente()

onMounted(()=>{
    
    Auth.ObtenerToken()
    Auth.extraerUserToken()
    Cliente.verCliente(Permisos.userLogin.id,Auth.token)

})

</script>

<template>

    <div class="contenedor-perfil">

        <div class="info-perfil">

            <div class="foto-perfil"></div>

            <div class="content-perfil">
                <div class="nombres">
                    <p class="nombre">{{ Permisos.userLogin.nombre }} </p>
                    <p class="apellido"> {{ Permisos.userLogin.apellido }}</p>
                </div>  
                <div class="editar-perfil">
                    <Button  outlined label="Editar Perfil" severity="secondary" rounded />
                </div>
            </div>
            
        </div>

        <div class="contenedor-user">
            <RouterView/>
         
        </div>

    </div>
</template>

<style scoped>
.contenedor-perfil{
    background: url('../../assets/img/perfil_background.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5vh;
    padding: 3em;
    /* overflow-y: hidden; */
}
.info-perfil{
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    gap: 10px;
}
.foto-perfil{
    height: 120px;
    width: 120px;
    background-color: #D9D9D9;
    border-radius: 100%;
}
.nombres{
    font-size: 1.6em;
    font-weight: 700;
}
.nombre{

}

.apellido{
    font-weight: 600;
    color: #8E8E8E;
}

.contenedor-user{
    width: 100%;
    height:100vh;
    /* padding: 20px; */
    /* box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.036); */
    /* border-radius: 40px; */
    /* background-color: white; */
}
.content-perfil{
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 20px;
}
</style>