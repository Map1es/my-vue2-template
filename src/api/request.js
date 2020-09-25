'use strict'
/**
 * @file axios请求封装
 */
import axios from 'axios'
import store from '../store/common'
import { Message } from 'element-ui'


const Axios = axios.create({})

// 响应时间
// Axios.defaults.timeout = 10000
// `withCredentails`选项表明了是否是跨域请求
Axios.defaults.withCredentials = true
// 设置默认请求头
Axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json; charset=UTF-8'
}

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    // loadingInstance = Loading.service({
    //   fullscreen: true
    // });
    // 获取token
    const token = store.getters.getToken
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加返回拦截器
Axios.interceptors.response.use(
  response => {
    if (typeof response != 'undefined') {
      if (response.data.code == 0) {
        return response.data
      } else if (response.data.code == 20009) {
        // Token过期
        checkCode('登录过期，请重新登录')
        return response.data
      } else if (response.data.msg) {
        checkCode(response.data.msg)
        return response.data
      } else if (response.data.errors) {
        checkCode(response.data.message)
      } else {
        checkCode('操作失败，请重试')
      }
    }
    return ''
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '登录过期，请重新登录'
          // 跳到登录界面
          localStorage.clear()
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求失败'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '无法连接服务器'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '连接服务器超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
      }
      checkCode(error.message)
    } else {
      error.message = '无法连接服务器'
      checkCode(error.message)
    }
    // 对返回的错误处理

    return Promise.reject(error)
  }
)

// 请求失败错误信息提示
function checkCode(message) {
  // 关闭loading
  // loadingInstance.close();
  // 弹出错误信息
  Message.error(message)
}
export default Axios
