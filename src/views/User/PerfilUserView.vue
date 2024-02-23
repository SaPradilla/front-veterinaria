<script setup>
import { onMounted,ref } from 'vue';
import { usePermisosUser } from '../../stores/permisosUser';
import { useAuthStore } from '../../stores/auth';
import { useCliente } from '../../stores/cliente';
import { useRouter } from 'vue-router';
// Primevue 
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';



const Permisos = usePermisosUser()
const Auth = useAuthStore()
const Cliente = useCliente()
const router = useRouter()


onMounted(()=>{
    
    Auth.ObtenerToken()
    Auth.extraerUserToken()
    Cliente.verCliente(Permisos.userLogin.id,Auth.token)

})

</script>

<template>

    <div class="contenedor-perfil">
      
        <div class="content-header-perfil">
            <div class="info-perfil">

                <!-- <div class="foto-perfil"></div> -->
                
                <Avatar v-if="Permisos.userLogin.imagen" :image="`http://localhost:6060/uploads/clients/${Permisos.userLogin.imagen}`"  size="xlarge" shape="circle" />
                    
                <Avatar v-else :label="Permisos.userLogin.nombre.substr(-20, 2)" shape="circle"
                style="background-color: var(--color-morado-claro-general); width: 80px; height: 80px; font-size: 2em;  color: white" />
                    
                <div class="content-perfil">
                    <div class="nombres">
                        <p class="nombre">{{ Permisos.userLogin.nombre }} </p>
                        <p class="apellido"> {{ Permisos.userLogin.apellido }}</p>
                    </div>
                    <div class="editar-perfil">
                        <Button  style="padding: 10px; display: flex ; gap: 2px; font-size: .8em; "  @click="router.push({name:'editar-perfil'})" icon="pi pi-cog" label="Configuracion" outlined severity="secondary" rounded  />
                    </div>
                </div>

            </div>
            <Button style="display: flex ; gap: 1em;" @click="router.push({name:'home'})" icon="pi pi-home" label="Inicio"  severity="primary" rounded  />
        </div>

        <div class="contenedor-user">
            <RouterView/>
        </div>

    </div>

</template>

<style scoped>
.content-header-perfil{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}
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
    font-size: 1.2em;
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
    background-color: white;
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
    /* gap: 20px; */
}
</style>