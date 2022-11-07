// pages/home/index.js
var amapFile = require('../../utils/amap-wx');
var myAmapFun = new amapFile.AMapWX({key:'fd586be05b42b4368a7341b5ae45f9eb'});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // markers: [],
    inputShowed: false,
    inputVal: '',
  },

  showInput() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      inputShowed: false,
    });
  },
  clearInput() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    // var myAmapFun = new amapFile.AMapWX({key:'fd586be05b42b4368a7341b5ae45f9eb'});

    that.setData({
      'latitude': wx.getStorageSync('latitude'),
      'longitude': wx.getStorageSync('longitude'),
    })

    myAmapFun.getRegeo({
      success: function(res) {
        console.log(res)
        that.setData({
          'markers': res,
          city: wx.getStorageSync('city')
        })
      },
      fail: function(info) {
        console.log(info)
      }
    })
  },

  inputTyping: function (e) {
    console.log(e)
    if (e.detail.value == "") {
      this.setData({
        inputVal: "",
        tips: []
      });
    } else {
      this.setData({
        inputVal: e.detail.value
      });
  
      // 触发调用高德地图
      this.keyword(e.detail.value)
    }
  },

  // 根据输入的关键字，调用高德地图 API
  keyword: function(keyword) {
    var that = this
    myAmapFun.getInputtips({
      keywords: keyword,
      location: that.data.longitude+','+that.data.latitude,
      success: function(res) {
        console.log('tips', res)
        if (res && res.tips) {
          that.setData({
            tips: res.tips
          })
        }
      }
    })
  },
  goRoute: function(e) {
    if (e.currentTarget.dataset.poilocation != "") {
      wx.navigateTo({
        url: '/pages/route/walking?poilocation='+e.currentTarget.dataset.poilocation,
      })
    }
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