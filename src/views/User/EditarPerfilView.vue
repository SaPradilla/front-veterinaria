<script setup>
import {onMounted,ref} from 'vue'

import { useAuthStore } from '../../stores/auth';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import FileUpload from 'primevue/fileupload';
import Avatar from 'primevue/avatar';

import { useCliente } from '../../stores/cliente';
import { usePermisosUser } from '../../stores/permisosUser';
import { useRouter } from 'vue-router';


const Auth = useAuthStore()
const Cliente = useCliente()
const Permisos = usePermisosUser()
const imageUpload = ref(null)

const router = useRouter()

onMounted(()=>{
  
    Auth.ObtenerToken()
    Auth.extraerUserToken()

    Cliente.clienteUpdate = Permisos.userLogin
})
const onUpload = (event) => {

    console.log(event.files[0])

    Permisos.userLogin.imagen = event.files[0]
    
    imageUpload.value = event.files[0].objectURL

}

const deleteImage = () => {
    Permisos.userLogin.imagen = null
    imageUpload.value = null
}
</script>

<template>
    <div class="contenedor-config-perfil">
        <div class="contenedor-config">
            <div class="titulo">
                <h2>Ajuste del perfil</h2>
                <span>Cambia los datos de identificación de tu cuenta.</span>
            </div>
            <div class="info-config">
                <div class="user-input user-info">
                    <!-- <div class="foto-perfil"></div> -->
                    <div class="imagen-perfil">

                        <Avatar v-if="Permisos.userLogin.imagen" :image="imageUpload ? imageUpload : `http://localhost:6060/uploads/clients/${Permisos.userLogin.imagen}`"  style=" width: 100px; height: 100px; " shape="circle" />
                        
                        <Avatar v-else :label="Permisos.userLogin.nombre.substr(-20, 2)" shape="circle"
                        style="background-color: var(--color-morado-claro-general); width: 100px; height: 100px; font-size: 2em;  color: white" />
                      
                            <FileUpload style="display: flex; gap: 10px;" mode="basic" customUpload name="demo" :auto="true" @uploader="onUpload" accept="image/*"
                            :maxFileSize="1000000" chooseLabel="Cambiar" />
              
                        
                    </div>
                    <small v-if="imageUpload">{{ Permisos.userLogin.imagen.name }}</small>    
                  

                    <div class="input input-nombre">
                        <label for="nombre">Nombre</label>
                        <InputText id="nombre" v-model="Cliente.clienteUpdate.nombre" aria-describedby="input-help" />
                    </div>

                    <div class="input input-apellido">
                        <label for="apellido">Apellido</label>
                        <InputText id="apellido" v-model="Cliente.clienteUpdate.apellido" aria-describedby="input-help" />
                    </div>

                </div>
                <Divider />
                <div class=" user-input user-contacto">
                    <div class="titulo">
                        <h2>Contacto</h2>
                        <span>Cambia los datos de contacto tu cuenta.</span>
                    </div>
                    <div class="input input-telefono">
                        <label for="telefono">Telefono</label>
                        <InputText id="telefono" v-model="Cliente.clienteUpdate.numero_celular" aria-describedby="input-help" />
                    </div>
                    <div class="input input-direccion">
                        <label for="direccion">Direccion</label>
                        <InputText id="direccion" v-model="Cliente.clienteUpdate.direccion" aria-describedby="input-help"  placeholder="Añadir Direccion"/>
                    </div>
                </div>
                <Divider />
                <div class=" user-input user-seguridad">
                    <div class="titulo">
                        <h2>Seguridad</h2>
                        <span>Cambia los datos de seguridad</span>
                    </div>
                    <div class="input input-email">
                        <label for="Correo">Correo</label>
                        <InputText id="email" v-model="Cliente.clienteUpdate.email" aria-describedby="input-help" />
                    </div>
                    <div class="input input-contrasena">
                        <label for="Contraseña">Contraseña</label>
                        <!-- <InputText id="contrasena" v-model="contrasena" aria-describedby="input-help" /> -->
                        <small> <strong>Cambiar contraseña.</strong> Mejora la seguridad con una contraseña segura.</small>
                    </div>
                </div>
                <div class="acciones">
                    <Button @click="Cliente.actualizarCliente" style="font-size: .8em; margin-bottom: 4vh; " label="Actualizar datos" rounded
                        outlined />

                    <Button @click="router.push({name:'info-perfil'})" style="font-size: .8em; margin-bottom: 4vh; " label="Cancelar" rounded
                        outlined  severity="danger" />
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>

.imagen-perfil{
    display: flex;
    justify-content: left;
    align-items: end;
}

strong{
    cursor: pointer;
}
.contenedor-config-perfil {
    background: url('../../assets/img/perfil_background.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;

}

.contenedor-config {
    padding: 4vh;
    background-color: white;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.036);
    border-radius: 20px;
    height: auto;
}
.user-input{
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 2px;
}
.foto-perfil {
    height: 120px;
    width: 120px;
    background-color: #D9D9D9;
    border-radius: 100%;
}

.info-config {
    display: flex;
    gap: 1em;
    flex-direction: column;
}

.input {
    display: flex;
    flex-direction: column;
}

.titulo {
    margin-bottom: 2em;
}
.acciones{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em;
}
</style>