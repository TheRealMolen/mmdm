import { createApp } from 'vue'
import Vuex from 'vuex';

import 'bootstrap/scss/bootstrap.scss'

import router from './routes'
import App from './App.vue'

const app = createApp(App)

app.use(Vuex)
app.use(router)

app.mount('#app')
