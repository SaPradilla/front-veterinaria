<script setup>
import { ref, watch, reactive, onMounted } from 'vue';
import { useMascota } from '../../stores/mascota';
import { useAuthStore } from '../../stores/auth';
import { useAdmin } from '../../stores/admin';
import { useCliente } from '../../stores/cliente';
// Primevue

import InputText from 'primevue/inputtext';

import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import InputSwitch from 'primevue/inputswitch';
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect';
import InlineMessage from 'primevue/inlinemessage';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';

import { useRouter } from 'vue-router';



// Stores
const Mascota = useMascota()
const Auth = useAuthStore()
const Admin = useAdmin()
const Cliente = useCliente()

// States

const tipo = [
    { label: 'Perro', name: 'Perro' },
    { label: 'Gato', name: 'Gato' },
    { label: 'Hámster', name: 'Hámster' },
    { label: 'Ave', name: 'Ave' },
    { label: 'Pez', name: 'Pez' },
    { label: 'Reptil', name: 'Reptil' },
    { label: 'Invertebrado', name: 'Invertebrado' },
    { label: 'Conejo', name: 'Conejo' },

];
const vacunas = [
    { label: 'Parvovirosis', name: 'Parvovirosis' },
    { label: 'Pentavalente', name: 'Pentavalente' },
    { label: 'Rabia', name: 'Rabia' },
    { label: 'Moquillo', name: 'Moquillo' },
    { label: 'Adenovirus', name: 'Adenovirus' },
    { label: 'Traqueobronquitis infecciosa canina', name: 'Traqueobronquitis infecciosa canina' },
    { label: 'Leptospira', name: 'Leptospira' },

];
const tiposDeMascotas = [
    {
        tipo: 'Perro',
        razas: [
            { label: 'Labrador', name: 'Labrador' },
            { label: 'Poodle', name: 'Poodle' },
            { label: 'Pit Bull Terrier', name: 'Pit Bull Terrier' },
            { label: 'Terrier', name: 'Terrier' },
            { label: 'Bloodhound', name: 'Bloodhound' },
            { label: 'Bolognese', name: 'Bolognese' },
            { label: 'Boxer', name: 'Boxer' },
            { label: 'Chihuahua', name: 'Chihuahua' },
            { label: 'Collie', name: 'Collie' },
            { label: 'Dogo ', name: 'Dogo ' },
            { label: 'Harrier', name: 'Harrier' }
        ]
    },
    {
        tipo: 'Gato', razas: [
            { label: 'Siamés', name: 'Siamés' },
            { label: 'Persa', name: 'Persa' },
            { label: 'Maine Coon', name: 'Maine Coon' }
        ]
    },
    {
        tipo: 'Hámster', razas: [
            { label: 'Dorado', name: 'Dorado' },
            { label: 'Sirio', name: 'Sirio' },
            { label: 'Ruso', name: 'Ruso' }
        ]
    },
    {
        tipo: 'Ave', razas: [
            { label: 'Canario', name: 'Canario' },
            { label: 'Periquito', name: 'Periquito' },
            { label: 'Loro', name: 'Loro' }
        ]
    },
    {
        tipo: 'Pez', razas: [
            { label: 'Guppy', name: 'Guppy' },
            { label: 'Beta', name: 'Beta' },
            { label: 'Goldfish', name: 'Goldfish' }
        ]
    },
    {
        tipo: 'Reptil', razas: [
            { label: 'Iguana', name: 'Iguana' },
            { label: 'Gecko', name: 'Gecko' },
            { label: 'Tortuga', name: 'Tortuga' }
        ]
    },
    {
        tipo: 'Invertebrado', razas: [
            { label: 'Araña', name: 'Araña' },
            { label: 'Caracol', name: 'Caracol' },
            { label: 'Cangrejo', name: 'Cangrejo' }
        ]
    },
    {
        tipo: 'Conejo', razas: [
            { label: 'Holandés', name: 'Holandés' },
            { label: 'Angora', name: 'Angora' },
            { label: 'Mini Rex', name: 'Mini Rex' }
        ]
    }
];

const razas = ref([]);
const vacunasOriginales = ref([])
const router = useRouter()

onMounted(() => {
    Auth.ObtenerToken()
    Cliente.verClientes()
    if(Mascota.MascotaUpdate.nombre === ''){
        toast.warn('Sin valores que editar',{
            position: toast.POSITION.TOP_CENTER
        })
        setTimeout(()=>{
            router.push({name:'info-perfil'})

        },1000)
        
    }else{
        
        if(!Array.isArray(Mascota.MascotaUpdate.vacunas)){

            Mascota.MascotaUpdate.vacunas = JSON.parse(Mascota.MascotaUpdate.vacunas)
            console.log(Mascota.MascotaUpdate.vacunas)

            vacunasOriginales.value = Mascota.MascotaUpdate.vacunas.map(vacuna => ({
                label: vacuna,
                name: vacuna,
            }));
        }
    
    }


})

