<template>
    <div>
        <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea">
        </el-input>
        <div style="margin: 10px 0px;">
            <el-radio-group v-model="radio2">
                <el-radio :label="1">所有用户</el-radio>
                <el-radio :label="2">7天未登录用户</el-radio>
            </el-radio-group>
            <el-button type="primary" style="float: right;">发送</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            textarea: '',
            radio2: 1
        }
    },
    methods: {
        
    }
}

</script>
<style scoped>
</style>
