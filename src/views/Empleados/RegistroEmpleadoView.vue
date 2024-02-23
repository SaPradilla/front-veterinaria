<script setup>
import { reactive, ref } from 'vue'
import { useAdmin } from '../../stores/admin'



import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import InlineMessage from 'primevue/inlinemessage';

import { useModalAuthStore } from '../../stores/modalAuth';
import { useEmpleado } from '../../stores/empleado'

const Admin = useAdmin()
const Modal = useModalAuthStore()
const Empleado = useEmpleado()

const imageUpload = ref(null)

const options = [
    { label: 'Recepcionista' },
    { label: 'Médico' },
    { label: 'Auxiliar' },
]

const onUpload = (event) => {

    console.log(event.files[0])

    Empleado.dataEmpleado.imagen = event.files[0]

    imageUpload.value = event.files[0].objectURL

}

const deleteImage = () => {
    Empleado.dataEmpleado.imagen = null
    imageUpload.value = null
}

</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleEmpleado" class="botonVolver"> Volver </button>
    </div>
    
    
    <div class="contenido-registro">
        <h1>Registro Empleado</h1>

        <div class="message">
            <InlineMessage  v-if="Empleado.errorData"  style="width: 50vh;" severity="error"> Todos los datos son obligatorios </InlineMessage>
        </div>
        
        <form >

            <!-- Nombre -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="Empleado.dataEmpleado.nombre" placeholder="Nombres" />
            </InputGroup>

            <!-- Apellido -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="Empleado.dataEmpleado.apellido" placeholder="Apellidos" />
            </InputGroup>

            <!-- Telefono  -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-phone"></i>
                </InputGroupAddon>
                <InputMask v-model="Empleado.dataEmpleado.numero_celular" mask="999-999-9999" placeholder="Numero celular" />
            </InputGroup>

            <!-- Correo -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"></i>
                </InputGroupAddon>
                <InputText v-model="Empleado.dataEmpleado.email" type="email" placeholder="Correo" />
            </InputGroup>

            <Dropdown v-model="Empleado.dataEmpleado.rol" :options="options" optionLabel="label" placeholder="Select a City"
                class="w-full md:w-14rem" />

            <div class="image-uploaded">
                <div>
                    <FileUpload mode="basic" customUpload name="demo" :auto="true" @uploader="onUpload" accept="image/*"
                        :maxFileSize="1000000" chooseLabel="Foto" />
                    <small v-if="imageUpload">{{ Empleado.dataEmpleado.imagen.name }}</small>
                </div>

                <div class="imagen" v-if="imageUpload">
                    <img v-if="imageUpload" class="img-upload" :src="imageUpload" alt="">
                    <i @click="deleteImage" v-if="imageUpload" class="pi pi-trash"></i>
                </div>
            </div>

            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"></i>
                </InputGroupAddon>
                <Password v-model="Empleado.dataEmpleado.contrasena" promptLabel="Introduce tu contraseña" weakLabel="Muy simple"
                    mediumLabel="Un poco compleja" strongLabel="Muy compleja" toggleMask />
                <!-- <InputText v-model="Empleado.dataEmpleado.apellido" placeholder="Apellidos" /> -->
            </InputGroup>

            <div>
                <Checkbox v-model="Empleado.dataEmpleado.isAdmin" :binary="true" />
                <label>Es admin</label>
            </div>
            <Button label="Registrar" @click="Empleado.registrarEmpleado" />

        </form>

    </div>
</template>
<style scoped>
.contenido-registro {
    /* gap: 10vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* width: 100%; */
}

.message{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2vh;
    margin-bottom: 2vh;
}

form {
    display: flex;
    flex-direction: column;
    gap: 3vh;
    width: 50vh;
}

.image-uploaded {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.image-uploaded i {
    cursor: pointer;
    color: var(--color-rojo);
}

.img-upload {
    height: 50px;
    width: 50px;
}

.imagen {
    border: 1px solid var(--color-morado-claro-general);
    border-radius: 5px;
    padding: 4px;
    display: flex;
    /* gap: 1vh; */
    align-items: end;
}



h1 {
    color: var(--color-morado-claro-general);
}





.con {
    position: absolute;
    top: 25vh;
    right: 0;

}</style>