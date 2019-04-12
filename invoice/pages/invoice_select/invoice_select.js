// pages/meeting/meeting.js

const app = getApp();
Page({

  // 全局变量的获取
  test: app.data.test,
  /**
   * 页面的初始数据
   */
  data: {
    // 头部导航
    tab: 0,
    url: app.globalData.url,
    nav: [
      "企业",
      "个人"
    ],
    shares: [],

 
  },
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
    var id = that.data.nav[that.data.tab].id;
    wx.request({
      url: app.globalData.tiltes + 'teacenter_activity',
      data: {
        id: id
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        //
        that.setData({
          shares: res.data.data,
        });
        //  添加字段到等级数组
        for (var index in that.data.shares) {
          var sexParam = "shares[" + index + "].url";
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
  tab_click: function (e) {//点击tab切换
    var that = this;
    console.log(that.data.nav);
    //  点击添加类
    if (that.data.nav.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
      var id = that.data.nav[that.data.tab].id;
      wx.request({
        url: app.globalData.tiltes + 'teacenter_activity',
        data: {
          id: id
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
        success: function (res) {
          //
          that.setData({
            shares: res.data.data,
          });
          //  添加字段到等级数组
          for (var index in that.data.shares) {
            var sexParam = "shares[" + index + "].url";
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
    }

  },
 
  bindViewTap: function (event) {
    var that = this;
    // console.log()
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/storage/pages/detail/detail?title=' + event.currentTarget.id,
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
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
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