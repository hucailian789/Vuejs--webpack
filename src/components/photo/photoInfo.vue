<template>
  <div>
    <!-- 1.标题部分 -->
    <div class="titStyle">
      <!-- 只有一个数据的时候直接用对象点出值就可以了 -->
      <h5>{{textInfo.title}}</h5>
      <p>{{textInfo.add_time | dateNew("YYYY-MM-DD")}}&nbsp;&nbsp;{{textInfo.click}}次浏览</p>
    </div>
    <!-- 2.缩略图 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-sm-3" v-for="(item,index) in imgInfo" :key="index">
          <a href="#">
            <img :src="item.src" alt="">
          </a>
        </li>
      </ul>
    </div>
    <!-- 3.内容部分 -->
    <div class="contentStyle">
      <p v-html="textInfo.content"></p>
    </div>
    <!-- 4.评论子组件 -->
    <subcommon :commonId="this.$route.params.photoId"></subcommon>
  </div>
</template>
<style scoped>
h5 {
  color: #0094ff;
  font-size: 16px;
}

.titStyle,
.contentStyle {
  padding: 8px;
}

img {
  width: 100px;
  height: 100px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  padding: 11px;
}
</style>
<script>
//导入公共js
import common from '../../common/common.js'

//导入子组件
import subcommon from '../subcomponents/subcommon.vue'
export default {
  data() {
    return {
      textInfo: {},   //返回一条数据的时候,直接用对象
      imgInfo: []
    }
  },
  created() {
    this.getTextInfoData()
    this.getImgInfoData()

  },
  methods: {
    getTextInfoData() {
      const url = common.apihost + 'api/getimageInfo/' + this.$route.params.photoId
      this.$http.get(url).then(response => {
        console.log(response.body.message)
        this.textInfo = response.body.message[0]    //只返回一个对象的时候就下标直接取数
      }, err => {
        console.log(err)
      })
    },
    getImgInfoData() {
      const url = common.apihost + 'api/getthumimages/' + this.$route.params.photoId
      this.$http.get(url).then(response => {
        console.log(response.body.message)
        this.imgInfo = response.body.message
      }, err => {
        console.log(err)
      })
    }
  },
  components: {  //注入子组件名称
    subcommon
  }
}

</script>