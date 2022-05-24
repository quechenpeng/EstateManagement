// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputphone: "",
    inputpassword: "",
  },

  // 获取输入的手机
  phone: function (e) {
    // console.log(e.detail.value);
    this.setData({
      inputphone: e.detail.value
    })
  },

  // 获取输入的密码
  password: function (e) {
    // console.log(e.detail.value);
    this.setData({
      inputpassword: e.detail.value
    });
  },

  // 注册
  register: function (e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  // 管理员登录
  administratorlogin: function (e) {
    wx.navigateTo({
      url: '../administratorlogin/administratorlogin',
    })
  },

  // 登录按钮
  LoginRegister: function (options) {
    var that = this;
    // 输入的号码
    const inputphone = this.data.inputphone;
    // 输入的密码
    const inputpassword = this.data.inputpassword;
    // 手机号判断
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

    if (inputpassword == "" || inputpassword == null) {
      wx.showToast({
        title: '密码未填写！',
        icon: 'none',
        duration: 1500
      })
    }
    if (inputphone == "" || inputphone == null) {
      wx.showToast({
        title: '手机号未填写！',
        icon: 'none',
        duration: 1500
      })
    }
    if (inputphone != "" && inputphone != null && inputpassword != "" && inputpassword != null) {
      wx.cloud.callFunction({
        name: "login",
        data: {
          phone: inputphone,
          password: inputpassword
        },
        success(result) {
          console.log("请求云函数成功", result);
          if (result.result.data.length == 1) {
            var app = getApp();
            app.data.phone = inputphone;
            app.data.password = inputpassword;
            wx.redirectTo({
              url: '../personalhomepage/personalhomepage',
            })
            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 1500
            })
          } else {
            that.setData({
              inputpassword: ""
            })
            wx.showToast({
              title: '手机号或密码错误！',
              icon: 'none',
              duration: 1500
            })
          }
        },
        fail(error) {
          console.log("请求云函数失败", error);
        }
      })
      // if (!reg.test(inputphone)) {
      //   wx.showToast({
      //     title: '错误的手机号！',
      //     icon: 'none',
      //     duration: 1500
      //   })
      // } else {
      // }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh();
    wx.hideHomeButton();
    const db = wx.cloud.database();
    const user = db.collection("user");
    user.get().then(result => {
      this.setData({
        user: result.data
      })
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
    wx.hideHomeButton()
    var app = getApp();
    if (app.data.phone != "" && app.data.password != "") {
      wx.redirectTo({
        url: '../personalhomepage/personalhomepage',
      })
    }
    this.setData({
      inputphone: ""
    })
    this.setData({
      inputpassword: ""
    })
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