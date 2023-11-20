import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
export const useModalAuthStore = defineStore('modalAuth', () => {
    // states
    const modalLogin = reactive({
        showModalLogin: true,
        animateModalLogin: false
    })

    const modalRegister = reactive({
        showModalRegister: false,
        animateModalRegister: false
    })

    const modalLoginEmpleado = reactive({
        showModalLoginEmpleado: false,
        animateModalLoginEmpleado: false
    })
    // Metodos
    const handleClickModalEmpleado = () => {

        if (!modalLoginEmpleado.showModalLoginEmpleado) {

            // Ocultar login
            modalLogin.animateModalLogin = true
            setTimeout(() => {
                modalLogin.showModalLogin = false
            }, 300)

            // Mostrar login empleados
            modalLoginEmpleado.showModalLoginEmpleado = true
            setTimeout(() => {
                modalLoginEmpleado.animateModalLoginEmpleado = false
            }, 300)

        } else {

            // Ocultar login empleados
            modalLoginEmpleado.animateModalLoginEmpleado = true
            setTimeout(() => {
                modalLoginEmpleado.showModalLoginEmpleado = false
            }, 300)

            // Mostrar Login
            modalLogin.showModalLogin = true
            setTimeout(() => {
                modalLogin.animateModalLogin = false
            }, 300)

        }
    }
    const handleClickModal = () => {

        if (!modalLogin.showModalLogin) {

            // Ocultar Register
            modalRegister.animateModalRegister = true
            setTimeout(() => {
                modalRegister.showModalRegister = false
            }, 300)

            // Mostrar login 
            modalLogin.showModalLogin = true
            setTimeout(() => {
                modalLogin.animateModalLogin = false
            }, 300)

        } else {

            // Ocultar login
            modalLogin.animateModalLogin = true
            setTimeout(() => {
                modalLogin.showModalLogin = false
            }, 300)

            // Mostrar Register
            modalRegister.showModalRegister = true
            setTimeout(() => {
                modalRegister.animateModalRegister = false
            }, 300)

        }
    }
    const handleIconClick = (node, e) => {
        node.props.suffixIcon = node.props.suffixIcon === 'eyeOpen' ? 'eyeClose' : 'eyeOpen'
        node.props.type = node.props.type === 'password' ? 'text' : 'password'
    }
    return {
        modalLogin,
        modalRegister,
        modalLoginEmpleado,

        handleClickModal,
        handleIconClick,
        handleClickModalEmpleado

    }
})
