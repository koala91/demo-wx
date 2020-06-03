let log = require('../../utils/log.js') // 引用上面的log.js文件

// Page Object
Page({
  data: {
    title: '加减法',
    num: 10
  },
  // options(Object)
  onLoad: function (options) {

  },
  fnAdd: function () {
    console.log('add被触发')
    let nowNum = this.data.num + 1
    this.setData({
      num: nowNum
    })
  },
  fnReduce: function (e) {
    console.log('reduce被触发', e)
    let nowNum = this.data.num - 1
    this.setData({
      num: nowNum
    })
  },
  onReady: function () {

  },
  onShow: function () {
    log.info('hello test hahaha')
    log.warn('warn')
    log.error('error')
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  // item(index,pagePath,text)
  onTabItemTap: function (item) {
    // console.log('page3-item', item)
  }
})

