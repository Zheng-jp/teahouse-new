// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab: {
      type: Number,
      value: 0, 
  },
  nav:{
    type: Array,
    value: [],
  },
    share:{
    type: Array,
    value: [],
    },
    seach_list: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
 
  

  /**
   * 组件的方法列表
   */
  methods: {
    data: {

    },
    
    tab_slide: function (e) {//滑动切换tab 
      var that = this;
      that.setData({ tab: e.detail.current });
    },
    tab_click: function (e) {//点击tab切换
      var that = this;
      //  点击添加类
      if (that.data.nav.tab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          tab: e.target.dataset.current
        })
      }
    },
    // 点击搜索
    onChangeShowState: function () {
      var that = this;
      that.setData({
        showView: (!that.data.showView)
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
 


  }
  
})
