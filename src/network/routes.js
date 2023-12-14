import Home from "../components/home/Home.vue";
import Article from "../components/article/Article.vue";
import Counselor from "../components/counselor/Counselor.vue";
import Book from '../components/book/Book.vue'
import Login from "../components/loginAndRegister/Login.vue";
import Contract from "../components/loginAndRegister/Contract.vue";
import Register from "../components/loginAndRegister/Register.vue";
import ArticleDetail from "../components/article/ArticleDetail.vue";

export default [
    {
        path: '/',
        redirect: '/home',
        show: false
    }, {
        name: '首页',
        path: '/home',
        component: Home,
        show: true,
        meta:{
            title: ' | 首页'
        }
    }, {
        name: '文编',
        path: '/article',
        component: Article,
        show: true,
        meta:{
            title: ' | 文编'
        }
    }, {
        name: '文章',
        path: '/article/:articleId',
        component: ArticleDetail,
        show: false,
        meta:{
            title: ' | 文编'
        }
    }, {
        name: '团队',
        path: '/counselor',
        component: Counselor,
        show: true,
        meta:{
            title: ' | 团队'
        }
    },  {
        name: '预约',
        path: '/book',
        component: Book,
        show: true,
        meta:{
            title: ' | 预约'
        }
    }, {
        name: '登录',
        path: '/login',
        component: Login,
        show: false,
        meta:{
            title: ' | 登录'
        }
    }, {
        name: '注册',
        path: '/register',
        component: Register,
        show: false,
        meta:{
            title: ' | 注册'
        }
    }, {
        name: '用户条款',
        path: '/contract',
        component: Contract,
        show:false,
        meta:{
            title: ' | 用户条款'
        }
    }
]