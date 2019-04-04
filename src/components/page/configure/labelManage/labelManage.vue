<template>
    <div class="table">
        <div class="container">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectTab">
                <el-menu-item index="1">行业标签</el-menu-item>
                <el-menu-item index="2">职位标签</el-menu-item>
                <el-menu-item index="3">身份标签</el-menu-item>
                <el-button @click="eidtform.show = true" class="addButton">新建</el-button>
            </el-menu>
            <tableColumn :tableArr="tableArr" :tableData="tableData" :total="100" :btnArr="btnArr" @delBtn="delBtn" @change="handleCurrentChange"></tableColumn>
        </div>
        <!-- 新增 编辑弹出框 -->
        <fromTypeDialog ref="fromData" @on-input="clickUpData" :value="eidtform" :columns="eidtColumns"></fromTypeDialog>
    </div>
</template>
<script>
import fromTypeDialog from '../../../encapsulation/from-type-dialog';
import tableColumn from '../../../encapsulation/table';
import { list } from '@/service/serviceLcm';
export default {
    name: 'labelManage',
    components: {
        fromTypeDialog,tableColumn
    },
    data() {
        return {
            url: '../../../../../static/vuetable.json',
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            // 表格的配置属性
            tableArr: [{
                prop: 'name',
                label: '标签名',
                align: 'center',
            }],
            // 表格点击事件的配置
            btnArr: [{
                label: '删除',
                key: 'delBtn',
                icon: 'el-icon-delete',
                popoverFlag: true,
                popoverTxt: '是否确定删除？',
                style:{
                    color:'#ff0000 !important'
                }
            }],
            form: {
                name: '',
                textarea: '',
                user: '',
                project: ''
            },
            // 新增编辑的弹框
            eidtform: {
                lableName: '',
                show: false,
                title: '新建观点'
            },
            eidtColumns: [{
                title: '标签名',
                key: 'lableName',
                type: 'text',
                required: true,
            }],
            activeIndex: '1', //tab默认
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
        clickUpData(data) {
            console.log(data)
        },
        delBtn(val) { //删除
            this.tableData.splice(val.$index, 1);
            console.log(val)
        },
        handleSelectTab(index) { //选中index
            //console.log(index) 1 2
            this.activeIndex = index;
        },
    }
}

</script>
<style scoped>
.handle-box {
    margin-top: 20px;
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
    margin-top: 15px;
}

.handleMore {
    float: right;
}

</style>
