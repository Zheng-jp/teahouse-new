// pages/goods_detail/goods_detail.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    //  商品价格
    price: '',
    member_grade_img: null,
    // 商品库存
    stock: '',
    // 商品销量
    // var current=e.target.dataset.current;
    // 商品图片
    images: '',
    // 规格值
    select: '规格',
    selecteds: true,
    id: 0,
    // 商品数量
    num: 1,
    image: [],
    url: app.globalData.img_url,
    circular: 'true',
    indicatorDots: 'true',
    interval: '3000',
    // autoplay: 'false',
    selected: true,
    selected1: false,
    selected2: false,
    mask_show: false,
    fixiPhone: false, //苹果底部适配
    good_id: 0,
    buy_num: 0,
    // 是否有地址，0为没有填写收货地址，1为有，2为未授权
    address: 0,
    limitations_show: null, //是否有限时限购
    limitations_shows: [],
  },
  labelItemTap: function (e) {
    // console.log(e)
    var that = this;
    //  点击添加类
    // 商品id
    var current = e.target.dataset.current;
    //  商品价格 
    // 商品库存
    var stock = e.target.dataset.stock;
    // 商品销量
    var price = e.target.dataset.price;
    // 商品图片 
    var images = e.target.dataset.images;
    //规格
    var specifications = e.target.dataset.value;
    //是否可存
    var save = e.target.dataset.save;

    var value = e.target.dataset.value;
    if (that.data.goods.goods_standard.id === e.target.dataset.current) {
      return false;

    } else {
      that.setData({
        id: e.target.dataset.current,
        current: current,
        price: price,
        stock: stock,
        images: images,
        select: value,
        save: save,
        specifications: specifications
      })
    }
  },
  selected: function (e) {
    this.setData({
      selected2: false,
      selected1: false,
      selected: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  showFlag: function (e) {
    this.setData({
      mask_show: true,
    })

  },
  onShareAppMessage: function () {
    // console.log("分享")
    let that = this;
    return {
      title: '', // 转发后 所显示的title
      path: '/pages/logs/logs', // 相对的路径
      success: (res) => { // 成功后要做的事情
        // console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            // console.log(that.setData.isShow)
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  // 点击加入购物车
  add_car: function (event) {
    var that = this;
    // console.log(that);
    if (that.data.goods.goods_standard == 0) {
      var goods_standard_id = '';
      that.setData({
        select: '',
      });
    } else {
      var goods_standard_id = that.data.id;
    }

    if (that.data.select == '规格') {

      this.setData({
        mask_show: true,
      })

      if (that.data.id != 0) {
        that.setData({
          select: that.data.goods.goods_standard[0].name
        })
      } else {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
        })
      }
    } else {
      if (that.data.address == 0) {
        wx.showModal({
          title: '提示',
          content: '请先添加收货地址',
          confirmText: '立即添加',
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
            }
          }
        })
      } else if (that.data.address == 1) {
        wx.request({
          url: app.globalData.tiltes + 'get_goods_id_to_shopping',
          data: {
            open_id: app.globalData.gmemberid,
            goods_unit: that.data.num,
            // 规格id
            goods_standard_id: goods_standard_id,
            // 商品id
            goods_id: that.data.good_id
          },
          method: "post",
          // header: {
          //   "Content-Type": "json" // 默认值

          // },
          success: function (res) {
            var buy_num = that.data.buy_num + 1;
            that.setData({
              buy_num: buy_num
            })
            setTimeout(() => {
              wx.showToast({
                title: "加入购物车成功",
                duration: 10000,
                icon: 'none',
              })
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
          },
          fail: function () {

          },
          complete: function () {
            wx.hideLoading()
          }

        });
      } else {
        wx.showToast({
          title: '你未进行授权，请重启小程序',
          icon: 'none'
        })
      }

    }

  },
  // 点击购物车
  go_car: function (e) {
    wx.reLaunch({
      url: '../buy/buy',
      success: function (res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function (e) {
        console.log(e)
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }

    })
  },
  go_index: function (e) {

      wx.reLaunch({
        url: '../diy/index/index',
        success: function (res) {
          // success
          console.log("nihao////跳转成功")
        },
        fail: function (e) {
          console.log(e)
          // fail
          console.log("nihao////跳转失败")
        },
        complete: function () {
          // complete
          console.log("nihao////跳转行为结束，未知成功失败")
        }
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
  overVideo: function (e) {
    this.setData({
      autoplay: true
    })
  },
  hideFlag: function (e) {
    // console.log(111);
    this.setData({
      mask_show: false,
    })
  },

  showPopup: function (e) {
    var that = this;
    if (that.data.address == 0) {
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
    } else if (that.data.address == 1) {
      if (!app.globalData.judge_phone) {
        wx.showModal({
          title: '提示',
          content: '你未绑定手机号码',
          confirmText: '马上绑定',
          confirmColor: '#3399FF',
          cancelColor: '#bbb',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../change_account/change_account?judge_phone=' + 0,
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
        if (that.data.goods.goods_standard == 0) {
          var goods_standard_id = '';
          that.setData({
            select: '',
          });
        } else {
          var goods_standard_id = that.data.id;
        }
        if (that.data.select == '规格') {

          this.setData({
            mask_show: true,
          })
          if (that.data.id != 0) {
            that.setData({
              select: that.data.goods.goods_standard[0].name
            })
          } else {
            wx.showToast({
              title: '请选择规格',
              icon: 'none',
            })
          }
        } else {
          var chars = [];
          // var char = {};
          var shop_ids = {}
          var good_ids = {}
          var ids = {}
          var nums = {}
          var shop_id = new Array();
          var good_id = new Array();
          var id = new Array();
          var num = new Array();
          //  添加good_id字段到传值数组
          good_id.push(that.data.good_id);
          if (that.data.id == 0 || that.data.id == '') {
            id.push(0);
          } else {
            id.push(that.data.id);
          }

          num.push(that.data.num);
          shop_id.push(0);
          shop_ids['shop_id'] = shop_id;
          good_ids['good_id'] = good_id;
          ids['guige'] = id;
          nums['num'] = num;
          chars.push(shop_ids);
          chars.push(good_ids);
          chars.push(ids);
          chars.push(nums);
          let userStr = JSON.stringify(chars);
          wx.navigateTo({
            url: '../settlement/settlement?title=' + userStr,
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
    } else {
      wx.showToast({
        title: '你未进行授权，请重启小程序',
        icon: 'none'
      })
    }
  },

  // 倒计时
  countdown: function (that) {
    // console.log(that.data.goods.limit_time)
    if (Number(that.data.goods.limit_time) <= 0) {
      that.setData({
        clock: "无限时"
      });
    } else {
      var EndTime = new Date(Number(that.data.goods.limit_time) * 1000).getTime() || [];
      var NowTime = new Date().getTime();
      var total_micro_second = EndTime - NowTime || []; //单位毫秒
      if (total_micro_second < 0) {
        // console.log('时间初始化小于0，活动已结束状态');
        total_micro_second = 1; //单位毫秒 ------ WHY？
      }
      // console.log('剩余时间：' + total_micro_second);
      // 渲染倒计时时钟
      that.setData({
        clock: that.dateformat(total_micro_second) //若已结束，此处输出'0天0小时0分钟0秒'
      });
      if (total_micro_second <= 0) {
        that.setData({
          clock: "已经截止"
        });
        return;
      }
      setTimeout(function () {
        total_micro_second -= 1000;
        that.countdown(that);
      }, 1000)
    }

  },

  // 时间格式化输出，如11天03小时25分钟19秒 每1s都会调用一次
  dateformat: function (micro_second) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);

    day = day < 10 ? '0'+ day : day;
    hr = hr < 10 ? '0'+ hr : hr;
    min = min < 10 ? '0'+ min : min;
    sec = sec < 10 ? '0'+ sec : sec;
    return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    var member_grade_img = app.globalData.member_grade_img;
    that.setData({
      member_grade_img: member_grade_img,
    })

    var title = options.title;
    wx.request({
      url: app.globalData.tiltes + 'commodity_detail',
      data: {
        open_id: app.globalData.gmemberid,
        id: options.title,
        uniacid: app.globalData.uniacid
      },
      method: "post",
      success: function (res) {
        let arr = [],
          kc, hot, cx, qc;
        let goods_sign = res.data.data[0].goods_sign;
        for (let i in goods_sign) {
          if (goods_sign[i].text == '可存' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            kc = 1;
          } else if (goods_sign[i].text == 'HOT' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            hot = 1;
          } else if (goods_sign[i].text == '促销' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            cx = 1;
          } else if (goods_sign[i].text == '清仓' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            qc = 1;
          } else if (goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            arr.push(goods_sign[i]);
          }
        }
        res.data.data[0].goods_sign = arr;

        // let goods_standard = res.data.data[0].goods_standard;
        // for (let i = 0; i < goods_standard.length; i++) {
        //   if (goods_standard[i].save == 1) {
        //     var save = e.target.dataset.save;
        //   }
        // }

        let server = res.data.data[0].server, server_arr = [], id,price,stock,specifications,images,save,volume;
        for (let i in server) {
          server_arr.push(server[i]);
        }
        res.data.data[0].server = server_arr;

        var goods = res.data.data[0];
        if (goods.video_link == '' || goods.video_link == null || goods.video_link == undefined) {
          that.setData({
            autoplay: true,
            isvideo: false
          })
        }
        if (goods.goods_standard[0].id == undefined || goods.goods_standard[0].id == null) {
          id = goods.goods_standard;
        } else {
            if(goods.goods_standard[0].stock == 0) {
            for(let u = 0; u < goods.goods_standard.length; u ++) {
              if(goods.goods_standard[u].stock == 0) {
                id = goods.goods_standard[u + 1].id;
                price = goods.goods_standard[u + 1].price;
                stock = goods.goods_standard[u + 1].stock;
                specifications = goods.goods_standard[u + 1].name;
                volume = goods.goods_standard[u + 1].volume;
                images = goods.goods_standard[u + 1].images;
                save = goods.goods_standard[u + 1].save;
                break;
              }
            }
          } else {
              id = goods.goods_standard[0].id;
              price = goods.goods_standard[0].price;
              stock = goods.goods_standard[0].stock;
              specifications = goods.goods_standard[0].name;
              volume = goods.goods_standard[0].volume;
              images = goods.goods_standard[0].images;
              save = goods.goods_standard[0].save;
          }
          
        }
        that.setData({
          goods: goods,
          good_id: parseInt(options.title),
          images: images,
          price: price,
          stock: stock,
          save: save,
          specifications: specifications,
          image: res.data.data[0].goods_show_images,
          kc: kc,
          hot: hot,
          cx: cx,
          qc: qc,
          id: id,
          evolution:res.data.data[0].evolution,
          volume: volume
          // select: goods.goods_standard[0].name
        });
        var article = res.data.data[0].goods_text;
        if (article) WxParse.wxParse('article', 'html', article, that, 5);
        
        var article_text = res.data.data[0].text;
        if (article_text) WxParse.wxParse('article_text', 'html', article_text, that, 5);
        //  添加字段到等级数组
        // for (var index in that.data.goods.goods_standard) {
        //   var sexParam = "goods_standard[" + index + "].tab";
        //   that.setData({
        //     [sexParam]: index,
        //   })

        // }

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    that.countdown(that);
    wx.request({
      success: function (request) {
        // 倒计时(获取结束时间后再进行倒计时方法调用)
        this.countdown(this);
        //   console.log('--------------------------------')
        //   console.log()
      }
    });
    wx.request({
      url: app.globalData.tiltes + 'member_default_address_return',
      data: {
        member_id: app.globalData.member_id,
        // open_id: app.globalData.gmemberid,
        address_id: ''
      },
      method: "post",
      success: function (res) {
        that.setData({
          address: res.data.status,
        });
      },
      fail: function () {

      },
      complete: function () { }

    });
    wx.request({
      url: app.globalData.tiltes + 'shopping_numbers',
      data: {
        member_id: app.globalData.member_id,

      },
      method: "post",
      success: function (res) {
        that.setData({
          buy_num: res.data.data,
        });
      },
      fail: function () {

      },
      complete: function () { }

    });
    // wx.request({
    //   url: app.globalData.tiltes + 'limitations_show',
    //   data: {
    //     goods_id: title,
    //     uniacid: app.globalData.uniacid
    //   },
    //   method: "post",
    //   success: function (res) {
    //     that.setData({
    //       limitations_show: res.data.status,
    //     });
    //     if (res.data.status == 1) {
    //       that.setData({
    //         limitations_shows: res.data.data,
    //       });
    //     }
    //   },
    //   fail: function () {

    //   },
    //   complete: function () { }
    // });
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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          fixiPhone: res.model.indexOf('iPhone') != -1
        })
      }
    });
    wx.request({
      url: app.globalData.tiltes + 'member_default_address_return',
      data: {
        member_id: app.globalData.member_id,
        // open_id: app.globalData.gmemberid,
        address_id: ''
      },
      method: "post",
      success: function (res) {
        that.setData({
          address: res.data.status,
        });
      },
      fail: function () {

      },
      complete: function () { }

    });
    app.judge_phone();
    app.judge_repay();
  }
})