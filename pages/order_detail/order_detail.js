// pages/order_detail/order_detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    order:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
   wx.request({
    url: app.globalData.tiltes + 'order_details',
    data: {
      parts_order_number:options.title,
      status:options.status
    },
    method: "post",
    // header: {
    //   "Content-Type": "application/json" // 默认值

    // },
    success: function (res) {
      var data=res.data.data;
      data.create_time=app.formatDate(data.create_time);
      data.pay_time=app.formatDate(data.pay_time);
      that.setData({
        order:data,
      })
      
    
    },
    fail: function () {
   
    },
    complete: function () {
      wx.hideLoading()
    }

  });
  },
 

  go_logistics: function (event) {

    var that = this;
    var item = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../logistics/logistics?title=' + event.currentTarget.dataset.id,
      success: function (res) {
      
      },
      fail: function () {
       
      },
      complete: function () {
      
      }
  
  
    })
  },
  // 追加评价
  go_evaluation: function (event) {

    var that = this;
    var item = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../evaluation/evaluation?title=' + event.currentTarget.dataset.id,
      success: function (res) {
      
      },
      fail: function () {
       
      },
      complete: function () {
      
      }
  
  
    })
  },
// 申请售后
  go_apply_after_sales: function (event) {

    var that = this;
    var item = event.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.tiltes + 'after_sale_is_set',
      data: {
        order_id:item,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值
  
      // },
      success: function (res) {
       if(res.data.status=="1"){
         wx.navigateTo({
          url: '../apply_after_sales/apply_after_sales?title=' + event.currentTarget.dataset.id,
          success: function (res) {
          
          },
          fail: function () {
          
          },
          complete: function (res) {
           
          }
      
        })
       }
      },
      fail: function () {
      },
      complete: function (res) {
        wx.showToast({
          title:res.data.info,
          icon:'none',
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