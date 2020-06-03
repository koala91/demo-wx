// Component Object
const app = getApp()

Component({
  // 类似props
  properties: {
    myProperty: {
      type: String,
      value: '',
      observer: function () {}
    },
    title: {
      type: String
    },
    navigateBack: {
      type: [Boolean, String],
      value: false
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    backIconColor: {
      type: String,
      value: 'black' // white
    }
  },
  behaviors: [], // 类似 mixins
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    navBarHeight: app.globalData.navBarHeight
  },
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true // 父页面可以影响子组件的样式了
  },
  methods: {
    back: function () {
      this.triggerEvent('back')

      const pages = getCurrentPages()
      if (pages.length === 1) {
        wx.switchTab({
          url: '../index/index'
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },
  created: function () {

  },
  attached: function () {

  },
  ready: function () {

  },
  moved: function () {

  },
  detached: function () {

  }
})