import axios from "axios";

const request = axios.create({
    baseURL: '/api',
    timeout: 6600,
})

let token = null

console.log(import.meta.env.VITE_BACKEND_URL)

request.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        if(token){
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error)
        return Promise.reject(error)
    }
)

// 拦截器
request.interceptors.response.use(
    function (response) {
        // console.log('good', response)
        if(response.data.result && response.data.result.token){
            token =  response.data.token
        }
        return Promise.resolve({
            status: response.status,
            msg: response.data.result,
        })
    },
    function (error) {
        // console.log('bad', error)
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject({
            status: error.response.status,
            msg: error.response.data.message,
        })
    }
)

export default request