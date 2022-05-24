// EstateManagement/pages/administratorlogin/administratorlogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    administratoraccount: "admin",
    administratorpassword: "admin",
  },

  // 账号
  administratoraccountchange: function (e) {
    this.setData({
      administratoraccount: e.detail.value
    })
  },

  // 密码
  administratorpasswordchange: function (e) {
    this.setData({
      administratorpassword: e.detail.value
    })
  },

  // 管理员登录
  administratorlogin: function (e) {
    const administratoraccount = this.data.administratoraccount;
    const administratorpassword = this.data.administratorpassword;
    if (administratoraccount == "" || administratoraccount == null) {
      wx.showToast({
        title: '未填写账号！',
        icon: 'none',
        duration: 1500
      })
    } else if (administratorpassword == "" || administratorpassword == null) {
      wx.showToast({
        title: '未填写密码！',
        icon: 'none',
        duration: 1500
      })
    } else if (administratoraccount == "admin" && administratorpassword == "admin") {
     wx.navigateTo({
       url: '../administrator/administrator',
     })
      wx.showToast({
        title: '欢迎管理员！',
        icon: 'success',
        duration: 1500
      })
    } else {
      wx.showToast({
        title: '账号或密码错误！',
        icon: 'none',
        duration: 1500
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh();
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