// pages/order_detail/order_detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    order:[{
      all_numbers :1,
      all_order_real_pay:888,
      status:3,
      info:[
        {
          goods_describe:"正山小种茶叶",
          goods_image:"20190117/151452ab36eda1fe8fc0646013b8e766.jpg",
          parts_goods_name:"正山小种茶叶红茶茶叶特级浓香型红散装600g五虎红茶礼盒装罐装茶",
          parts_order_number:"201901251551414657101049",
          goods_money:888,
          order_quantity:2

  
        },
        {
          goods_describe:"正山小种茶叶",
          goods_image:"20190117/151452ab36eda1fe8fc0646013b8e766.jpg",
          parts_goods_name:"正山小种茶叶红茶茶叶特级浓香型红散装600g五虎红茶礼盒装罐装茶",
          parts_order_number:"201901251551414657101049",
          goods_money:888,
          order_quantity:2

  
        },
        {
          goods_describe:"正山小种茶叶",
          goods_image:"20190117/151452ab36eda1fe8fc0646013b8e766.jpg",
          parts_goods_name:"正山小种茶叶红茶茶叶特级浓香型红散装600g五虎红茶礼盒装罐装茶",
          parts_order_number:"201901251551414657101049",
          goods_money:888,
          order_quantity:2

  
        },
      ]
    }]
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
     console.log(res);
     that.setData({
      order:res.data.data.data,
    })
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