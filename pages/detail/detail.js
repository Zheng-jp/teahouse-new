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
    apply:null,
    repay_informatiom:[],
    title:null,
    collectionimg:false,
  },
  /**
* 点击回复
*/
  bindReply: function (e) {
    var that=this;
    that.setData({
      releaseFocus: true
    })
  },
  // 输入框输入事件
  bindinput: function (e) {
    var that=this;
    that.setData({
      repay_content:e.detail.value
    })
  },
  onShareAppMessage: function () {
    console.log("分享")
    let that =this;
      return {
        title: '简直走别拐弯', // 转发后 所显示的title
        path: '/pages/logs/logs', // 相对的路径
        success: (res)=>{    // 成功后要做的事情
          console.log(res.shareTickets[0])
          // console.log
         
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: (res)=> { 
              that.setData({
                isShow:true
              }) 
              console.log(that.setData.isShow)
             },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) }
          })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
    },
 
  // 评论输入框发送事件
  comments:function(e) {
    var that=this;
    that.setData({
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
        that.setData({
          repay_content:''
        });
        that.onShow();
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
        id:e.currentTarget.dataset.id
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        // var lists=that.data.repay_informatiom;
        // for (var i = 0; i <lists.length;i++){
        //   if(lists[i].id==e.currentTarget.dataset.id){
        //     lists[i].status=1;
        //   }
        
        //  }
        //  that.setData({
        //   repay_informatiom: lists
        // }) 
        that.onShow();
      },
      fail: function () {

      },
      complete: function () {
      }

    });
  },
  close:function(e) {
    var that=this;
    that.setData({
      releaseFocus: false
    })
    that.setData({
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
collection:function(e){
      var that=this;
    var id=that.data.title;
    wx.request({
      url: app.globalData.tiltes + 'collect',
      data: {
        member_id: app.globalData.member_id,
        activity_id: id,
      },
      method: "post",
   
      success: function (res) {
       if(res.data.status=="1"){
         that.setData({
          collectionimg:true,
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
delect_collection:function(e){
    var that=this;
    var id=that.data.title;
    wx.request({
      url: app.globalData.tiltes + 'collect_updata',
      data: {
        member_id: app.globalData.member_id,
        activity_id: id,
      },
      method: "post",
   
      success: function (res) {
         that.setData({
          collectionimg:false,
         })
        
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
/*
 * 时间戳转换为yyyy-MM-dd hh:mm:ss 格式  formatDate()
 * inputTime   时间戳
 */

formatDate:function(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d ;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var title = options.title;
    that.setData({
      title: title,
    });
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
      url: app.globalData.tiltes + 'collect_judge',
      data: {
        activity_id: options.title,
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
       
        if(res.data.status=="0"){
          that.setData({
            collectionimg:false,
           })
        }
        else{
          that.setData({
            collectionimg:true,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
      wx.request({
        url: app.globalData.tiltes + 'teacenter_comment_show',
        data: {
          teahost_id:that.data.title,
        },
        method: "post", 
        // header: {
        //   "Content-Type": "application/json" // 默认值
  
        // },
        success: function (res) {
  
          that.setData({
            repay_informatiom: res.data.data,
          });
          var list=that.data.repay_informatiom;
          for (var i = 0; i <list.length;i++){
           list[i].create_time=that.formatDate(list[i].create_time*1000)
          }
          that.setData({
            repay_informatiom:list,
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