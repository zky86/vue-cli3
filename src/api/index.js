import { createAPI } from './http'

const auth = {
  login: params => createAPI('/login', 'post', params)

}

const menu = {
  getList: params => createAPI('/list', 'post', params)
}

const user = {
  getList: params => createAPI('/user/query', 'get', params),
  getArticle: params => createAPI('/article', 'get', params),
  delUser: params => createAPI('/user/destroy', 'get', params),
  addUser: params => createAPI('/user/update', 'post', params)
}

const role = {
  getList: params => createAPI('/sys/role/list', 'get', params)
}

const common = {
  upload: params => createAPI('/common/upload', 'post', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export { auth, menu, user, role, common }
