<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="搜索选项" class="handle-select mr10">
                    <el-option key="1" value="马甲名称"></el-option>
                    <el-option key="2" value="马甲ID"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button @click="$refs.vestManagemodel.addRobotform.show=true" class="addButton">新建</el-button>
            </div>
            <tableColumn :tableArr="tableArr" :tableData="data" :total="100" :btnArr="btnArr" @change="handleCurrentChange" @viewpointBtn="gotoNav('vestManageNewViewpoint')" @problemBtn="problemBtn" @commentBtn="commentBtn" @eidtBtn="gotoNav('vestManageNewEidt')"></tableColumn>
        </div>
        <vestManagemodel ref="vestManagemodel"></vestManagemodel>
    </div>
</template>
<script>
import tableColumn from '../../../encapsulation/table';
import vestManagemodel from './vestManagemodel';//弹框的模版页面
import { list } from '@/service/serviceLcm';
export default {
    name: 'vestManage',
    components: {
        tableColumn,
        vestManagemodel
    },
    data() {
        return {
            url: '../../../../../static/vuetable.json',
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            // 表格的配置属性
            tableArr: [{
                prop: 'id',
                label: 'ID',
                align: 'center',
                width: 80
            }, {
                prop: 'imgUrl',
                label: '头图',
                align: 'center',
                type: 'img',
                width: 100
            }, {
                prop: 'name',
                label: '真实姓名',
                align: 'center',
            }, {
                prop: 'address',
                label: '公司',
            }, {
                prop: 'job',
                label: '职位',
                align: 'center',
            }, {
                prop: 'gd',
                label: '观点',
                align: 'center',
            }, {
                prop: 'wt',
                label: '问题',
                align: 'center',
            }, ],
            // 表格点击事件的配置
            btnArr: [{
                label: '发观点',
                key: 'viewpointBtn'
            }, {
                label: '发问题',
                key: 'problemBtn'
            }, {
                label: '发评论',
                key: 'commentBtn',
                left: 0
            }, {
                label: '编辑',
                key: 'eidtBtn'
            }],
        }
    },
    computed: {
        data() {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.name === this.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    return d;
                }
            })
        }
    },
    created() {
        this.getData();
    },
    methods: {
        clickUpData(data) {
            console.log(data)
        },
        // 前往想去的页面
        gotoNav(url) {
            this.$router.push({ name: url })
        },
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

        problemBtn(scope) { //发问题
            this.$refs.vestManagemodel.problemform.show = true
            console.log(scope)
        },
        commentBtn(scope) { //发评论
            this.$refs.vestManagemodel.viewpointform.show = true;
            console.log(scope)
        },
        handleDelete(index, row) { //删除
            this.idx = index;
            this.delVisible = true;
        },
        handleSelectionChange(val) { //表格选中
            this.multipleSelection = val;
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
