App({


  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winMask_if: true,

  },
  // 判断绑定手机号
  judge_phone: function(e){
    var that=this;
    console.log(that.globalData);
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
       console.log(that);
     
      },
      fail: function () {

      },
      complete: function () {
       
      }

    });
  },
  // 判断绑定支付密码
  judge_repay: function(e){
    console.log("支付密码")
  },
  globalData: {
    
    userInfo: null,
    gmemberid:null,
    member_grade_img:null,
    member_grade_name:null,
    member_id:null,
    judge_phone:null,
    url:'https://teahouse.siring.com.cn',
    tiltes: 'https://teahouse.siring.com.cn/',
    img_url: 'https://teahouse.siring.com.cn/uploads/',
    // url:'http://localhost/teahouse.siring.com.cn',
    // tiltes:'http://localhost/teahouse/public/',
    // img_url:' http://localhost/teahouse/public/uploads/'


  }
})
