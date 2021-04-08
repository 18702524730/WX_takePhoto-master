// pages/takePhoto/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath:'',
    isload:false,
    rescode:'',
    point:'',
    isActive:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      filePath:options.filePath,
      isActive:options.isActive
    })
    this.checkInfo(options.filePath,options.isActive)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  tolink(){
    wx.redirectTo({
      url: 'takePhoto?isActive=' +this.data.isActive
    })
  },
  checkInfo(k,p){
    let that = this
    that.setData({
      isload:true
    })
    console.log(p)
    wx.uploadFile({
      url: 'https://testtools.ipsebe.com/qy/checkInfo', 
      filePath: k,
      name: 'qryimg',
      formData: {
        qryimgtype: p
      },
      success(res) {
        that.setData({
          isload:false,
          rescode:JSON.parse(res.data).resultcode,
          point:JSON.parse(res.data).point,
        })
      },
      fail:function(e){
        that.setData({
          isload:false
        })
        wx.showToast({
          title: '出错啦...',
          icon: 'loading'
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})