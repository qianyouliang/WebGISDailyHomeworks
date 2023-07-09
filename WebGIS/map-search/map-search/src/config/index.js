/* 实现项目的基础配置 */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "../style.css"
import { createPinia } from "pinia"
import router from "../router/index.js"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const pinia = createPinia()

export const initProject = (app) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.use(createPinia());
    app.use(router);
    app.use(ElementPlus);
    app.use(pinia)
}