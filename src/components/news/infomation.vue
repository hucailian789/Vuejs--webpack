<template>
    <!-- {{$route.params.newsId}}用它可以获取传过来的id -->
    <div>
        <div class="newsInfo">
            <h5>{{infomation.title}}</h5>
            <p>{{infomation.add_time}}&nbsp;&nbsp;{{infomation.click}}次浏览&nbsp;&nbsp;分类:民生经济</p>
        </div>
        <div class="newsContent">
            <p v-html="infomation.content"></p>
        </div>
        <!-- 这里放评论子组件 -->
        <subcommon :commonId="this.$route.params.newsId"></subcommon>
    </div>
</template>
<style scoped>
.newsIfo {
    border-bottom: 1px solid rgba(92, 92, 92, 0.6);
}

h5 {
    line-height: 20px;
    font-size: 16px;
    font-weight: 900;
    color: #0094ff;
}
</style>
<script>
//导入公共样式
import common from '../../common/common.js'

//导入评论子组件
import subcommon from '../subcomponents/subcommon.vue'

export default {
    data() {
        return {
            infomation: []
        }
    },
    created() {
        this.getInfoData()
    },
    methods: {
        getInfoData() {
            // this.$route.params.newsId参数要用这个来获取路由传过来的id
            const url = common.apihost + 'api/getnew/' + this.$route.params.newsId
            this.$http.get(url).then(response => {                
                this.infomation = response.body.message[0]
            }, err => {
                console.log(err)
            })
        }
    },
    components: {    //注入子组件名称
        subcommon
    }
}
</script>