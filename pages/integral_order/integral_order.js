// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      height:'',
      tab:'1',
      static:'5',
      order:[],
      url: app.globalData.img_url,
      member_grade_img:null,
  },

  tab_click:function (e) {
    var that=this;
      this.setData({ tab: e.currentTarget.dataset.current });
      if(e.currentTarget.dataset.current==1){
        wx.request({
          url: app.globalData.tiltes + 'integaral_list',
          data: {
            member_id: app.globalData.member_id,
          },
          method: "post",
          // header: {
          //   "Content-Type": "application/json" // 默认值
    
          // },
          success: function (res) {
            that.setData({
              order:res.data.data
            })
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
          url: app.globalData.tiltes + 'integaral_delivered',
          data: {
            member_id: app.globalData.member_id,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            that.setData({
              order:res.data.data
            })
          },
          fail: function () {
    
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
      }
      else if(e.currentTarget.dataset.current==4){
        wx.request({
          url: app.globalData.tiltes + 'integaral_collections',
          data: {
            member_id: app.globalData.member_id,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            that.setData({
              order:res.data.data
            })
          },
          fail: function () {
    
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
 
      } 
  },
 
  // 确认收货
  confirm_receipt:function (e){
    var that=this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    for (var i = 0; i < orderItems.length; ++i) {
      if(orderItems[i].parts_order_number == indexs){
        orderItems.splice(i, 1);
        wx.request({
          url: app.globalData.tiltes + 'take_delivery',
          data: {
            member_id: app.globalData.member_id,
            parts_order_number:indexs
          },
          method: "post",
          
          success: function (res) {
            wx.showToast({
              title:'收货成功',
              icon:'none'
            })
            that.setData({
              order: orderItems
            }); 
           
          },
          fail: function () {
         
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
      }
      
    }
  
  },



   // 提醒
  tip_order:function (e){
    var that=this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    wx.request({
      url: app.globalData.tiltes + 'attention_to',
      data: {
        parts_order_number:indexs,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        wx.showToast({
          title:'提醒成功',
          icon:'none'
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({ height: height });
    var member_grade_img=app.globalData.member_grade_img;
    this.setData({ member_grade_img: member_grade_img });
    var title = options.title;

      wx.request({
        url: app.globalData.tiltes + 'integaral_list',
        data: {
          member_id: app.globalData.member_id,
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
         
          that.setData({
            order:res.data.data,
            tab:'1'
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