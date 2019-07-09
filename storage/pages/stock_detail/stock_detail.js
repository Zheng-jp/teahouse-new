 // storage/pages/stock_detail/stock_detail.js
 const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    dataObj: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'takeOrderData',
      data:{
        uniacid: app.globalData.uniacid,
        member_id: app.globalData.member_id,
        id: options.id
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if(res.data.status == 1){
          var dataArr = [];
          res.data.data.end_time = app.formatDate(res.data.data.end_time);
          dataArr.push(res.data.data);
          _this.setData({
            dataObj: dataArr
          })
        }
      },
      fail: function (res) {
        console.log(res);
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