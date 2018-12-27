// pages/goods_detail/goods_detail.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
     //  商品价格
    price:'',
    // 商品库存
    stock:'',
    // 商品销量
    // var current=e.target.dataset.current;
    // 商品图片
    images:'',
    select:'规格',
    add_address:false,
    selecteds: true,
    id: 0,
    num:'1',
    image: [ ],
     
    url:app.globalData.img_url,
    circular: 'true',
    indicatorDots: 'true',
    interval: '2000',
    autoplay: 'true',
    selected: true,
    selected1: false,
    mask_show:false,
   
  },
  labelItemTap: function (e) {
    var that=this;
    console.log(e);
   //  点击添加类
  // 商品id
   var current=e.target.dataset.current;
  //  商品价格
  var price=e.target.dataset.price;
  // 商品库存
  var stock=e.target.dataset.stock;
  // 商品销量
  // var current=e.target.dataset.current;
  // 商品图片
  var images=e.target.dataset.images;
    // 商品名字
    var value=e.target.dataset.value;
    console.log(e.target.dataset);
   if (that.data.goods.goods_standard.id === e.target.dataset.current) {
    return false;

  } else {
    that.setData({
      id: e.target.dataset.current,
      current: current,
      price:price,
      stock:stock,
      images:images,
      select:value,
    })
  }
  },
  selected: function (e) {
    console.log(111);
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
    showFlag: function (e) {
      this.setData({
        mask_show:true,
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
  
  hideFlag: function (e) {
    console.log(111);
    this.setData({
      mask_show: false,
    })
  },
 
 
  showPopup: function (e) {
    var that=this;
    if (that.data.add_address){
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
    }
    else{
      wx.navigateTo({
        url: '../settlement/settlement',
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




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    var title = options.title;
    wx.request({
      url: app.globalData.tiltes + 'commodity_detail',
      data: {
        id: options.title
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          goods: res.data.data[0],
          id: res.data.data[0].goods_standard[0].id,
          images: res.data.data[0].goods_standard[0].images,
          price: res.data.data[0].goods_standard[0].price,
          stock: res.data.data[0].goods_standard[0].stock,
          image:res.data.data[0].goods_show_images
        });
        var article = res.data.data[0].goods_text;
        WxParse.wxParse('article', 'html', article, that, 5);
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