// pages/goods_detail/goods_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_address:false,
    tab: 0,
    image: [
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
      app.globalData.url + '/upload/20181128/eb9826b6cbef8a7a581d7cd55726612f.jpg',
      app.globalData.url + '/upload/20181128/31d02b855e58a946d5c8dddbb278376b.jpg',
    ],
    specifications:[{
      specifications_name: '选择尺寸',
      specifications_num:[
        '16寸',
        '16寸',
        '16寸',
        '16寸',
        '16寸', 
        '16寸',
        '16寸',
        '16寸',
        '16寸',
        '16寸',
        '16寸',
        '16寸',
        '16寸',
      ]
    },
      {
        specifications_name: '选择尺寸',
        specifications_num: [
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
          '16寸',
        ]
      }
      

    ],
    circular: 'true',
    indicatorDots: 'true',
    interval: '2000',
    autoplay: 'true',
    selected: true,
    selected1: false,
    mask_show:false,
   
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
    showFlag: function (e) {
      this.setData({
        mask_show:true,
      })
      
    
  },
  
  hideFlag: function (e) {
    this.setData({
      mask_show: false,
    })
  },
 
 
  showPopup: function (e) {
    var that=this;
    if (that.data.add_address){
      wx.showModal({
        title: '提示',
        content: '请先添加收货地址',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../add_address/add_address',
              success: function (res) {
                // success
                console.log("nihao////跳转成功")
              },
              fail: function () {
                // fail
                console.log("nihao////跳转失败")
              },
              complete: function () {
                // complete
                console.log("nihao////跳转行为结束，未知成功失败")
              }

            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      wx.navigateTo({
        url: '../settlement/settlement',
        success: function (res) {
          // success
          console.log("nihao////跳转成功")
        },
        fail: function () {
          // fail
          console.log("nihao////跳转失败")
        },
        complete: function () {
          // complete
          console.log("nihao////跳转行为结束，未知成功失败")
        }

      })
    }

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