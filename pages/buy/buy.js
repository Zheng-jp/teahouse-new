// pages/buy/buy.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'iscart': false,
    heght:'',
    totalPrice: 0,
    totalCount: 0,
    
    goodList: [
      // {
      //   'cover': 'img/u936.png',
      //   'isbn': '9787535482051',
      //   'desc': '商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点',
      //   'price': 25.9,
      //   'checked': false,
      //   'count': 1,
      //   'index': 1,
      //   'num': 1,
      //   'tab':0,
       
      // },
      // {
      //   'cover': 'img/u936.png',
      //   'isbn': '9787535482052',
      //   'desc': '商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点',
      //   'price': 25.9,
      //   'checked': false,
      //   'count': 1,
      //   'index': 2,
      //   'num': 1,
      //   'tab':1,
      // }, {
      //   'cover': 'img/u936.png',
      //   'isbn': '9787535482053',
      //   'desc': '商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点商品卖点',
      //   'price': 25.9,
      //   'checked': false,
      //   'count': 1,
      //   'index': 3,
      //   'num': 1,
      //   'tab':2,
      // }
      ],
    // 商品信息
    routers: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling:[
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u300.png',
        
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
        price_img: 'img/u300.png',
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
        price_img: 'img/u300.png',
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
        price_img: 'img/u300.png',
        jiage: '￥120.0/片'
      },
    
    ],

  },
   /* 点击减号 */
   bindMinus: function (e) {
    var that=this;
    var tab=e.currentTarget.dataset.id;
    for (var index in that.data.goodList) {
      var nums = that.data.goodList[tab].goods_unit;
      var num = 'goodList[' + index +'].goods_unit'
      if(index==tab){
        if (nums>1){
          nums--;
          that.setData({
            [num]: nums
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
        

      }

    }

   
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].isbn == values[j]) {
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
    this.calculateTotal();
  },
  // 全选
  selectalltap: function (e) {
    // console.log('用户点击全选，携带value值为：', e.detail.value);
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
    this.calculateTotal();
  },
  /**
 * 删除购物车当前商品
 */
  deleteList(e) {
    console.log(e);
    const index = e.currentTarget.dataset.index;
    console.log(index);
    let goodList = this.data.goodList;
    goodList.splice(index, 1);
    this.setData({
      goodList: goodList
    });
    if (!goodList.length) {
      this.setData({
        iscart: true
      });
    } else {
      this.calculateTotal();
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
        totalCount += good.count;
        totalPrice += good.count * good.price;
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
    var that=this;
    this.setData({
      heght: wx.getSystemInfoSync().windowHeight,
    })
    wx.request({
      url: app.globalData.tiltes + 'shopping_index',
      data: {
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          goodList: res.data.data,
        });
           //  添加字段到等级数组
        for (var index in that.data.goodList) {
          var sexParam = "goodList[" + index + "].tab";
          that.setData({
            [sexParam]: index,
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