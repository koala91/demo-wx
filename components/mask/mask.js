Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    top: {
      type: Number | String,
      value: 0
    },
    effect: {
      type: String,
      value: 'scale-in'
    },
    hideDelay: {
      type: Number
    },
    hideOnTap: {
      type: Boolean,
      value: false
    },
    blur: {
      type: String
    },
    opacity: {
      type: Number | String,
      value: 0.5
    }
  },
  data: {
    selfShow: false,
    isInTimeout: false
  },
  behaviors: [],
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true // 父页面可以影响子组件的样式了
  },
  methods: {
    handleMaskTap () {
      if (this.data.hideOnTap) {
        this.setData({
          show: false
        })
      }
    },
    handleTouchMove: function (e) {
    }
  },
  observers: {
    'numberA, numberB': function (numberA, numberB) {
      this.setData({
        sum: numberA + numberB
      })
    },
    'show': function (val) {
      if (val) {
        this.setData({
          selfShow: true
        })
      } else {
        if (this.data.hideDelay) {
          setTimeout(() => {
            this.setData({
              selfShow: false
            })
          }, this.data.hideDelay)
        } else {
          this.setData({
            selfShow: false
          })
        }
      }
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