// pages/takePhoto/takePhoto.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    width:0,
    height:0,
    tempFilePath: "",
    changeHeight:'',
    gap:'',
    isActive:'',
    isload:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.path = options.path
    that.setData({
      isActive:options.isActive
    })
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth
        var height = res.windowHeight
        let changeHeight = 750 / width;
        if(that.data.isActive==2){
          var gap = 75 / changeHeight
        }else if(that.data.isActive==4){
          var gap = 275 / changeHeight
        }else{
          var gap = 245 / changeHeight
        }
        that.setData({
          width:width,
          height:height,
          gap: gap,
          changeHeight: changeHeight
        })
        wx.getImageInfo({
          src: that.path,
          success: function(res){
            that.canvas = wx.createCanvasContext("image-canvas", that)
            //过渡页面中，图片的路径坐标和大小
            that.canvas.drawImage(that.path, 0, 0, that.data.width, that.data.height)
            wx.showLoading({
              title: '数据处理中',
              mask: true
            })
            that.canvas.setStrokeStyle('#fff')
            // 这里有一些很神奇的操作,总结就是MD拍出来的照片规格居然不是统一的
            //过渡页面中，对裁剪框的设定
            if(that.data.isActive == 2){
              that.canvas.strokeRect(that.data.gap, 400/that.data.changeHeight, 600/that.data.changeHeight, 200/that.data.changeHeight)
            }else if(that.data.isActive == 4){
              that.canvas.strokeRect(that.data.gap, 400/that.data.changeHeight, 200/that.data.changeHeight, 200/that.data.changeHeight)
            }else{
              that.canvas.strokeRect(that.data.gap, 400/that.data.changeHeight, 260/that.data.changeHeight, 260/that.data.changeHeight)
            }
            that.canvas.draw()
            var timer = setTimeout(function () {
              if(that.data.isActive == 2){
                wx.canvasToTempFilePath({//裁剪对参数
                  canvasId: "image-canvas",
                  x: that.data.gap,//画布x轴起点
                  y: 400/that.data.changeHeight,//画布y轴起点
                  width: 600/that.data.changeHeight,//画布宽度
                  height: 200/that.data.changeHeight,//画布高度
                  destWidth: 600,//输出图片宽度
                  destHeight: 200,//输出图片高度
                  canvasId: 'image-canvas',
                  success: function (res) {
                    that.filePath = res.tempFilePath
                    //清除画布上在该矩形区域内的内容。
                    // that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                    // that.canvas.drawImage(that.filePath, that.data.gap, 400/that.data.changeHeight, 600/that.data.changeHeight, 200/that.data.changeHeight)
                    // that.canvas.draw()
                    wx.hideLoading()
                    clearTimeout(timer)
                    wx.redirectTo({
                      url: 'result?filePath=' + that.filePath + '&isActive=' +that.data.isActive
                    })
                    //在此可进行网络请求
                  },
                  fail:function(e){
                    wx.hideLoading()
                    clearTimeout(timer)
                    wx.showModal({
                      title: '提示',
                      content: '采集的图像信息不满足质量要求！',
                      confirmText:'重新查验',
                      cancelText:'取消',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('重新查验')
                          wx.redirectTo({
                            url: 'takePhoto?isActive=' +that.data.isActive
                          })
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                });
              }else if(that.data.isActive == 4){
                wx.canvasToTempFilePath({//裁剪对参数
                  canvasId: "image-canvas",
                  x: that.data.gap,//画布x轴起点
                  y: 400/that.data.changeHeight,//画布y轴起点
                  width: 200/that.data.changeHeight,//画布宽度
                  height: 200/that.data.changeHeight,//画布高度
                  destWidth: 200,//输出图片宽度
                  destHeight: 200,//输出图片高度
                  canvasId: 'image-canvas',
                  success: function (res) {
                    that.filePath = res.tempFilePath
                    //清除画布上在该矩形区域内的内容。
                    // that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                    // that.canvas.drawImage(that.filePath, that.data.gap, 400/that.data.changeHeight, 320/that.data.changeHeight, 320/that.data.changeHeight)
                    // that.canvas.draw()
                    wx.hideLoading()
                    clearTimeout(timer)
                    wx.redirectTo({
                      url: 'result?filePath=' + that.filePath + '&isActive=' +that.data.isActive
                    })
                    //在此可进行网络请求
                  },
                  fail:function(e){
                    wx.hideLoading()
                    clearTimeout(timer)
                    wx.showModal({
                      title: '提示',
                      content: '采集的图像信息不满足质量要求！',
                      confirmText:'重新查验',
                      cancelText:'取消',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('重新查验')
                          wx.redirectTo({
                            url: 'takePhoto?isActive=' +that.data.isActive
                          })
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                });
              }else{
                wx.canvasToTempFilePath({//裁剪对参数
                  canvasId: "image-canvas",
                  x: that.data.gap,//画布x轴起点
                  y: 400/that.data.changeHeight,//画布y轴起点
                  width: 260/that.data.changeHeight,//画布宽度
                  height: 260/that.data.changeHeight,//画布高度
                  destWidth: 260,//输出图片宽度
                  destHeight: 260,//输出图片高度
                  canvasId: 'image-canvas',
                  success: function (res) {
                    that.filePath = res.tempFilePath
                    //清除画布上在该矩形区域内的内容。
                    // that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                    // that.canvas.drawImage(that.filePath, that.data.gap, 400/that.data.changeHeight, 320/that.data.changeHeight, 320/that.data.changeHeight)
                    // that.canvas.draw()
                    wx.hideLoading()
                    clearTimeout(timer)
                    wx.redirectTo({
                      url: 'result?filePath=' + that.filePath + '&isActive=' +that.data.isActive
                    })
                    //在此可进行网络请求
                  },
                  fail:function(e){
                    wx.hideLoading()
                    clearTimeout(timer)
                    wx.showModal({
                      title: '提示',
                      content: '采集的图像信息不满足质量要求！',
                      confirmText:'重新查验',
                      cancelText:'取消',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('重新查验')
                          wx.redirectTo({
                            url: 'takePhoto?isActive=' +that.data.isActive
                          })
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                });
              }
            }, 1500);
          }
        })
      }
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})