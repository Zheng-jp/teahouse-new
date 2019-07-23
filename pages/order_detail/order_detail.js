// pages/order_detail/order_detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    order:[],
    selected2: false,
  },
  newRedirectto: function (n, e) {
    switch (e) {
      case "page":
        wx.navigateTo({
          url: n
        });
        break;
      case "pages":
        wx.switchTab({
          url: n
        });
        break;
      case "webs":
        wx.navigateTo({
          url: n
        });
        break;
      case "tel":
        n = n.slice(4), wx.showModal({
          title: "提示",
          content: "是否拨打电话:" + n,
          success: function (e) {
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
          success: function (e) {
            console.log("打开成功"), console.log(i);
          }
        });
    }
  },
  redirectto: function (t) {
    var a = t.currentTarget.dataset.link,
        e = t.currentTarget.dataset.linktype;
    this.newRedirectto(a, e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
   wx.request({
    url: app.globalData.tiltes + 'order_details',
    data: {
      parts_order_number:options.title,
      status:options.status
    },
    method: "post",
    success: function (res) {
      var data=res.data.data;
      data.create_time=app.formatDate(data.create_time);
      data.pay_time=app.formatDate(data.pay_time);
      for(let i = 0; i < data.data.length; i ++) {
        data.data[i].linktype = "page";
        data.data[i].linkurl = "/pages/goods_detail/goods_detail?title=" + data.data[i].goods_id;
        // console.log(res.data.data)
      }
      let selected2;
      if(data.order_type == 1 || data.order_type == 2 ) {
        selected2 = false
      } else {
        selected2 = true
      }
      that.setData({
        order:data,
        all_money:data.data[0].order_real_pay,
        freight:data.data[0].freight,
        receipt_price:data.data[0].receipt_price,
        coupon_deductible:data.data[0].coupon_deductible,
        selected2: selected2
      })
    },
    fail: function () {
   
    },
    complete: function () {
      wx.hideLoading()
    }

  });
  },
 

  go_logistics: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../logistics/logistics?title=' + event.currentTarget.dataset.id,
      success: function (res) {
      
      },
      fail: function () {
       
      },
    })
  },
  // 追加评价
  go_evaluation: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../evaluation/evaluation?title=' + event.currentTarget.dataset.id,
      success: function (res) {
      
      },
      fail: function () {
       
      },
    })
  },
// 申请售后
  go_apply_after_sales: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.tiltes + 'after_sale_is_set',
      data: {
        order_id:item,
      },
      method: "post",
      success: function (res) {
       if(res.data.status=="1"){
         wx.navigateTo({
          url: '../apply_after_sales/apply_after_sales?title=' + event.currentTarget.dataset.id,
          success: function (res) {
          
          },
          fail: function () {
          
          },
        })
       }
      },
      fail: function () {
      },
      complete: function (res) {
        wx.showToast({
          title:res.data.info,
          icon:'none',
        });
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