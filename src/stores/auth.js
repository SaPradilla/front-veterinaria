import { defineStore } from "pinia"
import {ref} from 'vue'
export const useAuthStore = defineStore('auth', () =>{

    const token = ref(null)

    return{
        token
    }
})
