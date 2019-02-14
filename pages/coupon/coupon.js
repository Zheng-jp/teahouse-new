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
  go_coupon_good:function(e){
    var that = this;
         // 商品列表请求
        wx.request({
          url: app.globalData.tiltes + 'coupon_goods',
          data: {
            'open_id': app.globalData.gmemberid,
            'coupon_id': e.currentTarget.dataset.id
          },
          method: "post",
          // header: {
          //   "Content-Type": "json" // 默认值

          // },
          success: function (res) {
          if(res.data.status==0){
              wx.navigateTo({
                url: '../good/good',
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
          else{
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
          }
      
      console.log(that);

    },
    fail: function () {

    },
    complete: function () {
      wx.hideLoading()
    }

  });
  
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
     // 判读从哪个页面进来
     var  pages = getCurrentPages();
     var  prevpage = pages[pages.length - 2];
    if(prevpage.route=='pages/settlement/settlement'){
     that.setData({
       is_select_address: 'select',
       is:false
     });

    //  
    }
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