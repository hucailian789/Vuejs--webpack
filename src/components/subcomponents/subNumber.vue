<template>
    <div>
        <span>购买数量:</span>
        <mt-button @click="cutDown">-</mt-button>
        <mt-button>{{count}}</mt-button>
        <mt-button @click="add">+</mt-button>
    </div>
</template>
<style scoped>

</style>

<script>
//导入公共js
import common from '../../common/common.js'

export default {
    data() {
        return {
            count: 1
        }
    },

    methods: {
        cutDown() {
            if (this.count == 1) {
                return
            }
            this.count--
            this.notify()   //在这里要调用,调用了才能执行
        },
        add() {
            this.count++
            this.notify()   //在这里要调用,调用了才能执行
        },
        notify() {
            this.$emit('changNumber', this.count)
        }
    }
}



</script>
