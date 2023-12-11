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
    
    return {
        formatearFecha,


    }
})
