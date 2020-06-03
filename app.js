const oConfig = require('./app.config')
import api from './api/index'

global.api = api

global.yhsd = {
  YOU_API_URL: oConfig.you_api_url,
  API_URL: oConfig.api_url,
  SITE_ALIAS: oConfig.alias,
  SITE_ID: oConfig.shop.site_id,
  SESSION_TOKEN: ''
}

global.account = {}

// app.js
App({
  onLaunch: function () {
    // 获取设备信息
    this.getSystemInfo()

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        console.log('login-res', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        console.log('app-get-setting', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    sysInfo: {},
    navBarHeight: 0,
    statusBarHeight: 0,
    screenWidth: 0,
    isIpx: false
  },
  getSystemInfo () {
    try {
      const sysInfo = wx.getSystemInfoSync()
      console.log('sysInfo:', sysInfo)
      this.globalData.sysInfo = sysInfo
      this.globalData.statusBarHeight = sysInfo.statusBarHeight
      this.globalData.navBarHeight = sysInfo.statusBarHeight + 44
      this.globalData.screenWidth = sysInfo.screenWidth
      // 判断 iPhone X系列
      const model = sysInfo.model
      if (model.includes('iPhone') && model.includes('X')) {
        this.globalData.isIpx = true
      }
    } catch (error) {
      console.log(error)
    }
  }
})