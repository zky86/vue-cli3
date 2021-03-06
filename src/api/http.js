import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import * as utils from '@/utils'
import router from '../router'

const instance = axios.create({ baseURL: '' })

const errorHandle = (status, message) => {
  // console.log(status)
  switch (status) {
    case 401:
      store.dispatch('logout')
      break
    case 403:
      break
    case 404:
      break
    default:
      Notification.error({ title: '错误', message: message })
  }
}

instance
  .interceptors
  .request
  .use(config => {
    // const token = store.state.token
    const token = `${store.state.token}`
    token && (config.headers.common.Authorization = token)
    if (config.method === 'post' && config.data) {
      if (config.headers['Content-Type'] === 'multipart/form-data') {
        config.headers.common.Authorization = token
        config.data = utils.objectToFormdata(config.data)
        config.headers.common['Content-Type'] = 'multipart/form-data'
      }
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

instance
  .interceptors
  .response
  .use(response => {
    // response.success = response.data.success
    // console.log(response)
    // if (!response.success) {
    //   response.data.message && Notification.error({ title: '失败', message: response.data.message })
    // } else {
    //   response.config.method === 'post' && response.data.message && Notification.success({ title: '成功', message: response.data.message })
    // }
    if (response.data && response.data.code === 482) {
      Notification.error({ title: '警告', message: response.data.message })
      router.push({ path: '/login' })
      return false
    }
    return response.data
  }, error => {
    const { response } = error
    response
      ? errorHandle(response.status, response.data.message)
      : Notification.warning({ title: '警告', message: '网络连接失败，请稍后重试！' })
    return Promise.reject(error)
  })

export const createAPI = (url, method, params, config = {}) => {
  if (method === 'get') {
    config.params = params
  } else {
    config.data = params
  }
  return instance({
    url,
    method,
    ...config
  })
}

export default instance
