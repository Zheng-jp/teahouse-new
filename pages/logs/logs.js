const app = getApp()
Page({
  data: {
    // 全局变量的获取
    test: app.data.test,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logoUrl: '',
  },
  bindGetUserInfo: function (e) {
    var _this = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.login({//login流程
        success: function (res) {//登录成功
          if (res.code) {
            var code = res.code;
            wx.getUserInfo({//getUserInfo流程
              success: function (res2) {//获取userinfo成功
                var appid = wx.getAccountInfoSync();
                var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
                var iv = res2.iv;
                //请求自己的服务器
                wx.showToast({
                  title: '正在登录...',
                  icon: 'loading',
                  duration: 10000
                });
                wx.request({
                  url: app.globalData.tiltes+'wechatlogin',
                  data: {
                    code: code,
                    encryptedData: encryptedData,
                    iv: iv,
                    // uniacid:app.globalData.uniacid,
                    gender: res2.userInfo.gender, // 性别  0：未知、1：男、2：女
                    appid: appid.miniProgram.appId
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: function (res) {
                    app.globalData.gmemberid = res.data.data.openid;
                    app.globalData.member_grade_img=res.data.data.member_grade_info.member_grade_img;
                    app.globalData.member_grade_name=res.data.data.member_grade_info.member_grade_name;
                    app.globalData.member_id = res.data.data.member_id;
                    app.globalData.uniacid = res.data.data.uniacid;
                    // 获取logo
                    wx.request({
                      url: app.globalData.tiltes + 'store_logo_index',
                      data: {
                        uniacid: app.globalData.uniacid
                      },
                      method: 'POST',
                      success: function(res){
                        console.log(res)
                        if(res.data.status == 1){
                          _this.setData({
                            logoUrl: app.globalData.img_url + '/' + res.data.data
                          })
                        }
                      }
                    })

                    wx.hideToast();
                    if (res) {
                      wx.switchTab({
                        // url: '../../diy/index/index' //装修后的首页
                        url: '../diy/index/index' //装修后的首页
                      })
                    }else {
                      console.log("kong")
                    }
                  },
                  fail: function () {},
                  complete: function () {}
                })

              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  onLoad: function () {
    var _this = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '正在登录...',
            icon: 'loading',
            duration: 10000
          });
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              wx.login({//login流程
                success: function (res) {//登录成功
                  if (res.code) {
                    var code = res.code;
                    wx.getUserInfo({//getUserInfo流程
                      success: function (res2) {//获取userinfo成功
                        var appid = wx.getAccountInfoSync();
                        var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
                        var iv = res2.iv;
                        //请求自己的服务器
                        wx.request({
                          url: app.globalData.tiltes + 'wechatlogin',
                          data: {
                            code: code,
                            encryptedData: encryptedData,
                            iv: iv,
                            appid: appid.miniProgram.appId
                          },
                          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                          header: {
                            'content-type': 'application/json'
                          }, // 设置请求的 header
                          success: function (res) {
                            app.globalData.gmemberid = res.data.data.openid;
                            app.globalData.member_grade_img = res.data.data.member_grade_info.member_grade_img;
                            app.globalData.member_grade_name=res.data.data.member_grade_info.member_grade_name;
                            app.globalData.member_id = res.data.data.member_id;
                            app.globalData.uniacid = res.data.data.uniacid;
                            // app.globalData.member_grade_img=res.data.data.member_grade_info.member_grade_img;
                            // 获取logo
                            wx.request({
                              url: app.globalData.tiltes + 'store_logo_index',
                              data: {
                                uniacid: app.globalData.uniacid
                              },
                              method: 'POST',
                              success: function(res){
                                console.log(res)
                                if(res.data.status == 1){
                                  _this.setData({
                                    logoUrl: app.globalData.img_url + '/' + res.data.data
                                  })
                                }
                              }
                            })
                            wx.hideToast();
                            if (res) {
                              wx.switchTab({
                                // url: '../../diy/index/index', // 新首页
                                url: '../diy/index/index', // 新首页
                                success: function (res) {},
                                fail: function () {},
                                complete: function () {}
                              })
                            }else {
                              console.log("kong")
                            }
                          },
                          fail: function () {},
                          complete: function () {}
                        })
                      }
                    })
                  }else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                  }
                }
              });
            }
          });
        }
      }
    })
  },
})