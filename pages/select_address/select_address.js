// pages/select_address/select_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     addresss:[],
     is_select_address:'',
     is:true,
     checked:"",
   
  },
  add_address: function (event) {
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
  },
  go_change_address: function (event) {
    wx.navigateTo({
      url: '../change_address/change_address?title=' + event.currentTarget.dataset.id,
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
  radioChange: function (e) {
    var that = this;
     wx.request({
      url: app.globalData.tiltes + 'member_address_status',
      data: {
        open_id: app.globalData.gmemberid,
        id: e.detail.value[0],
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        for (var index in that.data.address) {
         if(e.detail.value[0]==that.data.address[index].id){
          that.setData({
            checked:that.data.address[index].checked
          });
         }
        }
        wx.showToast({
          title:'修改成功',
          icon: 'none'
        })
        console.log(that.data)
      },
      fail: function () {

      },
      complete: function () {
      }

    });

  },
  delect: function (e) {
    var that = this;
     wx.request({
      url: app.globalData.tiltes + 'member_address_del',
      data: {
        open_id: app.globalData.gmemberid,
        id: e.currentTarget.dataset.id,
      },
      method: "post",
      success: function (res) {
        // wx.showToast({
        //   title:'删除成功',
        //   icon: 'none'
        // })
        that.onLoad()
      },
      fail: function () {

      },
      complete: function () {
      }

    });

  },
  // 当从结算页面进来时触发的事件
  select:function(event){
    var tel=event.currentTarget.dataset.tel;
    var name=event.currentTarget.dataset.name;
    var address=event.currentTarget.dataset.address;
    var id=event.currentTarget.dataset.id;
    wx.setStorageSync('tel', tel);
    wx.setStorageSync('name', name);
    wx.setStorageSync('address', address);
    wx.setStorageSync('id', id);
     wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    var title = options.title;
    // 判读从哪个页面进来
    var  pages = getCurrentPages();
    var  prevpage = pages[pages.length - 2];
   if(prevpage.route=='pages/settlement/settlement'){
    that.setData({
      is_select_address: 'select',
      is:false
    });
   }
    wx.request({
      url: app.globalData.tiltes + 'member_address_information',
      data: {
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        if(res.data.status!=0){
          that.setData({
            address: res.data.data,
          });
        }
        
        for (var index in that.data.address) {
         
          var address_names=that.data.address[index].address_name.split(",").join("");
          var price = 'address['+index+'].address_name';
          var checked= 'address['+index+'].checked';
            that.setData({
              [checked]:index
            });
          
          that.setData({
            [price]:address_names
          });
          if(that.data.address[index].status==1){
            that.setData({
              checked:that.data.address[index].checked
            });
          }
        }
      
        console.log(that.data)
       
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