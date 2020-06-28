import { createAPI } from './http'

const auth = {
  login: params => createAPI('/login', 'post', params)
}

const menu = {
  getList: params => createAPI('/list', 'post', params)
}

const user = {
  getList: params => createAPI('/user/query', 'post', params),
  addUser: params => createAPI('/user/update', 'post', params),
  delUser: params => createAPI('/user/destroy', 'get', params),
  getExcel: params => createAPI('/user/excel', 'post', params)
}

const article = {
  getList: params => createAPI('/article/query', 'post', params),
  add: params => createAPI('/article/update', 'post', params)

}

const role = {
  getList: params => createAPI('/sys/role/list', 'get', params)
}

const common = {
  uploadExcel: params => createAPI('/common/upload', 'post', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  upload: params => createAPI('/common/upload', 'post', params, {})
  // uploadExcel: params => createAPI('/common/uploadExcel', 'post', params, {})
}

export { auth, menu, user, article, role, common }
