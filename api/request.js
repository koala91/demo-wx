class Request {
  constructor () {
    this.baseUrl = 'https://xiewei.youhaovip.com/api/v1'
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler (handler) {
    this._errorHandler = handler
  }

  /**
   * GET类型的网络请求
   */
  get (url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  delete (url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  put (url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  post (url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll (url, data, header, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        data: data,
        header: {
          // 一般登录成功后给一个token
          // Authorization: `Token ${wx.getStorageSync('site_token')}`,
          token: wx.getStorageSync('token') || '',
          ...header
        },
        method: method,
        success: ((oRes) => {
          // console.log(oRes)
          if (oRes.statusCode === 200 && !oRes.data.errmsg) {
            resolve(oRes)
          } else {
            if (this._errorHandler) {
              this._errorHandler(oRes)
            }
            reject(oRes)
          }
        }),
        fail: ((oRes) => {
          if (this._errorHandler) {
            this._errorHandler(oRes)
          }
          reject(oRes)
        })
      })
    })
  }
}

export default Request