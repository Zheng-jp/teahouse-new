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
    wx.setStorageSync('sava_id', id);
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
      url: app.globalData.tiltes + 'tacitly_list',
      data: {
       
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res)
        for(var j=0;j<res.data.data.length;j++){
          var warehousess=[];
          for(var i=0;i<res.data.data[j].unit.length;i++){
            var warehouses={};
              warehouses["unit"]=res.data.data[j].unit[i];
              warehouses["cost"]=res.data.data[j].cost[i];
            warehousess.push(warehouses);
          }
          res.data.data[j]["units"]=warehousess;
        }
        
    
     
        that.setData({
          warehouse: res.data.data,
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