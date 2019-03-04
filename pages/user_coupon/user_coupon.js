// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
      height:'',
      tab:'1',
      status:'2',
      order:[]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({ height: height });
     
    wx.request({
      url: app.globalData.tiltes + 'coupon_untapped',
      data: {
        open_id: app.globalData.gmemberid,
        member_grade_name:app.globalData.member_grade_name,
      },
      method: "post",
      header: {
        "Content-Type": "application/json" // 默认值

      },
      success: function (res) {
        that.setData({
          order:res.data.data
        })
          //  添加字段到等级数组
          for (var index in that.data.order) {
          var sexParam = "order[" + index + "].status";
          that.setData({
            [sexParam]: 1,
          })

            }
            console.log(that.data.order);
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