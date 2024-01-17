import { createApp } from 'vue'
import './style.css'
import { createPinia } from "pinia";
import App from './App.vue'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.min.css";
const app  = createApp(App);



const pinia = createPinia();

app.use(Antd);
app.use(pinia);

app.mount('#app')
