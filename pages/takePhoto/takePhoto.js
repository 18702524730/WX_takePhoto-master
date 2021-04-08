// pages/takePhoto/takePhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    hasTakePhoto: false,
    src: "",
    isActive:1,
    btnhg:'',
    isbtn:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isActive){
      this.setData({
        isActive:options.isActive
      })
    }
    var that = this
    that.ctx = wx.createCameraContext()
    // that.canvas = wx.createCanvasContext("image-canvas", this);
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        that.setData({
          width: clientWidth * changeHeight,
          height: clientHeight * changeHeight,
          btnhg:clientHeight * changeHeight-650
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  actab: function(e){
    this.setData({
      isActive:e.currentTarget.dataset['index']
    })
    if(this.data.isActive == 2){
      this.setData({
        btnhg:this.data.height-500
      })
    }else if(this.data.isActive == 4){
      this.setData({
        btnhg:this.data.height-590
      })
    }else{
      this.setData({
        btnhg:this.data.height-650
      })
    }
  },
  /**
   * 拍照
   */
  takePhoto: function() {
    this.setData({
      isbtn:true
    })
    var that = this
    that.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.setStorage({
          key: 'originalImagePath',
          data: res.tempImagePath,
        })
        wx.redirectTo({
          url: 'upload?path=' + res.tempImagePath + '&isActive=' + that.data.isActive
          // url: 'result?filePath=' + res.tempImagePath + '&isActive=' +that.data.isActive
        })
      }
    })
  }


    

})