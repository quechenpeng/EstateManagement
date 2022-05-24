// EstateManagement/pages/userreading/userreading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    building: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
      ["1", "2", "3", "4", "5", "6"],
      ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
    ],
    userid: "",
    phone: "",
    truename: "",
    nickname: "",
    headportraitsrc: "",
    b: "",
    f: "",
    n: "",
  },

  // 手机号
  phonechange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 姓名
  truenamechange: function (e) {
    this.setData({
      truename: e.detail.value
    })
  },

  // 昵称
  nicknamechange: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 头像
  headportraitsrcchange: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (result) {
        // console.log(result)
        let path = result.tempFilePaths[0]
        wx.cloud.uploadFile({
          cloudPath: 'activityimage/' + Math.floor(Math.random() * 1000000) + '.png',
          filePath: path,
          success: (result) => {
            // console.log("图片上传成功", result)
            that.setData({
              headportraitsrc: result.fileID
            })
            wx.cloud.getTempFileURL({
              fileList: [result.fileID],
              success(result) {
                console.log(result)
                result.fileList.forEach(function (e) {
                  that.setData({
                    headportraitsrc: e.tempFileURL
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

  // 楼栋
  buildingchange: function (e) {
    // console.log(e.detail.value);
    // console.log(e.detail.value[0]);
    // console.log(e.detail.value[1]);
    // console.log(e.detail.value[2]);
    this.setData({
      b: this.data.building[0][e.detail.value[0]]
    })
    this.setData({
      f: this.data.building[1][e.detail.value[1]]
    })
    this.setData({
      n: this.data.building[2][e.detail.value[2]]
    })
  },

  // 修改信息
  updatemessage: function (e) {
    const that = this;
    const building = that.data.b.toString();
    const floor = that.data.f.toString();
    const number = that.data.n.toString();
    wx.showModal({
      title: '提示',
      content: '确定修改？',
      success: function (result) {
        if (result.confirm) {
          wx.cloud.callFunction({
            name: "userupdate",
            data: {
              userid: that.data.userid,
              phone: that.data.phone,
              truename: that.data.truename,
              nickname: that.data.nickname,
              building: building,
              floor: floor,
              number: number,
              headportraitsrc: that.data.headportraitsrc,
            },
            success(result) {
              console.log("请求云函数成功", result);
              wx.navigateTo({
                url: '../useradminister/useradminister',
              })
              wx.showToast({
                title: '修改成功！',
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
      userid: options.userid
    })
    wx.cloud.callFunction({
      name: "userreading",
      data: {
        userid: that.data.userid,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            phone: e.phone,
            truename: e.truename,
            nickname: e.nickname,
            headportraitsrc: e.headportraitsrc,
            b: e.building,
            f: e.floor,
            n: e.number,
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