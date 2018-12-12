// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heght:'',
    // 商品信息
    routers: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling:[
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u300.png',
        
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u300.png',
        jiage: '￥120.0/片'
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u300.png',
        jiage: '￥120.0/片'
      },
     
      {
        name: 'Python',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u300.png',
        jiage: '￥120.0/片'
      },
    
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      heght: wx.getSystemInfoSync().windowHeight,
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