Component({
  data: {
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    list: [{
      pagePath: '/pages/index/index',
      text: 'home'
    }, {
      pagePath: '/pages/page1/index',
      text: 'page1'
    }]
  },
  attached () {
  },
  methods: {
    switchTab (e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log('url', url)

      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})