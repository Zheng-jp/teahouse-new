//app.js
App({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winMask_if: true,

  },

  globalData: {
    userInfo: null,
    gmemberid:null,
    url:'http://teahouse.siring.com.cn',
    // tiltes: 'http://teahouse.siring.com.cn/',
    // img_url: 'http://teahouse.siring.com.cn/uploads/'
    tiltes:'http://localhost/teahouse/public/',
    img_url:' http://localhost/teahouse/public/uploads/'
  }
})