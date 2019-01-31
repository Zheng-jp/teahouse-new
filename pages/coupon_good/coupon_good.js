// pages/coupon_good/coupon_good.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    member_grade_img:null,
    routers:[],

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      // 商品列表请求
  wx.request({
    url: app.globalData.tiltes + 'coupon_goods',
    data: {
      'open_id': app.globalData.gmemberid,
      'coupon_id': options.title
    },
    method: "post",
    // header: {
    //   "Content-Type": "json" // 默认值
    // },
    success: function (res) {
    
      that.setData({
        routers: res.data.data,
      });
      console.log(that.data.routers);
      //  添加字段到等级数组
      for (var index in that.data.routers) {
        var sexParam = "routers[" + index + "].url";
        that.setData({
          [sexParam]: app.globalData.img_url,
        })

      }
      var member_grade_img=app.globalData.member_grade_img;
  
         //  添加字段到等级数组
         for (var index in that.data.routers) {
          var sexParam = "routers[" + index + "].member_grade_img";
          that.setData({
            [sexParam]: member_grade_img,
          })
  
        }

    },
    fail: function () {

    },
    complete: function () {
      wx.hideLoading()
    }

  });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})