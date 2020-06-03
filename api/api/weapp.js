import Request from '../request'

const req = new Request()

const  weapp = {
  // 小程序登录
  auth (data) {
    return req.post('/weapp/auth', data)
  }
}

export default weapp