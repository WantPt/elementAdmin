<template>
    <div>
        <div class="container">
            <div class="form-box">
                <fromType ref="fromData" @on-input="clickUpData" :value="form" :columns="vestColumns">
                    <template slot="bottom">
                        <el-form label-width='80px'>
                            <el-form-item>
                                <el-row>
                                    <el-col :span="12">
                                        <div class="blackTxt">观点数 <span class="blueTxt">8</span></div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="blackTxt">问题数 <span class="blueTxt">8</span></div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item>
                                <el-row>
                                    <el-col :span="12">
                                        <div class="blackTxt">最后编辑员工 <span class="blueTxt">李晨铭</span></div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="blackTxt">最后编辑时间 <span class="blueTxt">2018-09-21</span></div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </template>
                </fromType>
            </div>
        </div>
    </div>
</template>
<script>
import imgUpdata from '../../../encapsulation/imgUpdata';
import fromType from '../../../encapsulation/from-type';
export default {
    name: 'vestManageNewEidt',
    components: {
        imgUpdata,
        fromType
    },
    data: function() {
        return {
            form: {
                textarea: '',
                desc: '',
                name: '',
                compent: '',
                job: '',
                imgArr: [{
                    name: '12bc97c493488ef414e6e01543836841.jpg',
                    url: 'http://pic34.photophoto.cn/20150228/0005018718275319_b.jpg',
                }],
            },
            vestColumns: [{
                title: '头图',
                key: 'imgArr',
                type: 'imgUp',
                required: true
            }, {
                title: '文字',
                key: 'textarea',
                type: 'textarea',
                required: true,
            }, {
                title: '真实姓名',
                key: 'name',
                type: 'text',
                required: true,
            }, {
                title: '公司',
                key: 'compent',
                type: 'text',
                required: true,
            }, {
                title: '职位',
                key: 'job',
                type: 'text',
                required: true,
            }]
        }
    },
    methods: {
        clickUpData(data) {
            console.log(data)
        },
        // 点击删除的情况
        handleRemove(file) {
            console.log(file)
            this.imgArr = file
        },
        onSubmit() {
            console.log(this.imgArr)
            this.$message.success('提交成功！');
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
.blueTxt {
    color: #409EFF;
    margin-left: 5px;
}

.blackTxt {
    color: #606266
}

</style>
