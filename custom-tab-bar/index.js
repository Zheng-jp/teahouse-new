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
      "img": "http://ptoobf833.bkt.clouddn.com/class03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/class4.png",
      "text": "分类",
      "path": "/pages/good/good",
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
      "img": "http://ptoobf833.bkt.clouddn.com/cart03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/cart4.png",
      "text": "购物车",
      "path": "/pages/buy/buy",
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
    tabBarArr2: [{
      "img": "http://ptoobf833.bkt.clouddn.com/home03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/home4.png",
      "text": "首页",
      "path": "/pages/diy/index/index",
      "color": "#ababab",
      "colorOn": "#D81E06",
    },
    {
      "img": "http://ptoobf833.bkt.clouddn.com/class03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/class4.png",
      "text": "分类",
      "path": "/pages/good/good",
      "color": "#ababab",
      "colorOn": "#D81E06",
    },
    {
      "img": "http://ptoobf833.bkt.clouddn.com/cart03.png",
      "img2": "http://ptoobf833.bkt.clouddn.com/cart4.png",
      "text": "购物车",
      "path": "/pages/buy/buy",
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
    checked: 0,
    editionId: null,
  },
  attached() {
    this.setData({
      editionId: wx.getStorageSync('editionId')
    })
  },
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
