// pages/limit_more/limit_more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  daojishi: function () {
    for (var t = this, a = t.data.msmk, e = 0; e < a.length; e++) {
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
      msmk: a
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