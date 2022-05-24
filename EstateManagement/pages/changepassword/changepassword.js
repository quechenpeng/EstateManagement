// pages/changepassword/changepassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
    oldpassword: "",
    newpassword: "",
    userid: ""
  },

  // 获取旧密码
  oldpassword: function (e) {
    this.setData({
      oldpassword: e.detail.value
    })
  },

  // 获取新密码
  newpassword: function (e) {
    this.setData({
      newpassword: e.detail.value
    })
  },

  // 修改按钮
  changepassword: function (e) {
    var that = this;
    var oldpassword = this.data.oldpassword;
    var newpassword = this.data.newpassword;
    var _id = this.data.userid;
    if (oldpassword == "" || oldpassword == null) {
      wx.showToast({
        title: '密码信息为空！',
        icon: 'none',
        duration: 1500
      })
    }
    if (newpassword == "" || newpassword == null) {
      wx.showToast({
        title: '密码信息为空！',
        icon: 'none',
        duration: 1500
      })
    }
    if (oldpassword != "" && oldpassword != null && newpassword != "" && newpassword != null) {

      wx.cloud.callFunction({
        name: "login",
        data: {
          phone: that.data.phone,
          password: oldpassword,
        },
        success(result) {
          console.log("请求云函数成功", result);
          if (result.result.data.length == 0) {
            wx.showToast({
              title: '密码错误！',
              icon: 'none',
              duration: 1500
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '确定修改？',
              success: function (result) {
                if (result.confirm) {
                  wx.cloud.callFunction({
                    name: "changepassword",
                    data: {
                      userid: that.data.userid,
                      password: newpassword
                    },
                    success(result) {
                      console.log("请求云函数成功", result);
                      var app = getApp();
                      app.data.phone = that.data.phone;
                      app.data.password = newpassword;
                      wx.redirectTo({
                        url: '../personalhomepage/personalhomepage',
                      })
                      wx.showToast({
                        title: '修改成功！',
                        icon: 'success',
                        duration: 1500
                      })
                      that.setData({
                        oldpassword: "",
                        newpassword: ""
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
    var that = this
    var app = getApp()
    this.setData({
      phone: app.data.phone
    })
    this.setData({
      password: app.data.password
    })
    const db = wx.cloud.database();
    const user = db.collection("user");
    user.where({
      phone: that.data.phone,
      password: that.data.password
    }).get().then(result => {
      result.data.forEach(function (e) {
        that.setData({
          userid: e._id
        })
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