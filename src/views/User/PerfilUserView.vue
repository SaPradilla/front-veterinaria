<script setup>
import Button from 'primevue/button';
</script>

<template>

    <div class="contenedor-perfil">

        <div class="info-perfil">

            <div class="foto-perfil"></div>

            <div class="content-perfil">
                <div class="nombres">
                    <p class="nombre">Santiago</p>
                    <p class="apellido">Pradilla</p>
                </div>
                <div class="editar-perfil">
                    <Button label="Editar Perfil" severity="secondary" rounded />
                </div>
            </div>
            
        </div>
        . 
    </div>
</template>

<style scoped>
.contenedor-perfil{
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.info-perfil{
    display: flex;
    align-items: center;
    width: max-content;
    gap: 30px;
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


.content-perfil{
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 20px;
}
</style>