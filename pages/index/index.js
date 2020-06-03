import { checkAuth }  from '../../utils/util'
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    title: '我是首页',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowDialog: false
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      }, () => {
        // console.log('回调')
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tapDialogButton: function (e) {
    console.log('e', e.detail)
    this.setData({
      isShowDialog: false
    })
  },
  fnUserInfo: function () {
    console.log('global', global)
    global.api.account.current().then(({res}) => {
      console.log('current-res', res)
    })
  },
  fnGetSetting: function () {
    wx.getSetting({
      success: (result) => {
        console.log('get-setting', result)
      },
      fail: () => {},
      complete: () => {}
    })
  },
  fnOpenSetting: function () {
    wx.openSetting({
      success: (result) => {
        console.log('open-setting', result)
      },
      fail: () => {},
      complete: () => {}
    })
  },
  fnUserAddress: function () {
    checkAuth('scope.userLocation', () => {
      wx.getLocation({
        type: 'wgs84',
        altitude: false,
        success: (result) => {
          console.log('成功后的具体位子', result)
        },
        fail: () => {
        },
        complete: () => {}
      })
    })
  },
  FnAddress: function () {
    checkAuth('scope.address', () => {
      wx.chooseAddress({
        success: (result) => {
          console.log('调用地址之后返回的数据', result)
        },
        fail: () => {},
        complete: () => {}
      })
    })
  },
  FnLogin: function () {
    
  }
})
