import { createApp } from 'vue'
import Vuex from 'vuex';

import router from './routes'
import App from './App.vue'

const app = createApp(App)

app.use(Vuex)
app.use(router)

app.mount('#app')
