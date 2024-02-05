<script setup>

</script>

<template>
    <div class="contacto">
        <div class="contenedor-contacto">
            
            <div class="texto-contacto">
                <h1>Contacto</h1>
                <p>¿Necesita contactar con nosotros? <strong>enviamos un mensaje.</strong> </p>
                <img src="../../assets/img/email-send.svg" alt="" srcset="">
            </div>
        
    
            <div class="formulario-contacto">
                <div class="nombres-contacto">
                    <div class="nombre-contacto">
    
                        <FormKit
                            type="text"
                            prefix-icon="userIcon"
                            placeholder="Nombres"
                            name="nombre"
                            validation="required"
                            :validation-messages="{
                                required: 'Obligatorio',
                            }"
        
                        />
                    </div>
                    <div class="apellido-contacto">
    
                        <FormKit
                            type="text"
                            prefix-icon="userIcon"
                            placeholder="Apellidos"
                            name="apellido"
                            validation="required"
                            :validation-messages="{
                                required: 'Obligatorio',
                            }"
        
                        />
                    </div>
                </div>
                <FormKit
                
                    type="email"
                    validation="required|email|"
                    name="email"
                    :validation-messages="{
                        required: 'Obligatorio',
                        email: 'Ingrese un correo valido',
                    }" 
                    placeholder="Correo"
                    prefix-icon="emailIcon"
                />
                <!-- :help="`${value.instructions ? value.instructions.length : 0} / 120`"   -->
                <div class="textarea">
                    <FormKit
                        type="text"
                        placeholder="¿En que te podemos ayudar?"
                        validation="required"
                        :validation-messages="{
                            required: 'Obligatorio',
    
                        }" 
                    />
    
                </div>
                <FormKit style="width: 200px;" type="submit" label="Enviar"/>
    
            </div>

        </div>
    </div>
</template>

<style>
.contacto{
    margin-top: 30vh;
    height: 60vh;
    width: 100%;
}
.contenedor-contacto{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 190px;
}

.texto-contacto{
    width: max-content;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: fit-content;
    gap: 20px;
}
div.texto-contacto h1{
    font-size: clamp(2.4em,5vw,5em);

    font-weight: 700;
}
div.texto-contacto p{
    font-size: 1.6em;
    align-self: stretch;
    
}
div.texto-contacto img{
    height: 300px;
    width: 400px;
}

.formulario-contacto{
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 100px  rgba(90, 15, 195, 0.468);
    /* border: solid 2px var(--color-morado-general); */
    width: 400px;
    height: auto;
    padding: 50px;
    gap: 20px;
    border-radius: 20px ;
}
.nombres-contacto{
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.formulario-contacto .nombre-contacto div.formkit-outer,
.formulario-contacto .nombre-contacto div.formkit-inner,

.formulario-contacto .apellido-contacto div.formkit-outer,
.formulario-contacto .apellido-contacto div.formkit-inner
{
    width: 140px ;
}
.formulario-contacto .textarea div.formkit-inner{
    height: 80px;
}
@media (max-width:768px){
    .contenedor-contacto{
        text-align: center;
        flex-direction: column ;
        justify-content: center;
        align-items: center;
        gap: 100px;
    }
    .formulario-contacto{
        align-items: center;
        width: 70%;
        padding: 50px;

    }
    div.texto-contacto img{
        display: none;
    }
}
</style>