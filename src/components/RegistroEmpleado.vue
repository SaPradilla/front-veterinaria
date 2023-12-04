<script setup>
    import { reactive,ref} from 'vue'
    import { useDashboard } from '../stores/dashboard';
    import { useModalAuthStore } from '../stores/modalAuth';
    import {useEmpleado} from '../stores/empleado'
    const Modal = useModalAuthStore()
    const Dashboard = useDashboard()
    const Empleado = useEmpleado()

    const dataEmpleado = reactive({
        nombre: '',
        apellido: '',
        numero_celular: '',
        email: '',
        rol: '',
        isAdmin: null,
        contrasena: '',
    })

</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Dashboard.handleVolverEmpleado()" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Registro Empleado</h1>
        <div class="formulario">

            <FormKit type="form" id="form" @submit="Empleado.registrarEmpleado(dataEmpleado)" :actions="false"
                incomplete-message="Ingrese todos sus datos para continuar">

                <FormKit v-model="dataEmpleado.nombre" type="text" prefix-icon="userIcon" placeholder="Nombres" name="nombre" validation="required"
                    :validation-messages="{
                        required: 'El Nombre es Obligatorio',
                    }" />

                <FormKit  v-model="dataEmpleado.apellido" type="text" prefix-icon="userIcon" placeholder="Apellidos" name="apellido" validation="required"
                    :validation-messages="{
                        required: 'Los Apellidos son Obligatorios',
                    }" />

                <FormKit v-model="dataEmpleado.numero_celular" type="text" placeholder="Teléfono - ej: 310-000-0000" prefix-icon="phoneIcon" name="numero_celular"
                    validation="number|required|?length:10" :validation-messages="{
                        length: 'Ingrese un número de celular válido',
                        required: 'Documento es obligatorio',
                        number: 'No puedes ingresar letras'
                    }" />

                <FormKit   v-model="dataEmpleado.email"  type="email" validation="required|email|" name="email" :validation-messages="{
                    required: 'El correo es Obligatorio',
                    email: 'Ingrese un correo valido',
                }" placeholder="Correo" prefix-icon="emailIcon" />

                <FormKit
                    v-model="dataEmpleado.rol"
                    type="select"
                    placeholder="Rol"
                    name="rol"
                    validation="required"
                    :validation-messages="{
                        required:'El rol es Obligatorio'
                    }"
                    :options="[
                        'Recepcionista',
                        'Médico',
                        'Auxiliar'
                    ]"
                />

                    
                <FormKit  v-model="dataEmpleado.contrasena" placeholder="Ingrese su contraseña" name="contrasena" type="password" prefix-icon="segurity"
                    validation="required|?length:8" suffix-icon="eyeClose" @suffix-icon-click="Modal.handleIconClick"
                    :validation-messages="{
                        required: 'La contraseña es obligatoria',
                        length: 'La contraseña debe tener al menos 8 caracteres',

                    }" />
                <FormKit
                    v-model="dataEmpleado.isAdmin"
                    type="checkbox"
                    label="Es Administrador?"
                    help="Usuario con Permisos"
                    name="isAdmin"
                />

                <FormKit style="width: 240px;" type="submit" label="Registrar" id="login" />

            </FormKit>
        </div>
    </div>
</template>
<style scoped>
    .contenido-registro{
        gap: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .formulario{
        
    }
    .con{
        position: absolute;
        top: 10vh;
        right: 0;
        
    }
</style>