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
    ico: [],
    share: [],
    footinfo: [],
    foot_is: 2,
    style: [],

  },

  bindViewTap: function (event) {
    var that = this;
    console.log()
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

  redirectto: function (t) {
    var a = t.currentTarget.dataset.link, e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uniacid = app.globalData.uniacid;
    wx.request({
      url: app.globalData.baseurl + "doPagehomepage",
      cachetime: "30",
      data: {
        uniacid: uniacid
      },
      success: function (t) {
        that.setData({
          foot_is: t.data.data.foot_is
        })
        wx.request({
          url: app.globalData.baseurl + "doPageGetFoot",
          cachetime: "30",
          data: {
            uniacid: uniacid,
            foot: t.data.data.foot_is
          },
          success: function (t) {
            var lujing = [];
            var num = getCurrentPages().length - 1;
            var url = getCurrentPages()[num].route; //当前页面路径
            for (let i in t.data.data.data) {
              lujing.push(t.data.data.data[i]);
            }
            for (let o = 0; o < lujing.length; o++) {
              if (lujing[o].linkurl.indexOf(url) != -1) {
                lujing[o].change = true;
              } else {
                lujing[o].change = false;
              }
            }
            t.data.data.data = lujing;
            that.setData({
              footinfo: t.data.data,
              style: t.data.data.style,
            })
          }
        });
      },
      fail: function (t) {
        console.log(t);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'teacenter_data',
      data: {
        uniacid: app.globalData.uniacid
      },
      method: "post",
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
        uniacid: app.globalData.uniacid
      },
      method: "post",
      success: function (res) {

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
    this.onReady();
    wx.stopPullDownRefresh();
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