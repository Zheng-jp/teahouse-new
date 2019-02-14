// pages/select_address/select_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     addresss:[],
     is_select_address:'',
   
  },
 
  chooseImg1: function (e) {
    var that = this;
    var imgs1 = that.data.imgs1;
    if (imgs1.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs1 = that.data.imgs1;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs1.length >= 9) {
            that.setData({
              imgs1: imgs1
            });
            // return false;
          } else {
            imgs1.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgs1: imgs1
        });
        that.setData({
          picture1: []
        })
        var tempFilePaths = that.data.imgs1
        for (var s = 0; s < tempFilePaths.length; s++) {
          wx.uploadFile({
            url: app.config.apiUrl + 'Api/Common/uploadImage',
            filePath: tempFilePaths[s],
            name: 'image',
            success: function (res) {
              var data = res.data;
              console.log(data)
              var data = JSON.parse(res.data);
              console.log(data)
              var img_data = that.data.img_data;
              img_data.push(data.data);
              console.log(img_data)
              that.setData({
                img_data: img_data
              })
            }
          })
        }
      },
      fail:function(res){
      },
      complete: function (res) {
      }
    });
  },
  // 删除图片
  deleteImg1: function (e) {
    var that = this;
    var imgs1 = this.data.imgs1;
    var img_data = that.data.img_data;
    var index = e.currentTarget.dataset.index;
    imgs1.splice(index, 1);
    img_data.splice(index, 1);
    this.setData({
      imgs1: imgs1,
      img_data: img_data
    })
  },
  // 预览图片
  previewImg1: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs1 = this.data.imgs1;
    wx.previewImage({
      //当前显示图片
      current: imgs1[index],
      //所有图片
      urls: imgs1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    var title = options.title;
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