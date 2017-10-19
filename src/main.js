import Vue from 'vue' //导包下面所有的库和插件都是基于它的
import Mint from 'mint-ui' //ui库,像boostrap一样,可以设置各类样式
import VueRouter from 'vue-router' //路由插件
import VueResource from 'vue-resource' //路由配套
import moment from 'moment' //日期格式化插件

import 'mint-ui/lib/style.css' //导入样式
import './statics/mui/css/mui.css' //导入样式
import './statics/css/site.css' //后导入自己的样式


//全局的过滤器
//dateNew是传到过滤器那边用的名称    input参数1:要格式化的原始时间   dateString 参数2:格式化的字符串
Vue.filter('dateNew', (input, dateString) => {
    const lastString = dateString || 'YYYY-MM-DD HH:mm:ss' //如果没传格式,就用默认后面这种
    return moment(input).format(lastString) //意为把参数1转换成参数2的格式
})


//集成中间件
Vue.use(Mint);
Vue.use(VueRouter) //Vue.propertype.$route能获取html里面的  Vue.propertype.$router动态获取js里面的
Vue.use(VueResource) //Vue.propertype.$http

import App from './App.vue' //导入根组件

//导入组件
import home from './components/home/home.vue'
import category from './components/category/category.vue'
import shopcart from './components/shopcart/shopcart.vue'
import mine from './components/mine/mine.vue'
import newsList from './components/news/newsList.vue'
import infomation from './components/news/infomation.vue'
import photoList from './components/photo/photoList.vue'
import photoInfo from './components/photo/photoInfo.vue'


//配置路由
const router = new VueRouter({
    routes: [
        {path: '/',redirect: '/home'},
        {path: '/home',component: home},
        {path: '/category',component: category},
        {path: '/shopcart',component: shopcart},
        {path: '/mine',component: mine},
        {path: '/news/newsList',component: newsList},
        {path:'/news/infomation/:newsId',component:infomation},
        {path:'/photo/photoList',component:photoList},
        {path:'/photo/photoInfo/:photoId',component:photoInfo}
    ]
})


new Vue({ //创建根实例
    el: '#app',
    // render: function (createElement) {
    //     return createElement(App)
    // }
    router,
    render: h => h(App)
})