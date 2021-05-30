import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'

import router from './routes'
import store from './store'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(store)


// fontawesome
library.add(faArrowUp, faArrowDown)
app.component('icon', FontAwesomeIcon)

app.mount('#app')
