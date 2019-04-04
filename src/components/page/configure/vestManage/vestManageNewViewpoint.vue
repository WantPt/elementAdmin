<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="头图" prop="imgArr">
                        <imgUpdata :imgArr="form.imgArr" @updata="handleRemove"></imgUpdata>
                    </el-form-item>
                    <el-form-item label="文字" prop="textarea">
                        <el-input type="textarea" rows="5" v-model="form.textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="关联项目" prop="desc">
                        <el-input type="text" rows="5" v-model="form.desc" placeholder="请输入项目id">
                            <template slot="prepend">{{form.descTxt || '暂无'}}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="单选框" prop="ltDesc">
                        <el-radio-group v-model="form.resource">
                            <el-radio :label="item.index" v-for="(item,i) in option.radioArr" :key="i">{{item.label}}</el-radio>
                        </el-radio-group>
                        <el-input type="text" rows="5" v-model="form.ltDesc" placeholder="请输入擂台ID或问题ID">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="评论">
                        <el-button type="text">查看</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                        <el-button @click="$router.go(-1)">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import imgUpdata from '../../../encapsulation/imgUpdata';

export default {
    name: 'vestManageNewViewpoint',
    components: {
        imgUpdata
    },
    data: function() {
        return {
            option: {
                radioArr: [{
                    label: '纯观点',
                    index: 0
                }, {
                    label: '擂台观点',
                    index: 1
                }, {
                    label: '问题观点',
                    index: 2
                }, ]
            },
            form: {
                textarea: '',
                desc: '',
                descTxt: '',
                resource: 0,
                ltDesc:'',
                imgArr: [{
                    name: '12bc97c493488ef414e6e01543836841.jpg',
                    url: 'http://pic34.photophoto.cn/20150228/0005018718275319_b.jpg',
                }]
            },
            rules: {
                imgArr: [
                    { type: 'array', required: true, message: '请至少上传一张图片', trigger: 'change' }
                ],
                textarea: [
                    { required: true, message: '请输入文字', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入项目Id', trigger: 'blur' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                ltDesc: [
                    { required: true, message: '请输入擂台ID或问题ID', trigger: 'blur' }
                ]
            }

        }
    },
    methods: {
        // 点击删除的情况
        handleRemove(file) {
            this.form.imgArr = file
        },
        onSubmit(formName) {
            console.log(formName)
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    this.$message.success('提交成功！');
                } else {
                    this.$message.success('提交失败！');
                    return false;
                }
            });
            
        }
    },

}

</script>
<style scoped>
</style>
