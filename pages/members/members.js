// pages/members/members.js
var app = getApp();
Page({
  test: app.data.test,

  /**
   * 页面的初始数据
   */
  data: {
    level:[
      {
        name:'贵宾',
        photo: 'img/u6501.png',
        time:'12',
        monyle:'5',
        checked:'true'
      },
      {
        name: '黄金',
        photo: 'img/u6501.png',
        time: '12',
        monyle: '5',
        checked:''
      }, {
        name: '白金',
        photo: 'img/u6501.png',
        time: '12',
        monyle: '5',
        checked: ''
      }
    ],
    cards:[
      {
        name:'贵宾会员'
      },
      {
        name: '黄金会员'
      },
      {
        name: '白金会员'
      }

    ]

  },
  /**
 * radio监听事件
 */
  radioChange: function (e) {
    var that = this;
    console.log(that);
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
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'aaa',
      data: {
      },
      method: "GET",
      header: {
        "Content-Type": "json" // 默认值

      },
      success: function (res) {
        console.log(res);
        // that.setData({
        //   ico: res,
        // });

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