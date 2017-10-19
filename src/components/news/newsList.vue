<template>
    <div class="mui-content">
        <!-- 图文列表 http://www.dcloud.io/hellomui/examples/media-list.html-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <!-- <router-link to="/infomation/:item.id">不能这样写,to前面要加:号绑定-->
                <router-link :to="'/news/infomation/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <p class="tit">{{item.title}}</p>
                        <p class='mui-ellipsis'>
                            <!-- dateNew('YYYY-MM-DD HH:mm')也可以自己传格式 ,可以不传用默认的-->
                            <span>{{item.add_time | dateNew}}</span>
                            <span>点击了{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.mui-table-view-cell {
    height: 80px;
}

.mui-table-view .mui-media-object {
    line-height: 65px;
    max-width: 65px;
    height: 65px;
}

.tit {
    font-size: 14px;
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    /*  这两个要配合用才会有...号 */
    white-space: nowrap;
}

.mui-ellipsis {
    font-size: 12px;
    color: #0094ff;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>

<script>

//导入公共模块
import common from '../../common/common.js'

export default ({
    data() {
        return {
            newsList: []
        }
    },
    created() {
        this.getNewsListData()
    },
    methods: {
        getNewsListData() {
            const url = common.apihost + 'api/getnewslist'
            this.$http.get(url).then(response => {
                console.log(response.body.message);
                this.newsList = response.body.message
            }, err => {
                console.log(err)
            })
        }
    }
})

</script>