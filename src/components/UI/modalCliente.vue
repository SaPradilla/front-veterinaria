<script setup>
    import { useModals } from '../../stores/modals';
    import { useCliente } from '../../stores/cliente';
    const Modals = useModals()
    const Cliente = useCliente()
</script>

<template>
    <div class="modal "
    @click="Modals.toggleModalCliente()"
    >
        <div class="contenedor-modal" :class="Modals.animarCliente ? 'animar' : 'cerrar'">
            <div class="contenedor-cliente">
                <p class="x" @click="Modals.toggleModalCliente()" >x</p>
                <div class="info-cliente">

                    <img  class="perfil" src="../../assets/img/avatar.svg" alt="" srcset="">
                    <div>
                        <h2>Nombres </h2>
                        <p>{{Cliente.cliente.nombre}} {{Cliente.cliente.apellido}}</p>
                    </div>
    
                    <div>
                        <h2>Número Celular</h2>
                        <p>{{Cliente.cliente.numero_celular}}</p>
                    </div>
    
                    <div>
                        <h2>Correo</h2>
                        <p>{{Cliente.cliente.email}}</p>
    
                    </div>
                </div>

                
                <!-- <h2>Direccion</h2>
                <p>{{Cliente.cliente.direccion}}</p> -->

            </div>

        </div>
    </div>
</template>


<style scoped>
   
    h2{
        text-align: center;
        color: var(--color-morado-claro-general);
    }
    p{
        text-align: center;
        font-weight: 700;
        font-size: 1.2em;
        text-overflow: ellipsis;
        overflow: hidden; 
    }
    p.x{
        text-align: right;
        font-size: 2em;
        
        cursor: pointer;
    }
    .perfil{
        width: 50px;
    }
    .modal {
        z-index: 1000;
        position: fixed;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(6px) brightness(100%);
        background-color: rgba(7, 1, 16, 0.5);
        
    }

    .contenedor-cliente{
        background-color: white;
        width: 30vh;
        padding: 20px;
        height: 50vh;
        margin: 0 auto;
        border-radius: 40px;
    }
    .info-cliente{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5vh;
        word-wrap: break-word;


    }
    .info-cliente div{
        word-wrap: break-word;

    }
    .contenedor-modal {
        display: flex;
        justify-content: center;
        align-items: center;
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        width: 80%;
        opacity: 0;
        padding: 20px;
        

    }

    .contenedor-modal.animar {
        opacity: 1;
    }

    .contenedor-modal.cerrar {
        opacity: 0;
    }


    .contenedor-titulos {
        display: grid;
        place-content: center;
    }

    .titulos {
        display: flex;
        flex-direction: column;
    }

    .titulos a {
        color: white;
        text-decoration: none;
        text-align: center;
        font-size: 3.4em;
        font-weight: 800;
        margin: 30px 0;
        transition: all 0.2s ease;

    }

    .titulos a:hover {
        transform: scale(0.9);

    }
</style>