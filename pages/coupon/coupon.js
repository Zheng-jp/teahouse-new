// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      height:'',
      tab:'1',
      status:'2',
      order:[]
  },
  go_coupon_good:function(e){
    var that = this;
    wx.navigateTo({
      url: '../coupon_good/coupon_good?title='+ e.currentTarget.dataset.id,
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
  },
  tab_click:function (e) {
    var that=this;
      this.setData({ tab: e.currentTarget.dataset.current });
      if(e.currentTarget.dataset.current==1){
        wx.request({
          url: app.globalData.tiltes + 'coupon_untapped',
          data: {
            open_id: app.globalData.gmemberid,
            member_grade_name:app.globalData.member_grade_name,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
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
      }
      else if(e.currentTarget.dataset.current==2){
        wx.request({
          url: app.globalData.tiltes + 'coupon_user',
          data: {
            open_id: app.globalData.gmemberid,
            member_grade_name:app.globalData.member_grade_name,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            that.setData({
              order:res.data.data
            })
              //  添加字段到等级数组
              for (var index in that.data.order) {
              var sexParam = "order[" + index + "].status";
              that.setData({
                [sexParam]: 2,
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
      }
      else if(e.currentTarget.dataset.current==3){
        wx.request({
          url: app.globalData.tiltes + 'coupon_time',
          data: {
            open_id: app.globalData.gmemberid,
            member_grade_name:app.globalData.member_grade_name,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            that.setData({
              order:res.data.data
            })
              //  添加字段到等级数组
              for (var index in that.data.order) {
              var sexParam = "order[" + index + "].status";
              that.setData({
                [sexParam]: 3,
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
      }
  
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({ height: height });
    wx.request({
      url: app.globalData.tiltes + 'coupon_untapped',
      data: {
        open_id: app.globalData.gmemberid,
        member_grade_name:app.globalData.member_grade_name,
      },
      method: "post",
      header: {
        "Content-Type": "application/json" // 默认值

      },
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