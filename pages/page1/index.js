// Page Object
Page({
  data: {

  },
  // options(Object)
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
    console.log('page1-item', item)
  }
})
