import { createApp } from 'vue'
import VueScrollTo from 'vue-scrollto';
import App from './App.vue'
import "./styles/main.scss"

createApp(App)
    .use(VueScrollTo)
    .mount('#app');
