//my.js
// import '../../utils/util.js';
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    url: app.globalData.img_url,
    test: app.data.test,
    collects: [],
    information: [],
    height: 500,
    footinfo: [],
    foot_is: 2,
    order_nav: [
      {
        src: app.globalData.url + '/upload/20181115/eb46c126533c9c51a19b9baea16f8523.png',
        text: '待付款',
        id: 1,
      },
      {
        src: app.globalData.url + '/upload/20181115/0a2b1ad83a3cb195b5367943f208e667.png',
        text: '待发货',
        id: 2,
      },
      {
        src: app.globalData.url + '/upload/20181115/9dd5f4a52c2a77653c7ea3ef05ef7226.png',
        text: '待收货',
        id: 3,

      }, {
        src: app.globalData.url + '/upload/20181115/ab9f934b82ab3e9d2ba77b9616501d6a.png',
        text: '待评价',
        id: 4,
      }, {
        src: app.globalData.url + '/upload/20181115/fa73c90513036e142b64e3ef2c948a87.png',
        text: '售后/退款',
        id: 5
      }
    ],
    list: [
      {
        url: app.globalData.url + '/upload/20190104/94debd1c9f7b4c11a58b90b7dd83b402.png',
        text: '会员中心',
        src: '../members/members',
      },
      {
        url: app.globalData.url + '/upload/20181115/872ba6211e755c12088c2e5f92fad232.png',
        text: '消息中心',
        src: '../news/news',
      },
      {
        url: app.globalData.url + '/upload/20181115/f052e232cf2c7629080cacbb20522b50.png',
        text: '地址管理',
        src: '../select_address/select_address',
      },
      {
        url: app.globalData.url + '/upload/20181115/81c85d2133879add7c6f8ed268410616.png',
        text: '我的收藏',
        src: '../collection/collection',

      },
      {
        url: app.globalData.url + '/upload/20181115/d0221a688c6699297a1092cec2e1a322.png',
        text: '我的账户',
        src: '../account/account',
      },
    ],
    lista: [
      {
        url: app.globalData.url + '/upload/20181115/38b70a3b147560518f3c46c5294ec19f.png',
        text: '常见问题',
        src: '../problement/problement',
      },
      {
        url: app.globalData.url + '/upload/20181115/2505a16ba762f14d5d88d1ddecf2b755.png',
        text: '协议合同',
        src: '../contract/contract',

      },
      {
        url: app.globalData.url + '/upload/20181115/575a600f599df7b52b16cd3aa5b48d1c.png',
        text: '关于我们',
        src: '../about/about',
      }
    ],
    version: '' //版本
    /**
     * 会员卡
     */


  },
  go_recharge: function () {

    if (!app.globalData.judge_repay) {
      wx.showModal({
        title: '支付密码',
        content: '您还没有资金账号，为了保证您的资金安全，请先设置资金账号支付密码。设置后才可以进行充值、余额消费等操作',
        confirmText: '马上设置',
        confirmColor: '#3399FF',
        cancelColor: '#bbb',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../password/password?judge_phone=' + 0,
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
    } else {
      wx.navigateTo({
        url: '../withdrawal/withdrawal',
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }

      })
    }
  },
  redirectto: function (t) {
    var a = t.currentTarget.dataset.link, e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },

  go_integral_center: function () {
    wx.navigateTo({
      url: '../integral_center/integral_center',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }

    })
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function () {
    var that = this;
    let url = "https://teahouse.siring.com.cn/api/";
    // var open_id
    var gmemberid = app.globalData.gmemberid;
    var uniacid = app.globalData.uniacid;
    this.requesLocalData();
    that.orderCount();
    wx.request({
      url: app.globalData.baseurl + "doPagehomepage",
      cachetime: "30",
      data: {
        uniacid: uniacid
      },
      success: function (t) {
        var version_is;
        if (t.data.data.test_name.goods_name == '茶进阶版')
          version_is = 3;
        else if (t.data.data.test_name.goods_name == '茶行业版')
          version_is = 2;
        else
          version_is = 1;

        if(version_is == 1) {
          var list= [
            {
              url: app.globalData.url + '/upload/20190104/94debd1c9f7b4c11a58b90b7dd83b402.png',
              text: '会员中心',
              src: '../members/members',
            },
            {
              url: app.globalData.url + '/upload/20181115/872ba6211e755c12088c2e5f92fad232.png',
              text: '消息中心',
              src: '../news/news',
            },
            {
              url: app.globalData.url + '/upload/20181115/f052e232cf2c7629080cacbb20522b50.png',
              text: '地址管理',
              src: '../select_address/select_address',
            },
            {
              url: app.globalData.url + '/upload/20181115/d0221a688c6699297a1092cec2e1a322.png',
              text: '我的账户',
              src: '../account/account',
            },
          ]
        }  
        that.setData({
          foot_is: t.data.data.foot_is,
          version: version_is,
          list: list
        })
        wx.request({
          url: app.globalData.baseurl + "doPageGetFoot",
          cachetime: "30",
          data: {
            uniacid: uniacid,
            foot: t.data.data.foot_is
          },
          success: function (t) {
            // var lujing = [];
            // var num = getCurrentPages().length - 1;
            // var url = getCurrentPages()[num].route; //当前页面路径
            // for (let i in t.data.data.data) {
            //   lujing.push(t.data.data.data[i]);
            // }
            // for (let o = 0; o < lujing.length; o++) {
            //   if (lujing[o].linkurl.indexOf(url) != -1) {
            //     lujing[o].change = true;
            //   } else {
            //     lujing[o].change = false;
            //   }
            // }
            // t.data.data.data = lujing;
            that.setData({
              footinfo: t.data.data,
              // style: t.data.data.style,
            })
          }

        });


      },
      fail: function (t) {
        console.log(t);
      }
    });

    wx.request({
      url: app.globalData.tiltes + 'my_index',
      data: {
        open_id: gmemberid
      },
      method: "POST",

      success: function (res) {
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: res.data.data.member_background_color
        });
        let information = res.data.data;
        if (information.member_grade_img && information.member_grade_img.indexOf('http') == -1) {
          information.member_grade_img = app.globalData.tiltes + information.member_grade_img;
        }
        that.setData({
          information: information,
        });
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });

    // var url = getCurrentPages()[1].route;
  },
  onShow: function () {
    
    let that = this;
    that.orderCount();
    app.judge_repay();
    that.onLoad();
    
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      if (wx.getStorageSync('editionId') == 1) {
        this.getTabBar().setData({
          checked: 3
        })
      } else {
        this.getTabBar().setData({
          checked: 4
        })
      }
    }


  },
  //各订单数量接口
  orderCount: function() {
    let url = "https://teahouse.siring.com.cn/api/";
    let gmemberid = app.globalData.gmemberid;
    let uniacid = app.globalData.uniacid;
    let that = this;
    wx.request({
      url: url + "order_count",
      data: {
        uniacid: uniacid,
        open_id: gmemberid
      },
      success: function (res) {
        let order_nav = [
          {
            src: app.globalData.url + '/upload/20181115/eb46c126533c9c51a19b9baea16f8523.png',
            text: '待付款',
            id: 1,
            num: res.data.data.dai_num
          },
          {
            src: app.globalData.url + '/upload/20181115/0a2b1ad83a3cb195b5367943f208e667.png',
            text: '待发货',
            id: 2,
            num: res.data.data.fa_num
          },
          {
            src: app.globalData.url + '/upload/20181115/9dd5f4a52c2a77653c7ea3ef05ef7226.png',
            text: '待收货',
            id: 3,
            num: res.data.data.shou_num
          }, {
            src: app.globalData.url + '/upload/20181115/ab9f934b82ab3e9d2ba77b9616501d6a.png',
            text: '待评价',
            id: 4,
            num: res.data.data.ping_num
          }, {
            src: app.globalData.url + '/upload/20181115/fa73c90513036e142b64e3ef2c948a87.png',
            text: '售后/退款',
            id: 5,
            num: res.data.data.tui_num
          }
        ]
        that.setData({
          // order_count: res.data.data,
          order_nav: order_nav
        })
      },
      fail: function (e) {
        console.error(e)
      }
    });
  },

  bindViewTap: function (event) {
    // console.log("nihao////" + event.currentTarget.dataset.item)
    var item = event.currentTarget.dataset.item;
    // if (item.type == "10") {
    //   templates.previewImg(event);
    //   return;
    // } else if (item.type == "29") {
    //   // templates.bindCollect(event);
    // }
    wx.navigateTo({
      url: '../detail/detail?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }

    })
  },

  requesLocalData: function () {
    var list = [];
    // var itemOne = {};
    try {
      var value = wx.getStorageSync('collects');
      if (value) {
        // Do something with return value
        var itemArr = JSON.parse(value);
        if (itemArr) {
          // itemOne = item;
          list = itemArr;
        }
      }
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '获取缓存数据出错',
        icon: 'fail'
      })
    }
    this.setData({
      collects: list,
      // item2:item
    })
  },

  //视频播放功能
  bindvideo_play: function (event) {
    this.bindViewTap(event);
  },
  //详情功能
  bindvideo_detail: function (event) {
    this.bindViewTap(event);
  },
  //点击图片大图功能
  bindpic_play: function (e) {
    var item = e.currentTarget.dataset.item;
    console.log(item.image0);
    var picsrc = item.image0;
    var imgArr = [];
    imgArr.push(picsrc);
    wx.previewImage({
      current: imgArr[0],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  mycollect: function (event) {
    var item = event.currentTarget.dataset.item;
    var src = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: src + '?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
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
  },
  go_order: function (event) {
    var item = event.currentTarget.dataset.id;
    console.log(item)
    if (item == 5) {
      wx.navigateTo({
        url: '../after_sales/after_sales?version=' + this.data.version,
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
    else {
      wx.navigateTo({
        url: '../order/order?title=' + item + '&version=' + this.data.version,
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

  },
  go_change: function (event) {
    console.log(event);
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../change/change?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showToast({
      title: '你好',
      icon: '',
      image: '',
      duration: 0,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindnume: function (event) {
    console.log("nihao////" + event)
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../members/members?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
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
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onReady();
    wx.stopPullDownRefresh();
  }
})

