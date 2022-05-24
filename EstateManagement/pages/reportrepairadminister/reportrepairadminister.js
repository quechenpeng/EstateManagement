// EstateManagement/pages/reportrepairadminister/reportrepairadminister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '已创建', '待处理', '已处理'],
    currentTab: 0,
    all: [],
    created: [],
    pending: [],
    processed: [],
    alllength: 0,
    createdlength: 0,
    pendinglength: 0,
    processedlength: 0,
  },

  // 顶部导航
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.stopPullDownRefresh();
    // 全部的长度
    wx.cloud.database().collection("reportrepair").count().then(result => {
      this.setData({
        alllength: result.total
      })
    })
    // 已创建的长度
    wx.cloud.database().collection("reportrepair").where({
      state: "已创建"
    }).count().then(result => {
      this.setData({
        createdlength: result.total
      })
    })
    // 待处理的长度
    wx.cloud.database().collection("reportrepair").where({
      state: "待处理"
    }).count().then(result => {
      this.setData({
        pendinglength: result.total
      })
    })
    // 已处理的长度
    wx.cloud.database().collection("reportrepair").where({
      state: "已处理"
    }).count().then(result => {
      this.setData({
        processedlength: result.total
      })
    })
    var that = this;
    // 全部
    wx.cloud.callFunction({
      name: "reportrepairadministerall",
      success(result) {
        console.log("请求云函数成功", result);
        that.setData({
          all: result.result.data.reverse(),
        })
        wx.hideLoading();
      },
      fail(error) {
        console.log("请求云函数失败", error);
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 1500
        })
      }
    })
    // 已创建
    wx.cloud.callFunction({
      name: "reportrepairadministerstate",
      data: {
        state: "已创建",
      },
      success(result) {
        console.log("请求云函数成功", result);
        that.setData({
          created: result.result.data.reverse(),
        })
        wx.hideLoading();
      },
      fail(error) {
        console.log("请求云函数失败", error);
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 1500
        })
      }
    })
    // 待处理
    wx.cloud.callFunction({
      name: "reportrepairadministerstate",
      data: {
        state: "待处理",
      },
      success(result) {
        console.log("请求云函数成功", result);
        that.setData({
          pending: result.result.data.reverse(),
        })
        wx.hideLoading();
      },
      fail(error) {
        console.log("请求云函数失败", error);
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 1500
        })
      }
    })
    // 已处理
    wx.cloud.callFunction({
      name: "reportrepairadministerstate",
      data: {
        state: "已处理",
      },
      success(result) {
        console.log("请求云函数成功", result);
        that.setData({
          processed: result.result.data.reverse(),
        })
        wx.hideLoading();
      },
      fail(error) {
        console.log("请求云函数失败", error);
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 1500
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
    this.onLoad();
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