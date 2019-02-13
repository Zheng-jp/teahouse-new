// pages/apply_after_sales/apply_after_sales.js
const regeneratorRuntime = require('../../utils/regenerate.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:null,
    up_img_lenght:true,
    img:[
      "../../images/1.png",
      "../../images/1.png",
    ]

  },
  up_img:function(){
    var that = this;
    console.log(that.data.img.length);
    if(that.data.img.length>3){
      that.setData({
        up_img_lenght:false
      })
      
      return false;
    }
    else{
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res){
          console.log(res)
          that.setData({
            img:res.tempFilePaths
          })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
         url: app.globalData.tiltes + 'order_evaluate_add',
         filePath: tempFilePaths[0],
         name: 'img',
        
         success:function(res){
           //打印
           console.log(res.data)
         }
       })
       
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
   
  },
  aaa:function(){
    var that = this;
  
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var height = wx.getSystemInfoSync().windowHeight;
     that.setData({ height: height});
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
