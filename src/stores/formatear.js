import { defineStore } from "pinia";
import { ref, reactive } from 'vue'

export const useFormatear = defineStore('formatear', () => {
    // states

    // Metodos
    const formatearFecha = (fechaString)=>{
        
        const fecha = new Date(fechaString);

        // Obtener día, mes y año
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth() + 1; // Los meses en JavaScript son base 0, por lo que se suma 1
        const año = fecha.getUTCFullYear();

        // Construir la cadena de fecha en el formato deseado
        const fechaFormateada = `${mes}-${dia}-${año}`;
        return fechaFormateada
    }    

    const formatoFechaDDMMYY = (fechaISO)=>{
      // Crear un objeto Date a partir de la fecha ISO
        const fecha = new Date(fechaISO);

        // Obtener los componentes de la fecha
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
        const anio = fecha.getFullYear().toString().slice(2); // Tomamos los últimos dos dígitos del año

        // Formatear la fecha al estilo dd/mm/yy
        const fechaDdMmYy = `${dia}/${mes}/${anio}`;

        return fechaDdMmYy;
    }
    const formatoFechaYYMMDD = (fechaISO)=>{
        // Crear un objeto Date a partir de la fecha ISO
          const fecha = new Date(fechaISO);
  
          // Obtener los componentes de la fecha
          const dia = fecha.getDate().toString().padStart(2, '0');
          const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
          const anio = fecha.getFullYear().toString().slice(2); // Tomamos los últimos dos dígitos del año
  
          // Formatear la fecha al estilo dd/mm/yy
          const fechaDdMmYy = `${anio}/${mes}/${dia}`;
  
          return fechaDdMmYy;
      }
      
    const formartoFechaInput = (fechaString)=>{

        // Crear un objeto Date a partir de la cadena de fecha
        const fecha = new Date(fechaString);

        // Obtener los componentes de la fecha
        const dia = fecha.getDate();
        const mes = fecha.getMonth();
        const año = fecha.getFullYear();
        const nuevaFecha = new Date(año, mes, dia, 0, 0, 0);
        return nuevaFecha

    }
    const extraerNumbers = (cadena)=>{
        // Usar una expresión regular para encontrar los dígitos en la cadena
        const numeros = cadena.match(/\d+/);

        // Si se encontraron dígitos, convertirlos a un número
        if (numeros !== null) {
            const numero = parseInt(numeros[0], 10); // Convertir a número base 10
            return numero;
        }

        return null;
    }


    const extraerString = (cadena)=>{
        // Usar una expresión regular para encontrar solo letras del alfabeto
        const letras = cadena.match(/[a-zA-Z]+/g);

        // Si se encontraron letras, unirlas en una cadena
        if (letras !== null) {
            return letras.join('');
        }

        return ''; 
    }
    
    const formatearCitasCalendar = (citas)=>{
        return citas.map((cita) => {
            return {
              title: `${cita.cliente.nombre} - ${cita.mascota.nombre}`, // Título del evento (nombre del cliente y de la mascota)
              date: formatoFechaYYMMDD(cita.fecha_cita), // Fecha y hora de inicio del evento
            //   end: null, // En este ejemplo, no se define una fecha de finalización
              backgroundColor: getColorByState(cita.estado), // Color de fondo basado en el estado de la cita
              borderColor: '#000', // Color del borde del evento
              extendedProps: {
                id: cita.id, // ID de la cita
                estado: cita.estado, // Estado de la cita
                consultorio: cita.consultorio, // Consultorio de la cita
                descripcion: cita.descripcion // Descripción de la cita
              }
            };
          });
    }
    
    return {
        formatearFecha,
        formatoFechaDDMMYY,
        extraerNumbers,
        extraerString,
        formartoFechaInput,
        formatearCitasCalendar,
        formatoFechaYYMMDD,

    }
})
