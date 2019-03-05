// pages/contract/contract.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contractArr: [],
  },
  go_contract_detail: function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../contract_detail/contract_detail?id=' + id,
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'agreement_contract',
      method: 'POST',
      success: function(res){
       
        if(res.data.status == 1){
          _this.setData({
            contractArr: res.data.data
          })
        }
      },
      fail: function(){

      }
    })
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