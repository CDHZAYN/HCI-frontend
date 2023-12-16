import Home from "../components/home/Home.vue";
import Article from "../components/article/Article.vue";
import Counselor from "../components/counselor/Counselor.vue";
import Book from '../components/book/Book.vue'
import Login from "../components/loginAndRegister/Login.vue";
import Contract from "../components/loginAndRegister/Contract.vue";
import Register from "../components/loginAndRegister/Register.vue";
import ArticleDetail from "../components/article/ArticleDetail.vue";
import CounselorDetail from "../components/counselor/CounselorDetail.vue";

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
        name: '文编',
        path: '/article',
        component: Article,
        show: true
    }, {
        name: '文章',
        path: '/article/:articleId',
        component: ArticleDetail,
        show: false,
    }, {
        name: '团队',
        path: '/counselor',
        component: Counselor,
        show: true
    }, {
        name: '团队成员',
        path: '/counselor/:counselorId',
        component: CounselorDetail,
        show: false,
    }, {
        name: '预约',
        path: '/book',
        component: Book,
        show: true
    }, {
        name: '登录',
        path: '/login',
        component: Login,
        show: false
    }, {
        name: '注册',
        path: '/register',
        component: Register,
        show: false
    }, {
        name: '用户条款',
        path: '/contract',
        component: Contract,
        show: false
    }
]