<template>
  <div>
    <!-- 1.标题部分 -->
    <div class="titStyle">
      <!-- 只有一个数据的时候直接用对象点出值就可以了 -->
      <h5>{{textInfo.title}}</h5>
      <p>{{textInfo.add_time | dateNew("YYYY-MM-DD")}}&nbsp;&nbsp;{{textInfo.click}}次浏览</p>
    </div>
    <!-- 2.缩略图 子组件-->
    <photoInfosub :photoId="this.$route.params.photoId"></photoInfosub>
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
</style>
<script>
//导入公共js
import common from '../../common/common.js'

//导入子组件
import subcommon from '../subcomponents/subcommon.vue'
import photoInfosub from '../subcomponents/photoInfosub.vue'

export default {
  data() {
    return {
      textInfo: {} //返回一条数据的时候,直接用对象      
    }
  },
  created() {
    this.getTextInfoData()
  },
  methods: {
    getTextInfoData() {
      const url = common.apihost + 'api/getimageInfo/' + this.$route.params.photoId
      this.$http.get(url).then(response => {
        this.textInfo = response.body.message[0]    //只返回一个对象的时候就下标直接取数
      }, err => {
        console.log(err)
      })
    }
  },
  components: {  //注入子组件名称
    subcommon,
    photoInfosub
  }
}

</script>