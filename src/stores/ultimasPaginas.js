import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'

export const useUltimasPaginas = defineStore('ultimasPaginas',  () =>{
    

    const ultimaPagina = ref('')
    
    return {
        ultimaPagina    
    }
})
