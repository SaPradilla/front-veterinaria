<script setup>
import { ref, watch, reactive,onMounted } from 'vue';
import { useMascota } from '../../stores/mascota';
import { useAuthStore} from '../../stores/auth';
import { useAdmin } from '../../stores/admin';
import { useCliente } from '../../stores/cliente';
import { useRouter} from 'vue-router' 
import {toast} from 'vue3-toastify'

// Stores
const Mascota = useMascota()
const Auth = useAuthStore()
const Admin = useAdmin()


const Cliente = useCliente()
// States
const router = useRouter()

const tipo = [
    'Perro',
    'Gato',
    'Hámster',
    'Ave',
    'Pez',
    'Reptil',
    'Invertebrado',
    'Conejo',
];
const vacunas = [
    'Parvovirosis',
    'Pentavalente ',
    'Rabia',
    'Moquillo',
    'Adenovirus',
    'Traqueobronquitis infecciosa canina ',
    'Leptospira'
];
const tiposDeMascotas = [
    { tipo: 'Perro', razas: ['Labrador', 'Poodle', 'Bulldog', 'Bulldog', 'Bulldog', 'Bulldog'] },
    { tipo: 'Gato', razas: ['Siamés', 'Persa', 'Maine Coon'] },
    { tipo: 'Hámster', razas: ['Dorado', 'Sirio', 'Ruso'] },
    { tipo: 'Ave', razas: ['Canario', 'Periquito', 'Loro'] },
    { tipo: 'Pez', razas: ['Guppy', 'Beta', 'Goldfish'] },
    { tipo: 'Reptil', razas: ['Iguana', 'Gecko', 'Tortuga'] },
    { tipo: 'Invertebrado', razas: ['Araña', 'Caracol', 'Cangrejo'] },
    { tipo: 'Conejo', razas: ['Holandés', 'Angora', 'Mini Rex'] },
];

const razas = ref([]);

onMounted(() => {

    Auth.ObtenerToken()
    Cliente.verClientes()

    if(Mascota.MascotaUpdate.nombre === ''){
        toast.warn('Sin valores que editar',{
            position: toast.POSITION.TOP_CENTER
        })
        setTimeout(()=>{
            router.push({name:'mascotas'})

        },1000)
        
    }else{
    
        if(!Array.isArray(Mascota.MascotaUpdate.vacunas)){

            Mascota.MascotaUpdate.vacunas = JSON.parse(Mascota.MascotaUpdate.vacunas)
        }
        
    }

})

watch(() => Mascota.mascota.tipo_mascota, (newTipo) => {

    const mascotaSeleccionada = tiposDeMascotas.find(
        (mascota) => mascota.tipo === newTipo
    );
    Mascota.mascota.raza = mascotaSeleccionada ? mascotaSeleccionada.razas[0] : '';
    razas.value = mascotaSeleccionada ? mascotaSeleccionada.razas : [];
}
)


watch(() => Mascota.MascotaUpdate.vacunas, (newTipo) => {
    
    if(!Array.isArray(Mascota.MascotaUpdate.vacunas)){

        if(Mascota.MascotaUpdate.vacunas === ''){
            Mascota.MascotaUpdate.vacunas = []
        }else{
            Mascota.MascotaUpdate.vacunas = JSON.parse(Mascota.MascotaUpdate.vacunas)
        }

    }

    if(Array.isArray(Mascota.MascotaUpdate.vacunas)){
        filtrarVacunasDisponibles();

    }


    
}
)
const filtrarVacunasDisponibles = ()=>{
    // Si la vacuna que esta en el state mascota.vacuna es igual al que esta en vacunas, se deja de mostrar

    return vacunas.filter(vacuna => Mascota.MascotaUpdate.vacunas.indexOf(vacuna) === -1);
    
}

</script>

<template>

    <h1>Editar Mascota</h1>

    <div class="con">
        <div></div>
        <button @click="Admin.handleMascota" class="botonVolver"> Volver </button>
    </div>

    <div class="contenedor-registro">
        <div class="contenedor-formulario">

            <div class="formulario">
                <div class="registro">
    
                    <h2>Datos Mascota</h2>
    
                    <FormKit type="form" id="form" @submit="" :actions="false"
                        incomplete-message="Ingrese todos sus datos para continuar">
                        <div class="inputs">
    
                            <v-select  v-model="Mascota.MascotaUpdate.clienteId" placeholder="Nombre del Dueño" name="clienteId"
                                :options="Cliente.clientes" :reduce="nombre => nombre.id" label="nombre"></v-select>
    
                            <div class="contenedor-genero">
    
                                <div class="nombre-mascota">
                                    <FormKit v-model="Mascota.MascotaUpdate.nombre" name="nombre" type="text" placeholder="Nombre Mascota" 
                                        validation="required" :validation-messages="{
                                            required: 'El Nombre es Obligatorio',
                                        }" />
                                </div>
                                <div class="checkbox-wrapper-34">
                                    <input v-model="Mascota.MascotaUpdate.genero"  checked class='tgl tgl-ios' id='toggle-34' type='checkbox'>
                                    <label class='tgl-btn' for='toggle-34'></label>
                                </div>
    
                            </div>
    
                            <v-select v-model="Mascota.MascotaUpdate.tipo_mascota" placeholder="Tipo de Mascota" name="tipo_mascota" :options="tipo"
                                label="tipo">
    
                            </v-select>
    
                            <FormKit v-model="Mascota.MascotaUpdate.edad" type="text" placeholder="Edad" name="edad"
                                validation="number|required|" :validation-messages="{
                                    required: 'Edad es obligatoria',
                                    number: 'No puedes ingresar letras'
                                }" />
    
                            <v-select v-model="Mascota.MascotaUpdate.raza" placeholder="Raza" name="raza" :options="razas" label="razas">
    
                            </v-select>
                        </div>
                    </FormKit>
                </div>
                <div class="vacunas">
                    <h2>Vacunas</h2>
                    <v-select id="vacunas" multiple v-model="Mascota.MascotaUpdate.vacunas" placeholder="Seleccione las vacunas"
                        :options="filtrarVacunasDisponibles()" 
                    />
                </div>
            </div>
            
            <button v-on:click="Mascota.editarMascota" class="agregar"> Editar </button>
        </div>

    </div>