watch(() => Mascota.MascotaUpdate.tipo_mascota, (newTipo) => {

    const mascotaSeleccionada = tiposDeMascotas.find(
        (mascota) => mascota.tipo === newTipo.name
    );

    Mascota.MascotaUpdate.raza = mascotaSeleccionada ? mascotaSeleccionada.razas[0] : Mascota.MascotaUpdate.raza?.label;

    razas.value = mascotaSeleccionada ? mascotaSeleccionada.razas : [];
}
)


watch(() => Mascota.MascotaUpdate.vacunas, (newTipo) => {

    if (!Array.isArray(Mascota.MascotaUpdate.vacunas)) {

        if (Mascota.MascotaUpdate.vacunas === '') {
            Mascota.MascotaUpdate.vacunas = []
        } else {
            Mascota.MascotaUpdate.vacunas = JSON.parse(Mascota.MascotaUpdate.vacunas)
        }
    }
    if (Array.isArray(Mascota.MascotaUpdate.vacunas)) {
        filtrarVacunasDisponibles();

    }
}
)
const filtrarVacunasDisponibles = () => {
    // Si la vacuna que esta en el state mascota.vacuna es igual al que esta en vacunas, se deja de mostrar
    return vacunas.filter(vacuna =>  Mascota.MascotaUpdate.vacunas.indexOf(vacuna) === -1);
}

const imageUpload = ref(null)

const onUpload = (event) => {

    console.log(event.files[0])
    Mascota.MascotaUpdate.imagen = event.files[0]

    imageUpload.value = event.files[0].objectURL

}

const editar = () => {

    Mascota.MascotaUpdate.vacunas = vacunasOriginales.value
    Mascota.MascotaUpdate.genero =  Mascota.MascotaUpdate.genero ? 'Macho' : 'Hembra'
    Mascota.editarMascota()

}
</script>

<template>
    <div class="contenedor-registro">

        <div class="titulo">
            <h1>Editar Mascota</h1>
            <InlineMessage v-if="Mascota.errorData" severity="error"> Todos los datos son obligatorios </InlineMessage>
        </div>


        <div class="formulario">



            <div class="datos-mascota">

                <div class="inputs">
                    <InputText type="text" v-model="Mascota.MascotaUpdate.cliente_nombre" disabled  />

                    <InputText type="text" v-model=" Mascota.MascotaUpdate.nombre" placeholder="Nombre Mascota" />
                    <Dropdown v-model=" Mascota.MascotaUpdate.tipo_mascota" editable :options="tipo" checkmark optionLabel="label"
                        placeholder="Tipo de Mascota" />
                    <Dropdown v-model=" Mascota.MascotaUpdate.raza" editable :options="razas" checkmark optionLabel="label"
                        placeholder="Raza" />

                    <div class="genero">
                        <small>{{  Mascota.MascotaUpdate.genero ? 'Macho' : 'Hembra' }}</small>
                        <InputSwitch v-model="Mascota.MascotaUpdate.genero" />
                    </div>


                    <div class="edad">

                        <Dropdown v-model="Mascota.opcionEdad" :options="[' Años', ' Meses']" checkmark
                            placeholder="Tipo" />
                        <InputNumber style="width: 100%;" v-model=" Mascota.MascotaUpdate.edad" :suffix="Mascota.opcionEdad"
                            placeholder="Edad" />

                    </div>

                    <MultiSelect  v-model="vacunasOriginales" display="chip" :options="vacunas" optionLabel="name" placeholder="Seleccione las vacunas"
                        :maxSelectedLabels="3" />
                        
                    <div class="image-uploaded">
                        <div>
                            <FileUpload mode="basic" customUpload name="demo" :auto="true" @uploader="onUpload"
                                accept="image/*" :maxFileSize="1000000" chooseLabel="Foto" />
                            <!-- <small v-if="imageUpload">{{  Mascota.MascotaUpdate.imagen.name }}</small> -->
                        </div>

                        <div class="imagen">
                            <img class="img-upload"  alt=""
                            :src="imageUpload ? imageUpload : `http://localhost:6060/uploads/pets/${Mascota.MascotaUpdate.imagenUrl}`"
                            >
                            <!-- <i @click="deleteImage" class="pi pi-trash"></i> -->
                        </div>
                    </div>

                </div>

            </div>

            <div class="acciones">

                <Button @click="router.push({name:'mascotas'})" label="Cancelar" severity="secondary" outlined rounded />
                <Button @click="editar" label="Editar" rounded />

            </div>
        </div>

    </div>
</template>
<style scoped>
.image-uploaded {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.image-uploaded i {
    cursor: pointer;
    color: var(--color-rojo);
}

.img-upload {
    height: 50px;
    width: 50px;
}

.imagen {
    border: 1px solid var(--color-morado-claro-general);
    border-radius: 5px;
    padding: 4px;
    display: flex;
    /* gap: 1vh; */
    align-items: end;
}

.contenedor-registro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5vh;
}

.titulo {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 3vh;
    gap: 10px;
}


.genero {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: var(--color-morado-general);
}

h1 {
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


.formulario {

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    /* width: 100%; */
    gap: 50px;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 50vh;
}



.acciones {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.cliente {
    display: flex;
    flex-direction: column;
}

.edad {
    display: flex;
    gap: 2vh;
}

strong {
    cursor: pointer;
}</style>