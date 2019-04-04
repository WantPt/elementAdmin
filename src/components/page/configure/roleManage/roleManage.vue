<template>
    <div class="table">
        <div class="container">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectTab">
                <el-menu-item index="1">启用中</el-menu-item>
                <el-menu-item index="2">已停用</el-menu-item>
                <el-button @click="form.show=true,form.title='新建'" class="addButton">新建</el-button>
            </el-menu>
            <tableColumn :tableArr="tableArr" :tableData="data" :total="100" :btnArr="btnArr" @change="handleCurrentChange" @configBtn="configBtn" @eidtBtn="eidtBtn" @stopBtn="stopBtn" @openBtn="openBtn"></tableColumn>
            <fromTypeDialog ref="fromData" @on-input="clickUpData" :value="form" :columns="formColumns"></fromTypeDialog>
            <el-dialog title="管理" :visible.sync="configViewpoint" width="800px" center>
                <div class="del-dialog-cnt" style="text-align: left;">
                    <tableColumn :tableArr="dialogTableArr" :tableData="data" :total="100" :btnArr="dialogBtnArr" @delBtn="delBtn" :pagination="false"></tableColumn>
                    <div style="margin-top:15px">
                        <el-input placeholder="请输入内容" v-model="addUser" clearable style="width: 500px;">
                            <template slot="prepend">添加用户</template>
                        </el-input>
                        <el-button type="primary">确定</el-button>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="configViewpoint = false">取 消</el-button>
                    <el-button type="primary" @click="editViewBtn">保 存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import fromTypeDialog from '../../../encapsulation/from-type-dialog';
import tableColumn from '../../../encapsulation/table';
import { list } from '@/service/serviceLcm';
export default {
    name: 'roleManage',
    components: {
        fromTypeDialog,
        tableColumn
    },
    data() {
        return {
            url: '../../../../../static/vuetable.json',
            tableData: [],
            cur_page: 1,
            del_list: [],
            delVisible: false,
            editViewpoint: false,
            configViewpoint: false,
            activeIndex: '1', //tab默认
            eidtTit: '编辑',
            addUser: '',
            // table的配置
            // 表格的配置属性
            tableArr: [{
                prop: 'id',
                label: 'ID',
                align: 'center',
                width: 80
            }, {
                prop: 'name',
                label: '角色名称',
                align: 'center',
                width: 180
            }, {
                prop: 'address',
                label: '权限模块',
            }],
            // 表格点击事件的配置
            btnArr: [{
                label: '配置',
                key: 'configBtn',
                icon: 'el-icon-setting',

            }, {
                label: '编辑',
                key: 'eidtBtn',
                icon: 'el-icon-edit'
            }, {
                label: '停用',
                key: 'stopBtn',
                icon: 'el-icon-warning',
                popoverFlag: true,
                popoverTxt: '是否确定停用？'
            }],
            // 弹框表格的基础配置
            dialogTableArr: [{
                prop: 'id',
                label: '用户ID',
                align: 'center',
                width: 80
            }, {
                prop: 'name',
                label: '用户名称',
                align: 'center',
                width: 180
            }, {
                prop: 'address',
                label: '权限模块',
            }],
            // 表格点击事件的配置
            dialogBtnArr: [{
                label: '删除',
                key: 'delBtn',
                icon: 'el-icon-delete',
                popoverFlag: true,
                popoverTxt: '是否确定删除？'
            }],
            form: {
                checkList: [],
                name: '',
                show: false,
                title: '提示',
                width: '800px'
            },
            formColumns: [{
                title: '角色名称',
                key: 'name',
                type: 'text',
                required: true,
            }, {
                title: '权限模块',
                key: 'checkList',
                type: 'check',
                required: true,
                ckeckNum: 6,
                checkArr: [
                    { name: '资讯管理' },
                    { name: '融资服务' },
                    { name: '项目管理' },
                    { name: '擂台管理' },
                    { name: '问题管理' },
                    { name: '观点管理' },
                    { name: '漂流瓶管理' },
                    { name: '用户管理' },
                    { name: '邀请处理' },
                    { name: '标签管理' },
                    { name: '马甲管理' },
                    { name: '系统消息' },
                    { name: '角色管理' }
                ]
            }, ]
        }
    },
    created() {
        this.getData();
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
    methods: {
        // 编辑和新增的提交
        editViewBtn() {
            console.log(this.form)
        },
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            // this.$axios.get(this.url, {
            //     page: this.cur_page
            // }).then((res) => {
            //     this.tableData = res.data.list;
            // })
            list(this.cur_page).then(data => {
                this.tableData = data.list;
            })
        },
        handleSelectTab(index) {
            this.activeIndex = index;
            let obj = {}
            if (index == 1) {
                obj = {
                    label: '停用',
                    key: 'stopBtn',
                    icon: 'el-icon-warning',
                    popoverFlag: true,
                    popoverTxt: '是否确定停用？'
                }
            } else {
                obj = {
                    label: '启用',
                    key: 'openBtn',
                    icon: 'el-icon-success',
                    popoverFlag: true,
                    popoverTxt: '是否确定启用？'
                }
            }
            this.btnArr[2] = obj;
            this.$set(this.btnArr, 0, this.btnArr[0])

        },
        // 确定删除
        deleteRow() {
            this.$message.success('执行成功！');
            this.delVisible = false;
        },
        // 配置的点击事件
        configBtn(val) {
            this.configViewpoint = true;
            console.log(val)
        },
        // 编辑的点击事件
        eidtBtn(val) {
            this.form.show = true;
            this.form.title = '编辑';
            console.log(val)
        },
        // 停用的点击事件
        stopBtn(val) {
            this.delVisible = true;
            console.log(val)
        },
        // 启用的点击事件
        openBtn(val) {
            this.delVisible = true;
            console.log(val)
        },
        // 删除的点击事件
        delBtn(val) {
            console.log(val)
        },
        clickUpData(data) {
            console.log(data)
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
    margin-top: 15px;
}

.handleMore {
    float: right;
}

</style>
