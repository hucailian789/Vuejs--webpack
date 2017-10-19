<template>
    <div>
        <div class="subInfo">
            <h4>提交评论</h4>
            <!-- ref="textRef"相当于v-model同样可以监听内容变化 -->
            <textarea ref="textRef" cols="30" rows="5" placeholder="请输入评论的内容"></textarea>
            <mt-button type="primary" @click="submitcommon" size="large">提交评论</mt-button>
        </div>
        <div class="commentInfo">
            <h4>评论列表</h4>
            <div class="commentItemStyle" v-for="(item,index) in commonList" :key="index">
                <p class="commentConentStyle">{{item.content}}</p>
                <p class="commentUserAndTimeStyle">
                    <span>{{item.user_name}}</span>
                    <span>{{item.add_time|dateNew('YYYY-MM-DD')}}</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" @click="getMore" class="loadMoreStyle" size="large" plain>加载更多</mt-button>
    </div>
</template>

<style scoped>
.subInfo,
.commentInfo {
    padding: 8px;
}

h4 {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
}

.commentItemStyle {
    height: 100px;
    overflow-y: auto;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
}

.commentConentStyle {
    margin-top: 10px;
    color: black;
    font-size: 14px;
}

.commentUserAndTimeStyle {
    margin-top: 30px;
    color: #0094ff;
    display: flex;
    justify-content: space-between;
}

.loadMoreStyle {
    margin-top: 10px;
}
</style>

<script>
//导入公共js
import common from '../../common/common.js'

import { Toast } from 'mint-ui'; //提示框Toast

export default {
    data() {
        return {
            commonList: [],
            pageIndex: 1

        }
    },
    created() {
        this.getcommonData()
    },
    methods: {
        getcommonData: function() { //先获取数据放到页面上去
            const url = common.apihost + 'api/getcomments/' + this.commonId + '?pageindex=' + this.pageIndex
            this.$http.get(url).then(response => {
                console.log(response.body.message)
                if (this.pageIndex == 1) {
                    if (response.body.message.length == 0) {  //如果没有信息就弹出提示框
                        Toast({
                            message: '还没有沙发，赶快抢占',
                            position: 'bottom',
                            duration: 5000
                        });
                    } else {
                        this.commonList = response.body.message
                    }
                } else {
                    if (response.body.message.length == 0) {  //这里应该要判断等于最后一页时,就提示已经没有.须要后端提供数据
                        Toast({
                            message: '没有了,已经是最后一页',
                            position: 'bottom',
                            duration: 5000
                        });

                    } else {
                        this.commonList = this.commonList.concat(response.body.message)
                    }
                }
            }, err => {
                console.log(err)
            })
        },
        getMore() { //点击加载更多
            this.pageIndex++
            this.getcommonData()
        },
        submitcommon() {//点击提交评论
            const content = this.$refs.textRef.value   //获取textarea的值  v-model 原生js 
            if (content.length == 0) {
                Toast({
                    message: '内容不能为空',
                    position: 'middle',
                    duration: 5000
                });
                return;
            }
            //点击提交时发送请求
            const url = common.apihost + 'api/postcomment/' + this.commonId
            this.$http.post(url, { content: content }, { emulateJSON: true }).then(response => {
                Toast({     //请求成功后,弹出提示框
                    message: response.body.message,
                    position: 'middle',
                    duration: 5000
                });
                this.$refs.textRef.value = "";//提交完成后要清空文本框里的内容
                this.pageIndex = 1;    //重新查询第一页
                this.getcommonData();  //重新刷新页面
            })
        }
    },
    props: ['commonId'] //父组件根据这里的名称传值
}


</script>