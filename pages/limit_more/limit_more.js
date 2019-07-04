const app =  getApp();
// pages/limit_more/limit_more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
  },
  daojishi: function () {
    for (var t = this, a = t.data.goods, e = 0; e < a.length; e++) {
      var o = new Date().getTime();
      if (0 == a[e].sale_time && 0 == a[e].sale_end_time);
      else if (1e3 * a[e].sale_time > o) a[e].t_flag = 1;
      else if (1e3 * a[e].sale_end_time < o) a[e].t_flag = 2;
      else if (a[e].sale_end_time <= 0) a[e].endtime = 0;
      else {
        var n, i, s, d, r = 1e3 * parseInt(a[e].sale_end_time) - o;
        0 <= r && (n = Math.floor(r / 1e3 / 60 / 60 / 24), i = Math.floor(r / 1e3 / 60 / 60 % 24) < 10 ? "0" + Math.floor(r / 1e3 / 60 / 60 % 24) : Math.floor(r / 1e3 / 60 / 60 % 24),
          s = Math.floor(r / 1e3 / 60 % 60) < 10 ? "0" + Math.floor(r / 1e3 / 60 % 60) : Math.floor(r / 1e3 / 60 % 60),
          d = Math.floor(r / 1e3 % 60) < 10 ? "0" + Math.floor(r / 1e3 % 60) : Math.floor(r / 1e3 % 60)),
          a[e].endtime = 0 < n ? n + "天" + i + ":" + s + ":" + d : i + ":" + s + ":" + d;
      }
    }
    t.setData({
      goods: a
    });
    setTimeout(function () {
      t.daojishi();
    }, 1e3);
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
    let that = this, siteroot = app.globalData.url;
    wx.request({  
      url: app.globalData.url + '/api/limit_goods_more',
      data: {
        uniacid:6,
        pageid:6,
        open_id:"o_lMv5YLU2TqFvdXwUZBFYyonVB0",
        member_grade_name: '白金会员'
      },
      method: "post",
      success: function(res) {
        if(res.data.status == "1") {
          that.setData({
            goods:res.data.data,
            siteroot: siteroot
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
    that.daojishi();
  },
  newRedirectto: function (n, e) {
    switch (e) {
      case "page":
        wx.navigateTo({
          url: n
        });
        break;
      case "pages":
        wx.switchTab({
          url: n
        });
        break;
      case "webs":
        wx.navigateTo({
          url: n
        });
        break;
      case "tel":
        n = n.slice(4), wx.showModal({
          title: "提示",
          content: "是否拨打电话:" + n,
          success: function (e) {
            1 == e.confirm && wx.makePhoneCall({
              phoneNumber: n
            });
          }
        });
        break;

      case "map":
        var a = n.split("##");
        n = a[0].split(","), wx.openLocation({
          latitude: parseFloat(n[0]),
          longitude: parseFloat(n[1]),
          scale: 22,
          name: a[1],
          address: a[2]
        });
        break;

      case "mini":
        var i = n.slice(6);
        wx.navigateToMiniProgram({
          appId: i,
          path: "",
          success: function (e) {
            console.log("打开成功"), console.log(i);
          }
        });
    }
  },
  redirectto: function (t) {
    var a = t.currentTarget.dataset.link,
        e = t.currentTarget.dataset.linktype;
    this.newRedirectto(a, e);
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