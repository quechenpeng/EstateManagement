// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
    headportraitsrc: "",
    nickname: "",
    userid: "",
  },

  // 编辑个人信息
  editinformation: function (e) {
    wx.navigateTo({
      url: '../editinformation/editinformation',
    })
  },

  // 更换头像
  chooseheadportrait: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (result) {
        // console.log(result)
        let path = result.tempFilePaths[0]
        wx.cloud.uploadFile({
          cloudPath: 'userheadportrait/' + Math.floor(Math.random() * 1000000) + '.png',
          filePath: path,
          success: (result) => {
            // console.log("图片上传成功", result)
            that.setData({
              headportraitsrc: result.fileID
            })
            wx.cloud.getTempFileURL({
              fileList: [result.fileID],
              success(result) {
                // console.log(result)
                result.fileList.forEach(function (e) {
                  wx.cloud.callFunction({
                    name: "personalhomepageheadportrait",
                    data: {
                      userid: that.data.userid,
                      headportraitsrc: e.tempFileURL
                    },
                    success(result) {
                      console.log("请求云函数成功", result);
                      wx.showToast({
                        title: '更换头像成功！',
                        icon: 'success',
                        duration: 1500
                      })
                    },
                    fail(error) {
                      console.log("请求云函数失败", error);
                    }
                  })
                })
              }
            })
          },
          fail: (error) => {
            console.log("图片上传失败", error)
          }
        })
      },
    })
  },

  // 设备报修
  reportrepair: function () {
    wx.navigateTo({
      url: '../reportrepair/reportrepair',
    })
  },

  // 我的报修
  myreportrepair: function () {
    wx.navigateTo({
      url: '../myreportrepair/myreportrepair',
    })
  },

  // 修改密码
  changepassword: function () {
    wx.navigateTo({
      url: '../changepassword/changepassword',
    })
  },

  // 退出登录
  clear: function () {
    var app = getApp();
    app.data.phone = "";
    app.data.password = "";
    wx.switchTab({
      url: '../index/index',
    })
  },

  // 回到首页
  backhome: function () {
    wx.switchTab({
      url: '../index/index',
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
    wx.hideHomeButton()
    var that = this
    var app = getApp()
    this.setData({
      phone: app.data.phone
    })

    this.setData({
      password: app.data.password
    })

    wx.cloud.callFunction({
      name: "login",
      data: {
        phone: that.data.phone,
        password: that.data.password,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            headportraitsrc: e.headportraitsrc,
            nickname: e.nickname,
            userid: e._id,
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
    wx.hideHomeButton()
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