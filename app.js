var url = "https://www.zhihuichacang.com/api/";
// var uniacid = "6";
App({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winMask_if: true
  },
  // 判断绑定手机号
  judge_phone: function(e) {
    var that = this;
    wx.request({
      url: that.globalData.tiltes + 'user_phone_return',
      data: {
        member_id: that.globalData.member_id,
      },
      method: "post",

      success: function(res) {
        if (res.data.status == 0) {
          that.globalData.judge_phone = false;
        } else {
          that.globalData.judge_phone = true;
        }

      },
      fail: function() {

      },
      complete: function() {

      }

    });
  },
  formatDate: function(inputTime) {
    var date = new Date(inputTime * 1000);
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
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  // 查询数组索引
  indexValue: function(arr, arrValue){
    for(let i = 0; i < arr.length; i++){
      if(arr[i] == arrValue){
        return i;
      }
    }
  },
  // 判断绑定支付密码
  judge_repay: function(e) {
    var that = this;
    wx.request({
      url: that.globalData.tiltes + 'pay_password_return',
      data: {
        member_id: that.globalData.member_id,
      },
      method: "post",

      success: function(res) {
        if (res.data.status == 0) {
          that.globalData.judge_repay = false;
        } else {
          that.globalData.judge_repay = true;
        }

      },
      fail: function() {

      },
      complete: function() {

      }

    });
  },
  onLaunch: function() {
    var o = this;
    wx.login({
      success: function(e) {
        wx.setStorageSync("appcode", e.code);
      }
    }), wx.getSystemInfo({
      success: function(e) {
        wx.setStorageSync("systemInfo", e);
        var n = e.windowWidth,
          t = e.windowHeight;
        o.globalData.ww = n, o.globalData.hh = t;
      }
    });
  },
  // siteInfo: require("siteinfo.js"),
  onShow: function() {
    // console.log(getCurrentPages());
  },
  onHide: function() {
    // console.log(getCurrentPages());
  },
  onError: function(e) {
    // console.log(e);
  },
  bezier: function(e, n) {
    for (var t, o, a, i = [], c = 0; c <= n; c++) {
      for (a = e.slice(0), o = []; t = a.shift();)
        if (a.length) o.push(s([t, a[0]], c / n));
        else {
          if (!(1 < o.length)) break;
          a = o, o = [];
        }
      i.push(o[0]);
    }

    function s(e, n) {
      var t, o, a, i, c, s, u, r;
      return t = e[0], i = (o = e[1]).x - t.x, c = o.y - t.y, a = Math.pow(Math.pow(i, 2) + Math.pow(c, 2), .5),
        s = c / i, u = Math.atan(s), r = a * n, {
          x: t.x + r * Math.cos(u),
          y: t.y + r * Math.sin(u)
        };
    }
    return {
      bezier_points: i
    };
  },
  util: function(o) {
    function e(e, n, t) {
      return o.apply(this, arguments);
    }
    return e.toString = function() {
      return o.toString();
    }, e;
  }(function(n, t, o) {
    var a = this;
    wx.getStorage({
      key: "openid",
      success: function(e) {
        a.fxsbindagain(t, e.data), wx.request({
          url: url + "dopageglobaluserinfo",
          data: {
            openid: e.data,
            uniacid: o
          },
          success: function(e) {
            "function" == typeof n && n();
          }
        });
      },
      fail: function() {
        wx.login({
          success: function(e) {
            wx.request({
              url:url+ "doPageAppbase",
              data: {
                code: e.code,
                uniacid: o,
              },
              cachetime: 0,
              success: function(e) {

                2 == e.data.data.res ? wx.showModal({
                  title: "提醒",
                  content: "获取用户信息失败，请检查appid和appsecret是否正确！",
                  showCancel: !1
                }) : (wx.setStorageSync("openid", e.data.data.openid), e.data.data.openid, "function" == typeof n && n());
              }
            });
          },
          fail: function() {
            wx.showModal({
              title: "获取信息失败",
              content: "请允许授权以便为您提供给服务",
              success: function(e) {
                e.confirm && util.getUserInfo();
              }
            });
          }
        });
      }
    });
  }),
  redirectto: function(n, e) {

    switch (e) {
      case "page":
        var t = n.indexOf("page/index"),
          o = n.indexOf("index?pageid"); -
            1 == t || -1 != o ? wx.reLaunch  ({
          url: n
        }) : wx.reLaunch  ({
          url: n
        });
        break;
      case "pages":
        wx.navigateTo  ({
          url: n
        });
        break;
        case "webs":
        wx.navigateTo  ({
          url: n
        });
        break;
      case "tel":
        n = n.slice(4), wx.showModal({
          title: "提示",
          content: "是否拨打电话:" + n,
          success: function(e) {
            1 == e.confirm && wx.makePhoneCall({
              phoneNumber: n
            });
          }
        });
        break;
      case "map":
        var a = n.split("##");
        n = a[0].split(","), wx.openLocation({
          latitude: parseFloat(n[0]),
          longitude: parseFloat(n[1]),
          scale: 22,
          name: a[1],
          address: a[2]
        });
        break;
      case "mini":
        var i = n.slice(6);
        wx.navigateToMiniProgram({
          appId: i,
          path: "",
          success: function(e) {
            console.log("打开成功"), console.log(i);
          }
        });
    }
  },
  selfinfoget: function(a, i) {
    wx.getStorage({
      key: "golobeuser",
      success: function(e) {
        console.log(e);
      },
      fail: function() {
        wx.getSetting({
          success: function(e) {
            e.authSetting["scope.userInfo"], wx.showModal({
              title: "提示",
              content: "必须授权登录后才能操作,是否重新授权登录？",
              showCancel: !1,
              success: function(e) {
                wx.openSetting({
                  success: function(e) {
                    e.authSetting["scope.userInfo"] ? (console.log(222), wx.getUserInfo({
                      success: function(e) {
                        var n = e.userInfo,
                          t = wx.getStorageSync("openid"),
                          o = url + "doPageUseupdate";
                        wx.request({
                          url: o,
                          data: {
                            uniacid: uniacid,
                            openid: t,
                            nickname: n.nickName,
                            avatarUrl: n.avatarUrl,
                            gender: n.gender,
                            province: n.province,
                            city: n.city,
                            country: n.country
                          },
                          header: {
                            "content-type": "application/json"
                          },
                          success: function(e) {
                            wx.setStorageSync("golobeuid", e.data.data.id), wx.setStorageSync("golobeuser", e.data.data),
                              "function" == typeof a && a();
                          }
                        });
                      }
                    })) : (console.log(333), util.selfinfoget());
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  fxsbindagain: function(e, n) {
    var t = this;
    0 != e && e != n ? (t.fxsbind(e, n), wx.setStorageSync("fxsid", e)) : wx.getStorage({
      key: "fxsid",
      success: function(e) {
        0 != e.data && t.fxsbind(e.data, n);
      },
      fail: function() {
        wx.setStorageSync("fxsid", 0);
      }
    });
  },
  fxsbind: function(e, n) {
    wx.request({
      url: url + "doPagebindfxs",
      data: {
        openid: n,
        fxsid: e,
        uniacid: this.globalData.uniacid
      },
      success: function(e) {}
    });
  },
  getopenid: function() {
    var o = this;
    wx.getStorage({
      key: "golobeuser",
      fail: function() {
        wx.getStorage({
          key: "golobaluserinfo",
          fail: function() {
            wx.login({
              success: function(e) {
                var n = e.code;
                wx.request({
                  url: url + "doPageAppbase",
                  data: {
                    uniacid: uniacid,
                    code: n
                  },
                  header: {
                    "content-type": "application/json"
                  },
                  success: function(e) {
                    wx.setStorageSync("openid", e.data.data.openid);
                    e.data.data.openid;
                    wx.showLoading({
                      title: "正在登录",
                      mask: !0
                    }), wx.getUserInfo({
                      success: function(e) {
                        wx.hideLoading();
                        var n = e.userInfo;
                        wx.setStorageSync("golobaluserinfo", n), o.updateuserinfo(n);
                      },
                      fail: function(e) {
                        var n = getCurrentPages(),
                          t = n[n.length - 1];
                        wx.hideLoading(), wx.getSetting({
                          success: function(e) {
                            e.authSetting["scope.userInfo"];
                            wx.showModal({
                              title: "提示",
                              content: "必须授权登录后才能操作,是否重新授权登录？",
                              showCancel: !1,
                              success: function(e) {
                                wx.openSetting({
                                  success: function(e) {
                                    e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                                      success: function(e) {
                                        var n = e.userInfo;
                                        wx.setStorageSync("golobaluserinfo", n), o.updateuserinfo(n);
                                      }
                                    }) : wx.redirectTo({
                                      url: "/" + t.route
                                    });
                                  },
                                  fail: function(e) {}
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  updateuserinfo: function(e) {
    var n = wx.getStorageSync("openid"),
      t = getCurrentPages(),
      o = t[t.length - 1];
    console.log(o.route), wx.request({
      url: url + "doPageUseupdate",
      data: {
        openid: n,
        nickname: e.nickName,
        avatarUrl: e.avatarUrl,
        gender: e.gender,
        province: e.province,
        city: e.city,
        country: e.country,
        uniacid: uniacid
      },
      header: {
        "content-type": "application/json"
      },
      success: function(e) {
        wx.setStorageSync("golobeuid", e.data.id), wx.setStorageSync("golobeuser", e.data),
          wx.reLaunch({
            url: "/" + o.route
          });
      }
    });
  },
  tabBar: {
    color: "#123",
    selectedColor: "#1ba9ba",
    borderStyle: "#1ba9ba",
    backgroundColor: "#fff",
    list: [{
      pagePath: "/we7/pages/index/index",
      iconPath: "/we7/resource/icon/home.png",
      selectedIconPath: "/we7/resource/icon/homeselect.png",
      text: "首页"
    }, {
      pagePath: "/we7/pages/user/index/index",
      iconPath: "/we7/resource/icon/user.png",
      selectedIconPath: "/we7/resource/icon/userselect.png",
      text: "我的"
    }]
  },
  globalData: {
    userInfo: null,
    baseurl: url,
    uniacid: null,
    userInfo: null,
    gmemberid: null,
    member_grade_img: null,
    member_grade_name: null,
    member_id: null,
    judge_phone: null,
    judge_repay: null,
    url: 'https://www.zhihuichacang.com',
    tiltes: 'https://www.zhihuichacang.com/',
    img_url: 'https://www.zhihuichacang.com/uploads/',
    // url:'http://localhost/teahouse.siring.com.cn',
    // tiltes:'http://localhost/teahouse/public/',
    // img_url:' http://localhost/teahouse/public/uploads/'
    navBarBgColor: '',
    navBarTxtColor: '',
  }
})