// pages/meeting/meeting.js
const app = getApp();
Page({
  // 全局变量的获取
  test: app.data.test,
  /**
   * 页面的初始数据
   */
  data: {
   
    // 头部导航
   tab:0,
   
  nav:[
    {
      tab:'0',
      text:'例行茶会'
    },
    {
      tab: '1',
      text: '年度茶会'
    },
       {
      tab: '2',
      text: '定制茶会'
    },
    {
      tab: '3',
      text: '定制茶会'
    },
  ],
  // 分享
    share: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
        code: '10',
        hot: 'HOT',
        classification: '特点活动',
        share_content: "20180809马连道茶话会报名参加中马连道进......",
        validity: '长期',
       

      },{
        name: '2双骄',
        url: '/pages/Course/course',
        icon: app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
        code: '10',
        hot: 'HOT',
        classification: '特点活动',
        share_content: "20180809马连道茶话会报名参加中马连道进......",
        validity: '长期'
      }
    ],
    // 搜索列表
    showView: true,
    seach_list:[
      '未过期',
      '未过期',
      '未过期'
    ]
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
    var counter = 0;
    for (var e in user) {
      counter++;
    }
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