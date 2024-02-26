<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useAdmin } from '../../stores/admin'

import { useModalAuthStore } from '../../stores/modalAuth';
import { useEmpleado } from '../../stores/empleado'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

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

const Admin = useAdmin()
const Modal = useModalAuthStore()
const Empleado = useEmpleado()
const Router = useRouter()
const imageUpload = ref(null)

const options = [
    { label: 'Recepcionista' },
    { label: 'Médico' },
    { label: 'Auxiliar' },
]

onMounted(() => {
    if (Empleado.empleadoUpdate.nombre === '') {
        toast.warn('Sin valor a editar', {
            position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
            Router.push({ name: 'empleados' })
        }, 1000)
    }
})

const onUpload = (event) => {

    console.log(event.files[0])

    Empleado.empleadoUpdate.imagen = event.files[0]

    imageUpload.value = event.files[0].objectURL

}

const deleteImage = () => {
    Empleado.empleadoUpdate.imagen = null
    imageUpload.value = null
}

</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleEmpleado" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Editar Empleado</h1>
        
        <div class="message">
            <InlineMessage  v-if="Empleado.errorData"  style="width: 50vh;" severity="error"> Todos los datos son obligatorios </InlineMessage>
        </div>

        <form>

            <!-- Nombre -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="Empleado.empleadoUpdate.nombre" placeholder="Nombres" />
            </InputGroup>

            <!-- Apellido -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="Empleado.empleadoUpdate.apellido" placeholder="Apellidos" />
            </InputGroup>

            <!-- Telefono  -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-phone"></i>
                </InputGroupAddon>
                <InputMask v-model="Empleado.empleadoUpdate.numero_celular" mask="999-999-9999"
                    placeholder="Numero celular" />
            </InputGroup>

            <!-- Correo -->
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"></i>
                </InputGroupAddon>
                <InputText v-model="Empleado.empleadoUpdate.email" type="email" placeholder="Correo" />
            </InputGroup>

            <Dropdown v-model="Empleado.empleadoUpdate.rol" :options="options" optionLabel="label" placeholder="Rol"
                class="w-full md:w-14rem" />

            <div class="image-uploaded">
                <div>
                    <FileUpload mode="basic" customUpload name="demo" :auto="true" @uploader="onUpload" accept="image/*"
                        :maxFileSize="1000000" chooseLabel="Foto" />
                   
                </div>

                <div class="imagen" >
                    <img class="img-upload"  alt=""
                        :src="imageUpload ? imageUpload : `http://localhost:6060/uploads/employees/${Empleado.empleadoUpdate.imagenUrl}`"
                    >
                    <!-- <img v-if="imageUpload" class="img-upload" :src="imageUpload" alt=""> -->

                </div>
            </div>

            <!-- <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"></i>
                </InputGroupAddon>
                <Password v-model="Empleado.empleadoUpdate.contrasena" promptLabel="Introduce tu contraseña"
                    weakLabel="Muy simple" mediumLabel="Un poco compleja" strongLabel="Muy compleja" toggleMask />
            </InputGroup> -->

            <div>
                <Checkbox v-model="Empleado.empleadoUpdate.isAdmin" :binary="true" />
                <label>Es admin</label>
            </div>
            <Button label="Editar" @click="Empleado.editarEmpleado" />

        </form>
    </div>
</template>

<style scoped>.contenido-registro {
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

}
</style>