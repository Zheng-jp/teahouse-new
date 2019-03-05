// pages/goods_detail/goods_detail.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
     //  商品价格
    price:'',
    member_grade_img:null,
    // 商品库存
    stock:'',
    // 商品销量
    // var current=e.target.dataset.current;
    // 商品图片
    images:'',
    // 规格值
    selecteds: true,
    id:0,
    // 商品数量
    num:1,
    image: [ ],
    url:app.globalData.img_url,
    circular: 'true',
    indicatorDots: 'true',
    interval: '3000',
    autoplay: 'true',
    selected: true,
    selected1: false,
    mask_show:false,
    good_id:0,
    // 是否有地址，0为没有填写收货地址，1为有，2为未授权
    address:0,
    
   
  },
  
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
 
 
   /* 点击减号 */
   bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
    /* 输入框事件 */
    bindManual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回  
      this.setData({
        num: num
      });
    },
  

 
 
  showPopup: function (e) {
    var that=this;
    if (that.data.address==0){
      wx.showModal({
        title: '提示',
        content: '请先添加收货地址',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../add_address/add_address',
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
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if(that.data.address==1){
      if(!app.globalData.judge_phone){
        wx.showModal({
          title:'提示',
          content: '你未绑定手机号码',
          confirmText:'马上绑定',
          confirmColor:'#3399FF',
          cancelColor:'#bbb',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../change_account/change_account?judge_phone='+0,
                success: function (res) {
                   
                },
                fail: function () {
                 
                },
                complete: function () {
                
                }
          
          
              })
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
            }
        })  
       }
       else if(!app.globalData.judge_repay){
        wx.showModal({
          title:'请设置支付密码',
          content: '您还没有资金账号，为了保证您的资金安全，请先设置资金账号支付密码。设置后才可以进行充值、余额消费等操作',
          confirmText:'马上设置',
          confirmColor:'#3399FF',
          cancelColor:'#bbb',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../password/password?judge_phone='+0,
                success: function (res) {
                   
                },
                fail: function () {
                 
                },
                complete: function () {
                
                }
          
          
              })
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
            }
        })  
       }
       else{
        wx.navigateTo({
          url: '../integral_settlement/integral_settlement?title=' + e.currentTarget.dataset.id,
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
            
    }
    else{
      wx.showToast({
        title:'你未进行授权，请重启小程序',
        icon:'none'
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    var member_grade_img=app.globalData.member_grade_img;
    that.setData({
      member_grade_img: member_grade_img,
    })
    var title = options.title;
    wx.request({
      url: app.globalData.tiltes + 'bonus_detailed',
      data: {
        open_id: app.globalData.gmemberid,
        id: options.title
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
       
        that.setData({
          goods:res.data.data[0]
        });
        var article = res.data.data[0].goods_text;
        WxParse.wxParse('article', 'html', article, that, 5);
        //  添加字段到等级数组
        // for (var index in that.data.goods.goods_standard) {
        //   var sexParam = "goods_standard[" + index + "].tab";
        //   that.setData({
        //     [sexParam]: index,
        //   })

        // }
       console.log(that);
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'member_default_address_return',
      data: {
        open_id: app.globalData.gmemberid,
        address_id:''
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res.data.status);
          that.setData({
            address:res.data.status,
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
    app.judge_phone();
    app.judge_repay();
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