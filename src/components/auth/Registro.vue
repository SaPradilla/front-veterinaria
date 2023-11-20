<script setup>
    import { useModalAuthStore } from '../../stores/modalAuth';
    import {useAuthStore} from '../../stores/auth'
    const Modal = useModalAuthStore()
    const Auth = useAuthStore()
</script>

<template>
    <div class="container-register">
        <div class="content-register">
            <div class="forms-register">
                <div class="content-logo">
                    <img class="logo" src="../../assets/img/pelitos-4.png" alt="" srcset="">
                </div>
                <h2>Bienvenido!</h2>
                <FormKit type="form" id="form" @submit="Auth.registrar" :actions="false"
                    incomplete-message="Ingrese todos sus datos para continuar">
                    
                    <FormKit
                    
                        type="text"
                        prefix-icon="userIcon"
                        placeholder="Nombres"
                        name="nombre"
                        validation="required" 
                        :validation-messages="{
                            required: 'El Nombre es Obligatorio',
                        }" 

                    />
                    <FormKit
                        type="text"
                        prefix-icon="userIcon"
                        placeholder="Apellidos"
                        name="apellido"
                        validation="required" 
                        :validation-messages="{
                            required: 'Los Apellidos son Obligatorios',
                        }" 

                    />
                    <FormKit 
                        type="text"
                        placeholder="Teléfono - ej: 310-000-0000"
                        prefix-icon="phoneIcon"
                        name="numero_celular"
                        validation="number|required|?length:10"
                        :validation-messages="{
                            length: 'Ingrese un número de celular válido',
                            required: 'Documento es obligatorio',
                            number:'No puedes ingresar letras'
                        }"

                    />

                    <FormKit
                        type="email"
                        validation="required|email|"
                        name="email"
                        :validation-messages="{
                            required: 'El correo es Obligatorio',
                            email: 'Ingrese un correo valido',
                        }" 
                        placeholder="Correo"
                        prefix-icon="emailIcon"

                    />


                    <FormKit 
                        placeholder="Ingrese su contraseña" 
                        name="contrasena" type="password"
                        prefix-icon="segurity" 
                        validation="required|?length:8"
                        suffix-icon="eyeClose" @suffix-icon-click="Modal.handleIconClick" 
                        :validation-messages="{
                            required: 'La contraseña es obligatoria',
                            length: 'La contraseña debe tener al menos 8 caracteres',

                        }" />

                    <div class="container-text-register">
                        <FormKit style="width: 240px;" type="submit" label="Registrarse" id="login" />
                        <p id="singUp">Ya tienes cuenta? <span @click="Modal.handleClickModal">Click Aquí</span></p>
                    </div>
                </FormKit>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-register {
    display: grid;
    justify-content: center;
    align-content: center;
    height: 100vh;
}
.content-logo{
    display: flex;
    justify-content: center;
}
.content-register img{
    
    width: 160px;
}
.content-register h2 {
    text-align: center;
    font-size: 2.8em;
    font-weight: 600;
    color: var(--color-morado-general);
    margin-bottom: 7vh;
}

.forms-register p {
    font-weight: 500;
    text-align: center;
}

.forms-register span {
    cursor: pointer;
    font-weight: 700;
    color: var(--color-verde);
}

.container-text-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3vh;
    gap: 20px;
}

.container-text-register input[data-type="submit"] button.formkit-input {
    width: 230px;
  
}
</style>