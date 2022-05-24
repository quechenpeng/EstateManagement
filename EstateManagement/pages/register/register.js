Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
    confirmpassword: ""
  },

  // 获取手机号
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取密码
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 获取确认密码
  confirmpassword: function (e) {
    this.setData({
      confirmpassword: e.detail.value
    })
  },

  // 注册
  register: function (e) {
    const that = this;
    const phone = this.data.phone;
    const password = this.data.password;
    const confirmpassword = this.data.confirmpassword;

    if (phone == "" || phone == null) {
      wx.showToast({
        title: '未填写手机号！',
        icon: 'none',
        duration: 1500
      })
    } else if (password == "" || password == null) {
      wx.showToast({
        title: '未填写密码！',
        icon: 'none',
        duration: 1500
      })
    } else if (confirmpassword == "" || confirmpassword == null) {
      wx.showToast({
        title: '未填写确认密码！',
        icon: 'none',
        duration: 1500
      })
    } else if (password != confirmpassword) {
      wx.showToast({
        title: '两次填写的密码不符！',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.cloud.callFunction({
        name: "registerrepeat",
        data: {
          phone: phone,
        },
        success(result) {
          console.log("请求云函数成功", result);
          if (result.result.data.length == 1) {
            wx.showToast({
              title: '手机号已存在！',
              icon: 'none',
              duration: 1500
            })
            that.setData({
              phone: "",
              password: "",
              confirmpassword: ""
            })
          } else {
            wx.cloud.callFunction({
              name: "register",
              data: {
                phone: phone,
                password: password,
                headportraitsrc: "https://i.loli.net/2021/03/27/H4d6rX7yPjE1TgJ.jpg",
                nickname: "可爱的住户",
                truename: "",
                building: "",
                floor: "",
                number: ""
              },
              success(result) {
                console.log("请求云函数成功", result);
                wx.showToast({
                  title: '注册成功！',
                  icon: 'success',
                  duration: 1500
                })
                that.setData({
                  phone: "",
                  password: "",
                  confirmpassword: ""
                })
                wx.navigateTo({
                  url: '../personalhomepage/personalhomepage',
                })
                var app = getApp();
                app.data.phone = phone;
                app.data.password = password;
              },
              fail(error) {
                console.log("请求云函数失败", error);
              }
            })
          }
        },
        fail(error) {
          console.log("请求云函数失败", error);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh();
    wx.hideHomeButton();
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