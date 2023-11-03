import 'materialize-css/dist/js/materialize.min'
import 'materialize-css/dist/css/materialize.css'
import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


const pinia = createPinia()
let app = createApp(App)

app.use(pinia)
app.mount('#app')