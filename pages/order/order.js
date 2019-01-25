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
  // 删除订单
  delete_order:function (e){
    var that=this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    for (var i = 0; i < orderItems.length; ++i) {
      if(orderItems[i].parts_order_number == indexs){
        orderItems.splice(i, 1);
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_del',
          data: {
            open_id: app.globalData.gmemberid,
            parts_order_number:indexs
          },
          method: "post",
          // header: {
          //   "Content-Type": "application/json" // 默认值
    
          // },
          success: function (res) {
            wx.showToast({
              title:'删除成功',
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
  tab_click:function (e) {
    var that=this;
      this.setData({ tab: e.currentTarget.dataset.current });
      if(e.currentTarget.dataset.current==1){
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_all',
          data: {
            open_id: app.globalData.gmemberid,
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
      else if(e.currentTarget.dataset.current==2){
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_wait_pay',
          data: {
            open_id: app.globalData.gmemberid,
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
      else if(e.currentTarget.dataset.current==3){
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_wait_send',
          data: {
            open_id: app.globalData.gmemberid,
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
          url: app.globalData.tiltes + 'ios_api_order_wait_deliver',
          data: {
            open_id: app.globalData.gmemberid,
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
      else if(e.currentTarget.dataset.current==5){
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_wait_evaluate',
          data: {
            open_id: app.globalData.gmemberid,
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
  // 取消订单
  cancel_order:function (e){
    var that=this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗？',
      success: function(res) {
      if (res.confirm) {
        for (var i = 0; i < orderItems.length; i++) {
          if(orderItems[i].parts_order_number == indexs){
            orderItems.splice(i, 1);
            wx.request({
              url: app.globalData.tiltes + 'ios_api_order_no_pay_cancel',
              data: {
                open_id: app.globalData.gmemberid,
                parts_order_number:indexs,
                cancel_order_description :'取消'
              },
              method: "post",
              // header: {
              //   "Content-Type": "application/json" // 默认值
        
              // },
              success: function (res) {
                wx.showToast({
                  title:'操作成功',
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
      } else if (res.cancel) {
      }
      }
      })
    
  
  },
  // 付款
  repay:function(e){
    var indexs = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['账户支付', '微信支付',],
      success: function (res) {
        // 账户支付
        if(res.tapIndex==0){
        
        }
        else if(res.tapIndex==1){
          wx.request({
            url: app.globalData.tiltes + 'wx_order_index',
            data: {
              member_id: app.globalData.member_id,
              order_number: indexs
            },
            dataTypr: 'json',
            method: "post",
            // header: {
            //   "Content-Type": "application/json" // 默认值
            // },
            success: function (res) {
              var result=res;
  
              if (result) {
                wx.requestPayment({
                  timeStamp: String(result.data.timeStamp),
                  nonceStr: result.data.nonceStr,
                  package: result.data.package,
                  signType: result.data.signType,
                  paySign:  result.data.paySign,
                  'success': function (successret) {
                    console.log('支付成功');
                  },
                  'fail': function (res) {
                    console.log(res);
                   }
                })
              }
            },
                  fail: function () {
    
                  },
                  complete: function () {
                    wx.hideLoading()
                  }
                });   
        }
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
   // 提醒
   tip_order:function (e){
    var that=this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    wx.request({
      url: app.globalData.tiltes + 'option_add',
      data: {
        order_num:indexs,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        wx.showToast({
          title:'操作成功',
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
    if(title==0){
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_all',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
          console.log(res);
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
    }
    else if(title==1){
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_pay',
        data: {
          open_id: app.globalData.gmemberid,
          tab:'2'
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
          console.log(res);
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
    else if(title==2){
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_send',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
          console.log(res);
          that.setData({
            order:res.data.data,
            tab:'3'
          })
        },
        fail: function () {
  
        },
        complete: function () {
          wx.hideLoading()
        }
  
      });
    }
    else if(title==3){
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_deliver',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
          console.log(res);
          that.setData({
            order:res.data.data,
            tab:'4'
          })
        },
        fail: function () {
  
        },
        complete: function () {
          wx.hideLoading()
        }
  
      });
    }
    else{
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_evaluate',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
          console.log(res);
          that.setData({
            order:res.data.data,
            tab:'5'
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