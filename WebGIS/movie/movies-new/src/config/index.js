import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import { createPinia } from "pinia";
import router from "../router/index.js";
const pinia = createPinia();
export const initProject = (app)=>{
    for(const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    };
    app.use(createPinia());
    app.use(router);
    app.use(ElementPlus);
    app.use(pinia);

}