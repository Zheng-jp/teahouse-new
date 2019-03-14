// pages/apply_after_sales/apply_after_sales.js
const regeneratorRuntime = require('../../utils/regenerate.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: null,
    up_img_lenght: true,
    url: app.globalData.img_url,
    tempFilePaths: [],
    tempFilePathss: [],
    img: [],
    goods: [],
    order_id: null,
    is_return_goods: 2,
    amend: null,
    after_sale_id:null,
  },
//  删除图片
  delect_img:function(e){
    var that=this;
     var tem=that.data.tempFilePaths;
   for(var i=0;i<tem.length;i++){
     if( e.currentTarget.dataset.id==tem[i]){
         tem.splice(i, 1);
     }
   }
   that.setData({
    tempFilePaths:tem,
   })
  },
  up_img: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;

    if (that.data.img.length > 3) {
      that.setData({
        up_img_lenght: false
      })

      return false;
    }
    else {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          for (var i = 0; i < that.data.goods.length; i++) {
            if (id == that.data.goods[i].id) {
              //  添加字段到等级数组
              // for (var index in that.data.routers) {
              var img = "goods[" + i + "].img";
              that.setData({
                [img]: res.tempFilePaths,
              })

              // }
            }
          }
          // that.setData({
          //   img:res.tempFilePaths
          // })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var atempFilePaths = res.tempFilePaths;
          // console.log(atempFilePaths)
          var temp=that.data.tempFilePaths;

          // console.log(temp);
          for(var i=0;i<atempFilePaths.length;i++){
            if(temp.length<3){
              temp.push(atempFilePaths[i]);
            }
           
            else{
              wx.showToast({
                title:'图片最多上传三张',
                icon:'none'
              })
            }
              
          }
        
          
          that.setData({
            tempFilePaths: temp,
          })
          
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }

  },
  up_imgs: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var num=that.data.goods.images.length;
    if (that.data.img.length > 3-num) {
      that.setData({
        up_img_lenght: false
      })

      return false;
    }
    else {
      wx.chooseImage({
        count: 3-num, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          for (var i = 0; i < that.data.goods.length; i++) {
            if (id == that.data.goods[i].id) {
              //  添加字段到等级数组
              // for (var index in that.data.routers) {
              var img = "goods[" + i + "].img";
              that.setData({
                [img]: res.tempFilePaths,
              })

              // }
            }
          }
          // that.setData({
          //   img:res.tempFilePaths
          // })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          that.setData({ tempFilePathss: tempFilePaths });
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }

  },
//  删除新图片
delect_img_new:function(e){
  var that=this;
   var tem=that.data.tempFilePathss;
 for(var i=0;i<tem.length;i++){
   if( e.currentTarget.dataset.id==tem[i]){
       tem.splice(i, 1);
   }
 }
 that.setData({
  tempFilePathss:tem,
 })
},
//  删除旧图片
delect_img_old:function(e){
  var that=this;
   var tem=that.data.goods;
 for(var i=0;i<tem.images.length;i++){
   if( e.currentTarget.dataset.id==tem.images[i].id){
       tem.images.splice(i, 1);
   }
 }
 that.setData({
  goods:tem,
 })
 var ids=[];
 ids.push(e.currentTarget.dataset.id);
 wx.request({
  url: app.globalData.tiltes + 'after_sale_images_del',
  data: {
    id: ids
  },
  method: "post",
  success: function (res) {

  },
  fail: function () {
   
  },
  complete: function (res) {
    wx.showToast({
      title: res.data.info,
      icon: 'none'
    })
  }
});

},

  radioChange: function (e) {
    var that = this;
    that.setData({
      is_return_goods: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log();
    var imgs = [];
    var imgss = [];
    if(e.detail.value.this==1){
      if (e.detail.value.content != '') {
        for (var i = 0; i < that.data.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.tiltes + 'after_sale_upload',
            filePath: that.data.tempFilePaths[i],
            name: 'img',
            formData: e.detail.value,
            success: function (res) {
              var jsonstr = JSON.parse(res.data);
              imgs.push(jsonstr.data.images_id);
            }
          })
        }
        setTimeout(function () {
          wx.request({
            url: app.globalData.tiltes + 'apply_after_sale',
            data: {
              member_id: app.globalData.member_id,
              order_id: that.data.order_id,
              after_image_ids: imgs,
              return_reason: e.detail.value.content,
              is_return_goods: that.data.is_return_goods
            },
            method: "post",
            success: function (res) {
              wx.navigateBack();
            },
            fail: function () {
              wx.request({
                url: app.globalData.tiltes + 'after_sale_images_del',
                data: {
                  id: that.data.order_id,
                },
                method: "post",
                success: function (res) { },
                fail: function () { },
                complete: function (res) { }
              });
            },
            complete: function (res) {
              wx.showToast({
                title: res.data.info,
                icon: 'none'
              })
            }
          });
        }, 1000)
  
      }
      else {
        wx.showToast({
          title: '申请内容不能为空',
          icon: 'none'
        })
      }
    }
    else{
      if (e.detail.value.content != '') {
        for (var i = 0; i < that.data.tempFilePathss.length; i++) {
          wx.uploadFile({
            url: app.globalData.tiltes + 'after_sale_upload',
            filePath: that.data.tempFilePathss[i],
            name: 'img',
            formData: e.detail.value,
            success: function (res) {
              var jsonstr = JSON.parse(res.data);
              imgss.push(jsonstr.data.images_id);
            }
          })
        }
        setTimeout(function () {
          wx.request({
            url: app.globalData.tiltes + 'update_application',
            data: {
              after_sale_id:that.data.after_sale_id,
              member_id: app.globalData.member_id,
              order_id: that.data.order_id,
              after_image_ids: imgss,
              return_reason: e.detail.value.content,
              is_return_goods: that.data.is_return_goods
            },
            method: "post",
            success: function (res) {
              wx.navigateBack();
            },
            fail: function () {
              wx.request({
                url: app.globalData.tiltes + 'after_sale_images_del',
                data: {
                  id: that.data.order_id,
                },
                method: "post",
                success: function (res) { },
                fail: function () { },
                complete: function (res) { }
              });
            },
            complete: function (res) {
              wx.showToast({
                title: res.data.info,
                icon: 'none'
              })
            }
          });
        }, 1000)
  
      }
      else {
        wx.showToast({
          title: '申请内容不能为空',
          icon: 'none'
        })
      }
    }
   

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    that.setData({ height: height });
    that.setData({
      order_id: options.title
    })
    if (options.amend) {
      that.setData({
        amend: options.amend,
        after_sale_id: options.title
      })
      wx.request({
        url: app.globalData.tiltes + 'after_sale_information_return',
        data: {
          'after_sale_id': options.title
        },
        method: "post",
        success: function (res) {

          that.setData({
            goods: res.data.data,
          });
        },
        fail: function () {

        },
        complete: function () {
          wx.hideLoading()
        }

      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'after_sale_order_return',
        data: {
          'id': options.title
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
        success: function (res) {
          that.setData({
            goods: res.data.data,
          });
        },
        fail: function () {

        },
        complete: function () {
          wx.hideLoading()
        }

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
