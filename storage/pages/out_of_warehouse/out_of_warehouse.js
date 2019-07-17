// storage/pages/out_of_warehouse/out_of_warehouse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 获取默认地址
  getDefaultAddress: function(){
    wx.request({
      url: app.globalData.tiltes + 'member_default_address_return',
      method: 'POST',
      data: {
        open_id: app.globalData.gmemberid,
      },
      success: function(res){
        console.log('获取默认地址：', res);
        if(res.data.status == 1){

        }
      },
      fail: function(res){
        console.log('获取默认地址失败：', res);
      }
    })
  },

  // 跳转地址列表
  toAddressList: function(){
    wx.navigateTo({
      url: '../../../pages/select_address/select_address',
      success: function (res) { },
      fail: function () {}
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDefaultAddress();
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