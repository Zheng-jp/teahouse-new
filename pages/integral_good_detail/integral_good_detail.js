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
    member_grade_img:null,
    // 商品库存
    stock:'',
    // 商品销量
    // var current=e.target.dataset.current;
    // 商品图片
    images:'',
    // 规格值
    select:'规格',
    selecteds: true,
    id:0,
    // 商品数量
    num:1,
    image: [ ],
    url:app.globalData.img_url,
    circular: 'true',
    indicatorDots: 'true',
    interval: '3000',
    autoplay: 'true',
    selected: true,
    selected1: false,
    mask_show:false,
    good_id:0,
    // 是否有地址，0为没有填写收货地址，1为有，2为未授权
    address:0,
    
   
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
  // 规格id
  // var goods_standard_id=e.target.dataset.id;
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
  // 点击加入购物车
  add_car: function (event) {
    var that=this;
    console.log(that);
    if (that.data.goods.goods_standard == 0)
    {
      var goods_standard_id = '';
      that.setData({
        select:'',
      });
    }
    else{
      var goods_standard_id = that.data.id;
    }
    if(that.data.select=='规格'){
      wx.showToast({
        title: '请选择规格',
        icon:'none',
      })
    }
    else{
      if(that.data.address==0){
        wx.showModal({
          title: '提示',
          content: '请先添加收货地址',
          confirmText:'立即添加',
          success: function(res) {
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
      }
      else if(that.data.address==1){
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
            console.log(res);
            wx.showToast({
              title: res.data.info,
              icon:'none',
            })
    
          },
          fail: function () {
    
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
      }
      else{
        wx.showToast({
          title:'你未进行授权，请重启小程序',
          icon:'none'
        })
      }
  

    }
    
    },
    // 点击购物车
    go_car: function (e) {
      wx.navigateTo({
        url: '../buy/buy',
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
    if (that.data.address==0){
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
    else if(that.data.address==1){
            if (that.data.goods.goods_standard == 0)
            {
              var goods_standard_id = '';
              that.setData({
                select:'',
              });
            }
            else{
              var goods_standard_id = that.data.id;
            }
            if(that.data.select=='规格'){
              wx.showToast({
                title: '请选择规格',
                icon:'none',
              })
            }
            else{
            var chars=[];
            // var char = {};
            var shop_ids = {}
            var good_ids = {}
            var ids = {}
            var nums = {}
            var shop_ids={}
            var shop_id=new Array();
            var good_id=new Array();
            var id=new Array();
            var num=new Array();
              //  添加good_id字段到传值数组
              good_id.push(that.data.good_id);
              if(that.data.id==0 || that.data.id==''){
                  id.push(0);
              }
              else{
                id.push(that.data.id);
              }
              
              num.push(that.data.num);
              shop_id.push(0);
              shop_ids['shop_id']=shop_id;
              good_ids['good_id']=good_id;
              ids['guige']=id;
              nums['num']=num;
            chars.push(shop_ids);
            chars.push(good_ids);
            chars.push(ids);
            chars.push(nums);
            let userStr=JSON.stringify(chars);
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
    else{
      wx.showToast({
        title:'你未进行授权，请重启小程序',
        icon:'none'
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    var member_grade_img=app.globalData.member_grade_img;
    that.setData({
      member_grade_img: member_grade_img,
    })
    var title = options.title;
    wx.request({
      url: app.globalData.tiltes + 'commodity_detail',
      data: {
        open_id: app.globalData.gmemberid,
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
          good_id: parseInt(options.title),
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
    wx.request({
      url: app.globalData.tiltes + 'member_default_address_return',
      data: {
        open_id: app.globalData.gmemberid,
        address_id:''
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res.data.status);
          that.setData({
            address:res.data.status,
          });
       
      },
      fail: function () {

      },
      complete: function () {
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