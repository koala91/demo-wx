import Request from '../request'

const req = new Request()

const  account = {
  // 当前顾客
  current (data) {
    return req.get('/account/current', data)
  },
  // 账号密码登录
  login (data) {
    return req.post('/account/login', data)
  }
}

export default account