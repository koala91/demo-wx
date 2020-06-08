Page({
  data: {
    title: '登录页',
    showLoginModal: false
  },
  // options(Object)
  onLoad: function (options) {
    // 页面创建时执行
  },
  onReady: function () {
    // 页面出现在前台时执行
  },
  onShow: function () {
    // 页面首次渲染完毕时执行
  },
  onHide: function () {
    // 页面从前台变为后台时执行
  },
  onUnload: function () {
    // 页面销毁时执行
  },
  onPullDownRefresh: function () {
    // 触发下拉刷新时执行
  },
  onReachBottom: function () {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function () {
    // 页面滚动时执行
  },
  onResize: function () {
    // 页面尺寸变化时执行
  },
  // 事件响应函数
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  fnLogin: function () {
    //
    let user = {
      account: '',
      password: ''
    }
    global.api.account.login(user).then(({data}) => {
      console.log('user-res', data)
      if (data.account) {
        wx.switchTab({
          url: '../index/index'
        })
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none'
        })
      }
    })
  },
  authLogin: function () {
    this.setData({
      showLoginModal: true
    })
  }
})