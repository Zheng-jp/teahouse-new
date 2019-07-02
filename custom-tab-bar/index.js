const app = getApp();
Component({
  data: {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [],
    baseUrl: app.globalData.img_url,
    tabBarArr: []
  },
  ready: function() {
    const _this = this;
    // var editionId = wx.getStorageSync('editionId');
    if(app.globalData.uniacid){
      wx.request({
        url: app.globalData.baseurl + "doPagehomepage",
        // url: app.globalData.baseurl + "doPageGetFoot",
        cachetime: "30",
        data: {
          uniacid: 6,
        },
        success: function (res) {
          var data = res.data.data;
          console.log(data)
          var nowUrl = '/'+getCurrentPages()[0].route;
          var tabBar = [{
            "img": "http://ptoobf833.bkt.clouddn.com/home03.png",
            "img2": "http://ptoobf833.bkt.clouddn.com/home4.png",
            "text": "首页",
            "path": "/pages/diy/index/index",
            "selected": false,
            "color": "#ababab",
            "colorOn": "#D81E06",
          },
          {
            "img": "http://ptoobf833.bkt.clouddn.com/warehouse03.png",
            "img2": "http://ptoobf833.bkt.clouddn.com/warehouse4.png",
            "text": "茶仓",
            "path": "/pages/storage/view/view",
            "selected": false,
            "color": "#ababab",
            "colorOn": "#D81E06",
          },
          {
            "img": "http://ptoobf833.bkt.clouddn.com/circle03.png",
            "img2": "http://ptoobf833.bkt.clouddn.com/circle4.png",
            "text": "茶圈",
            "path": "/pages/circle/circle",
            "selected": false,
            "color": "#ababab",
            "colorOn": "#D81E06",
          },
          {
            "img": "http://ptoobf833.bkt.clouddn.com/broadcast03.png",
            "img2": "http://ptoobf833.bkt.clouddn.com/broadcast4.png",
            "text": "直播",
            "path": "/pages/live/index/index",
            "selected": false,
            "color": "#ababab",
            "colorOn": "#D81E06",
          },
          {
            "img": "http://ptoobf833.bkt.clouddn.com/me03.png",
            "img2": "http://ptoobf833.bkt.clouddn.com/me4.png",
            "text": "我的",
            "path": "/pages/mine/mine",
            "selected": false,
            "color": "#ababab",
            "colorOn": "#D81E06",
          }];
          for(var i = 0; i < 5; i++){
            if(tabBar[i].path == nowUrl){
              tabBar[i].selected = true;
            }else{
              tabBar[i].selected = false;
            }
          }
          _this.setData({
            tabBarArr: tabBar
          })
          // for(let prop in data.data){
          //   if(data.data[prop].linkurl.indexOf('pages') == -1){
          //     // data.data[prop].linkurl = '/pages' + data.data[prop].linkurl;
          //     data.data[prop].linkurl = '/pages/diy/index/index';
          //   }
          //   if(data.data[prop].linkurl.indexOf(nowUrl) != -1){
          //     data.data[prop].change = true;
          //   }else{
          //     data.data[prop].change = false;
          //   }
          // }
          // _this.setData({
          //   list: data
          // })
        }
      })
    }else{
      console.log('uniacid为null！')
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      const index = data.index;
      wx.switchTab({
        url: url
      })
    }
  }
})