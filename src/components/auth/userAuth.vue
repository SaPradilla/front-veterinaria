<script setup>

</script>

<template>
    <div class="contenedor-principal">
        <img class="pelitos" alt="Pelitos" src="../../assets/img/pelitos-4.png" />
        <div class="contenedor-user">
    
            <p class="nombrePerfil">Admin</p>
            <img class="perfil" src="../../assets/img/avatar.svg" alt="" srcset="">
        </div>
    </div>
</template>

<style scoped>
    .contenedor-principal{
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    .pelitos {
        float: left;
        width: 70px;
        
    }

    .contenedor-user{
        /* margin-top: 2vh; */
        display: flex;
        flex-direction: row;
        gap: 5vh;
        justify-content: right;
        align-items: center;
    }
    p.nombrePerfil{
        font-size: 1.3em;
        font-weight: bold;
    }
    img{
        height: 50px;
        width: 50px;
    }
</style>