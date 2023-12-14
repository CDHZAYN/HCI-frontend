import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import routes from './network/routes.js'
import request from "./network/request.js"
import axios from "axios"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) { //拦截后设置标题
        document.title = document.title.split(' | ')[0] + to.meta.title
    }
    next()
})

const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$rawRequest = axios

app.use(ElementPlus)
app.use(router)

app.mount('#app')