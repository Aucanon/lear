// pages/camera/index.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    background: ['/static/images/1.jpg',
    '/static/images/2.jpg',
    '/static/images/3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    // 扫描结果
    scanResult: ""
  },

  goUser: () => {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 跳转到摄像头拍照页面
  bindGoCamera: function() {
    wx.navigateTo({
      url: '/pages/camera/test'
    })
  },

  // 调用扫一扫接口
  bindScan: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          scanResult: res.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})