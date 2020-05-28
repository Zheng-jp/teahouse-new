const app = getApp();
const WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    // 全局变量的获取
    test: app.data.test,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logoUrl: '',
    scene: undefined,
    goods: '',
    title: '',
    status: '',
    order_number: '',
    order_status: '',
    code: '',
    shareID: 0,
    code_id: '',
    share_id: '',
    loginCode: '',
    isShou: !0,
  },
  // onmessage(e) {
  //   my.alert({
  //     content: '拿到数据' + JSON.stringify(e), // alert 框的标题
  //   });
  // },
  bindGetUserInfo: function (e) {
    var _this = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.login({//login流程
        success: function (res) {//登录成功
          // wx.setStorage({
          //   key: 'authorization',
          //   data: true,
          // })
          app.globalData.isRefresh = true
          if (res.code) {
            var code = res.code;
            // _this.setData({
            //   loginCode : code
            // })
            wx.getUserInfo({//getUserInfo流程
              success: function (res2) {//获取userinfo成功
                var appid = wx.getAccountInfoSync();
                var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
                var newMember = _this.data.newMember;
                var iv = res2.iv;
                //请求自己的服务器
                wx.showToast({
                  title: '正在登录...',
                  icon: 'loading',
                  duration: 10000
                });
                wx.request({
                  url: app.globalData.tiltes + 'wechatlogin',
                  data: {
                    code: code,
                    encryptedData: encryptedData,
                    iv: iv,
                    // uniacid:app.globalData.uniacid,
                    gender: res2.userInfo.gender, // 性别  0：未知、1：男、2：女
                    appid: appid.miniProgram.appId,
                    shareID: _this.data.shareID
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: function (res) {
                    console.log('登录1', res.data)
                    app.globalData.islogin = true;
                    app.globalData.gmemberid = res.data.data.openid;
                    app.globalData.member_grade_img = res.data.data.member_grade_info.member_grade_img;
                    app.globalData.member_grade_name = res.data.data.member_grade_info.member_grade_name;
                    app.globalData.member_id = res.data.data.member_id;
                    app.globalData.uniacid = res.data.data.uniacid;
                    app.globalData.session_key = res.data.data.session_key;
                    wx.setStorage({
                      key: "globalData",
                      data: JSON.stringify(app.globalData)
                    })
                    if (newMember != undefined && res.data.status == 1) {
                      _this.pointReward(newMember, res.data.data.member_id, res.data.data.uniacid);
                    }
                    wx.hideToast();
                    res ? _this.shouLater(res) : console.log("kong");

                  }
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
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({//login流程
        success: function (res) {
          if (res.code) {
            wx.request({
              url: app.globalData.tiltes + 'get_user_phone',
              data: {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                session_key: app.globalData.session_key,
                code: res.code,
                appid: wx.getAccountInfoSync().miniProgram.appId,
                member_id: app.globalData.member_id
              },
              method: "post",
              success: function (res) {
                console.log(res);
                that.shouLater(res);
              }
            })

          }
        }
      })
    } else {
      that.shouLater();
    }
  },
  judge_phone: function (a) {
    var t = this;
    wx.request({
      url: app.globalData.tiltes + "user_phone_return",
      data: {
        member_id: app.globalData.member_id
      },
      method: "post",
      async: !1,
      success: function (e) {
        0 == e.data.status ? t.setData({
          isShou: !1
        }) : t.shouLater(e);
      },
      fail: function () { },
      complete: function () { }
    });
  },

  // 授权后操作
  shouLater: function (res) {
    var _this = this;
    app.judge_phone();
    if (_this.data.title) {
      wx.navigateTo({
        url: "../goods_detail/goods_detail?title=" + _this.data.title
      })
    } else if (_this.data.order_number) {
      wx.navigateTo({
        url: '../order_detail/order_detail?title=' + _this.data.order_number + "&status=" + _this.data.order_status,
      })
    } else if (_this.data.code) {
      wx.navigateTo({
        url: "../../sweep/pages/sweep_detail/sweep_detail?code=" + _this.data.code + "&isHome=1"
      })
    } else if (_this.data.code_id) {
      if (res.data.data.uniacid == 296) {
        wx.navigateTo({
          url: "../ldm/index"
        })
      } else {
        wx.navigateTo({
          url: "../mingpcha/index"
        })
      }
    } else if (_this.data.share_id) {
      wx.switchTab({
        url: "../storage/view/view"
      })
      // wx.navigateTo({
      //   url: "../mingpcha/index"
      // })
    } else if (_this.data.shareGoods) {
      wx.navigateTo({
        url: "../goods_detail/goods_detail?title=" + _this.data.shareGoods
      })
    } else if (_this.data.isCha) {
      wx.switchTab({
        url: "../storage/view/view"
      })
    } else {
      wx.switchTab({
        url: '../diy/index/index', // 新首页
      })
    }
  },
  //新用户扫码增上级积分
  pointReward: function (scene, member_id, uniacid) {
    wx.request({
      url: app.globalData.tiltes + 'qr_back_points',
      data: {
        inviter_id: scene,
        member_id: member_id,
        uniacid: uniacid
      },
      method: "POST",

      success: function (res) {
        console.log(res)

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
  },

  onLoad: function (options) {
    var _this = this, newMember, title, status, order_number, code, scene, shareID, code_id, share_id, shareGoods, isCha;
    // wx.navigateTo({
    //   url:'../ldm/index'
    // })

    //新会员积分&防伪溯源
    if (options.scene) {
      scene = decodeURIComponent(options.scene).split("=");
      if (scene[0] == "code") {
        code = scene[1];
      } else if (scene[0] == "member_id") {
        newMember = scene[1];
      }
    }
    if (options.goods) {
      title = decodeURIComponent(options.title);
    }

    if (options.shareID) { //分享过来的上级ID
      shareID = decodeURIComponent(options.shareID);
    }
    if (options.code_id) {
      code_id = decodeURIComponent(options.code_id);
      app.globalData.code_id = code_id;
    }
    // console.log(app.globalData.code_id)

    if (options.status) {
      status = decodeURIComponent(options.status);
      order_number = decodeURIComponent(options.order_number);
    }
    if (options.share_id) {
      share_id = decodeURIComponent(options.share_id);
      app.globalData.share_id = share_id;
    }
    if (options.shareGoods) {
      shareGoods = decodeURIComponent(options.shareGoods);
    }
    if (options.isCha) {
      isCha = decodeURIComponent(options.isCha);
    }
    _this.setData({
      newMember: newMember,
      title: title,
      order_status: status,
      order_number: order_number,
      code: code,
      shareID: shareID,
      code_id: code_id,
      share_id: share_id,
      shareGoods: shareGoods,
      isCha: isCha
    })
    wx.getStorage({
      key: 'authorization',
      success: function (res) {
        _this.setData({
          authorization: res.data
        })
      },
    })

    // 获取logo
    wx.request({
      url: app.globalData.tiltes + 'store_logo_index',
      data: {
        uniacid: app.globalData.uniacid
      },
      method: 'POST',
      success: function (res) {
        console.log('logo', res)
        if (res.data.status == 1) {
          _this.setData({
            logoUrl: res.data.data
          })
        }
      }
    })

    if (options.scene) {
      var scene = decodeURIComponent(options.scene);
      // - 是我们定义的参数链接方式
      // var userId=options.scene.split("-")[0];
      // var identify=options.scene.split('')[1];
      //其他逻辑处理。。。。。
      _this.setData({
        scene: scene
      })
    }
    if (console.log(app.globalData.member_id), null != app.globalData.member_id) return _this.judge_phone(),
      !1;
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
                            gender: res2.userInfo.gender, // 性别  0：未知、1：男、2：女
                            appid: appid.miniProgram.appId,
                            shareID: _this.data.shareID
                          },
                          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                          header: {
                            'content-type': 'application/json'
                          }, // 设置请求的 header
                          success: function (res) {
                            console.log('登录211', res.data)
                            app.globalData.gmemberid = res.data.data.openid;
                            app.globalData.member_grade_img = res.data.data.member_grade_info.member_grade_img;
                            app.globalData.member_grade_name = res.data.data.member_grade_info.member_grade_name;
                            app.globalData.member_id = res.data.data.member_id;
                            app.globalData.uniacid = res.data.data.uniacid;
                            app.globalData.session_key = res.data.data.session_key;
                            // app.globalData.member_grade_img=res.data.data.member_grade_info.member_grade_img;
                            //是否推荐扫码进来的

                            wx.hideToast();
                            res ? _this.shouLater(res) : console.log("kong");
                          },
                          fail: function () { },
                          complete: function () { }
                        })
                      }
                    })
                  } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                  }
                }
              });
            }
          });
        }
        // else{
        //   wx.removeStorage({
        //     key: 'authorization',
        //     success: function(res) {
        //       console.log('remove', res)
        //       _this.setData({
        //         authorization: false
        //       })
        //     },
        //   })
        // }
      }
    })
  },
})