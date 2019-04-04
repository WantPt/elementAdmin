<template>
    <el-breadcrumb class="breadcrumb"> <!-- separator="/"  -->
        <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
    </el-breadcrumb>
</template>

<script>
export default {
    data () {
        return {
            levelList: []
        }
    },
    methods: {
        
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created(){
        this.getBreadcrumb()
    },
    methods:{
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            const first = matched[0];
            if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
                matched = [{ path: '/informationManage', meta: { title: '资讯管理' }}].concat(matched)
            }
            this.levelList = matched
        }
    }
}
</script>

<style scoped>
.breadcrumb{
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
}
</style>


