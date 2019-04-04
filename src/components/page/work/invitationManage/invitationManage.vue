<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="搜索选项" class="handle-select mr10">
                    <el-option key="1" value="领取手机号"></el-option>
                    <el-option key="2" value="渠道"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectTab">
                <el-menu-item index="1">未注册</el-menu-item>
                <el-menu-item index="2">已注册</el-menu-item>
            </el-menu>
            <tableColumn  v-if="activeIndex==1" :tableArr="okTableArr" :tableData="tableData" :total="100" @change="handleCurrentChange"></tableColumn>
            <tableColumn  v-if="activeIndex==2" :tableArr="notTableArr" :tableData="tableData" :total="100" @change="handleCurrentChange"></tableColumn>
        </div>
    </div>
</template>
<script>
import { list } from '@/service/serviceLcm';
import tableColumn from '../../../encapsulation/table';
export default {
    name: 'invitationManage',
    components: {
        tableColumn
    },
    data() {
        return {
            url: '../../../../../static/vuetable.json',
            tableData: [],
            cur_page: 1,
            select_cate: '',
            select_word: '',
            is_search: false,
            activeIndex: '1', //tab默认
            // 注册表格的配置属性
            okTableArr: [{
                prop: 'date',
                label: '领取时间',
            },{
                prop: 'phone',
                label: '领取手机号',
            },{
                prop: 'address',
                label: '渠道',
            }],
            // 未注册表格的配置属性
            notTableArr: [{
                prop: 'date',
                label: '领取时间',
            },{
                prop: 'datetime',
                label: '注册时间',
            },{
                prop: 'phone',
                label: '注册手机号',
            },{
                prop: 'address',
                label: '渠道',
            }],
        }
    },
    created() {
        this.getData();
    },
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            list(this.cur_page).then(data => {
                this.tableData = data.list;
            })
        },
        search() { //搜索
            this.is_search = true;
        },
        formatter(row, column) {
            return row.address;
        },
        handleSelectTab(index) {
            this.activeIndex = index;
        },
    }
}

</script>
<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.del-dialog-cnt {
    font-size: 16px;
    text-align: center
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.addButton {
    float: right;
}

.handleMore {
    float: right;
}

</style>
