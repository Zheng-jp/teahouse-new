App({


  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winMask_if: true,

  },
  // 判断绑定手机号
  judge_phone: function(e){
    var that=this;
      wx.request({
      url: that.globalData.tiltes + 'user_phone_return',
      data: {
        member_id: that.globalData.member_id,
      },
      method: "post",
      
      success: function (res) {
       if(res.data.status==0){
        that.globalData.judge_phone=false;
       }
       else{
         that.globalData.judge_phone=true;
       }
     
      },
      fail: function () {

      },
      complete: function () {
       
      }

    });
  },
  formatDate:function(inputTime) {
    var date = new Date(inputTime*1000);
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
    return y + '-' + m + '-' + d +' '+h+':'+minute+':'+second;
  },
  // 判断绑定支付密码
  judge_repay: function(e){
    var that=this;
      wx.request({
      url: that.globalData.tiltes + 'pay_password_return',
      data: {
        member_id: that.globalData.member_id,
      },
      method: "post",
      
      success: function (res) {
       if(res.data.status==0){
        that.globalData.judge_repay=false;
       }
       else{
         that.globalData.judge_repay=true;
       }
     
      },
      fail: function () {

      },
      complete: function () {
       
      }

    });
  },
  globalData: {
    
    userInfo: null,
    gmemberid:null,
    member_grade_img:null,
    member_grade_name:null,
    member_id:null,
    judge_phone:null,
    judge_repay:null,
    url:'https://teahouse.siring.com.cn',
    tiltes: 'https://teahouse.siring.com.cn/',
    img_url: 'https://teahouse.siring.com.cn/uploads/',
    // url:'http://localhost/teahouse.siring.com.cn',
    // tiltes:'http://localhost/teahouse/public/',
    // img_url:' http://localhost/teahouse/public/uploads/'


  }
})
