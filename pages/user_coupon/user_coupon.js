// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
      height:'',
      tab:'1',
      status:'2',
      order:[]
  },
  
  retrue:function(e){
    var coupon_id=e.currentTarget.dataset.id;
    wx.setStorageSync('coupon_id', coupon_id);
    wx.navigateBack({
      delta: 1
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({ height: height });
    let user = JSON.parse(options.title);
    let num = JSON.parse(options.num);
    var allmoney=0;
    for(var i=0;i<user.length;i++){
      allmoney+=user[i]*num[i];
    }
    wx.request({
      url: app.globalData.tiltes + 'coupon_appropriated',
      data: {
        open_id: app.globalData.gmemberid,
        goods_id:user,
        money:allmoney,
        member_grade_name:app.globalData.member_grade_name,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
       
        that.setData({
          order:res.data.data
        })
          //  添加字段到等级数组
          for (var index in that.data.order) {
          var sexParam = "order[" + index + "].status";
          that.setData({
            [sexParam]: 1,
          })

            }
            console.log(that.data.order);
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