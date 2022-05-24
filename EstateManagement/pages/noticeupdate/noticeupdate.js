// EstateManagement/pages/noticeupdate/noticeupdate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeid: "",
    title: "",
    year: "",
    monthday: "",
    content: "",
    dates: "",
    descriptionlength: "",
  },

  // 标题
  titlechange: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  // 时间
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },

  // 内容
  contentchange: function (e) {
    this.setData({
      content: e.detail.value,
      descriptionlength: e.detail.value.length,
    })
  },

  // 更新
  update: function (e) {
    const that = this;
    const year = that.data.dates.substring(0, 4);
    const monthday = that.data.dates.substring(5, 10);
    wx.showModal({
      title: '提示',
      content: '确定更新？',
      success: function (resule) {
        if (resule.confirm) {
          wx.cloud.callFunction({
            name: "noticeupdate",
            data: {
              noticeid: that.data.noticeid,
              title: that.data.title,
              content: that.data.content,
              year: year,
              monthday: monthday,
            },
            success(result) {
              console.log("请求云函数成功", result);
              wx.navigateTo({
                url: '../noticeadminister/noticeadminister',
              })
              wx.showToast({
                title: '更新成功！',
                icon: 'success',
                duration: 1500
              })
            },
            fail(error) {
              console.log("请求云函数失败", error);
            }
          })
        }
      }
    })
  },

  // 删除
  delete: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (result) {
        if (result.confirm) {
          wx.cloud.callFunction({
            name: "noticedelete",
            data: {
              noticeid: that.data.noticeid,
            },
            success(result) {
              console.log("请求云函数成功", result);
              wx.navigateTo({
                url: '../noticeadminister/noticeadminister',
              })
              wx.showToast({
                title: '删除成功！',
                icon: 'success',
                duration: 1500
              })
            },
            fail(error) {
              console.log("请求云函数失败", error);
              wx.showToast({
                title: '删除失败！',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      }
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
    this.setData({
      noticeid: options.noticeid
    })

    wx.cloud.callFunction({
      name: "noticereading",
      data: {
        noticeid: that.data.noticeid,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            title: e.title,
            year: e.year,
            monthday: e.monthday,
            content: e.content,
            dates: e.year + "-" + e.monthday,
            descriptionlength: e.content.length,
          })
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