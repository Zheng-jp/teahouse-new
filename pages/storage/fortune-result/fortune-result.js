// pages/fortune-result.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pixelRatio: 0,
    windowWidth: 0,
    windowHeight: 0,
    objData: null
  },

  returnIndex: () => {
    // 关闭跳转
    wx.redirectTo({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let arr = wx.getStorageSync('currentFortuneData') || {};
    this.setData({
      objData: arr
    })

    wx: wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawCanvas();
  },

  drawCanvas: function () {
    const fs = wx.getFileSystemManager();
    let ctx = wx.createCanvasContext('myCanvas');
    // 画布宽高
    let ctxW = this.data.windowWidth * 0.9;
    console.log(ctxW)
    // let ctxH = this.data.windowHeight - 80;
    let ctxH = 700;
    // 默认像素比
    let pixelRatio = this.data.pixelRatio;
    // 屏幕系数比，以设计稿375*667（iphone7）为例
    let XS = this.data.windowWidth / 375;
    console.log(XS)
    // 垂直渐变
    const grd = ctx.createLinearGradient(0, 0, 0, ctxH);
    grd.addColorStop(0, '#fff');
    // grd.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
    ctx.setFillStyle(grd);

    ctx.fillRect(0, 0, ctxW, ctxH);

    wx.getImageInfo({
      src: 'https://qiniu.siring.com.cn/008aa201910251109148603.jpeg', //服务器返回的图片地址
      success: function(res) {
        console.log(res);
        ctx.drawImage(res.path, 0, 0, ctxW * XS, ctxW * XS);
        ctx.draw(true);
        //启动图片计数器
        
      },
      fail: function(res) {
        //失败回调
        console.error(res)
      }
    });
    // ctx.drawImage(this.data.objData.goods_image, 0, 0, ctxW * XS, ctxW * XS);
    // ctx.drawImage('../../logs/images/bg.png', 0, 0, ctxW * XS, ctxW * XS);
    ctx.setFontSize(18 * XS);
    ctx.setFillStyle('#000');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(this.data.objData.parts_goods_name, ctxW / 2, ctxW * XS + 30);

    ctx.setTextAlign('left');
    ctx.setTextBaseline('middle');
    ctx.setFontSize(14 * XS);
    ctx.setFillStyle('#949494');
    this.fontLineFeed(ctx, this.data.objData.goods_describe, 21, 18 * XS, 20, ctxW * XS + 50);

    ctx.beginPath()
    ctx.arc(0, ctxW * XS + 115, 10, 0, 2 * Math.PI)
    ctx.setFillStyle('rgba(0,0,0,0)')
    ctx.fill()
    ctx.arc(ctxW, ctxW * XS + 115, 10, 0, 2 * Math.PI)
    ctx.setFillStyle('rgba(0,0,0,0.5)')
    ctx.fill()

    ctx.beginPath()
    ctx.setLineDash([10, 15], 10);
    ctx.moveTo(0, ctxW * XS + 115);
    ctx.lineTo(375, ctxW * XS + 115);


    ctx.setFontSize(14 * XS);
    ctx.setFillStyle('#000');
    ctx.setTextAlign('left');
    ctx.setTextBaseline('middle');
    ctx.fillText('长按识别小程序  立即免费存茶', ctxW - 220 * XS, ctxW * XS + 150);

    ctx.setFontSize(14 * XS);
    ctx.setFillStyle('#949494');
    ctx.setTextAlign('left');
    ctx.setTextBaseline('middle');
    var str1 = `您的好友"${this.data.objData.user_account_name}"，免费送给您的存茶，快快笑纳吧！`;
    this.fontLineFeed(ctx, str1, 14, 18 * XS, ctxW - 220 * XS, ctxW * XS + 155);

    ctx.setFontSize(12 * XS);
    ctx.setFillStyle('#000');
    ctx.setTextAlign('left');
    ctx.setTextBaseline('middle');
    var str2 = `分享来自${this.data.objData.store_name}(有效期${this.formatDate(this.data.objData.end_time)})`;
    ctx.fillText(str2, ctxW - 220 * XS, ctxW * XS + 215);

    ctx.stroke();
    //菊花码
    var str = this.data.objData.share_code;
    str = str.split('base64,')[1];
    fs.writeFile({
      filePath: `${wx.env.USER_DATA_PATH}/qrcode.png`,
      data: str,
      encoding: 'base64',
      success(res) {
        // 在成功的回调函数中，定义的FilePath的值就可以直接拿去绘制到画布上了
        ctx.drawImage(`${wx.env.USER_DATA_PATH}/qrcode.png`, 20, ctxW * XS + 140, 80 * XS, 80 * XS)
        ctx.draw();
        // 后续各种绘制操作
      },
      fail(e) {
        console.error(e)
      }
    })
  },
  // 文字换行
  /**
   * ctx,画布对象
   * str,需要绘制的文字
   * splitLen,切割的长度字符串
   * strHeight,每行文字之间的高度
   * x,位置
   * y
   */
  fontLineFeed: function (ctx, str, splitLen, strHeight, x, y, ctxw) {
    let strArr = [];
    for (let i = 0, len = str.length / splitLen; i < len; i++) {
      strArr.push(str.substring(i * splitLen, i * splitLen + splitLen));
    }
    let s = 0;
    for (let j = 0, len = strArr.length; j < len; j++) {
      s = s + strHeight;
      ctx.fillText(strArr[j], x, y + s);
    }
  },
  //字符串转base64
  // encode: function (r) {
  //   for (var e, a, t, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, h = r.length, d = ""; c < h;) {
  //     if (e = 255 & r.charCodeAt(c++), c == h) {
  //       d += o.charAt(e >> 2), d += o.charAt((3 & e) << 4), d += "==";
  //       break;
  //     }
  //     if (a = r.charCodeAt(c++), c == h) {
  //       d += o.charAt(e >> 2), d += o.charAt((3 & e) << 4 | (240 & a) >> 4), d += o.charAt((15 & a) << 2),
  //         d += "=";
  //       break;
  //     }
  //     t = r.charCodeAt(c++), d += o.charAt(e >> 2), d += o.charAt((3 & e) << 4 | (240 & a) >> 4),
  //       d += o.charAt((15 & a) << 2 | (192 & t) >> 6), d += o.charAt(63 & t);
  //   }
  //   return d;
  // },
  formatDate: function (inputTime) {
    var date = new Date(inputTime * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + m + d;
  },
  // 保存图片
  saveImage: function (e) {

    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
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
    return {
      title: '赠送',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'loading',
          duration: 2000
        })
      }
    }
  }
})