</template>
<style scoped>
.con{
    position: absolute;
    top: 25vh;
    right: 0;
    
}
h1 {
    margin-bottom: 4vh;
    text-align: center;
    color: var(--color-morado-general);
    font-size: 2.4em;
    font-weight: bold;
}
h2 {
    margin-bottom: 5vh;
    font-size: 2em;
    color: var(--color-morado-general);
    font-weight: 600;

}

>>> {
    --vs-dropdown-option--active-bg: #5A0FC3;
    --vs-dropdown-option--active-color: #eeeeee;
}
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
    
.formulario {
    /* max-height: max-content; */
    /* width: 40vh; */
    position: relative;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    gap: 50px;
}
.contenedor-registro {
    /* width: 100%; */
    height: 100%;
    display: flex;
    flex-direction: column;
}

.contenedor-formulario {
    /* width: 60vh; */
    /* background-color: var( --color-morado-claro-general); */
    /* padding: 20px; */
    /* border-radius: 20px; */
    display: flex;
    flex-direction: column;
    /* justify-content: left; */
    /* align-items: left; */
    gap: 2vh;

}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.registro .contenedor-genero {
    display: flex;
    align-items: center;
    gap: 20px;
}


.checkbox-wrapper-34 {
    --blue: #0f30c3;
    --g08: #d054e6;
    margin-bottom: 1vh;
}

.checkbox-wrapper-34 .tgl {
    display: none;

}

.checkbox-wrapper-34 .tgl,
.checkbox-wrapper-34 .tgl:after,
.checkbox-wrapper-34 .tgl:before,
.checkbox-wrapper-34 .tgl *,
.checkbox-wrapper-34 .tgl *:after,
.checkbox-wrapper-34 .tgl *:before,
.checkbox-wrapper-34 .tgl+.tgl-btn {
    box-sizing: border-box;
}

.checkbox-wrapper-34 .tgl::selection,
.checkbox-wrapper-34 .tgl:after::selection,
.checkbox-wrapper-34 .tgl:before::selection,
.checkbox-wrapper-34 .tgl *::selection,
.checkbox-wrapper-34 .tgl *:after::selection,
.checkbox-wrapper-34 .tgl *:before::selection,
.checkbox-wrapper-34 .tgl+.tgl-btn::selection {
    background: none;
}

.checkbox-wrapper-34 .tgl+.tgl-btn {
    outline: 0;
    display: block;
    width: 90px;
    height: 30px;
    position: relative;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
}

.checkbox-wrapper-34 .tgl+.tgl-btn:after,
.checkbox-wrapper-34 .tgl+.tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 25%;
    height: 100%;

}

.checkbox-wrapper-34 .tgl+.tgl-btn:after {
    left: 0;
}

.checkbox-wrapper-34 .tgl+.tgl-btn:before {
    display: inline;
    position: absolute;
    top: 7px;
}

.checkbox-wrapper-34 .tgl:checked+.tgl-btn:after {
    left: 73%;
}

.checkbox-wrapper-34 .tgl-ios+.tgl-btn {
    background: var(--g08);
    border-radius: 20rem;
    padding: 4px;
    transition: all 0.4s ease;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.checkbox-wrapper-34 .tgl-ios+.tgl-btn:after {
    border-radius: 2em;
    background: #fff;
    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.checkbox-wrapper-34 .tgl-ios+.tgl-btn:before {
    content: "Hembra";
    left: 28px;

    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.checkbox-wrapper-34 .tgl-ios+.tgl-btn:active {
    box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}

.checkbox-wrapper-34 .tgl-ios+.tgl-btn:active:after {
    padding-right: 0.8em;
}

.checkbox-wrapper-34 .tgl-ios:checked+.tgl-btn {
    background: var(--blue);
}

.checkbox-wrapper-34 .tgl-ios:checked+.tgl-btn:active {
    box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}

.checkbox-wrapper-34 .tgl-ios:checked+.tgl-btn:active:after {
    margin-left: -0.4em;
}

.checkbox-wrapper-34 .tgl-ios:checked+.tgl-btn:before {
    content: "Macho ";
    left: 10px;
    color: #fff;
}</style>