const app = getApp();
// Component({
//   data: {
//     // list: [],
//     tabBarArr: [{
//       "img": "http://ptoobf833.bkt.clouddn.com/home03.png",
//       "img2": "http://ptoobf833.bkt.clouddn.com/home4.png",
//       "text": "首页",
//       "path": "/pages/diy/index/index",
//       // "selected": false,
//       "color": "#ababab",
//       "colorOn": "#D81E06",
//     },
//     {
//       "img": "http://ptoobf833.bkt.clouddn.com/warehouse03.png",
//       "img2": "http://ptoobf833.bkt.clouddn.com/warehouse4.png",
//       "text": "茶仓",
//       "path": "/pages/storage/view/view",
//       // "selected": false,
//       "color": "#ababab",
//       "colorOn": "#D81E06",
//     },
//     {
//       "img": "http://ptoobf833.bkt.clouddn.com/circle03.png",
//       "img2": "http://ptoobf833.bkt.clouddn.com/circle4.png",
//       "text": "茶圈",
//       "path": "/pages/circle/circle",
//       // "selected": false,
//       "color": "#ababab",
//       "colorOn": "#D81E06",
//     },
//     {
//       "img": "http://ptoobf833.bkt.clouddn.com/broadcast03.png",
//       "img2": "http://ptoobf833.bkt.clouddn.com/broadcast4.png",
//       "text": "直播",
//       "path": "/pages/live/index/index",
//       // "selected": false,
//       "color": "#ababab",
//       "colorOn": "#D81E06",
//     },
//     {
//       "img": "http://ptoobf833.bkt.clouddn.com/me03.png",
//       "img2": "http://ptoobf833.bkt.clouddn.com/me4.png",
//       "text": "我的",
//       "path": "/pages/mine/mine",
//       // "selected": false,
//       "color": "#ababab",
//       "colorOn": "#D81E06",
//     }],
//     checked: 0
//   },
//   attached() {},
//   methods: {
//     switchTab(e) {
//       const data = e.currentTarget.dataset;
//       const url = data.path;
//       wx.switchTab({ url })

//       this.setData({
//         checked: data.index
//       })
//     }
//   }
// })


Component({
  data: {
    tabBarArr: [],
    checked: 0,
  },
  attached() {
    var _this = this;
    if(app.globalData.uniacid){
      wx.request({
        // url: "https://www.easy-mock.com/mock/5d1d6e2817151e3ae8f2fc43/tabBar/tabBarArr",
        url: app.globalData.tiltes + 'doPageGetFoot',
        data: {
          uniacid: app.globalData.uniacid,
          foot: 2
        },
        success: function (res) {
          // var nowUrl = '/' + getCurrentPages()[0].route;
          console.log(res)
          // if (data.status == 1){
            // _this.setData({
            //   tabBarArr: data.data
            // })
          // }
        }
      })
    }
  },
  methods: {
    switchTab(e) {
      var data = e.currentTarget.dataset;
      var url = data.path;
      wx.switchTab({ url })

      this.setData({
        checked: data.index
      })
    }
  }
})