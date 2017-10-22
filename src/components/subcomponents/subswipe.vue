<template>
    <div>
        <!-- 轮播子组件 -->
        <mt-swipe :auto="lunbo_time">
            <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
                <a :href="item.url"><img :src="item.src" alt="图片正在加载中"></a>
            </mt-swipe-item>
        </mt-swipe>
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
</style>

<script>
//导入公共js
import common from '../../common/common.js'

export default {
    data() {
        return {
            lunboArray: []
        }
    },
    props: ['lunbo_url', 'lunbo_time'],
    created() {
        // console.log(this.lunbo_url)
        this.getSidleData()
    },
    methods: {
        getSidleData: function() {  //获取轮播数据的方法
            const url = `${common.apihost}${this.lunbo_url}`
            this.$http.get(url).then(response => {    //发送网络请求
                response.body.message.forEach(item => {
                    if (item.img) {
                        item.src = item.img
                    }
                });
                this.lunboArray = response.body.message
            }, err => {
                console.log(err)
            })
        }
    }
}

</script>