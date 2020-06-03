
const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(_formatNumber).join('/') + ' ' + [hour, minute, second].map(_formatNumber).join(':')
}

const _formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 防抖和节流
const debounce = (func, wait, immediate) => {
  let timeout, result

  let debounced = function () {
    // eslint-disable-next-line consistent-this
    let context = this
    let args = arguments

    if (timeout) {clearTimeout(timeout)}
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) {result = func.apply(context, args)}
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

const throttle = (func, wait) => {
  let context, args
  let previous = 0

  return function () {
    let now = new Date()
    // eslint-disable-next-line consistent-this
    context = this
    args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}

// 基础库版本比较
const compareVersion = function (v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  let len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    let num1 = parseInt(v1[i])
    let num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

// 授权的封装
const _getAuth = (scope) => {
  const promise = new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res.authSetting[scope])
      },
      fail: (e) => {
        reject(e)
        console.error('wx.getSetting', e)
      },
      complete: () => {}
    })
  })
  return promise
}

const checkAuth = (name, fn) => {
  _getAuth(name).then((res) => {
    // undefined 为第一次请求授权
    if (res === undefined) {
      wx.authorize({
        scope: name,
        success () {
          fn && fn()
        }
      })
      return
    }
    // false 为拒绝过的授权
    if (res === false) {
      wx.showModal({
        title: '提示',
        content: '需要授权',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            // 用户点确定
            wx.openSetting({
              success: (result) => {
                console.log('setting-result', result)
                if (result.errMsg == 'openSetting:ok' && result.authSetting[name]) {
                  fn && fn()
                }
              },
              fail: () => {},
              complete: () => {}
            })
          } else if (result.cancel) {
            // 用户点取消
          }
        },
        fail: () => {},
        complete: () => {}
      })
      return
    }
    // 其余情况为之前已经有授权
    fn && fn()
  })
}


module.exports = {
  formatTime,
  debounce,
  throttle,
  compareVersion,
  checkAuth
}
