// EstateManagement/pages/activityupdate/activityupdate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityid: "",
    title: "",
    year: "",
    monthday: "",
    content: "",
    src: "",
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

  // 图片
  srcchange: function (e) {
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
              src: result.fileID
            })
            wx.cloud.getTempFileURL({
              fileList: [result.fileID],
              success(result) {
                console.log(result)
                result.fileList.forEach(function (e) {
                  that.setData({
                    src: e.tempFileURL
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
            name: "activityupdate",
            data: {
              activityid: that.data.activityid,
              title: that.data.title,
              content: that.data.content,
              src: that.data.src,
              year: year,
              monthday: monthday,
            },
            success(result) {
              console.log("请求云函数成功", result);
              wx.navigateTo({
                url: '../activityadminister/activityadminister',
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
            name: "activitydelete",
            data: {
              activityid: that.data.activityid,
            },
            success(result) {
              console.log("请求云函数成功", result);
              wx.navigateTo({
                url: '../activityadminister/activityadminister',
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
      activityid: options.activityid
    })
    wx.cloud.callFunction({
      name: "activityreading",
      data: {
        activityid: that.data.activityid,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            title: e.title,
            year: e.year,
            monthday: e.monthday,
            content: e.content,
            src: e.src,
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