// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    title: '中间标题'
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log) => util.formatTime(new Date(log)))
    })
  }
})
