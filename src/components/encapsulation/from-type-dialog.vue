<style lang="less">
    .fromTypeImg{
    width: 300px;
}
</style>
<template>
    <div class="channel-box">
        <el-dialog :title="value.title || '弹框'" :visible.sync="value.show" :width="value.width?value.width:'30%'">
            <slot name="top"></slot>
            <el-form :label-width="value.formWidth?value.formWidth:'80px'" ref="form" :model="value" :rules="ruleValidate">
                <el-row>
                    <el-col :span="24" v-for="column in columns" :key="column.key">
                        <el-form-item :label="column.title" :prop="column.key">
                            <el-select v-if="column.type == 'select'" v-model="value[column.key]" clearable  :placeholder="column.placeholder">
                                <el-option v-for="(option,i) in column.selectArr" :key="i"  :value="option[column.value]" :label="option[column.lable]">
                                </el-option>
                            </el-select>
                            <el-input v-if="column.type == 'textarea'" type="textarea" :autosize="{minRows: 4}" v-model="value[column.key]" :placeholder="column.placeholder">
                            </el-input>
                            <el-input v-if="column.type == 'password'" type="password" v-model="value[column.key]" :placeholder="column.placeholder">
                            </el-input>
                            <el-input v-if="column.type == 'text'" v-model.trim="value[column.key]" :placeholder="column.placeholder || '请输入'+column.title"></el-input>
                            <el-radio-group v-model="value[column.key]" v-if="column.type == 'radio'">
                                <el-radio :label="radio.index || i" v-for="(radio,i) in column.radioArr" :key="i">{{radio.lable}}</el-radio>
                            </el-radio-group>
                            <el-checkbox-group v-model="value[column.key]" v-if="column.type == 'check'">
                                <el-checkbox :style="{marginLeft:i%column.ckeckNum || 1==0?'30px':'0px'}"  v-for="(item,i) in column.checkArr" :key="i" :label="item">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                            <el-date-picker v-model="value[column.key]" style="width:100%" v-if="column.type == 'time'" clearable :type="column.timeType ? column.timeType : 'date'" :placeholder="column.placeholder">
                            </el-date-picker>
                            <div v-if="column.type == 'imgUp'">
                                <imgUpdata :imgArr="value[column.key] || []" @updata="handleUpdataImg" :limit="column.limit" :multiple="column.multiple || false"></imgUpdata>
                            </div>
                            <div v-if="column.type == 'inputNest'">
                                <el-input type="text" v-model="value[column.key]" :placeholder="column.placeholder || '请输入'+column.title">
                                    <template slot="prepend">{{value.descTxt || '暂无'}}</template>
                                </el-input>
                            </div>
                            <div v-if="column.type == ''">{{column.text}}</div>
                            <div v-if="column.type == 'img'"><img :src="column.img" alt="加载中..." class="fromTypeImg"></div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <slot name="bottom"></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="value.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/*
各个组件的type值以及其对应的属性备注

公有属性：
1.placeholder:   默认显示文本          Str
2.required：     是否开启文本验证       true/false;
3.validator：    自定义规则             Arr
4.width:         当前弹框的高度         Str
5.formWidth:     当前表单标签的宽度      Str


私有属性：
传统文本=> input         type： text;
时间选择=> DatePicker    type:  time;      时间类型：      timeType
文本域==>  textarea      type： textarea;
下拉框==>  Select        type:  select;    循环的内部数组：selectArr; 绑定参数:value; 输出文字:lable
单选框==>  RadioGroup    type:  radio;     循环的内部数组：radioArr;  绑定参数:value; 输出文字:lable
多选框==>  CheckboxGroup type:  check;     循环的内部数组：checkArr;  绑定参数:value; 输出文字:lable  ckeckNum：多少行以后清空左边距默认0
直接输入文本              type： ''
直接输入图片展示          type： 'img'
图片上传                 type:'imgUp',     绑定参数:imgArr            详情参照imgUpdata组件
嵌套文本                 type:'inputNest', 绑定参数:value;            内部绑定参数：descTxt


