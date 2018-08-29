var INFO = wx.getSystemInfoSync();
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    opacity: 0,
    LOADING: true,
    img_url: "/assets/1.jpg",
    SCROLL_TOP: 0,
    header_text: "一句顶万句",
    STATUSBAR_HEIGHT: INFO.statusBarHeight
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    //Wlog列表
    wx.request({
      url: App.data.servsers,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: function (res) {
        //这样赋值现在是不能将数据传走的，必须使用setData()方法
        //that.data.items = res.data ;
        //官方文档指出必须使用setData()方法才能将数据传走
        that.setData({
          data: res.data.extend.msg
        })
      }

    })
  
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onPullDownRefresh();
    this.showWlogList();
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
  onPullDownRefresh: function (e) {
    const LOADING=this;
    setTimeout(function () {
      LOADING.setData({
        LOADING:false
      })
    }, 1000)
    
  },
  showWlogList:function(e){


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },



  /**
   * 卡片点击事件
   */
  addPushHandler: function (e) {
    App.data.id = e.target.dataset.item.title;
    wx.navigateTo({
      // url: '/pages/detail/index?item=' + encodeURIComponent(JSON.stringify(item)),
      url: '/pages/detail/index'
    });
  },

  scrollHandler: function (e) {
    var { scrollTop } = e.detail;
    // 计算透明度
    var opacity = parseFloat(scrollTop / 250).toFixed(2);
    if (opacity > 1) opacity = 1;
    if (opacity < 0.1) opacity = 0;
    // 这里设置<300是减少setData次数，节省内存
    if (scrollTop < 300) {
      this.setData({
        opacity
      })
    }
  },

  gotoSetting: function () {
    wx.navigateTo({
      url: '/pages/setting/index',
    })
  },

  /**
   * 返回顶部
   */
  toTopHandler: function (e) {
    this.setData({
      SCROLL_TOP: 0
    })
  }
})