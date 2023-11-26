<script setup>
import { ref, watch, reactive } from 'vue';
import Multiselect from 'vue-multiselect';

const genero = ref(null)

const mascota = ref({
    clienteId: '',
    nombre: '',
    genero: '',
    tipo: '',
    edad: '',
    raza: ''
});

const dueno = [
    { nombre: "Andres" },
    { nombre: "Santiago" },
    { nombre: "Garces " },
    { nombre: " Pradilla " }
];

const tipo = [
     'Perro' ,
     'Gato' ,
     'Hámster' ,
     'Ave' ,
     'Pez' ,
     'Reptil' ,
     'Invertebrado' ,
     'Conejo',
];

    const tiposDeMascotas = [
        { tipo: 'Perro', razas: ['Labrador', 'Poodle', 'Bulldog'] },
        { tipo: 'Gato', razas: ['Siamés', 'Persa', 'Maine Coon'] },
        { tipo: 'Hámster', razas: ['Dorado', 'Sirio', 'Ruso'] },
        { tipo: 'Ave', razas: ['Canario', 'Periquito', 'Loro'] },
        { tipo: 'Pez', razas: ['Guppy', 'Beta', 'Goldfish'] },
        { tipo: 'Reptil', razas: ['Iguana', 'Gecko', 'Tortuga'] },
        { tipo: 'Invertebrado', razas: ['Araña', 'Caracol', 'Cangrejo'] },
        { tipo: 'Conejo', razas: ['Holandés', 'Angora', 'Mini Rex'] },
    ];


    const razas = ref([]);
    
    watch(() => mascota.value.tipo,(newTipo) => {
            const mascotaSeleccionada = tiposDeMascotas.find(
                (mascota) => mascota.tipo === newTipo
            );
            mascota.value.raza = mascotaSeleccionada ? mascotaSeleccionada.razas[0] : '';
            razas.value = mascotaSeleccionada ? mascotaSeleccionada.razas : [];
        }
    );
  
    watch(
        genero,
        (newGenero) => {
            mascota.value.genero = newGenero ? 'Macho' : 'Hembra';
        }
    );
</script>

<template>
    <div class="contenedor-registro">
        <h1>Registrar Mascota</h1>
        <div class="contenedor-formulario">
            <div class="registro">
                <FormKit type="form" id="form" @submit="" :actions="false"
                    incomplete-message="Ingrese todos sus datos para continuar">
                    <div class="inputs">

                        <v-select v-model="mascota.clienteId" placeholder="Nombre del Dueño" name="clienteId" :options="dueno"
                            label="nombre"></v-select>
                        <div class="contenedor-genero">
                            <div class="nombre-mascota">
                                <FormKit v-model="mascota.nombre" name="nombre" type="text" placeholder="Nombre"
                                    validation="required" :validation-messages="{
                                        required: 'El Nombre es Obligatorio',
                                    }" />
                            </div>
                            <div class="checkbox-wrapper-34">
                                <input v-model="genero" class='tgl tgl-ios' id='toggle-34' type='checkbox'>
                                <label class='tgl-btn' for='toggle-34'></label>
                            </div>
                        </div>
    
                        <v-select v-model="mascota.tipo" placeholder="Tipo de Mascota" name="tipo" :options="tipo" label="tipo">
                           
                        </v-select>
    
                        <FormKit v-model="mascota.edad" type="text" placeholder="Edad" name="edad" validation="number|required|"
                            :validation-messages="{
                                required: 'Edad es obligatoria',
                                number: 'No puedes ingresar letras'
                            }" />
    
                        <v-select v-model="mascota.raza" placeholder="Raza" name="raza" :options="razas" label="razas">
                           
                        </v-select>
                    </div>
                </FormKit>
            </div>
            <div class="vacunas">

            </div>
        </div>
    </div>
</template>
<style scoped>
h1{
    text-align: center;
    color:var(--color-morado-general);
}
>>> {

  --vs-dropdown-option--active-bg: #5A0FC3;
  --vs-dropdown-option--active-color: #eeeeee;
}
.contenedor-formulario {
    width: 60vh;
}
.inputs{
    display: flex;
    flex-direction: column;
    gap:30px;
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
}
</style>