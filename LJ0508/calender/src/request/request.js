//在浏览器发送请求的时候有这么一条限制规则：同源策略，即协议、域名、端口号必须相同，否则就会出现跨域问题。
//如果接口请求没有满足同源策略，可以认为请求是跨域的，这时候浏览器就会拦截请求，不允许请求发送出去。
//解决跨域问题:
//1.在后端层面解决，通过中间件解决跨域问题
//2.在前端层面解决，通过webpack的代理服务器解决跨域问题（浏览器与远程服务器之间有限制，但是服务器和服务器之间就没有限制）
import axios from 'axios'
/* 创建一个axios实例 */
const request = axios.create({
    baseURL: 'http://localhost:8080/calendar',//因为本地浏览器与本地服务器是域名端口一致，我们先把数据发送到本地服务器
    timeout: 3000
})
request.interceptors.response.use(
    (data) => {
            return data.data.result.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request