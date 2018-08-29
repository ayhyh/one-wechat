// pages/detail/index.js
var INFO = wx.getSystemInfoSync();
var App=getApp();
var weToast = require('../../libs/weToast/weToast.js');
var TOAST;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    date: [],
    // _item: '',
    img_url: "/assets/2.jpg",
    picture_author:"NET",
    LOADING: false,
    // 是否已经喜欢
    IS_LIKED: false,
    // 是否是点击分享进来的页面
    IS_SHARE_PAGE: false,
    SCROLL_TOP: 0,
    // 导航栏透明度
    opacity: 0,
    HEIGHT: INFO.windowHeight,
    STATUSBAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    TOAST = new weToast(this);
    // 如果有optios.item，则显示Item，否则加载options.id
    new Promise(RES => {
      if (options.item) {
        return RES(JSON.parse(decodeURIComponent(options.item)));
      } else if (options.id) {
        API.getDataById(options.id).then(RES);
      } else if (options.scene) {
        API.getDataById(options.scene).then(RES);
      }
    }).then(item => {
      this.setData({
        data: item,
        date: item.date.split(' / '),
        // _item: encodeURIComponent(item),
        IS_LIKED: FAV.check(item.id),
        HEIGHT: wx.getSystemInfoSync().windowHeight,
        IS_SHARE_PAGE: getCurrentPages().length === 1
      });
      setTimeout(() => this.setData({ LOADING: false }), 500);
    });

    this.SHARE_IMG = null;
    var that = this;
    //Wlog列表
     
    wx.request({
      url: App.data.servsers + "/"+App.data.id,
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
          data: res.data.extend.msg,
          date: res.data.extend.date
        })
      }

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
   * 返回
   */
  goBackHandler: function () {
    wx.navigateBack({});
  },
  goHomeHandler: function () {
    wx.redirectTo({
      url: '/pages/home/index',
    })
  },
  /**
   * 预览图片
   */
  viewImageHandler: function (e) {

    var { url } = e.currentTarget.dataset;
    wx.previewImage({
      urls: [url],
    })
  },

  /**
   * 复制内容
   */
  copyHandler: function () {
    wx.setClipboardData({
      data: this.data.data.content,
    })
  },

 

  /**
   * 返回顶部
   */
  toTopHandler: function (e) {

    this.setData({
      SCROLL_TOP: 0
    })
  },

  /**
   * 滚动事件
   */
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

  /**
   * 喜欢/取消
   */
  toggleLikeHandler: function (e) {

    var { IS_LIKED, data } = this.data;
    if (IS_LIKED) {
      // 取消
       TOAST.info("不能被您欢真是遗憾！")
    } else {
       TOAST.success("很高兴能得到您的喜欢！")
    }
    this.setData({
      IS_LIKED: !IS_LIKED
    })
  },
})