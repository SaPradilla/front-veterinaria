<script setup>
    import { reactive,ref,onMounted} from 'vue'
    import {useAdmin} from '../../stores/admin'

    import { useModalAuthStore } from '../../stores/modalAuth';
    import {useEmpleado} from '../../stores/empleado'
    import {useRouter} from 'vue-router'
    import {toast} from 'vue3-toastify'
    const Admin = useAdmin()
    const Modal = useModalAuthStore()
    const Empleado = useEmpleado()
    const Router = useRouter()

    onMounted(()=>{
        if(Empleado.empleadoUpdate.nombre === ''){
            toast.warn('Sin valor a editar',{
                position: toast.POSITION.TOP_CENTER
            })
            setTimeout(()=>{
                Router.push({name:'empleados'})
            },1000)
        }
    })


</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleEmpleado" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Editar Empleado</h1>
        <div class="formulario">

            <FormKit type="form" id="form" @submit="Empleado.editarEmpleado()" :actions="false"
                incomplete-message="Ingrese todos sus datos para continuar">

                <FormKit v-model="Empleado.empleadoUpdate.nombre" type="text" prefix-icon="userIcon" placeholder="Nombres" name="nombre" validation="required"
                    :validation-messages="{
                        required: 'El Nombre es Obligatorio',
                    }" />

                <FormKit  v-model="Empleado.empleadoUpdate.apellido" type="text" prefix-icon="userIcon" placeholder="Apellidos" name="apellido" validation="required"
                    :validation-messages="{
                        required: 'Los Apellidos son Obligatorios',
                    }" />

                <FormKit v-model="Empleado.empleadoUpdate.numero_celular" type="text" placeholder="Teléfono - ej: 310-000-0000" prefix-icon="phoneIcon" name="numero_celular"
                    validation="number|required|?length:10" :validation-messages="{
                        length: 'Ingrese un número de celular válido',
                        required: 'Documento es obligatorio',
                        number: 'No puedes ingresar letras'
                    }" />

                <FormKit   v-model="Empleado.empleadoUpdate.email"  type="email" validation="required|email|" name="email" :validation-messages="{
                    required: 'El correo es Obligatorio',
                    email: 'Ingrese un correo valido',
                }" placeholder="Correo" prefix-icon="emailIcon" />

                <FormKit
                    v-model="Empleado.empleadoUpdate.rol"
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
                
                <FormKit
                    v-model="Empleado.empleadoUpdate.isAdmin"
                    type="checkbox"
                    label="Es Administrador?"
                    help="Usuario con Permisos"
                    name="isAdmin"
                />
                <p>Actualizar Contraseña</p>
                <div class="boton">

                    <FormKit style="width: 240px; margin: 0 auto;" type="submit" label="Editar" />
                </div>

            </FormKit>
        </div>
    </div>
</template>
<style scoped>
    .boton{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    p{
        text-align: center;
        margin: 10px;
        color: var(--color-morado-claro-general);
        cursor: pointer;
        font-weight: 600;
    }
    h1{
        color: var(--color-morado-claro-general);
    }
    .contenido-registro{
        gap: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .formulario{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .con{
        position: absolute;
        top: 25vh;
        right: 0;
        
    }
</style>