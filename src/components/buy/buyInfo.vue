<template>
    <div>
        <!-- 1.轮播子组件 -->
        <div class="lunboStyle">
            <subswipe :lunbo_url="'api/getthumimages/'+this.$route.params.goodsId" :lunbo_time="lunbo_time"></subswipe>
        </div>
        <!-- 2.商品信息 -->
        <div class="shopingInfo">
            <h5>{{buyInfo.title}}</h5>
            <p> 市场价:
                <s>{{buyInfo.market_price}}</s> 销售价:
                <span>￥{{buyInfo.sell_price}}</span>
            </p>
            <div class="numberStyle">
                <!-- 插入数字子组件 -->
                <subnumber @changeNumber="getChangeNumber"></subnumber>
            </div>
            <mt-button type="primary" class="buying" size="small" plain>立即购买</mt-button>
            <mt-button type="danger" class="addCar" @click="changeCar" size="small" plain>加入购物车</mt-button>
        </div>
        <!-- 3.商品参数 -->
        <div class="shopingNumber">
            <h6>商品参数</h6>
            <ul>
                <li>商品货号：{{buyInfo.goods_no}}</li>
                <li>库存情况：{{buyInfo.stock_quantity}}</li>
                <li>上架时间：{{buyInfo.add_time}}</li>
            </ul>
        </div>
        <!-- 4.图文介绍和商品评论 -->
        <div class="shopingComment">
            <mt-button type="danger" @click="getphotoInfo" class="photoStyle" size="large" plain>图文介绍</mt-button>
            <mt-button type="danger" @click="getshopComment" class="shopStyle" size="large" plain>商品评论</mt-button>
        </div>

    </div>
</template>
<style scoped>
.lunboStyle,
.shopingInfo,
.shopingNumber,
.shopingComment {
    margin: 10px;
    padding: 6px;
    border: 1px solid rgba(92, 92, 92, 0.3);
    border-radius: 5px;
}

h5 {
    font-size: 16px;
    color: #0094ff;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    padding-bottom: 6px;
}

.shopingInfo p {
    font-size: 14px;
    color: #8f8f94;
}

.shopingInfo span {
    font-size: 16px;
    color: red;
}

.buying {
    color: #fff;
    background-color: #26a2ff;
    margin-top: 15px;
}

.addCar {
    color: #fff;
    background-color: #ef4f4f;
    margin-top: 15px;
}

h6 {
    font-size: 14px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    padding-bottom: 6px;
}

ul {
    margin: 0;
    padding: 0;
}

.shopingNumber li {
    font-size: 14px;
    list-style: none;
}

.photoStyle {
    color: #26a2ff;
    border-color: #26a2ff;
    margin-bottom: 10px;
}
</style>


<script>
//导入公共js
import common from '../../common/common.js'
import bus from '../../common/commonBus.js'
//导入子组件
import subswipe from '../subcomponents/subswipe.vue'
import subnumber from '../subcomponents/subNumber.vue'

export default {
    data() {
        return {
            lunbo_time: 1000,
            buyInfo: {},
            goodscount: 1
        }
    },
    created() {  //生命周期钩子,在这里面可以调用自己写的函数
        this.getbuyInfoData()
    },
    methods: {
        //获取商品详情
        getbuyInfoData() {
            const url = `${common.apihost}api/goods/getinfo/${this.$route.params.goodsId}`
            this.$http.get(url).then(response => {
                this.buyInfo = response.body.message[0]
            }, err => {
                console.log(err)
            })
        },
        //点击图文介绍
        getphotoInfo() {
            // this.$router.push({ path: '/buy/buyPhotoInfo', query: { goodsId: this.$route.params.goodsId } })
            this.$router.push({ name: 'buyPhotoInfo', params: { goodsId: this.$route.params.goodsId } })
        },
        //点击商品评论
        getshopComment() {
            this.$router.push({ path: '/buy/buyShopComment', query: { goodsId: this.$route.params.goodsId } })
        },
        //子组件触发了自定义事件之后，父组件中要执行的函数
        getChangeNumber(count) {
            this.goodscount = count    //存值
        },
        changeCar() {
            bus.$emit('changeToCar', this.goodscount)
            console.log('点击数量上传的值' + this.goodscount)
        }

    },
    components: {
        subswipe,
        subnumber
    }
}



</script>