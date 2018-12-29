// pages/settlement/settlement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否有收货地址
    selected:true,
    // 是否有店铺地址
    selected1: false,
  
    selected2: false,
    isnum:false,
     // 是否有存茶地址
    warehouse:true,
    //  选择保险年限
    showModalStatus: false,
    // 加减框里面的值
    num:'1',
    // 手机号码
    tel:'',
    // 名字
    name:'',
    // 地址
    address:'',
    
    goods:[],
    from_buy:false,
    all_money:'0',
    user:[],
    
    
  },
  // 弹窗
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
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
  // 弹窗
  radioChange: function (e) {
    var that = this;
    if (e.detail.value =="选择直邮"){
      that.setData({
        selected: true,
        selected1: false,
        selected2: false,
      })
    }
    else if (e.detail.value == "到店自提"){
      that.setData({
        selected: false,
        selected1: true,
        selected2: false,
      })
    }
    else{
      that.setData({
        selected: false,
        selected1: false,
        selected2: true,
      })
    }
    // console.log(e.detail.value);
  },
  go_direct_mail_address:function(e){
    wx.navigateTo({
      url: '../select_address/select_address',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }

    })
  },
  go_shop_address: function (e) {
    wx.navigateTo({
      url: '../select_shop_address/select_shop_address',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }

    })
  },
  go_save_tea: function (e) {
    wx.navigateTo({
      url: '../select_save_address/select_save_address',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }

    })
  },
  repay:function(){
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'order_place',
      data: {
        'open_id': app.globalData.gmemberid,
        'goods_id': that.data.user[1].good_id,
        'guige': that.data.user[2].guige,
        'num':that.data.num,
        'all_money': that.data.all_money,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res)
      },
      fail: function () {

      },
      complete: function () {
      }

    });
    // wx.showActionSheet({
    //   itemList: ['账户支付', '微信支付',],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
  },
  buyrepay:function(){
    wx.showActionSheet({
      itemList: ['账户支付', '微信支付',],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
    // 弹窗
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
        // 弹窗
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
    

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let user = JSON.parse(options.title);
    that.setData({
      user: user,
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
        console.log(res)
        var tel=res.data.data.harvester_phone_num;
        var name=res.data.data.harvester;
        var address=res.data.data.address_name+res.data.data.harvester_real_address;
        that.setData({
          tel: tel,
          name:name,
          address:address,
        });
        for (var index in address) {
          var address_names=address.split(",").join("");
          that.setData({
            address:address_names,
          });
        }
       
      },
      fail: function () {

      },
      complete: function () {
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'order_return',
      data: {
        'open_id': app.globalData.gmemberid,
        'goods_id': user[1].good_id,
        'guige':user[2].guige,
        'num':user[3].num,
        'shopping_id':user[0].shop_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res)
        that.setData({
          goods: res.data.data,
        });
       
       
      },
      fail: function () {

      },
      complete: function () {
      }

    });
    // 判读从哪个页面进来
    var  pages = getCurrentPages();
    var  prevpage = pages[pages.length - 2];
    console.log(prevpage.route)
    if(prevpage.route=='pages/goods_detail/goods_detail'){
    that.setData({
      isnum: true,
      from_buy:true,
     
    });
    }
    else{
      that.setData({
        isnum: false,
        from_buy:false,
      });
    }

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
    var that=this;
    var tel=wx.getStorageSync('tel');
    var name=wx.getStorageSync('name');
    var address=wx.getStorageSync('address');
    that.setData({
      tel: tel,
      name:name,
      address:address,
    });
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