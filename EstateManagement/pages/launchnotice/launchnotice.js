// EstateManagement/pages/launchnotice/launchnotice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    dates: "",
    content: "",
    descriptionlength: "0",
  },

  // 标题
  titlechoice: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  // 时间
  datechoice: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },

  // 内容
  contentchoice: function (e) {
    this.setData({
      content: e.detail.value,
      descriptionlength: e.detail.value.length,
    })
  },

  // 发布公告
  launch: function (e) {
    const that = this;
    const title = that.data.title;
    const content = that.data.content;
    const dates = that.data.dates;
    const year = dates.substring(0, 4);
    const monthday = dates.substring(5, 10);

    if (title == "" || title == null) {
      wx.showToast({
        title: '未填写公告标题！',
        icon: 'none',
        duration: 1500
      })
    } else if (content == "" || content == null) {
      wx.showToast({
        title: '未填写公告内容！',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定发布？',
        success: function (result) {
          if (result.confirm) {
            wx.cloud.callFunction({
              name: "launchnotice",
              data: {
                title: title,
                content: content,
                year: year,
                monthday: monthday,
                readingvolume: 0,
              },
              success(result) {
                console.log("请求云函数成功", result);
                wx.navigateTo({
                  url: '../noticeadminister/noticeadminister',
                })
                wx.showToast({
                  title: '发布成功！',
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    if (parseInt(month) < 10) {
      month = "0" + month.toString();
    }
    if (parseInt(day) < 10) {
      day = "0" + day.toString();
    }
    this.setData({
      dates: year + "-" + month + "-" + day
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