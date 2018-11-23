// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    releaseFocus: false,
    Label:[
     {
        name:'仅限会员',
        color:'#93291E'
     },
      {
        name: '需要预约',
        color: '#669900'
      }
    ],
    information:[]
  },
  /**
* 点击回复
*/
  bindReply: function (e) {
    this.setData({
      releaseFocus: true
    })
  },
  close:function(e) {
    this.setData({
      releaseFocus: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var title = options.title;
    console.log(title);
    wx.request({
      url: app.globalData.tiltes + 'teacenter_detailed',
      data: {
        id: options.title
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          information: res.data.data[0],
        });
        


      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
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