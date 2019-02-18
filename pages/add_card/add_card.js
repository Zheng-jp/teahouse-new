// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    customItem: "全部",
    address:[],
    title:'',

  },
 
  formSubmit: function (e) {
    var that=this;
    var id=that.data.title
    console.log(e);
    wx.request({
      url: app.globalData.tiltes + 'bank_bingding_add',
      data: {
        bank_name: e.detail.value.bank_name,
        account_name : e.detail.value.account_name,
        bank_card: that.data.bank_card,
        harvester_phone_num : e.detail.value.harvester_phone_num,
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
  send_cold: function (e) {
    wx.request({
      url: app.globalData.tiltes + 'user_phone_return',
      data: {
        member_id: app.globalData.member_id,
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
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var title = options.title;
   

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