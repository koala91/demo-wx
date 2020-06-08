const app = getApp()
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    shopName: ''
  },
  behaviors: [],
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true // 父页面可以影响子组件的样式了
  },
  methods: {
    fnMethods: function (e) {

    },
    getUserInfo: function (res) {
      const userInfo = res.detail.userInfo || null
      if (userInfo) {
        this.closeModal()
        this.login(userInfo, () => {
          // this.updateUserInfo(userInfo)
        })
      } else {
        wx.showToast({
          title: '授权失败，请重新授权',
          icon: 'none'
        })
      }

    },
    closeModal: function () {
      this.setData({
        show: false
      })
    },
    login: function (userInfo, cb) {
      const self = this
      wx.showLoading({
        title: '正在登录...'
      })
      wx.login({
        success (res) {
          if (res.code) {
            // 发起网络请求
            const _appId = (((wx.getAccountInfoSync && wx.getAccountInfoSync()) || {}).miniProgram || {}).appId || ''
            var reqTask = wx.request({
              url: 'https://youhaosuda.com/api/applet/authorize',
              data: {
                appid: _appId,
                siteid: global.yhsd.SITE_ID,
                code: res.code
              },
              header: {'content-type': 'application/x-www-form-urlencoded'},
              method: 'GET',
              success: ({data}) => {
                console.log('result', data)
                const { uid, unionid, token } = data
                var reqTask = wx.request({
                  url: 'https://site.youhaosuda.com/api/v1/account/social_auth',
                  data: {
                    uid: uid,
                    unionid: unionid || '', // 注意有可能是 null，GET 会被当字符串 null
                    auth_token: token,
                    type: 'weixin',
                    social_name: userInfo.nickName,
                    avatar_url: userInfo.avatarUrl
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'alias': global.yhsd.SITE_ALIAS
                  },
                  method: 'GET',
                  success: ({data}) => {
                    console.log('result', data)
                    if (data.code === 200) {
                      wx.hideLoading()
                      const customer = data.customer || {}
                      global.yhsd.SESSION_TOKEN = data.token
                      wx.setStorageSync('token', data.token)
                      global.account = data.customer
                    }
                  },
                  fail: () => {
                    wx.hideLoading()
                    wx.showToast({
                      title: '登录失败',
                      icon: 'none'
                    })
                  },
                  complete: () => {}
                })
              },
              fail: () => {
                wx.hideLoading()
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              },
              complete: () => {}
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    pageInit: function () {
      const pages = getCurrentPages()
      const curPage = pages[pages.length - 1]
      curPage.init && curPage.init()
    }
  },
  observers: {
    'numberA, numberB': function (numberA, numberB) {
      this.setData({
        sum: numberA + numberB
      })
    }
  },
  lifetimes: {
    created: function () {
      // 在组件实例刚刚被创建时执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    ready: function () {
      // 在组件在视图层布局完成后执行
      this.setData({
        shopName: app.globalData.shopName
      })
    },
    moved: function () {
      // 在组件实例被移动到节点树另一个位置时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    error: function (error) {
      // 当组件方法抛出错误时执行
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  }
})