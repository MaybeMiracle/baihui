const app = getApp()

Page({
  data: {
    scrollTop: 0,
    last_scrollTop: 0,
    toView: 0,
    navActive: 0,
    lastActive: 0,
    s_height: '',
    id: '1',
    height_arr: [],
    category: app.category,
    detail: app.detail
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      toView: id,
      navActive: index
    });
  },
  scroll: function (e) {
    var self = this;

    //self.setData({scrollTop:e.detail.scrollTop});
    //console.log("sd:",self.data.scrollTop);


    //setTimeout(function(){

    //if(self.data.last_scrollTop!=self.data.scrollTop){
    //console.log(self.data.last_scrollTop);
    //self.setData({last_scrollTop:self.data.scrollTop});
    self.scrollmove(self, e, e.detail.scrollTop);
    //}
    // },1000);

  },
  scrollmove: function (self, e, scrollTop) {
    // last_scrollTop=scrollTop;
    var scrollArr = self.data.height_arr;
    if (scrollTop > scrollArr[scrollArr.length - 1] - self.data.s_height) {
      return;
    } else {
      for (var i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          if (0 != self.data.lastActive) {
            self.setData({
              navActive: 0,
              lastActive: 0
            });
          }
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop <= scrollArr[i]) {
          if (i != self.data.lastActive) {
            self.setData({
              navActive: i,
              lastActive: i
            });
          }
        }
      }
    }
  },
  selecttap: function (e) {
    var that = this;
    // app.curid = e.currentTarget.id;
    // app.setlocal('curid', app.curid);
    console.log(e.target.dataset.id)

    wx.navigateTo({
      url: '../inf/inf?id=' + e.target.dataset.id
    });
    //wx.switchTab({ url: '../inf/inf' });
  },
  onLoad: function () {
    var s_height = wx.getSystemInfoSync().windowHeight;
    this.setData({ s_height: s_height });
    this.getHeightArr(this);
  },
  getHeightArr: function (self) {
    var height = 0, height_arr = [], details = self.data.detail, s_height = self.data.s_height;
    for (var i = 0; i < details.length; i++) {
      var last_height = 30 + details[i].length * 90;
      if (i == details.length - 1) {
        last_height = last_height > s_height ? last_height : s_height + 50;
      }
      height += last_height;

      height_arr.push(height);
    }
    self.setData({
      height_arr: height_arr
    });
  }
})
