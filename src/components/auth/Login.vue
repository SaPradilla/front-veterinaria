<script setup>

import { reactive } from 'vue'


// States
const person = reactive({
    document: '',
    password: ''
})

const singIn = (data) => {
    console.log(data)
}
// metodos
const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eyeOpen' ? 'eyeClose' : 'eyeOpen'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
    <div class="container-login">
        <div class="content-login">
            <div class="forms-login">
                <div class="content-logo">
                    <img class="logo" src="../../assets/img/pelitos-4.png" alt="" srcset="">
                </div>
                <h2>Iniciar Sesion</h2>

                <FormKit type="form" id="form" @submit="singIn" :value="person" :actions="false"
                    incomplete-message="Ingrese todos sus datos para continuar">
                    <FormKit
                    type="email"
                    validation="required|email|"
                    :validation-messages="{
                        required: 'El correo es Obligatorio',
                        email: 'Ingrese un correo valido',
                    }" 
                    placeholder="Correo"
                    prefix-icon="emailIcon"

                    />


                    <FormKit v-model="person.password" placeholder="Ingrese su contraseña" name="password" type="password"
                        value="mySecretPassword!" prefix-icon="segurity" validation="required|?length:2"
                        suffix-icon="eyeClose" @suffix-icon-click="handleIconClick" :validation-messages="{
                            required: 'La contraseña es obligatoria',
                            length: 'La contraseña debe tener al menos 8 caracteres',

                        }" />

                    <div class="container-text-login">
                        <p>Olvidaste tu Contraseña? <span>Click Aquí</span></p>
                        <div class="remember_me">
                            <p>Recuerdame</p>
                            <FormKit type="checkbox" name="remember_me" decorator-icon="checkkIcon" />
                        </div>
                        <FormKit style="width: 240px;" type="submit" label="Ingresar" id="login" />
                        <p id="singUp">Aún no tienes cuenta? <span @click="">Registrate Aquí</span></p>
                    </div>
                </FormKit>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container-login {
    display: grid;
    justify-content: center;
    align-content: center;
    height: 100vh;
}
.content-logo{
    display: flex;
    justify-content: center;
}
.content-login img{
    
    width: 160px;
}
.content-login h2 {
    text-align: center;
    font-size: 2.8em;
    font-weight: 600;
    color: var(--color-morado-general);
    margin-bottom: 7vh;
}

.forms-login p {
    font-weight: 500;
    text-align: center;
}

.forms-login span {
    cursor: pointer;
    font-weight: 700;
    color: var(--color-verde);
}

.container-text-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3vh;
    gap: 20px;
}

.remember_me {
    gap: 10px;
    align-items: center;
    display: flex;
    text-align: center;
}

.remember_me .formkit-outer {
    margin: 0 auto;
}

.container-text-login input[data-type="submit"] button.formkit-input {
    width: 230px;
  
}
</style>
