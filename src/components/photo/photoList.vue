<template>
    <div>
        <div class="titleContent">
            <!-- 导航栏 -->
            <ul class="navBar">
                <li @click="getImageData(0)">全 部</li>
                <li @click="getImageData(item.id)" v-for="item in photoList" :key="item.id">{{item.title}}</li>
            </ul>
        </div>
        <!-- 图片区 -->
        <div class="photo">
            <ul>
                <li v-for="res in imageList" :key="res.id">
                    <!-- 凡事动态改变id的,在to前面一定要加:号 -->
                    <router-link :to="'/photo/photoInfo/'+res.id">
                        <img :src="res.img_url" alt="">
                        <p>
                            <span>{{res.title}}</span>
                            {{res.zhaiyao}}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>

/* 加上这两个样式就可以隐藏滚动条了 */
.titleContent{
    overflow: auto;
}
.titleContent::-webkit-scrollbar{   
    width:0;
}
.navBar {
    list-style: none;
    white-space: nowrap;
    overflow-x: auto;
    padding: 0px 0px 15px 0px;
    margin: 3px 0px;
    -webkit-padding-start: 5px;
    -webkit-margin-end: 5px;
}

.navBar li {
    color: #0094ff;
    font-size: 16px;
    line-height: 20px;
    display: inline-block;
    margin-left: 5px;
}

.photo ul {
    padding: 3px;
}

.photo li {
    position: relative;
    padding: 5px;
}

img {
    width: 100%;
    height: 400px;
}

p {
    width: 97%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    bottom: 0px;
    padding: 5px;
    color: #fff;
    font-size: 14px;
}

span {
    font-size: 16px;
    font-weight: 900;
    display: block;
}
</style>

<script>

//导入公共js
import common from '../../common/common.js'
//导入提示框
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            photoList: [],
            imageList: []
        }
    },
    created() {
        this.getPhotoListData()
        this.getImageData(0)
    },
    methods: {
        getPhotoListData() {
            const url = common.apihost + 'api/getimgcategory'
            this.$http.get(url).then(response => {
                this.photoList = response.body.message
            }, err => {
                console.log(err)
            })
        },
        getImageData(cateid) {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            const url = common.apihost + 'api/getimages/' + cateid
            this.$http.get(url).then(response => {
                Indicator.close();
                this.imageList = response.body.message
            }, err => {
                Indicator.close();

            })
        }
    }
}
</script>