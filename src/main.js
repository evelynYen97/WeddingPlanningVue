
import { createApp } from 'vue'
import { createPinia } from 'pinia'



import App from './App.vue'
import router from './router'
//導入vuetify讓vue使用
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import * as components from 'vuetify/components';  
import * as directives from 'vuetify/directives'; 
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  });

app.use(createPinia())
app.use(router)
app.use(vuetify);
app.mount('#app')
