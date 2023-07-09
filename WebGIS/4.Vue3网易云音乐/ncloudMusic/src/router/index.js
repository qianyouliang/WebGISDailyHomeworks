import { createRouter, createWebHashHistory } from 'vue-router'
import MusicList from '../components/MusicList.vue'
import SearchMusic from "../components/SearchMusic.vue"
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MusicList
        },
        {
            path: '/search/:keywords',
            name: 'search',
            component: SearchMusic
        },
        
    ],
})
export default router