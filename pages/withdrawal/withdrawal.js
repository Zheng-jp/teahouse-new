// pages/withdrawal/withdrawal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btntext: '获取验证码',
    name: null,
    balance: 0,//余额
    member_recharge_money: 0,//可提现余额
    card: [],
    id: '',
    selected: true,
    selected1: false,
    showCard: false,
    rate: 0
  },
  // 验证银行卡号
  checkCard: function (cardNo) {
    if (isNaN(cardNo))
      return false;
    if (cardNo.length < 12) {
      return false;
    }
    var nums = cardNo.split("");
    var sum = 0;
    var index = 1;
    for (var i = 0; i < nums.length; i++) {
      if ((i + 1) % 2 == 0) {
        var tmp = Number(nums[nums.length - index]) * 2;
        if (tmp >= 10) {
          var t = tmp + "".split("");
          tmp = Number(t[0]) + Number(t[1]);
        }
        sum += tmp;
      } else {
        sum += Number(nums[nums.length - index]);
      }
      index++;
    }
    if (sum % 10 != 0) {
      return false;
    }
    return true;
  },
  formSubmit: function (e) {
    var that = this;
    if ( e.detail.value.money == '') {
      wx.showToast({
        title: "输入框不能为空",
        icon: 'none',
      });

    } else if (!that.data.card.bank_card || !that.data.card.bank_name || !that.data.card.account_name) {
      wx.showToast({
        title: "请选择银行卡",
        icon: 'none',
      });
    }
    else if (that.data.card.account_name != that.data.name) {
      wx.showToast({
        title: "您认证的姓名和开卡姓名不一致",
        icon: 'none',
      });
    }
    else if (!that.checkCard(that.data.card.bank_card)) {
      wx.showToast({
        title: "银行卡格式不对",
        icon: 'none',
      });
    }
    else if (Number(e.detail.value.money) < Number(that.data.min_money)) {
      wx.showToast({
        title: "提现金额不能小于"+ that.data.min_money,
        icon: 'none',
      });
    }
    else {
      wx.request({
        url: app.globalData.tiltes + 'withdrawal',
        data: {
          member_id: app.globalData.member_id,
          money: e.detail.value.money,
          user_name: that.data.card.account_name,
          bank_name: that.data.card.bank_name,
          bank_card: that.data.card.bank_card,
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
        success: function (res) {
          if (res.data.status == "1") {
            setTimeout(function () {
              wx.navigateBack();
            }, 2000)
          }


        },
        fail: function () {

        },
        complete: function (res) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
        }

      });
    }


  },
  send_cold: function (e) {
    var _this = this

    wx.request({
      url: app.globalData.tiltes + 'sendMobileCodeBank',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        var coden = 60    // 定义60秒的倒计时
        var codeV = setInterval(function () {
          _this.setData({    // _this这里的作用域不同了
            btntext: '重新获取' + (--coden) + 's'
          })
          if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
            clearInterval(codeV)
            _this.setData({
              btntext: '获取验证码'
            })
          }
        }, 1000)  //  1000是1秒

      },
      fail: function () {

      },
      complete: function () {
      }

    });



  },
  go_card: function (e) {
    wx.navigateTo({
      url: '../card/card',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }

    })
  },
  ison: function (e) {
    var that = this;
    that.setData({
      selected: true,
      selected1: false
    })
  },
  ison2: function (e) {
    var that = this;
    that.setData({
      selected1: true,
      selected: false
    })
  },
  selectCard: function () {
    var that = this;
    if (that.data.showCard == false) {
      that.setData({
        showCard: true
      })
      that.getBank();
    } else {
      that.setData({
        showCard: false
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'id_card_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        if (res.data.status != "1") {
          wx.showModal({
            title: '提示',
            content: '你未进行实名认证',
            confirmText: '马上实名',
            confirmColor: '#3399FF',
            cancelColor: '#bbb',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../identity_authentication/identity_authentication',
                  success: function (res) {

                  },
                  fail: function () {

                  },
                  complete: function () {

                  }


                })
              }
              else if (res.cancel) {
                wx.navigateBack();
              }
            }
          })
        }
        else {
          // that.getBank();//获取银行卡信息
          that.setData({
            name: res.data.data.member_real_name,
          })
        }

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'member_balance_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Cookie": sessionId
      // },

      success: function (res) {
        that.setData({
          balance: res.data.data.member_wallet,
          // member_recharge_money: res.data.data.member_recharge_money,
          day_max_money: res.data.data.day_max_money,//每日最高提现金额
          min_money: res.data.data.min_money,//最小提现金额
          service_charge: res.data.data.service_charge,//费率
          //  integral:res.data.data.member_integral_wallet,
        })

      },
      fail: function () {

      },
      complete: function (res) {

      }

    });


  },
  bindoldChange: function (event) {
    var that=this;
    if(event.detail.value==''){
      that.setData({
        rate:0
      })
    }
    else{
      let rate = (Number(event.detail.value) * Number(that.data.service_charge) / 100);
      that.setData({
        rate: rate,
      })
    }
  },
  getBank: function () {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'get_bank_list',
      data: {
        member_id: app.globalData.member_id,
        // uniacid: app.globalData.uniacid,
      },
      method: "post",
      success: function (res) {
       if(res.data.status == 0) {
         that.setData({
           isBank: false
         })
       } else {
         let cards = res.data.data;
         for(let i = 0; i < cards.length; i ++ ) {
           var strLength = cards[i].bank_card.length;
           var star = ''; 
           var strRel = '';
           if(strLength>6){
               var hideSec = cards[i].bank_card.substring(3);    //星号部分
               for(var e=7;e<hideSec.length;e++){
                   star+= "*";
               }
           };
           strRel = cards[i].bank_card.substring(0,6) + star + cards[i].bank_card.substr(cards[i].bank_card.length-4);
           res.data.data[i].count_hide = strRel
         }

        that.setData({
          bankCard: res.data.data,
          isBank: true
        })
       }

      },
      fail: function () {

      },
      complete: function (res) {

      }

    });
  },
  addCard: function() {
    wx.navigateTo({
      url: '../card/card',
      success: function (res) {

      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  //点击选择
  chosenCard: function(e) {
    var that = this;
    var cards = that.data.bankCard;
    for(let i = 0; i < cards.length; i ++) {
      if(cards[i].bank_card == e.currentTarget.dataset.count) {
        var card = [];
        card.push(cards[i]);
        that.setData({
          bankCard: card,
          account_name: e.currentTarget.dataset.name,
          bank_name: e.currentTarget.dataset.bank,
          bank_card: e.currentTarget.dataset.count
        })
      }
    }
    this.setData({

    })
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
    var id = wx.getStorageSync('id');
    wx.request({
      url: app.globalData.tiltes + 'withdrawal_return',
      data: {
        member_id: app.globalData.member_id,
        id: id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Cookie": sessionId
      // },

      success: function (res) {
        let cards = res.data.data;
           var strLength = cards.bank_card.length;
           var star = ''; 
           var strRel = '';
           if(strLength>6){
               var hideSec = cards.bank_card.substring(3);    //星号部分
               for(var e=7;e<hideSec.length;e++){
                   star+= "*";
               }
           };
           strRel = cards.bank_card.substring(0,6) + star + cards.bank_card.substr(cards.bank_card.length-4);
           res.data.data.count_hide = strRel
        that.setData({
          card: res.data.data,
          showCard: true
        })
      },
      fail: function () {

      },
      complete: function (res) {

      }

    });
    // that.getBank();//获取银行卡信息
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
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