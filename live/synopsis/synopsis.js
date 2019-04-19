// pages/live/synopsis/ synopsis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '',
    winHeight: "",//窗口高度
    releaseFocus: false,
    // 输入框内容
    repay_content: ''
   
  },
  // toComment: function () {
  //   wx.navigateTo({
  //     url: '../comment/comment'
  //   })
  // },

  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  /**
* 点击回复
*/
  bindReply: function (e) {
    var that = this;
    that.setData({
      releaseFocus: true
    })
  },
  // 输入框输入事件
  bindinputs: function (e) {
    var that = this;
    that.setData({
      repay_content: e.detail.value
    })
  },
  onShareAppMessage: function () {
    console.log("分享")
    let that = this;
    return {
      title: '简直走别拐弯', // 转发后 所显示的title
      path: '/pages/logs/logs', // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },


  // 评论输入框发送事件
  comments: function (e) {
    var that = this;
    that.setData({
      releaseFocus: false
    })
    // wx.request({
    //   url: app.globalData.tiltes + 'teacenter_comment',
    //   data: {
    //     user_id: app.globalData.gmemberid,
    //     comment_details: that.data.repay_content,
    //     teahost_id: that.data.information.id,
    //   },
    //   method: "post",
    //   // header: {
    //   //   "Content-Type": "application/json" // 默认值

    //   // },
    //   success: function (res) {
    //     that.setData({
    //       repay_content: ''
    //     });
    //     that.onShow();
    //   },
    //   fail: function () {

    //   },
    //   complete: function () {
    //   }

    // });
  },
  close: function (e) {
    var that = this;
    that.setData({
      releaseFocus: false
    })
    that.setData({
      repay_content: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100;
        console.log(calc)
        that.setData({
          winHeight: calc
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