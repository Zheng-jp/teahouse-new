// pages/meeting/meeting.js
Page({

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
        icon: 'img/u150.png',
        code: '10',
        hot: 'HOT',
        classification: '特点活动',
        share_content: "20180809马连道茶话会报名参加中马连道进......",
        validity: '长期',

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
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
  },
  tab_click: function (e) {//点击tab切换
    var that = this;
  //  点击添加类
    if (that.data.nav.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },
// 点击搜索
    onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
    },
  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
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
   console.log(111);
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