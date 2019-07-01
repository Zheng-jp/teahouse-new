const app = getApp();
Page({
  data: {
    currentTab: '',
    winHeight: 0, //窗口高度
    imgUrls: [
      'http://ptcb077mt.bkt.clouddn.com/u2404.png',
      'http://ptcb077mt.bkt.clouddn.com/u2404.png'
    ]
  },

  toLive: function () {
    wx.navigateTo({
      url: '../synopsis/synopsis'
    })
  },
  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    })
  },


  redirectto: function (t) {
    var a = t.currentTarget.dataset.link,
      e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
            console.log(t.data.data)
            that.setData({
              // lujing: lujing,
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;


    //  高度自适应
    that.setData({
      winHeight: 380 * this.data.imgUrls.length + 50
    })
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
    var that = this;
    // console.log(that)
    that.onReady();

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