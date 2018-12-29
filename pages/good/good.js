//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: app.globalData.img_url,
    scrollTop: 0,
    last_scrollTop: 0,
    toView: 0,
    navActive: 0,
    lastActive: 0,
    s_height: '',
    height_arr: [],
    category: [
    ],
   
  },
  go_gooddetail: function (event) {

    var that = this;
    var item = event.currentTarget.dataset.item;

    console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../goods_detail/goods_detail?title=' + event.currentTarget.dataset.id,
      success: function (res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function () {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }


    })
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      toView: id,
      navActive: index
    });
  },
  scroll: function (e) {
    var self = this;
    // var last_scrollTop=0;
    self.setData({ scrollTop: e.detail.scrollTop });
    // if(self.data.is_true){

    setTimeout(function () {
      // self.setData({
      //   is_true:false
      // });
      if (self.data.last_scrollTop != self.data.scrollTop) {
        self.setData({ last_scrollTop: self.data.scrollTop });
        self.scrollmove(self, e, self.data.scrollTop);
      }
    }, 1000);
  

  },
  scrollmove: function (self, e, scrollTop) {

    // last_scrollTop=scrollTop;
    var scrollArr = self.data.height_arr;
    if (scrollTop > scrollArr[scrollArr.length - 1] - self.data.s_height) {
      return;
    } else {
      for (var i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          if (0 != self.data.lastActive) {
            self.setData({
              navActive: 0,
              lastActive: 0
            });
          }
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop <= scrollArr[i]) {
          if (i != self.data.lastActive) {
            self.setData({
              navActive: i,
              lastActive: i
            });
          }
        }
      }
    }
  },
  onLoad: function () {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    this.setData({ s_height: s_height });
    this.getHeightArr(this);
    wx.request({
      url: app.globalData.tiltes + 'commodity_index',
      data: {
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
      
        console.log(res);
        that.setData({
          category: res.data.data.goods_type,
        });
        //  添加字段到等级数组
        // for (var index in that.data.nav) {
        //   var sexParam = "nav[" + index + "].tab";
        //   that.setData({
        //     [sexParam]: index,
        //   })

        // }
       

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
  },
  getHeightArr: function (self) {
    var height = 0, height_arr = [], details = self.data.category, s_height = self.data.s_height;
    for (var i = 0; i < details.length; i++) {
      var last_height = 30 + details[i].length /3* 90;
      if (i == details.length - 1) {
        last_height = last_height > s_height ? last_height : s_height + 50;
      }
      height += last_height;

      height_arr.push(height);
    }
    self.setData({
      height_arr: height_arr
    });
  }
  
  
})