设定输入限制
1.checkNum：    只允许输入正整数。
2.passReg：     只允许输入数字与字母。
3.telNumXz：    手机号格式匹配。
4.nameReg：     中英文姓名匹配。
5.mailReg：     邮箱格式匹配。
6.idCartNum     身份证格式匹配
*/
import imgUpdata from './imgUpdata';
export default {
    props: {
        value: {
            type: Object,
            default: () => {
                return {};
            }
        },
        columns: {
            type: Array,
            default: () => {
                return [];
            }
        },
    },
    components: {
        imgUpdata
    },
    data() {
        return {
            ruleValidate: {},
        };
    },
    created() {
        var ruleValidate = {};
        this.columns.map((item) => {
            if (item.required) {
                switch (item.type) {
                    case 'time':
                        ruleValidate[item.key] = item.timeType !== 'datetimerange' ? [
                            { required: true, type: 'date', message: item.title + '不能为空', trigger: 'change' }
                        ] : [
                            { required: true, type: 'array', message: item.title + '不能为空', trigger: 'change' }
                        ];
                        break;
                    case 'check':
                        ruleValidate[item.key] = [
                            { required: true, type: 'array', min: 1, message: '请至少选择一项', trigger: 'change' }
                        ];
                        break;
                    case 'radio':
                        ruleValidate[item.key] = [
                            { required: true, message: item.title + '不能为空', trigger: 'change' }
                        ];
                        break;
                    case 'select':
                        ruleValidate[item.key] = [
                            { required: true, message: item.title + '不能为空', trigger: 'change' }
                        ];
                        break;
                    case 'imgUp':
                        ruleValidate[item.key] = [
                            { required: true, type: 'array', message: item.title + '不能为空', trigger: 'change' }
                        ];
                        break;
                    default:
                        ruleValidate[item.key] = [{ required: true, message: item.title + '不能为空', trigger: 'blur' }];
                        break;
                }
            }
            if (item.validator) {
                item.validator.map((son) => {
                    if (typeof(ruleValidate[item.key]) !== 'object') {
                        ruleValidate[item.key] = [];
                    }
                    ruleValidate[item.key].push({
                        validator: this[son],
                        trigger: 'blur'
                    });
                });
            }
        });
        this.ruleValidate = ruleValidate;
    },
    methods: {
        // 点击提交数据
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                let list = this.columns.filter((item) => {
                    return item.type === 'time';
                });
                for (let val of list) {
                    this.value[val.key] = this.value[val.key].pattern('yyyy-MM-dd HH:mm:ss');
                }
                if (valid) {
                    this.value.show = false
                    this.$emit('on-input', this.value);
                }
            });
        },
        // 点击更新数据的情况
        handleUpdataImg(file) {
            for (let item of this.columns) {
                if (item.type == 'imgUp') {
                    this.value[item.key] = file;
                }
            }
        },
        // 点击还原数据
        handleReset() {
            this.$emit('on-back');
        },
        // 正整数
        checkNum(rule, value, callback) {
            let g = /^[0-9]*$/;
            if (g.test(value)) {
                callback();
            } else {
                callback(new Error('请输入正整数'));
            }
        },
        // 密码
        passReg(rule, value, callback) {
            let g = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/;
            if (g.test(value)) {
                callback();
            } else {
                callback(new Error('密码只允许为数字与字母！'));
            }
        },
        // 手机
        telNumXz(rule, value, callback) {
            let g = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (g.test(value)) {
                callback();
            } else {
                callback(new Error('手机号格式不正确,请核对后输入！'));
            }
        },
        // 姓名
        nameReg(rule, value, callback) {
            let en = /^[a-zA-Z]+[/s.]?([a-zA-Z]+[/s.]?){0,4}[a-zA-Z]$/;
            let ch = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
            if ((en.test(value) && value.length <= 30) || (ch.test(value) && value.length <= 10)) {
                callback();
            } else {
                callback(new Error('姓名格式不正确！'));
            }
        },
        // 邮箱格式
        mailReg(rule, value, callback) {
            let g = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (g.test(value)) {
                callback();
            } else {
                callback(new Error('邮箱格式不正确,请核对后输入！'));
            }
        },
        // 身份证账号匹配
        idCartNum(rule, value, callback) {
            let g = /( ^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            if (g.test(value)) {
                callback();
            } else {
                callback(new Error('身份证格式不正确,请核对后输入！'));
            }
        }
    }
};

</script>
