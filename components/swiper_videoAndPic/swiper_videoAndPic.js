// components/swiper_videoAndPic/swiper_videoAndPic.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mediaData: {
      type: Object,
      value: {},
    },
    autoplayVideo: {
      type: Boolean,
      value: false,
    },
    autoplaySwiper: {
      type: Boolean,
      value: false,
    },
    loop_T: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoIds: []
  },
  lifetimes: {
    attached() {
      if (this.data.mediaData.video.length > 1) {
        this.setData({
          autoplayVideo: false,
        })
      }
    },
    ready() {
      let _this = this;
      const queryEle = wx.createSelectorQuery().in(this);
      queryEle.selectAll('.video').boundingClientRect(function (res) {
        console.log(res);
        if (res.length) {
          res.forEach(item => {
            _this.data.videoIds.push(item.id)
          })
        }
        _this.setData({
          videoIds: _this.data.videoIds,
        })
      }).exec();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      if (this.data.videoIds.length) {
        this.data.videoIds.forEach(item => {
          this.videoContext = wx.createVideoContext(item, this)
          this.videoContext.pause();
        })
        this.setData({
          autoplayVideo: false
        })
      }
    },
    // 点击播放视频
    handlePlay(e){
      console.log(e);
      this.setData({
        autoplaySwiper:false,
      })
    },
    // 点击暂停
    handlePause(e){
      console.log(e);
      this.setData({
        autoplaySwiper:true,
      })
    }
  }
})