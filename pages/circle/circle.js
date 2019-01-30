// pages/circle/circle.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: app.data.test,
    url: app.globalData.img_url,
    ico:[],
    share: [],

  },
  bindViewTap: function (event) {
    var that = this;
    console.log()
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?title=' + event.currentTarget.id,
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
    var that = this;
    wx.request({
      url: app.globalData.tiltes +'teacenter_data',
      data: {
      },
      method: "post",
      header: {
        "Content-Type": "json" // 默认值

      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          ico: res.data.data,
        });

       },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'teacenter_alls',
      data: {
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          share: res.data.data,
        });
        //  添加字段到等级数组
        for (var index in that.data.share) {
          var sexParam = "share[" + index + "].url";
          that.setData({
            [sexParam]: app.globalData.img_url,
          })

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