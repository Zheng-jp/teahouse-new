// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    
    name:null

  },
 
  formSubmit: function (e) {
    var that=this;
    var id=that.data.title
    console.log(id);
    wx.request({
      url: app.globalData.tiltes + 'user_name_update',
      data: {
        user_name: e.detail.value.harvester,
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        if(res.data.status==1){
          wx.showToast({
            title:res.data.info,
            icon:'none',
          });
          
        setTimeout(function () {
          wx.navigateBack();
        }, 2000)
         
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'user_name_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
      
      that.setData({
        name:res.data.data,
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