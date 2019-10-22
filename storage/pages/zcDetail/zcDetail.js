// storage/pages/zcDetail/zcDetail.js
const app = getApp();
var WxParse = require('../../..//wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    currTab: 0,
    tabHdArr: ['项目详情', '团队介绍', '监测报告', '评价'],
    fixiPhone: false,
    switchDialogKey: false,
    switchWidth: false, //
    proArr: [],
    specActive: 0, //规格索引
    buyNum: 1,  //购买数量
    isbuy: false
  },

  onShareAppMessage: function () {
    let that = this;
    const shareName = this.data.proArr[0].project_name;
    return {
      title: shareName, // 转发后 所显示的title
      path: 'pages/diy/index/index', // 相对的路径
      success: (res) => {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },

  // 支持项目
  supProj: function (e) {
    // 库存
    var stock = e.currentTarget.dataset.stock;
    if(stock == 0) {wx.showToast({ title: '该商品已售罄！', icon: 'none' }); return;}
    var guige = this.data.proArr[0].standard[this.data.specActive].id;
    var goods_id = this.data.proArr[0].id;
    var num = this.data.buyNum;
    var member_id = app.globalData.member_id;
    var arr = [
      {"guige": [guige]},
      {"goods_id": [goods_id]},
      {"num": [num]},
      {"member_id": [member_id]}
    ]
    wx.navigateTo({
      url: '/storage/pages/zcSettle/zcSettle?title=' + JSON.stringify(arr),
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  	// 点击购物车
	// go_car: function(e) {
	// 	wx.navigateTo({
	// 		url: '/pages/buy/buy',
	// 		success: function(res) {
	// 			console.log("跳转成功");
	// 		},
	// 		fail: function() {
  //       console.log("跳转失败");
  //     }
	// 	})
	// },

  // 去首页
  bindSwitchTab: function(){
    wx.reLaunch({
      url: '../../../pages/diy/index/index'
    })
  },
  // 打赏跳转
  supportProject: function (e) {
    // 库存
    var stock = e.currentTarget.dataset.stock;
    if (stock == 0) {wx.showToast({ title: '该商品已售罄！', icon: 'none' }); return;}
    
    var standardId = this.data.proArr[0].standard[this.data.specActive].id;
    wx.navigateTo({
      url: '/storage/pages/zcSpare/zcSpare?standardId=' + standardId +'&enter_all_id='+this.data.enter_all_id,
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
      }
    })
  },
  // 减
  minus: function(){
    var num = this.data.buyNum;
    if(num > 1){
      num --;
    }
    this.setData({
      buyNum: num
    })
  },
  // 加
  plus: function(){
    var num = +this.data.buyNum;
    var standard = this.data.proArr[0].standard[this.data.specActive];
    // 限购
    if(standard.limit !== -1){
      if(num < standard.limit){
        if(num < +standard.stock){
          num++;
          this.setData({
            buyNum: num
          })
        }else{
          wx.showToast({
            title: '您所填写的数量超过库存！',
            icon: 'none',
            duration: 1500
          })
        }
      }else{
        wx.showToast({
          title: '不能超过限购数量！',
          icon: 'none',
          duration: 1500
        })
      }
    }else{
      if(num < +standard.stock){
        num++;
        this.setData({
          buyNum: num
        })
      }else{
        wx.showToast({
          title: '您所填写的数量超过库存！',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },
  

  // 输入数量
  bindManual: function(e){
    var num = e.detail.value;
    var stock = +this.data.proArr[0].standard[this.data.specActive].stock;
    if(num <= 0){
      this.setData({
        buyNum: 1
      })
    }else if(num <= stock){
      this.setData({
        buyNum: num
      })
    }else{
      wx.showToast({
        title: '您所填写的数量超过库存！',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        buyNum: stock
      })
    }
  },

  touchMove () {},
  // 选择规格
  clickSpec: function(e){
    var index = e.target.dataset.index
    this.setData({
      specActive: index,
    })
  },

  // 操作选项卡
  clickTabHd: function(e){
    var current = e.target.dataset.current;
    if(this.data.currTab != current){
      this.setData({
        currTab: current
      })
    }
  },
  swiperTabBd: function(e){
    this.setData({
      currTab: e.detail.current
    })
  },
  // 显示规格对话框
  switchDialog: function(){
    this.setData({
      switchDialogKey: !this.data.switchDialogKey
    })
    if(!this.data.switchDialogKey){
      var _this = this;
      setTimeout(function(){
        _this.setData({
          switchWidth: !_this.data.switchWidth
        })
      }, 200)
    }else{
      this.setData({
        switchWidth: !this.data.switchWidth
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
        id = options.id;
    wx.getSystemInfo({
      success: function(res){
        var model = res.model;
        // console.log(model.indexOf('iPhone X') != -1)
        _this.setData({
          fixiPhone: model.indexOf('iPhone X') != -1
        })
      }
    })
    // all data
    wx.request({
      url: app.globalData.tiltes + 'crowd_support',
      method: 'POST',
      data: {
        id: id,
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid
      },
      success: function(res){
        
        var data = res.data.data.data[0], isbuy = false;
        var richTextArr = [];
        data.goods_text ? richTextArr.push(data.goods_text) : '';
        data.team ? richTextArr.push(data.team) : '';
        data.text ? richTextArr.push(data.text): '';
        // 循环 转换 html -> wxml
        for(var i = 0; i < richTextArr.length; i++){
          richTextArr[i]?WxParse.wxParse('richText' + i, 'html', richTextArr[i], _this):'';
          if (i === richTextArr.length - 1) {
            WxParse.wxParseTemArray("richTextTemArray",'richText', richTextArr.length, _this)
          }
        }
        if(data.end_time * 1000 > Date.parse(new Date())) isbuy = true;
        else isbuy = false;
        // let standard = [];
        // for(let o = 0; o < data.standard.length; o ++) {
        //   if(data.standard[o].stock > 0) {
        //     standard.push(data.standard[o]);
        //   }
        // }
        // res.data.data[0].standard = standard;
        // console.log(res.data.data);
        _this.setData({
          proArr: res.data.data.data,
          enter_all_id: res.data.data.enter_all_id,
          isbuy: isbuy
        })
      },
      fail: function(res){
        console.log(res);
      }
    })
  },
  onShow: function(){
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
  }
})