<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="operateMore" @click="operateMore">{{activeIndex==1 ?'批量下线' : '批量上线'}}</el-button>
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
                <el-table-column prop="name" label="所属用户" >
                </el-table-column>
                <el-table-column prop="" label="发布时间" >
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

        <!--编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" :before-close="handleClose" width="30%">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.content">
                </el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="未上线"></el-radio>
                        <el-radio label="已上线"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <span style="margin-right:100px">最后编辑员工</span>
                <span>最后编辑时间</span>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="saveEdit('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 上下线提示框 -->
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
                del_list: [],
                editVisible: false,
                delVisible: false,
                form: {
                    content: '',
                    status: '',
                },
                idx: -1,
                activeIndex:'1', //tab默认

                rules:{
                    content:[{ required: true, message: '请输入内容', trigger: 'blur' }],
                }
            }
        },
        created() {
            
        },
        mounted () {
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
                this.$axios.post('/ms/table/list', {
                    page: this.cur_page
                }).then((res) => {
                    //console.log(res.data.list)
                    this.tableData = res.data.list;
                })
            },
            formatter(row, column) {
                return row.address;
            },
            handleEdit(index, row) { //编辑
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
            saveEdit(formName) {
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
            cancelForm(formName){ //取消编辑
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
        margin-bottom: 10px;
        height: 30px;
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
    .operateMore{
        float: right;
    }
</style>
