<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in sidleArray" :key="index">
        <a href="item.url"><img :src="item.img" alt="图片正在加载中"></a>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <!-- "../news/newsList.vue" 这个跳转的地址不能这样写,这样写就加载不出来-->
          <router-link to="news/newsList">
            <span class="mui-icon mui-icon-home"></span>
            <div class="mui-media-body">新闻咨询</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="photo/photoList">
            <span class="mui-icon mui-icon-email">
              <span class="mui-badge">5</span>
            </span>
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-chatbubble"></span>
            <div class="mui-media-body">商品购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-location"></span>
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-search"></span>
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-phone"></span>
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>

      </ul>
    </div>

  </div>
</template>

<style scoped>
.mint-swipe {
  height: 250px;
}

img {
  width: 100%;
  height: 250px;
}

.mint-swipe-indicator {
  background: green;
  opacity: 1;
}


/* 2.0 九宫格布局样式 */

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
  content: "";
}

.mui-grid-view.mui-grid-9 .mui-media {
  background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}

.mui-icon {
  width: 50px;
  height: 50px;
}

.mui-icon-home {
  background-image: url(../../statics/images/menu3.png);
  background-repeat: round;
}

.mui-icon-email {
  background-image: url(../../statics/images/menu4.png);
  background-repeat: round;
}

.mui-icon-chatbubble {
  background-image: url(../../statics/images/menu5.png);
  background-repeat: round;
}

.mui-icon-location {
  background-image: url(../../statics/images/menu6.png);
  background-repeat: round;
}

.mui-icon-search {
  background-image: url(../../statics/images/menu9.png);
  background-repeat: round;
}

.mui-icon-phone {
  background-image: url(../../statics/images/menu10.png);
  background-repeat: round;
}
</style>
  

<script>

//导入公共的模块

import common from '../../common/common.js'

export default ({
  data: function() {
    return {
      sidleArray: []  //初始化数据
    }
  },
  created() {    //Vue框架会在我们的home.vue创建完毕之后自动调用
    this.getSidleData();
  },
  methods: {
    getSidleData: function() {  //获取轮播数据的方法
      const url = common.apihost + "api/getlunbo"
      this.$http.get(url).then(response => {    //发送网络请求
        this.sidleArray = response.body.message
      }, err => {
        console.log(err)
      })
    }
  }
})


</script>