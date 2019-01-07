// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['省', '市', '区'],
    customItem: "全部"

  },

  formSubmit: function (e) {
    var that=this;
   
    wx.request({
      url: app.globalData.tiltes + 'member_address_adds',
      data: {
        harvester: e.detail.value.harvester,
        harvester_phone_num : e.detail.value.harvester_phone_num,
        address_name: that.data.region,
        harvester_real_address : e.detail.value.harvester_real_address,
        status : 1,
        open_id: app.globalData.gmemberid,
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
          wx.navigateTo({
            url: '../select_address/select_address',
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
        }, 2000)
         
        }
       
        console.log(res);
     
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