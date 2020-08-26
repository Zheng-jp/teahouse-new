const app = getApp();
Component({
  data: {
    // list: [],
    tabBarArr: [{
        "img": "http://zhihuichacang.com/home03.png",
        "img2": "http://zhihuichacang.com/home4.png",
        "text": "首页",
        "path": "/pages/diy/index/index",
        "color": "#ababab",
        "colorOn": "#D81E06",
      },
      {
        "img": "http://zhihuichacang.com/class03.png",
        "img2": "http://zhihuichacang.com/class4.png",
        "text": "分类",
        "path": "/pages/good/good",
        "color": "#ababab",
        "colorOn": "#D81E06",
      },
      {
        "img": "http://zhihuichacang.com/warehouse03.png",
        "img2": "http://zhihuichacang.com/warehouse4.png",
        "text": "茶仓",
        "path": "/pages/storage/view/view",
        "color": "#ababab",
        "colorOn": "#D81E06",
      },
      {
        "img": "http://zhihuichacang.com/cart03.png",
        "img2": "http://zhihuichacang.com/cart4.png",
        "text": "购物车",
        "path": "/pages/buy/buy",
        "color": "#ababab",
        "colorOn": "#D81E06",
      },
      {
        "img": "http://zhihuichacang.com/me03.png",
        "img2": "http://zhihuichacang.com/me4.png",
        "text": "我的",
        "path": "/pages/mine/mine",
        "color": "#ababab",
        "colorOn": "#D81E06",
      }
    ],
    tabBarArr2: [{
        "img": "http://zhihuichacang.com/home03.png",
        "img2": "http://zhihuichacang.com/home4.png",
        "text": "首页",
        "path": "/pages/diy/index/index",
        "color": "#ababab",
        "colorOn": "#D81E06",
      },
      {
        "img": "http://zhihuichacang.com/class03.png",
        "img2": "http://zhihuichacang.com/class4.png",
        "text": "分类",
        "path": "/pages/good/good",
        "color": "#ababab",
        "colorOn": "#D81E06",
      },
      {
        "img": "http://zhihuichacang.com/cart03.png",
        "img2": "http://zhihuichacang.com/cart4.png",
        "text": "购物车",
        "path": "/pages/buy/buy",
        "color": "#ababab",
        "colorOn": "#D81E06",
      },
      {
        "img": "http://zhihuichacang.com/me03.png",
        "img2": "http://zhihuichacang.com/me4.png",
        "text": "我的",
        "path": "/pages/mine/mine",
        "color": "#ababab",
        "colorOn": "#D81E06",
      }
    ],
    checked: 0,
    editionId: null,
    uniacid: null
  },
  attached() {
    this.setData({
      editionId: wx.getStorageSync('editionId'),
      uniacid: wx.getStorageSync('uniacid')
    })
  },
  methods: {
    switchTab(e) {
      // console.log(app.globalData.islogin)
      if (app.globalData.islogin) {
        const data = e.currentTarget.dataset;
        const url = data.path;
        wx.switchTab({
          url
        })

        this.setData({
          checked: data.index
        })
      } else {
        // app.bindGetUserInfo()
        wx.navigateTo({
          url: "/pages/logs/logs"
        })
      }
    }
  }
})