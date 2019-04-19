Page({
  data: {
    currentTab: '',
    winHeight: 0, //窗口高度
    imgUrls: [
      '../img/u2404.png',
      '../img/u2404.png',
      '../img/u2404.png', 
      '../img/u2404.png'
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
    var that = this;
    //  高度自适应
    that.setData({
      winHeight: 380 * this.data.imgUrls.length
    })
    console.log(this.data.winHeight)
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