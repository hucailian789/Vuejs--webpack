<template>
    <!-- 评论子组件 -->
    <subcommon :commonId="this.$route.params.goodsId"></subcommon>
</template>
<style scoped>

</style>

<script>
//导入子组件
import subcommon from '../subcomponents/subcommon.vue'

export default {
    components: {  //注入子组件名称
        subcommon

    }
}


</script>