import { createAPI } from './http'

const auth = {
  login: params => createAPI('/login', 'post', params)

}

const menu = {
  getList: params => createAPI('/list', 'post', params)
}

const user = {
  getList: params => createAPI('/user', 'post', params)
}

const role = {
  getList: params => createAPI('/sys/role/list', 'get', params)
}

export { auth, menu, user, role }
