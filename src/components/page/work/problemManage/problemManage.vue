<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="搜索选项" class="handle-select mr10">
                    <el-option key="1" value="问题名称"></el-option>
                    <el-option key="2" value="问题ID"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>

                <el-button type="primary" icon="delete" class="handleMore" @click="operateMore">{{activeIndex==1 ?'批量下线' : '批量上线'}}</el-button>
                <el-button @click="addProblem" class="addButton">新建</el-button>
            </div>

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectTab">
                <el-menu-item index="1">已上线</el-menu-item>
                <el-menu-item index="2">未上线</el-menu-item>
            </el-menu>

            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="ID" width="150"> <!-- sortable -->
                </el-table-column>
                <el-table-column prop="name" label="题目" width="120">
                </el-table-column>
                <el-table-column prop="address" label="描述" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="" label="所属用户" >
                </el-table-column>
                <el-table-column prop="" label="关联项目" >
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-edit" class="red" @click="handleDelete(scope.$index, scope.row)">{{activeIndex==1 ?'下线' : '上线'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100">
                </el-pagination>
            </div>
                    
        </div>

        <!-- 新增 编辑弹出框 -->
        <el-dialog :title="addorEdit" :visible.sync="editVisible" :before-close="handleClose" width="30%">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="题目" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="3" placeholder="请输入描述" v-model="form.textarea">
                </el-input>
                </el-form-item>
                <el-form-item label="所属用户" prop="user">
                    <span v-if="addorEdit=='编辑'">用户名</span>
                    <el-input v-model="form.user" placeholder="用户ID"></el-input>
                </el-form-item>
                <el-form-item label="关联项目">
                    <span v-if="addorEdit=='编辑'">项目名</span>
                    <el-input v-model="form.project" placeholder="项目ID"></el-input>
                </el-form-item>
                <span v-if="addorEdit=='编辑'" style="margin-right:100px">最后编辑员工</span>
                <span v-if="addorEdit=='编辑'">最后编辑时间</span>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="saveForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>

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
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    textarea: '',
                    user: '',
                    project:''
                },
                idx: -1,
                addorEdit:'', //新增或编辑
                activeIndex:'1', //tab默认

                rules:{
                    name:[{ required: true, message: '请输入题目', trigger: 'blur' }],
                    user:[{ required: true, message: '请输入用户ID', trigger: 'blur' }],
                }
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
            addProblem(){ //新增
                this.addorEdit='新增';
                this.editVisible = true;
                this.form={}
            },
            handleEdit(index, row) { //编辑
                this.addorEdit='编辑';
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
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
            // 保存编辑
            saveForm(formName) {
                /* this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`); */
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        /* 执行后续操作 */
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancelForm(formName){ //取消新增/编辑
                this.editVisible=false;
                this.$refs[formName].resetFields();
            },
            handleClose(done){ //弹窗关闭前重置form
                this.$refs['ruleForm'].resetFields();
                done();
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
