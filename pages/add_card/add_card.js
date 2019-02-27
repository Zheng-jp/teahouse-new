// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    customItem: "全部",
    name:'',
    title:'',
    btntext: '获取验证码',
    change:false,
    num:null,
    card:[],
    cardid:null,
    select_card:null,//查询上个页面
  },
 // 验证银行卡号
 checkCard:function(cardNo) {
  if (isNaN(cardNo))
    return false;
  if (cardNo.length < 12) {
    return false;
  }
  var nums = cardNo.split("");
  var sum = 0;
  var index = 1;
  for (var i = 0; i < nums.length; i++) {
    if ((i + 1) % 2 == 0) {
      var tmp = Number(nums[nums.length - index]) * 2;
      if (tmp >= 10) {
        var t = tmp + "".split("");
        tmp = Number(t[0]) + Number(t[1]);
      }
      sum += tmp;
    } else {
      sum += Number(nums[nums.length - index]);
    }
    index++;
  }
  if (sum % 10 != 0) {
    return false;
  }
  return true;
},
  formSubmit: function (e) {
    var that=this;
    
    // 添加
    if(!that.data.change){
      if(e.detail.value.name==''){
        wx.showToast({
          title:"开户名不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_name==''){
        wx.showToast({
          title:"开户银行不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_num==''){
        wx.showToast({
          title:"银行卡号不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.harvester_phone_num==''){
        wx.showToast({
          title:"验证码不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.name!=that.data.name){
        wx.showToast({
          title:"您认证的姓名和开卡姓名不一致",
          icon:'none',
        });
      }
      else if(that.checkCard(e.detail.value.card_num)==false){
        wx.showToast({
          title:"银行卡格式错误",
          icon:'none',
        });
      }
      else{
        wx.request({
          url: app.globalData.tiltes + 'bank_bingding_add',
          data: {
            account_name:e.detail.value.name,
            bank_name:e.detail.value.card_name,
            bank_card:e.detail.value.card_num,
            code:e.detail.value.harvester_phone_num,
            status:-1,
            member_id:app.globalData.member_id,
          },
          method: "post",
          success: function (res) {
            console.log(res);
            var id=res.data.data;
            // 上两个页面为充值页面
            if(that.data.select_card=="0"){
              if(res.data.status==1){
                setTimeout(function () {
                  wx.setStorageSync('id', id);
                  wx.navigateBack({
                    delta: 2
                  });
                }, 2000)
               
              }
            }
            else{
              if(res.data.status==1){
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000)
               
              }
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
      }
    }
    else{
      if(e.detail.value.name==''){
        wx.showToast({
          title:"开户名不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_name==''){
        wx.showToast({
          title:"开户银行不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_num==''){
        wx.showToast({
          title:"银行卡号不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.harvester_phone_num==''){
        wx.showToast({
          title:"验证码不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.name!=that.data.name){
        wx.showToast({
          title:"您认证的姓名和开卡姓名不一致",
          icon:'none',
        });
      }
      else{
        wx.request({
          url: app.globalData.tiltes + 'bank_bingding_update',
          data: {
            id:that.data.cardid,
            account_name:e.detail.value.name,
            bank_name:e.detail.value.card_name,
            bank_card:e.detail.value.card_num,
            code:e.detail.value.harvester_phone_num,
            status:-1,
            member_id:app.globalData.member_id,
          },
          method: "post",
          success: function (res) {
            // 上两个页面为充值页面
            if(that.data.select_card=="0"){
              if(res.data.status==1){
                setTimeout(function () {
                  wx.setStorageSync('id', that.data.cardid);
                  wx.navigateBack({
                    delta: 2
                  });
                }, 2000)
               
              }
            }
            else{
              if(res.data.status==1){
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000)
               
              }
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
      }

    }
     
    
   
    
  },

  send_cold: function (e) {
    var that=this;
       var _this = this 
    
       wx.request({
         url: app.globalData.tiltes + 'sendMobileCodeBank',
         data: {
           member_id:app.globalData.member_id,
         },
         method: "post",
         // header: {
         //   "Content-Type": "json" // 默认值
   
         // },
         success: function (res) {
           var coden = 60    // 定义60秒的倒计时
           var codeV = setInterval(function () {    
               _this.setData({    // _this这里的作用域不同了
                 btntext: '重新获取' + (--coden) + 's'
               })
               if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
                 clearInterval(codeV)
                 _this.setData({
                   btntext: '获取验证码'
                 })
               }
             }, 1000)  //  1000是1秒
        
         },
         fail: function () {
   
         },
         complete: function () {
         }
   
       });
      
    
   
   },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var title = options.title;
    var id=options.id;
    var pid=options.pid;
    that.setData({
      select_card:pid
    })
    that.setData({
      cardid:id
    });
    if(title==0){
      that.setData({
        change:false,
      })
    }
    else{
      that.setData({
        change:true,
      })
    }
    wx.request({
      url: app.globalData.tiltes + 'id_card_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
       if(res.data.status!="1"){
        wx.showModal({
          title:'提示',
          content: '你未进行实名认证',
          confirmText:'马上实名',
          confirmColor:'#3399FF',
          cancelColor:'#bbb',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../identity_authentication/identity_authentication',
                success: function (res) {
                
                },
                fail: function () {
                 
                },
                complete: function () {
                
                }
          
          
              })
            } else if (res.cancel) {
                 wx.navigateBack();
            }
            }
        })
       }
       else{
       that.setData({
         name:res.data.data.member_real_name,
       })
       }
     
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    console.log(id);
    if(id){
      wx.request({
        url: app.globalData.tiltes + 'bank_bingding_update_return',
        data: {
          member_id: app.globalData.member_id,
          id:id,
        },
        method: "post",
        success: function (res) {
          console.log(res);
          if(res.data.status!="0"){
                that.setData({
                  card:res.data.data 
                });
          }
          
        },
        fail: function () {
  
        },
        complete: function () {
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