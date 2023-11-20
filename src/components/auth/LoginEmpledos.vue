<script setup>
  
    import { reactive } from 'vue'
    import { useAuthStore } from '../../stores/auth';
    import { useModalAuthStore} from '../../stores/modalAuth'
    const Auth = useAuthStore()
    const Modal = useModalAuthStore()
    
    // metodos


</script>

<template>

    <div class="container-login">
        <div class="content-login">
            <div class="forms-login">
                <div class="content-logo">
                    <img class="logo" src="../../assets/img/pelitos-4.png" alt="" srcset="">
                </div>
                <h2>¡Bienvenido!</h2>
                <h3>Ingresar como empleado</h3>

                <FormKit type="form" id="form" @submit="Auth.loginEmpleado" :actions="false"
                    incomplete-message="Ingrese todos sus datos para continuar">

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
                        type="password"
                        placeholder="Ingrese su contraseña" 
                        name="contrasena" 
                        prefix-icon="segurity" 
                        validation="required|?length:8"
                        suffix-icon="eyeClose" @suffix-icon-click="Modal.handleIconClick" :validation-messages="{
                            required: 'La contraseña es obligatoria',
                            length: 'La contraseña debe tener al menos 8 caracteres',

                        }" 
                    />

                    <div class="container-text-login">
                        <p id="negrilla" >Olvidaste tu Contraseña?</p>
                        <div class="remember_me">
                            <p>Recuerdame</p>
                            <FormKit type="checkbox" name="remember_me" decorator-icon="checkkIcon" />
                        </div>
                        <FormKit style="width: 240px;" type="submit" label="Entrar" id="login" />
                        <p>No eres empleado? <span @click="Modal.handleClickModalEmpleado">Click Aqui</span></p>

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
    margin-bottom: 2vh;
}
.content-login h3 {
    text-align: center;
    font-size: 1.4em;
    font-weight: 600;
    color: black;
    margin-bottom: 7vh;
}

.forms-login p {
    font-weight: 500;
    text-align: center;
}

.forms-login span ,#negrilla{
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
