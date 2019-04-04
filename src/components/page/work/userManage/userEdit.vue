<template>
    <div class="main">
        <div class="contain">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="form">
                <!-- <el-form-item label="ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item> -->
                <div class="tips isLeftMore">
                    <span style="margin-right:150px">ID:</span>
                    <span>注册时间：</span>
                </div>
                <el-form-item label="头图" prop="avatar" ref="avatarClear"><!-- 上传图片 -->
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="uploadSuccess"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>

                <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="公司" prop="company">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="微信号">
                    <el-input v-model="form.WeChat"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="行业" prop="industry">
                    <el-select v-model="form.industry" placeholder="请选择行业">
                        <el-option key="1" label="IT" value="bbk"></el-option>
                        <el-option key="2" label="金融" value="xtc"></el-option>
                        <el-option key="3" label="重工业" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职业" prop="profession">
                    <el-select v-model="form.profession" placeholder="请选择职业">
                        <el-option key="1" label="前端" value="bbk"></el-option>
                        <el-option key="2" label="后端" value="xtc"></el-option>
                        <el-option key="3" label="运维" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="identity">
                    <el-select v-model="form.identity" placeholder="请选择身份">
                        <el-option key="1" label="CTO" value="bbk"></el-option>
                        <el-option key="2" label="技术总监" value="xtc"></el-option>
                        <el-option key="3" label="技术组长" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <div class="tips isLeft">
                    <span style="margin-right:100px">项目数：</span>
                    <span style="margin-right:100px">观点数：</span>
                    <span>问题数：</span>
                </div>
                <el-form-item label="名片数">
                    <el-input v-model="form.visitCard"></el-input>
                </el-form-item>
                <el-form-item label="财富（创币）">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="未认证"></el-radio>
                        <el-radio label="已认证"></el-radio>
                    </el-radio-group>
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
                ID:'',
                text:'',
                user:'',
                company:'',
                phone:'',
                WeChat:'',
                email:"",
                industry:'',
                profession:"",
                position:'',
                identity:'',
                visitCard:'',
                money:'',
                status:'',
            },
            dialogImageUrl: '',
            dialogVisible: false,
            doupload:false,

            rules:{
                avatar:[{ required: true, message: '请上传头图'}],
                name:[{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
                company:[{ required: true, message: '请输入公司', trigger: 'blur' }],
                industry:[{ required: true, message: '请选择行业', trigger: 'change' }],
                profession:[{ required: true, message: '请选择职业', trigger: 'change' }],
                position:[{ required: true, message: '请输入职位', trigger: 'blur' }],
                identity:[{ required: true, message: '请选择身份', trigger: 'change' }],
            }
        }
    },
    methods: {
        //上传图片
        handleRemove(file, fileList) {
            //console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            
        },
        uploadSuccess(res,file){
            //console.log(file.status=='success')
            if(file.status=='success'){
                this.doupload=true;
            }
        },
        onSubmit(formName){
            if(this.doupload==true){
                this.rules.avatar = []
                this.$refs['avatarClear'].clearValidate(); //上传成功清除头像验证
            }

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
                path:'/userManage'
            })
        },
        
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
.isLeft{
    margin-left: 40px;
}
.isLeftMore{
    margin-left: 70px;
}
</style>
