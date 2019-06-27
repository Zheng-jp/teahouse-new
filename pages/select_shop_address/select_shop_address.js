// pages/select_address/select_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
      warehouse:[],

  },
  select:function(event){
    var id=event.currentTarget.dataset.id;
    wx.setStorageSync('shop_id', id);
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'approve_list',
      data: {
        uniacid: app.globalData.uniacid
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) { 
        var shop_address= res.data.data;
        for(var i=0;i<shop_address.length;i++){
          var address_names='';
            for (var index in shop_address[i].extract_address) {
               address_names=shop_address[i].extract_address.split(",").join("");
            }
            
            var address=address_names+shop_address[i].extract_real_address;
            shop_address[i]["shop_address"]=address;
          
        }
        
        that.setData({
          warehouse:shop_address,
        });

    
      },
      fail: function () {

      },
      complete: function () {
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