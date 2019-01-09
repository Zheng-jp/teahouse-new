// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      height:'',
      tab:'1',
      static:'5',
      order:[]
  },
  tab_click:function (e) {
      this.setData({ tab: e.currentTarget.dataset.current });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({ height: height });
    wx.request({
      url: app.globalData.tiltes + 'ios_api_order_all',
      data: {
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      header: {
        "Content-Type": "application/json" // 默认值

      },
      success: function (res) {
        that.setData({
          order:res.data.data,
        })
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