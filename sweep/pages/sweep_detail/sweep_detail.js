// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {}
  },

  onLoad: function (options) {
    console.log(options)
    var code, that=this;
    if(options) {
      code = options.code;
    }
    wx.request({
      url: app.globalData.tiltes + 'get_anti_fake_info',
      data: {
        code: code,
      },
      method: "post",
      success: function(res) {
        console.log(res)
        if(res.data.status == "1") {
          that.setData({
            goods: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function() {

      },
      complete: function() {
        // wx.hideLoading()
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