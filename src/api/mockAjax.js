import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const ajax = axios.create({
  baseURL: '/mock',
  timeout: 20000,
})

// 请求拦截器
ajax.interceptors.request.use((config) => {
  // 显示请求进度条
  NProgress.start()

  // 必须返回config
  return config
})

// 添加响应拦截器
ajax.interceptors.response.use(
  response => {
    // 隐藏进度条
    NProgress.done()
    /*  成功返回的数据不再是response, 而直接是响应体数据response.data */
    return response.data
  },
  error => {
    // 隐藏进度条
    NProgress.done()

    alert('请求出错: ' + error.message||'未知错误')

    // return new Promise(() => {})  // 中断promise链 ==> 具体请求就不能再处理了  
    return Promise.reject(error) // 返回失败的promise ==> 具体请求可以处理
  }
)

export default ajax