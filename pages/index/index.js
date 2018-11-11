//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 全局变量的获取
    test: app.data.test,
    // 轮播图图片地址数据
    image: [
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
    ],
    circular: 'true',
    indicatorDots: 'true',
    interval:'2000',
    autoplay:'true',
    // 小喇叭图片地址
    laba:'img/u206.png',
    // 关闭图片地址
    close:'img/close.png',
    // 更多图片地址
    more:'img/more.png',
  // 商品信息
    routers: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling:[
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png'
        
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png',
        jiage: '￥120.0/片'
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png',
        jiage: '￥120.0/片'
      },
     
      {
        name: 'Python',
        url: '/pages/Course/course',
        icon: 'img/u160.jpg',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png',
        jiage: '￥120.0/片'
      },
    
    ],
    // 分享信息
    share: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        hot:'HOT',
        classification: '特点活动',
        share_content:"20180809马连道茶话会报名参加中马2018080中20180809马连道茶话会报名参加中连道进......",
        validity:'长期',

      }
    ]

    },

    

 
})
