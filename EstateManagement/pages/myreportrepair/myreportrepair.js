// pages/myreportrepair/myreportrepair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '已创建', '待处理', '已处理'],
    currentTab: 0,
    userid: "",
    all: [],
    created: [],
    pending: [],
    processed: [],
    alllength: "0",
    createdlength: "0",
    pendinglength: "0",
    processedlength: "0",
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
    var that = this;
    var app = getApp();

    // 全部
    wx.cloud.callFunction({
      name: "login",
      data: {
        phone: app.data.phone,
        password: app.data.password,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            userid: e._id
          })
        })
        wx.cloud.callFunction({
          name: "myreportrepairall",
          data: {
            userid: that.data.userid,
          },
          success(result) {
            console.log("请求云函数成功", result);
            that.setData({
              all: result.result.data.reverse(),
              alllength: result.result.data.length,
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
      name: "login",
      data: {
        phone: app.data.phone,
        password: app.data.password,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            userid: e._id
          })
        })
        wx.cloud.callFunction({
          name: "myreportrepairallstate",
          data: {
            userid: that.data.userid,
            state: "已创建"
          },
          success(result) {
            console.log("请求云函数成功", result);
            that.setData({
              created: result.result.data.reverse(),
              createdlength: result.result.data.length,
            })
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
      name: "login",
      data: {
        phone: app.data.phone,
        password: app.data.password,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            userid: e._id
          })
        })
        wx.cloud.callFunction({
          name: "myreportrepairallstate",
          data: {
            userid: that.data.userid,
            state: "待处理"
          },
          success(result) {
            console.log("请求云函数成功", result);
            that.setData({
              pending: result.result.data.reverse(),
              pendinglength: result.result.data.length,
            })
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
      name: "login",
      data: {
        phone: app.data.phone,
        password: app.data.password,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            userid: e._id
          })
        })
        wx.cloud.callFunction({
          name: "myreportrepairallstate",
          data: {
            userid: that.data.userid,
            state: "已处理"
          },
          success(result) {
            console.log("请求云函数成功", result);
            that.setData({
              processed: result.result.data.reverse(),
              processedlength: result.result.data.length,
            })
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