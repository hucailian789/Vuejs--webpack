<template>
    <div>
        <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in buyList" :key="item.id">
                    <router-link :to="'/buy/buyInfo'+item.id">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">
                            <div class="titleStyle">{{item.title}}</div>
                            <div class="priceStyle">
                                <span>{{item.sell_price}}</span>
                                <s>{{item.market_price}}</s>
                            </div>
                            <div class="stockStyle">
                                <span>热卖中</span>
                                <span>{{item.stock_quantity}}件</span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.titleStyle {
    font-size: 12px;
    color: black;
    height: 30px;
    text-align: left;
}
ul .mui-table-view-cell .mui-media-body{
    height: 100px;
}
.priceStyle,
.stockStyle {
    background-color: #f0f0f0;
    height: 35px;
    line-height: 35px;
}

.priceStyle span {
    font-size: 16px;
    color: red;
}

.priceStyle s {
    font-size: 15px;
    color: #333;
}

.stockStyle span {
    justify-content: space-between;
    font-size: 12px;
}
</style>

<script>
//导入公共js
import common from '../../common/common.js'

export default {
    data() {
        return {
            buyList: []
        }
    },
    created() {
        this.getbuyListData()
    },
    methods: {
        getbuyListData() {
            const url = common.apihost + 'api/getgoods'
            this.$http.get(url).then(response => {
                console.log(response.body.message)
                this.buyList = response.body.message
            }, err => {
                console.log(err)
            })
        }
    }
}

</script>
