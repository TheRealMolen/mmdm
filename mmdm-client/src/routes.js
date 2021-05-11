import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '/src/components/HelloWorld.vue'
import GameView from '/src/components/GameView.vue'

const routes = [
    {
        path: '/hello',
        name: 'Hello',
        component: HelloWorld,
    },
    {
        path: '/',
        name: 'Play',
        component: GameView,
    },
]
const router = createRouter({
    history: createWebHistory('/mmdm/'),
    routes,
})

export default router