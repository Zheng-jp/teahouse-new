// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    region: ['省', '市', '区'],
    customItem: "全部",
    info:[]
  },

  formSubmit: function (e) {
    var that=this;
    console.log(e.detail.value)
  if(that.data.status==0){
    wx.request({
      url: app.globalData.tiltes + 'id_card_add',
      data: {
        member_id :app.globalData.member_id,
        id_card :e.detail.value.harvester_phone_num,
        name :e.detail.value.harvester,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
     console.log(res);
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
  }
  else{
    wx.request({
      url: app.globalData.tiltes + 'id_card_edit',
      data: {
        member_id :app.globalData.member_id,
        id_card :e.detail.value.harvester_phone_num,
        name :e.detail.value.harvester,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
     console.log(res);
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
  }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'id_card_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        that.setData({
          status: res.data.status,
          info: res.data.data,
        });
        if(that.data.status==1){
          that.setData({
            info: res.data.data,
          });
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