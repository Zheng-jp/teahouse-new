// pages/settlement/settlement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_height:null,
    // 是否有收货地址
    selected:true,
    // 是否有店铺地址
    selected1: false,
  
    selected2: false,
     // 是否有存茶地址
    warehouse:false,
    //  选择保险年限
    showModalStatus: false,
    // 加减框里面的值
    num:1,
    // 加减框里面的值
    num1:1,
    // 加减框里面的值
    num2:1,
    // 手机号码
    tel:'',
    // 名字
    name:'',
    // 地址
    address:'',
    goods:[],
    from_buy:false,
    all_money:0,
    user:[],
    address_id:0,
    // 茶叶类型
    order_type:1,
    // 优惠劵显示
    coupon_show:null,
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    
    
  },

  // 弹窗
  radioChange: function (e) {
    var that = this;
    if (e.detail.value =="选择直邮"){
      that.setData({
        selected: true,
        selected1: false,
        selected2: false,
        order_type:1,
      })
    }
    else if (e.detail.value == "到店自提"){
      that.setData({
        selected: false,
        selected1: true,
        selected2: false,
        order_type:2,
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
  // 弹窗
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function(){
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
    
    var val = this.data.pwdVal;

    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function(){
      wx.showToast({
        title: val,
      })
    });

  },
  /**
   * 获取焦点
   */
  getFocus: function(){
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });
      if (e.detail.value.length >= 6){
        this.hidePayLayer();
      }
  },
  forget_password: function(e){
    wx.navigateTo({
      url: '../forget_password/forget_password',
      success: function (res) {
      
      },
      fail: function () {
       
      },
      complete: function () {
      
      }
  
  
    })
    },

  
     // 计算钱
     calculate_money:function(){
      var that=this;
     var all_moneys=0;
     for(var i=0;i<that.data.goods.length;i++){
       all_moneys+=that.data.goods[i].grade_price*that.data.num;
     }
     
     that.setData({
       all_money: all_moneys,
     });
   },
  
     /* 点击减号 */
     bindMinus: function () {
      var that=this;
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
      that.calculate_money();
    },
    /* 点击加号 */
    bindPlus: function () {
      var that=this;
      console.log(that);
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
      that.calculate_money();
    },
    repay: function (e) {
      var that=this;
      console.log();
      wx.request({
        url: app.globalData.tiltes + 'order_integara',
        data: {
          open_id: app.globalData.gmemberid,
          address_id:that.data.address_id,
          goods_id:e.currentTarget.dataset.id,
          order_quantity:that.data.num,
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值
  
        // },
        success: function (res) {
        
         
        },
        fail: function () {
  
        },
        complete: function () {
        }
  
      });
    },
 
  
   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    that.setData({
      s_height: s_height,

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
        if(res.data.status==1){
          var tel=res.data.data.harvester_phone_num;
          var name=res.data.data.harvester;
          var address=res.data.data.address_name+res.data.data.harvester_real_address;
          var address_id=res.data.data.id;
          that.setData({
            tel: tel,
            name:name,
            address:address, 
  
          });
          for (var index in address) {
            var address_names=address.split(",").join("");
            that.setData({
              address:address_names,
              address_id:address_id,
            });
          }

        }
        else if(res.data.status==0){
          that.setData({
            selected:false,
          });
          
        }
       
       
      },
      fail: function () {

      },
      complete: function () {
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'bonus_detailed',
      data: {
        id: options.title
      },
      method: "post",
     
      success: function (res) {
        console.log(res);
        that.setData({
          goods:res.data.data[0]
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
    var that=this;
    var tel=wx.getStorageSync('tel');
    var name=wx.getStorageSync('name');
    var address=wx.getStorageSync('address');
    var id=wx.getStorageSync('id');
    that.setData({
      tel: tel,
      name:name,
      address:address,
      address_id:id
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