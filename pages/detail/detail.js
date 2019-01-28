// pages/detail/detail.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    releaseFocus: false,
    Label:[
     {
        name:'仅限会员',
        color:'#93291E'
     },
      {
        name: '需要预约',
        color: '#669900'
      }
    ],
    information:[],
    // 输入框内容
    repay_content:'',
    // 唤起输入框的事件变量
    opaction:'',
    apply:null,
    repay_informatiom:[]
  },
  /**
* 点击回复
*/
  bindReply: function (e) {
    this.setData({
      opaction:e.currentTarget.dataset.id,
      releaseFocus: true
    })
  },
  // 输入框输入事件
  bindinput: function (e) {
    this.setData({
      repay_content:e.detail.value
    })

  },
  // 回复输入框发送事件
  reply:function(e) {
    var that=this;
    this.setData({
      releaseFocus: false
    })
    wx.request({
      url: app.globalData.tiltes + 'aaaa',
      data: {
        content: that.data.repay_content
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        this.setData({
          repay_content:''
        })
      },
      fail: function () {

      },
      complete: function () {
      }

    });
  },
  // 评论输入框发送事件
  comments:function(e) {
    var that=this;
    this.setData({
      releaseFocus: false
    })
    wx.request({
      url: app.globalData.tiltes + 'teacenter_comment',
      data: {
        user_id: app.globalData.gmemberid,
        comment_details: that.data.repay_content,
        teahost_id:that.data.information.id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        this.setData({
          repay_content:''
        })
      },
      fail: function () {

      },
      complete: function () {
      }

    });
  },
  good: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'teacenter_comment_updata',
      data: {
        user_id: app.globalData.gmemberid,
        teahost_id: that.data.information.id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
       
      },
      fail: function () {

      },
      complete: function () {
      }

    });
  },
  close:function(e) {
    this.setData({
      releaseFocus: false
    })
    this.setData({
      repay_content:''
    })
  },
    pay: function (e) {
      var that = this;
      wx.request({
        url: app.globalData.tiltes + 'activity_order',
        data: {
          open_id: app.globalData.gmemberid,
          activity_id:that.data.information.id,
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
          var order_number=res.data.data.parts_order_number;
          wx.request({
            // url: app.globalData.tiltes + 'wxpay',
            url: app.globalData.tiltes + 'wx_index',
            data: {
              open_id: app.globalData.gmemberid,
              cost_moneny: that.data.information.cost_moneny,
              activity_name: that.data.information.activity_name,
              order_number: order_number
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
                    that.setData({
                      apply: 1,
                    });
                  },
                  'fail': function (res) {
                    wx.request({
                      url: app.globalData.tiltes + 'activity_order_delete',
                      data: {
                        parts_order_number: order_number
                      },
                      method: "post",
                      success: function (res) {
                      
                      },
                      fail: function () {
                
                      },
                      complete: function () {
                        wx.hideLoading()
                      }
                
                    });
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
    var that=this;
    var title = options.title;
    wx.request({
      url: app.globalData.tiltes + 'activity_status',
      data: {
        id: options.title,
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      header: {
        "Content-Type": "application/json" // 默认值

      },
      success: function (res) {
        that.setData({
          apply: res.data.status,
        });

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'teacenter_detailed',
      data: {
        id: options.title,
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        that.setData({
          information: res.data.data[0],
        });
        var article = res.data.data[0].commodity;
        WxParse.wxParse('article', 'html', article, that, 5);
        


      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
   
    wx.request({
      url: app.globalData.tiltes + 'teacenter_comment_show',
      data: {
        teahost_id:options.title,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          repay_informatiom: res.data.data,
        });
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