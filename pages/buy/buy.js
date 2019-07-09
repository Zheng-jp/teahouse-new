// pages/buy/buy.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'iscart': false,
    heght: '',
    totalPrice: 0,
    totalCount: 0,
    url: app.globalData.img_url,
    goodList: [],
    // 商品信息
    routers: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'http://ptcb077mt.bkt.clouddn.com/img1.png',
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'http://ptcb077mt.bkt.clouddn.com/img1.png',
        jiage: '￥120.0/片'
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'http://ptcb077mt.bkt.clouddn.com/img1.png',
        jiage: '￥120.0/片'
      },

      {
        name: 'Python',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'http://ptcb077mt.bkt.clouddn.com/img1.png',
        jiage: '￥120.0/片'
      },

    ],

  },
  // 去商城逛逛
  moveToMarket: function () {
    wx.reLaunch({
      url: '../../diy/index/index',
    })
  },
  /* 点击减号 */
  bindMinus: function (e) {
    var that = this;
    var tab = e.currentTarget.dataset.id;
    for (var index in that.data.goodList) {
      var nums = that.data.goodList[tab].goods_unit;
      var num = 'goodList[' + index + '].goods_unit'
      if (index == tab) {
        if (nums > 1) {
          nums--;
          that.setData({
            [num]: nums
          });
          wx.request({
            url: app.globalData.tiltes + 'shopping_information_del',
            data: {
              open_id: app.globalData.gmemberid,
              goods_unit: 1,
              shopping_id: e.currentTarget.dataset.shopid,

            },
            method: "post",
            // header: {
            //   "Content-Type": "json" // 默认值

            // },
            success: function (res) {
              that.calculateTotal();

            },
            fail: function () {

            },
            complete: function () {
              wx.hideLoading()
            }

          });

        }

      }

    }



  },
  /* 点击加号 */
  bindPlus: function (e) {
    var that = this;
    var tab = e.currentTarget.dataset.id;
    for (var index in that.data.goodList) {
      var nums = that.data.goodList[tab].goods_unit;
      var num = 'goodList[' + index + '].goods_unit'
      if (index == tab) {

        nums++;
        that.setData({
          [num]: nums
        });
        wx.request({
          url: app.globalData.tiltes + 'shopping_information_add',
          data: {
            open_id: app.globalData.gmemberid,
            goods_unit: 1,
            shopping_id: e.currentTarget.dataset.shopid,

          },
          method: "post",
          // header: {
          //   "Content-Type": "json" // 默认值

          // },
          success: function (res) {
            that.calculateTotal();

          },
          fail: function () {

          },
          complete: function () {
            wx.hideLoading()
          }

        });


      }

    }


  },

  checkboxChange: function (e) {
    var that = this;
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }

    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll
    });
    that.calculateTotal();
  },
  // 全选
  selectalltap: function (e) {
    var that = this;
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }

    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }

    this.setData({
      'checkAll': checkAll,
      'goodList': goodList
    });
    that.calculateTotal();
  },
  /**
 * 删除购物车当前商品
 */
  deleteList(e) {
    var that = this;
    var checkboxItems = this.data.goodList;
    for (var i = 0; i < checkboxItems.length; ++i) {
      if (checkboxItems[i].checked == true) {
        const index = checkboxItems[i].tab;

        wx.request({
          url: app.globalData.tiltes + 'shopping_del',
          data: {
            // open_id: app.globalData.gmemberid,
            shopping_id: checkboxItems[i].id,
          },
          method: "post",
          // header: {
          //   "Content-Type": "json" // 默认值

          // },
          success: function (res) {
            checkboxItems.splice(index, 1);
            that.setData({
              goodList: checkboxItems
            });
            if (!checkboxItems.length) {
              that.setData({
                iscart: true
              });
            } else {
              that.calculateTotal();
            }

          },
          fail: function () {

          },
          complete: function () {
            wx.hideLoading()
          }

        });
      }

    }

  },
  showPopup: function (e) {
    var that = this;
    var goodList = that.data.goodList;
    var chars = [];
    var shop_ids = {};
    var good_ids = {};
    var ids = {};
    var nums = {};
    
    var shopAddids = {};
    var shop_id = new Array();
    var good_id = new Array();
    var id = new Array();
    var num = new Array();
    var shopAddid = new Array();
    //  添加good_id字段到传值数组
    for (var index in goodList) {
      var add = {};
      if (goodList[index].checked == true) {
        good_id.push(goodList[index].goods_id);
        if (goodList[index].goods_standard_id == 0 || goodList[index].goods_standard_id == '') {
          id.push(0);
        }
        else {
          id.push(goodList[index].goods_standard_id);
        }
        num.push(goodList[index].goods_unit);
        shop_id.push(goodList[index].id);
        add.goods_id = goodList[index].goods_id;
        add.shop_id = goodList[index].id;
        shopAddid.push(add)
      }
    }
    good_ids['good_id'] = good_id;
    shop_ids['shop_id'] = shop_id;
    shopAddids['shopAddids'] = shopAddid;
    ids['guige'] = id;
    nums['num'] = num;
    chars.push(shop_ids);
    chars.push(good_ids);
    chars.push(ids);
    chars.push(nums);
    chars.push(shopAddids);
    let userStr = JSON.stringify(chars);
    if (chars[0].shop_id.length == 0) {
      wx.showToast({
        title: '请选择一个或多个商品',
        icon: 'none'
      })
    }
    else {
      wx.navigateTo({
        url: '../settlement/settlement?title=' + userStr,
        success: function (res) {
        },
        fail: function () {
        },
        complete: function () {
        }

      })

    }


  },

  /**
   * 计算商品总数
   */
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.goods_unit;
        totalPrice += good.goods_unit * good.money;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      heght: wx.getSystemInfoSync().windowHeight,
    })
    wx.request({
      url: app.globalData.tiltes + 'shopping_index',
      data: {
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      success: function (res) {
        if (res.data.status == 1) {
          let goods = res.data.data, kc, hot, cx, qc;

          for (let e = 0; e < goods.length; e++) {
            let arr = [], bq_arr = [], bq_dgg = {};
            // console.log(goods)
            if (goods[e].save == 1) {
              bq_dgg.kc = 1;
              bq_arr.push(bq_dgg);
            }
            //多规格的可存
            // if (goods[e].special_info != undefined && goods[e].special_info != null && goods[e].special_info != '') {
            //   if (goods[e].special_info.save == 1) {
            //     bq_dgg.kc = 1;
            //     bq_arr.push(bq_dgg);
            //   }
            // }
            // for (let o in goods[i].goods_info.goods_sign) {
            for (let i in goods[e].goods_sign) {
              var arr = [], bq = {};
              if (goods[e].goods_sign[i].text == '可存' && goods[e].goods_sign[i].check == '1' && goods[e].goods_sign[i].check != undefined) {
                bq.kc = 1;
                bq_arr.push(bq);
              } else if (goods[e].goods_sign[i].text == 'HOT' && goods[e].goods_sign[i].check == '1' && goods[e].goods_sign[i].check != undefined) {
                bq.hot = 1;
                bq_arr.push(bq);
              } else if (goods[e].goods_sign[i].text == '促销' && goods[e].goods_sign[i].check == '1' && goods[e].goods_sign[i].check != undefined) {
                bq.cx = 1;
                bq_arr.push(bq);
              } else if (goods[e].goods_sign[i].text == '清仓' && goods[e].goods_sign[i].check == '1' && goods[e].goods_sign[i].check != undefined) {
                bq.qc = 1;
                bq_arr.push(bq);
              } else if (goods[e].goods_sign[i].check == '1' && goods[e].goods_sign[i].check != undefined) {
                arr.push(goods[e].goods_sign[i]);
              }
            }
            res.data.data[e].goods_sign = arr;
            res.data.data[e].bq_arr = bq_arr;
            // }
          }
          // let goods_sign = goods[0].goods_info.goods_sign;
          // for (let i in goods_sign) {
          //   if (goods_sign[i].text == '可存' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
          //     kc = 1;
          //   } else if (goods_sign[i].text == 'HOT' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
          //     hot = 1;
          //   } else if (goods_sign[i].text == '促销' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
          //     cx = 1;
          //   } else if (goods_sign[i].text == '清仓' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
          //     qc = 1;
          //   } else if (goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
          //     arr.push(goods_sign[i]);
          //   }
          // }

          // res.data.data[0].goods_info.goods_sign = arr;

console.log(res.data.data)

          that.setData({
            goodList: res.data.data,
            kc: kc,
            hot: hot,
            cx: cx,
            qc: qc
          });
        }
        if (that.data.goodList.length == 0) {
          that.setData({
            iscart: true,
          });
        }
        //  添加字段到等级数组
        for (var index in that.data.goodList) {
          var sexParam = "goodList[" + index + "].tab";
          that.setData({
            [sexParam]: index,
          })
        }
        //  添加字段到等级数组
        for (var index in that.data.goodList) {
          var sexParam = "goodList[" + index + "].desc";
          that.setData({
            [sexParam]: '商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点',
          })

        }
        //  添加字段到等级数组
        for (var index in that.data.goodList) {
          var sexParam = "goodList[" + index + "].check";
          that.setData({
            [sexParam]: false,
          })
        }
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
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