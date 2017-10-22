<template>
    <div>
        <h4>{{photoInfo.title}}</h4>
        <div class="contentStyle" v-html="photoInfo.content"></div>
      
    </div>
</template>
<style scoped>

</style>

<script>
import common from '../../common/common.js'   //导入公共js

export default {
    data() {
        return {
            photoInfo: {}
        }
    },
    created() {        
        this.photoInfoData()
    },
    methods: {
        photoInfoData() {
            // 获取商品的图文介绍数据
            const url = `${common.apihost}api/goods/getdesc/${this.$route.params.goodsId}`
            this.$http.get(url).then(response => {
                console.log(response.body.message)
                this.photoInfo = response.body.message[0]
            })
        }
    }
}
</script>