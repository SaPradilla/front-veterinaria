<script setup>
    import { useMascota } from '../stores/mascota';
    import { useDashboard } from '../stores/dashboard';
    import {useFormatear} from '../stores/formatear'
    const Mascota = useMascota()
    const dashboard = useDashboard()
    const Formato = useFormatear()
</script>

<template>

    <div class="contenedor-mascota">
        <div class="header-mascota">
            <div></div>
            <div class="info-mascota">
                <h2>{{ Mascota.perfilMascota.nombre}}</h2>
                <img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
                <p>{{  Mascota.perfilMascota.tipo_mascota }} | {{  Mascota.perfilMascota.edad }} Años</p>
                <p class="id">ID: {{ Mascota.perfilMascota.id }}</p>
            </div>
            <div class="boton">
                <button @click="dashboard.handleVolver()" class="botonVolver"> Volver </button>
            </div>
        </div>
        <div class="citas">
            <h1>Citas</h1>
            <div class="contenedor-citas">
                <table>

                <thead>
                    <tr>                    
                        <th>Tipo</th>
                        <th>Empleado</th>
                        <th>Lugar</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="cita in Mascota.perfilMascota.citas_medicas">

                        <td>{{ cita.servicio.nombre }}</td>
                        <td> {{cita.empleado.nombre}} {{cita.empleado.apellido}} </td>
                        <td>{{ cita.consultorio }}</td>
                        <td>{{ cita.estado }}</td>
                        <td>{{ Formato.formatearFecha(cita.fecha_cita) }}</td>
                    </tr>
                    
                    
                </tbody>
            </table>
            <p v-if="Mascota.perfilMascota.citas_medicas.length === 0"> No hay citas</p>
            </div>
        </div>
        <div class="historia-clinica">
            <h1>Historia Clinica</h1>

            <div class="info-historia " v-if="Mascota.perfilMascota.historias_clinica">
                
                <div class="contenido contenido1">
                    <div class="historia patologias">
                        <div class="patologia1">
                            <h2>Patologia Vigente</h2>
                            <p>{{  Mascota.perfilMascota.historias_clinica.patologias_vigentes }}</p>
                        </div>
                        <div class="patologia1">
                            <h2>Patologia Superadas</h2>
                            <p>{{  Mascota.perfilMascota.historias_clinica.patologias_superadas }}</p>
                        </div>
                    </div>
    
                    <div class=" historia lesiones">
                        <h2>Lesiones</h2>
                        <p>{{ Mascota.perfilMascota.historias_clinica.lesiones }}</p>
                    </div>
    
                    <div class=" historia comportamiento">
                        <h2>Comportamiento</h2>
                        <p>{{ Mascota.perfilMascota.historias_clinica.historial_comportamiento }}</p>
                    </div>
                    
                </div>
                <div class="contenido contenido2">
                    <div class="estado_nutricional">
                        <h2>Estado Nutricional</h2>
                        <p>{{ Mascota.perfilMascota.historias_clinica.estado_nutricional   }}</p>
                    </div>
                </div>
            </div>

            <div class="nueva-historia" v-else>

                <p > La mascota Aún no tiene Historia Clinica </p>
                <button @click="dashboard.handleVolver()" class="botonVolver"> Crear Historia </button>

            </div>
        </div>
    </div>
</template>


<style scoped>
.historia-clinica{

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
    .contenedor-mascota{
        /* overflow: scroll; */
        display: flex;
        flex-direction: column;
        gap: 10vh;
        justify-content: center;
    }
    .header-mascota{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .info-mascota{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .info-mascota h2{
        font-size: 2.5em;
        color: var(--color-morado-general);
        font-weight: 800;
    }
    .info-mascota p{
        color: var(--color-morado-claro-general);
        font-weight: 700;
    }
    .info-mascota p.id{
        color:var(--color-gris);

    }
    .foto-mascota{
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
        width: 100px;
        height: 100px;
        border-radius: 100%;
    }
    .citas{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .contenedor-citas{
        width: 100%;
        text-align: center;

    }
    table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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