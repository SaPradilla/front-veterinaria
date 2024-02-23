<script setup>
import {onMounted,watch} from 'vue'
// import { useMascota } from '../../stores/mascota';
import { useModals } from '../../stores/modals';
import { useFormatear } from '../../stores/formatear';
import { useEmpleado } from '../../stores/empleado';
import Avatar from 'primevue/avatar';

const Modals = useModals()
const Formato = useFormatear()
const Empleado = useEmpleado()


// onMounted(()=>{
   
// })
// watch(() => Mascota.perfilMascota.vacunas, (newTipo) => {

// })

</script>

<template>
    <div class="modal">
        <div class="contenedor-modal" :class="Modals.animarEmpleado ? 'animar' : 'cerrar'">
            
            <div class="contenedor-empleado">
                <div>
                    <p class="x" @click="Modals.toggleModalEmpleado()">x</p>
                </div>
                <div class="perfil">
                    <div class="info-empleado">
                        <Avatar v-if="Empleado.empleado.imagen" :image="`http://localhost:6060/uploads/employees/${Empleado.empleado.imagen}`"  size="xlarge" shape="circle" />
							
                        <Avatar v-else :label="Empleado.empleado.nombre.substr(-20, 2)" size="xlarge" shape="circle"
                        style="background-color: var(--color-morado-claro-general); color: white" />
                        <!-- <img class="foto-mascota" :src="`http://localhost:6060/uploads/employees/${Empleado.empleado.imagen}`" alt=""> -->
                        <div>
                            <p>{{  Empleado.empleado.rol }}</p>
                            <h2>{{ Empleado.empleado.nombre}}</h2>
                            <h2>{{ Empleado.empleado.apellido}}</h2>
                        </div>
                        <div class="info-contacto">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4.05 21q-.45 0-.75-.3t-.3-.75V15.9q0-.325.225-.588t.575-.362l3.45-.7q.35-.05.713.063t.587.337L10.9 17q.95-.55 1.8-1.213t1.625-1.437q.825-.8 1.513-1.663t1.187-1.787L14.6 8.45q-.2-.2-.275-.475T14.3 7.3l.65-3.5q.05-.325.325-.563T15.9 3h4.05q.45 0 .75.3t.3.75q0 3.125-1.363 6.175t-3.862 5.55q-2.5 2.5-5.55 3.863T4.05 21Z"/></svg>
                            <h3>{{ Empleado.empleado.numero_celular}}</h3>
                        </div>
                        <div class="info-contacto">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path  d="M13 19c0-3.31 2.69-6 6-6c1.1 0 2.12.3 3 .81V6a2 2 0 0 0-2-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h9.09c-.05-.33-.09-.66-.09-1M4 8V6l8 5l8-5v2l-8 5l-8-5m19 10v2h-8v-2h8Z"/></svg>
                            <h3>{{ Empleado.empleado.email }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>


<style scoped>


h2 {
    font-weight: 800;
}
p {

    font-weight: 700;
    font-size: 1.5em;
    font-style: italic;
    color: var(--color-morado-claro-general);

}


.contenedor-empleado {
    background-color: white;
    width: 80vh;
    padding: 20px;
    height: 45vh;
    border-radius: 20px;

}
.info-empleado{
    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: left;   
    gap: 2vh;
}
.info-empleado img{
    height: 13vh;
    width: 13vh;
    border-radius: 100%;
}
.info-contacto{
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 2vh;

}
.info-contacto svg{
    width: 2em;
    height: 2em;

}
.info-contacto path{
    fill: var(--color-morado-general);
}
.info-contacto h3{
    font-size: 1.3em;
}

/* Modal */
p.x {
    text-align: right;
    font-size: 2em;
    color: var(--color-morado-claro-general);
    cursor: pointer;
    transition: all 0.2s ease;
}
p.x:hover {
    transform: translateY(-2px);
    color: var(--color-morado-general);
}
.modal {
    z-index: 1200;
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(6px) brightness(100%);
    background-color: rgba(7, 1, 16, 0.5);
}
.contenedor-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    /* width: %; */
    opacity: 0;
    padding: 20px;
}
.contenedor-modal.animar {
    opacity: 1;
}
.contenedor-modal.cerrar {
    opacity: 0;
}


</style>