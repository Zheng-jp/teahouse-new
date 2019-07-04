const app = getApp();
Component({
  data: {
    // list: [],
    tabBarArr: [{
      "img": "http://ptoobf833.bkt.clouddn.com/home03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/home4.png",
      "text": "首页",
      "path": "/pages/diy/index/index",
      "color": "#ababab",
      "colorOn": "#D81E06",
    },
    {
      "img": "http://ptoobf833.bkt.clouddn.com/warehouse03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/warehouse4.png",
      "text": "茶仓",
      "path": "/pages/storage/view/view",
      "color": "#ababab",
      "colorOn": "#D81E06",
    },
    {
      "img": "http://ptoobf833.bkt.clouddn.com/circle03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/circle4.png",
      "text": "茶圈",
      "path": "/pages/circle/circle",
      "color": "#ababab",
      "colorOn": "#D81E06",
    },
    {
      "img": "http://ptoobf833.bkt.clouddn.com/broadcast03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/broadcast4.png",
      "text": "直播",
      "path": "/pages/live/index/index",
      "color": "#ababab",
      "colorOn": "#D81E06",
    },
    {
      "img": "http://ptoobf833.bkt.clouddn.com/me03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/me4.png",
      "text": "我的",
      "path": "/pages/mine/mine",
      "color": "#ababab",
      "colorOn": "#D81E06",
    }],
    checked: 0
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url })

      this.setData({
        checked: data.index
      })
    }
  }
})
