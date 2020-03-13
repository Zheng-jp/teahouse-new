// pages/live/synopsis/ synopsis.js
const app = getApp();

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
      title: that.data.videos.classify_name, // 转发后 所显示的title
      path: 'pages/logs/logs?shareID=' + app.globalData.member_id, // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            9
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
    wx.request({
      url: app.globalData.url + "/api/video_comment",
      data: {
        store_id: app.globalData.uniacid,
        vid: that.data.videos.id,
        user_id: app.globalData.member_id,
        content: that.data.repay_content
      },
      success: function (res) {
        console.log(res)
        that.setData({
              repay_content: ''
        });
        that.commentAll(that.data.vid);
      },
      fail: function (e) {
        console.error(e)
      }
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
  //关闭评论弹窗
  close: function (e) {
    var that = this;
    that.setData({
      releaseFocus: false
    })
    that.setData({
      repay_content: ''
    })
  },
  //点赞
  tolike: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url + "/api/video_give",
      data: {
        user_id: app.globalData.member_id,
        store_id: app.globalData.uniacid,
        vid: e.currentTarget.dataset.id
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
          that.onShow();
        }
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.title) {
      that.setData({
        currentTab: 1
      })
    }
    that.setData({
      vid: options.vid
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
    that.showAll(options.vid);
    that.commentAll(options.vid);

  },
  //视频详情
  showAll: function (vid) {
    var that = this;
    wx.request({
      url: app.globalData.url + "/api/details",
      data: {
        store_id: app.globalData.uniacid,
        vid: vid,
        uid: app.globalData.member_id
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            videos: res.data.data
          })
        }
      },
      fail: function (e) {
        console.error(e)
      }

    });
  },
  //评论展示
  commentAll: function (vid) {
    var that = this;
    wx.request({
      url: app.globalData.url + "/api/video_index",
      data: {
        store_id: app.globalData.uniacid,
        vid: vid
      },
      success: function (res) {
        // console.log(res)
        if (res.data.code == 1) {
          that.setData({
            comment: res.data.data
          })
        }
      },
      fail: function (e) {
        console.error(e)
      }
    })
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
    this.showAll(this.data.vid)
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


})