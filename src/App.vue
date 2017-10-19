<template>
    <div>
        <!-- 头部 -->
        <mt-header fixed title="Vue-mmm"></mt-header>
        <div class="backPro" v-show="isShowBack" @click="goBack">&lt;返回</div>
        <!-- 中间动态路由 -->
        <router-view class="centerContent"></router-view>

        <!-- 底部 动态绑定类:class="isShowBack ? 'hideTabBar':''如果要隐藏就让类为true,如果不隐藏就为空-->
        <mt-tabbar fixed :class="isShowBack ? 'hideTabBar':''">
            <mt-tab-item>
                <router-link to="/home">
                    <img src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
                </router-link>
            </mt-tab-item>
            <mt-tab-item>
                <router-link to="/category">
                    <img src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
                </router-link>
            </mt-tab-item>
            <mt-tab-item>
                <router-link to="/shopcart">
                    <img src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
                </router-link>
            </mt-tab-item>
            <mt-tab-item>
                <router-link to="/mine">
                    <img src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
                </router-link>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<!-- scoped代表样式私有，只能在当前组件中使用 -->
<style scoped>
.mint-tabbar>.mint-tab-item.is-selected {
    background-color: white;
}

img {
    width: 42px;
    height: 35px;
}

.centerContent {
    margin-top: 40px;
}

/* 返回按钮样式 */

.backPro {
    position: fixed;
    font-size: 14px;
    left: 8px;
    top: 10px;
    z-index: 99;
}

/* 底部隐藏 ,动态改变显示或隐藏*/
.hideTabBar {
    display: none;
}
</style>

<script>
export default {
    data() {
        return {
            isShowBack: false
        }
    },
    created() {
        this.isShoworHide(this.$route.path)     //然后利用路由监听后就自动触发这个指令.
    },
    methods: {
        goBack() {
            this.$router.go(-1)     // 后退一步记录，等同于 history.back()
        },
        isShoworHide(path){             //写一个函数做判断,如果路由的值没有home,就显示底部,并隐藏返回按钮
             if (path != '/home') {
                this.isShowBack = true
            } else {
                this.isShowBack = false
            }
        }
    },
    watch: {    //通过watch方法来监控路由的变化
        $route: function(newVul, oldVul) {  
           this.isShoworHide(newVul.path)       //给上面的函数传值
        }
    }
}
</script>
