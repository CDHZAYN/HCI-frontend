import Home from "../components/home/Home.vue";
import Counselor from "../components/counselor/Counselor.vue";

export default [
    {
        path: '/',
        redirect: '/home',
        show: false
    }, {
        name: '首页',
        path: '/home',
        component: Home,
        show: true
    }, {
        name: '团队',
        path: '/home',
        component: Home,
        show: true
    }, {
        name: '文编',
        path: '/home',
        component: Home,
        show: true
    }, {
        name: '预约',
        path: '/home',
        component: Home,
        show: true
    }
]