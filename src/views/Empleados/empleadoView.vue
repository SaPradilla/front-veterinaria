<script setup>

    import { useAdmin } from '../../stores/admin';
    import { useEmpleado } from '../../stores/empleado';
    import {useFormatear} from '../../stores/formatear'
    import Avatar from 'primevue/avatar';

    const Empleado = useEmpleado()

    const Formato = useFormatear()
    const Admin = useAdmin()
</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleEmpleado" class="botonVolver"> Volver </button>
    </div>
    <div class="contenedor-empleado">

        <div class="header-empleado">
     
            <div class="info-empleado">
                <h2>{{ Empleado.perfilEmpleado.nombre}}</h2>
                <h2>{{ Empleado.perfilEmpleado.apellido}}</h2>
                <Avatar v-if="Empleado.perfilEmpleado.imagen" :image="`http://localhost:6060/uploads/employees/${Empleado.perfilEmpleado.imagen}`"  size="xlarge" shape="circle" />
							
                <Avatar v-else :label="Empleado.perfilEmpleado.nombre.substr(-20, 2)" size="xlarge" shape="circle"
                    style="background-color: var(--color-morado-claro-general); color: white" />
                <!-- <img class="foto-mascota" :src="`http://localhost:6060/uploads/employees/${Empleado.perfilEmpleado.imagen}`" alt=""> -->
                <p>{{  Empleado.perfilEmpleado.rol }}</p>
                <p class="id">ID: {{ Empleado.perfilEmpleado.id }}</p>
            </div>
            
        </div>

        <div class="cirugias">
            <h1>Cirugias</h1>
            <div class="contenedor-citas">

                <table >

                <thead>
                    <tr>
                        <th>Procedimiento</th>
                        <th>Mascota</th>
                        <th>Fecha</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="cirugia in Empleado.perfilEmpleado.cirugia ">

                        <td>{{ cirugia.procedimiento }}</td>
                        <td> 
                             {{ cirugia.mascota.nombre }}
                        </td>
                        <td>{{ Formato.formatearFecha(cirugia.createdAt) }}</td>
                        <!-- <td>{{ cita }}</td> -->
                    </tr>

                </tbody>
            </table>
            <!-- <p> No hay Cirugias</p> -->
            <p v-if="Empleado.perfilEmpleado.cirugia.length === 0"> No hay cirugias</p>
            </div>
        </div>


    </div>
</template>


<style scoped>
  .con{
        position: absolute;
        top: 25vh;
        right: 0;
        
    }
    .historia-clinica h1{
        text-align: center;
    }
    .nueva-historia{
        margin-top: 4vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5vh;
    }
    .patologia1,.patologia2{
        margin-top: 20px;

    }
    .historia{
        margin-top: 20px;
    }
    .contenido h2{
        color: var(--color-morado-claro-general);
    }
    .contenido p{
        font-weight: 600;
        margin-top: 20px;

    }
    .contenido{
        /* display: grid;
        grid-template-columns: repeat(33%) ; */
        display: flex;
        gap: 30vh;
        padding: 20px;
    }
    .info-historia{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .contenedor-empleado{
        /* overflow: scroll; */
        display: flex;
        flex-direction: column;
        gap: 10vh;
        justify-content: center;
    }
    .header-empleado{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-empleado{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .info-empleado h2{
        font-size: 2.5em;
        color: var(--color-morado-general);
        font-weight: 800;
    }
    .info-empleado p{
        color: var(--color-morado-claro-general);
        font-weight: 700;
    }
    .info-empleado p.id{
        color:var(--color-gris);

    }
    .foto-mascota{
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
        width: 100px;
        height: 100px;
        border-radius: 100%;
        background-size: contain;
    }
    .cirugias{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .contenedor-citas{
        width: 70vh;
        text-align: center;

    }
    table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); */
    }

    thead {
        margin-bottom: 50px;

    }

    th {
        font-weight: 500;
        font-size: 1.3em;
        padding-left: 50px;
        color: var(--color-morado-claro-general);
    }

    td {
        margin: 0 auto;
        padding-left: 50px;
        padding-top: 3vh;
        background-color: rgba(255, 255, 255, 0.2);
        color: var(--color-gris);

    }
    .contenedor-citas p{
       
        text-align: center;
        /* margin: 0 auto; */
        margin-top: 3vh;
        font-size: 1.5em;
    }

</style>