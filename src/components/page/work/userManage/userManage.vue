<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="搜索选项" class="handle-select mr10">
                    <el-option key="1" value="用户名称"></el-option>
                    <el-option key="2" value="用户ID"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                
                <span style="color:#909399;margin-left:80px">最近登录时间：</span>
                <el-date-picker v-model="dateTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="changeDateTime"></el-date-picker>
                <!-- <el-button type="primary" icon="delete" class="handleMore" @click="operateMore">批量删除</el-button> -->
            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="ID" width="120"> 
                </el-table-column>
                <el-table-column prop="" label="头像" > 
                </el-table-column>
                <el-table-column prop="name" label="真实姓名">
                </el-table-column>
                <el-table-column prop="" label="公司" >
                </el-table-column>
                <el-table-column prop="" label="手机号码" >
                </el-table-column>
                <el-table-column prop="" label="行业" >
                </el-table-column>
                <el-table-column prop="" label="职业" >
                </el-table-column>
                <el-table-column prop="" label="职位" >
                </el-table-column>
                <el-table-column prop="" label="身份" >
                </el-table-column>
                <el-table-column prop="" label="项目" >
                </el-table-column>
                <el-table-column prop="" label="名片" >
                </el-table-column>
                <el-table-column prop="" label="观点" >
                </el-table-column>
                <el-table-column prop="" label="问题" >
                </el-table-column>
                <el-table-column prop="" label="财富" >
                </el-table-column>
                <el-table-column prop="" label="状态" >
                </el-table-column>
                <el-table-column prop="" label="最近登录时间" >
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">
                            <router-link :to="{name:'userEdit'}" style="color:#409EFF">编辑</router-link>
                        </el-button>
                        <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100">
                </el-pagination>
            </div>
                    
        </div>

        <!-- 删除提示框 -->
        <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">{{activeIndex==1 ?'是否确定下线' : '是否确定上线'}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
    
</template>

<script>
    export default {
        name: 'problemManage',
        data() {
            return {
                url: '../../../../../static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate:'',
                select_word: '',
                del_list: [],
                is_search: false,
                //delVisible: false,
                idx: -1,
                noEdit:1,
                dateTime:'',
            }
        },
        created() {
            this.getData();
        },
        mounted () {

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
                    if (!is_del) {  //未删除项中搜索
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() { //搜索
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            handleEdit(index, row) { //编辑
                this.idx = index;
                const item = this.tableData[index];
            },
            handleDelete(index, row) { //删除
                this.idx = index; 
                this.delVisible = true;
            },
           /*  operateMore() { //批量下线
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = []; 
            },*/
            handleSelectionChange(val) { //表格选中
                this.multipleSelection = val;
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            changeDateTime(option){
                console.log(option)
            }
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }

    .addButton{ 
        float: right;
    }
    .handleMore{
        float: right;
    }
</style>
