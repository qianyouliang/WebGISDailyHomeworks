import { createApp } from 'vue'
import App from './App.vue'
import { initProject } from './config/index.js'
export const app = createApp(App)
initProject(app)
app.mount('#app')
