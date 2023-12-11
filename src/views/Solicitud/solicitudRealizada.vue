<script setup>
import { useRouter } from 'vue-router';

const Router = useRouter()
const inicio = ()=> Router.push({name:'home'})

</script>

<template>
    <div class="cita-realizada">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path  d="M1024 0q141 0 272 36t244 104t207 160t161 207t103 245t37 272q0 141-36 272t-104 244t-160 207t-207 161t-245 103t-272 37q-141 0-272-36t-244-104t-207-160t-161-207t-103-245t-37-272q0-141 36-272t104-244t160-207t207-161T752 37t272-37zm603 685l-136-136l-659 659l-275-275l-136 136l411 411l795-795z"/></svg>
        <h1> <span>¡</span> Gracias <span>!</span></h1>
        <h2> Estamos en proceso para aprobar la cita</h2>
        <div class="info">
            <p>Estarás Recibiendo un Correo en Breve</p>
            <div class="atento">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></g></svg>
                <p> <span> Este Atento </span></p>
                
            </div>
            
        </div>
        <button @click="inicio()" class="agregar"> Regresar </button>
    </div>
</template>

<style  scoped>

.agregar{
    margin-right: 5vh;
    margin: 0 auto;
    font-size: 1.2em;
    padding:10px;
    border-style: none;
    background-color: #5a0fc3;
    color: white;
    border-radius: 20px;
    width: 8em;
    transition: all 0.2s ease;
    cursor: pointer;

}
.agregar:hover{
    transform: translateY(-1px); 
    background-color: #6413d7;
}
.atento{
    display: flex;
    align-items: center;
    justify-content: center;
}
.atento svg{
    height: 2em;  
}
.cita-realizada{
    background: url('../../assets/img/fondo-solicitud-cita.jpg');
    background-size: cover;
    /* background-color: var(--color-blanco-input); */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2vh;
}
svg{
    width: 4em;
    height: 4em;
}
path{
    fill: var(--color-morado-general);
}
h1{
    text-align: center;
    text-transform: uppercase;
    font-size: 5em;
}
h1 span{
    color: var(--color-morado-general);
}
h2{
    text-align: center;
}
p{
    text-align: center;
    font-size: 1.3em;
}
p span{
    text-align: center;
    font-weight: 600;
}
</style>