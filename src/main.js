import './assets/main.css'
import 'primevue/resources/themes/aura-light-purple/theme.css'
import 'primeicons/primeicons.css'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
// import '@fullcalendar/common/main.css'
// import '@fullcalendar/daygrid/main.css'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import  vSelect   from 'vue-select';
import "vue-select/dist/vue-select.css";
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import PrimeVue from 'primevue/config';
import { plugin,defaultConfig,} from '@formkit/vue'
import config from '../formkit.config'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component("v-select", vSelect )

app.component(FullCalendar)
app.directive('badge',BadgeDirective)

app.use(dayGridPlugin)
app.use(interactionPlugin)

app.use(ToastService);
app.use(ConfirmationService);

app.use(PrimeVue);
app.use(createPinia())

app.use(router)
app.use(plugin,defaultConfig(config))
app.use(Vue3Toasity,{autoClose:3000})
app.mount('#app')
