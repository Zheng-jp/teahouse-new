// pages/circle/circle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    ico:[
      {
        nav_ico:'img/u4859.png',
        ico_text:'茶会',
        ico_url:"/pages/meeting/meeting?title=meeting"
      },{
        nav_ico: 'img/u4871.png',
        ico_text: '养生',
        ico_url: "/pages/mine/mine?title=mine"
      }, {
        nav_ico: 'img/u4869.png',
        ico_text: '国学',
        ico_url: "/pages/mine/mine?title=mine"
      }, {
        nav_ico: 'img/u4873.png',
        ico_text: '特权',
        ico_url: "/pages/mine/mine?title=mine"
      }, {
        nav_ico: 'img/u4867.png',
        ico_text: '茶山行',
        ico_url: "/pages/mine/mine?title=mine"
      },

    ],
    share: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        hot: 'HOT',
        classification: '特点活动',
        share_content: "20180809马连道茶话会报名参加中马连道进......",
        validity: '长期',

      }
    ],

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