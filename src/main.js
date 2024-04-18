import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'animate.css';
import AosVue from "aos-vue";

createApp(App)
    .use(AosVue)
    .mount('#app')
