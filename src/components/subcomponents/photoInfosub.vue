<template>
  <!-- 2.缩略图的子组件 -->
  <div class="mui-content">
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-sm-3" v-for="(item,index) in imgInfo" :key="index">
        <a href="#">
          <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, imgInfo)">
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  padding: 11px;
}
</style>

<script>
//导入公共js
import common from '../../common/common.js'

export default {
  data() {
    return {
      imgInfo: []
    }
  },
  created() {
    this.getImgInfoData()
  },
  methods: {
    getImgInfoData() {
      // const url = common.apihost + 'api/getthumimages/' + this.$route.params.photoId
      const url = `${common.apihost}api/getthumimages/${this.$route.params.photoId}`   //es6的字符串模板格式,不用拼接字符串
      this.$http.get(url).then(response => {
        // const arr = [];       //声明一个空数组
        // this.imgInfo = response.body.message
        // this.imgInfo.forEach(function(v, i) {    //循环遍历数组,放到空数组里面.
        //   arr[i] = {
        //     src: v.src,
        //     w: 600,
        //     h: 400
        //   }
        // });
        // this.imgInfo = arr;     //这样就等于把它转换成另一种格式
        response.body.message.forEach(item=> {    //循环遍历数组,因为里面只有一个src属性,所以要加两个w,h.属性
          item.w=400,         //w,h都要设置,最好一样,这样可以解决图片中的小bug..这个宽高是代表图片预览时候的大小.
          item.h=400
        });
         this.imgInfo = response.body.message
      }, err => {
        console.log(err)
      })
    }
  },
  props: ['photoId'] //父组件根据这里的名称传值
}
</script>

