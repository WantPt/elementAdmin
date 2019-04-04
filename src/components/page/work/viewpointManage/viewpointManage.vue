<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="搜索选项" class="handle-select mr10">
                    <el-option key="1" value="观点名称"></el-option>
                    <el-option key="2" value="观点ID"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>

                <el-button type="primary" icon="delete" class="handleMore" @click="operateMore">{{activeIndex==1 ?'批量下线' : '批量上线'}}</el-button>
            </div>

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectTab">
                <el-menu-item index="1">已上线</el-menu-item>
                <el-menu-item index="2">未上线</el-menu-item>
            </el-menu>

            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="ID" width="150"> <!-- sortable -->
                </el-table-column>
                <el-table-column prop="address" label="内容" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="" label="所属用户" >
                </el-table-column>
                <el-table-column prop="" label="发布时间" width="120">
                </el-table-column>
                <el-table-column prop="" label="关联项目" >
                </el-table-column>
                <el-table-column prop="" label="类型" width="120">
                </el-table-column>
                <el-table-column prop="" label="评论数" width="120">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">
                            <router-link :to="{name:'viewpointEdit'}" style="color:#409EFF">编辑</router-link>
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" class="red" @click="handleDelete(scope.$index, scope.row)">{{activeIndex==1 ?'下线' : '上线'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100">
                </el-pagination>
            </div>
                    
        </div>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">{{activeIndex==1 ?'是否确定下线' : '是否确定上线'}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
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
                delVisible: false,
                idx: -1,
                activeIndex:'1', //tab默认
                noEdit:1,
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
            operateMore() { //批量下线
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                /* for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = []; */
            },
            handleSelectTab(index){ //选中index
                //console.log(index) 1 2
                this.activeIndex=index;
            },
            handleSelectionChange(val) { //表格选中
                this.multipleSelection = val;
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
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
