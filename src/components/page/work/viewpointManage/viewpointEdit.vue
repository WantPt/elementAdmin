<template>
    <div class="main">
        <div class="contain">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="form">
                <el-form-item label="ID">
                    <!-- <el-input v-model="form.id"></el-input> -->
                    <P>ID</P>
                </el-form-item>
                <el-form-item label="头图"><!-- 上传图片 -->
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>

                <el-form-item label="文字" prop="text">
                    <el-input type="textarea" rows="5" v-model="form.text"></el-input>
                </el-form-item>
                <el-form-item label="所属用户" prop="user">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="所属公司">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="关联项目">
                    <el-input v-model="form.projectID" placeholder="输入项目ID"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="纯观点"></el-radio>
                        <el-radio label="擂台观点"></el-radio>
                        <el-radio label="问题观点"></el-radio>
                    </el-radio-group>
                    <el-input v-model="form.problemID" placeholder="输入擂台ID或问题ID"></el-input>
                </el-form-item>
                <el-form-item label="评论">
                    <el-button type="info" @click="seeComment">查看</el-button>
                </el-form-item>
                <div class="tips">
                    <span style="margin-right:100px">最后编辑员工</span>
                    <span>最后编辑时间</span>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                    <el-button @click="cancelButton">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form:{
                //ID:'',
                text:'',
                user:'',
                company:'',
                projectID:'',
                type:'',
                problemID:'',
            },
            dialogImageUrl: '',
            dialogVisible: false,

            rules:{
                text:[{ required: true, message: '请输入文字', trigger: 'blur' }],
                user:[{ required: true, message: '请输入用户名', trigger: 'blur' }]
            }
        }
    },
    methods: {
        //上传图片
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onSubmit(formName){
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
        cancelButton(){ //取消
            this.$router.push({
                path:'/viewpointManage'
            })
        },
        seeComment(){ //查看评论
            this.$router.push({
                path:'/viewpointManage/viewpointEdit/viewComment'
            })
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    
}
</script>

<style scoped>
.main{
    width: 100%;
    background: #fff;
    border-radius: 10px;
    height: 100%; 
}
.contain{
    width: 50%;
    height: 100%;
}
.form{
    padding: 30px 0 50px 30px;
}
.tips{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
    color: #606266;
    margin-bottom: 20px;
}
</style>
