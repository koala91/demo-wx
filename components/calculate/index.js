// Component Object
Component({
  properties: {
    num2: {
      type: Number,
      value: 0,
      observer (e) {
        console.log('num2变化', e)
      }
    }
  },
  data: {
    num3: 0,
    num4: 100
  },
  methods: {
    fnAdd: function (e) {
      this.triggerEvent('add')
      console.log('')
      console.log('dd')
      this.setData({
        num4: this.data.num4 + 1
      })
    },
    fnReduce: function (e) {
      this.setData({
        num4: this.data.num4 - 1
      })
      this.triggerEvent('reduce', {
        a: 'a',
        b: 'b'
      })
    }
  },
  observers: {
    'num4': function (e) {
      console.log('num4 有变化', e)
    }
  },
  lifetimes: {
    created: function () {
      // 在组件实例刚刚被创建时执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        num3: this.data.num2
      })
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


