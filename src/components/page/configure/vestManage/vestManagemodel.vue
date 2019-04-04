<template>
    <div class="model">
        <!-- 发观点-->
        <fromTypeDialog ref="fromData" @on-input="clickUpData" :value="viewpointform" :columns="viewpointColumns">
        </fromTypeDialog>
        <!-- 发问题-->
        <fromTypeDialog ref="fromData" @on-input="clickUpData" :value="problemform" :columns="problemColumns"></fromTypeDialog>
        <!-- 新建马甲-->
        <fromTypeDialog ref="fromData" @on-input="clickUpData" :value="addRobotform" :columns="addRobotColumns"></fromTypeDialog>
    </div>
</template>
<script>
import imgUpdata from '../../../encapsulation/imgUpdata';
import fromTypeDialog from '../../../encapsulation/from-type-dialog';
export default {
    name: 'vestManageModel',
    components: {
        imgUpdata,
        fromTypeDialog
    },
    data() {
        return {
            // 新建问题
            problemform: {
                subject: '',
                textarea: '',
                resource: '',
                show: false,
                title: '新建问题'
            },
            problemColumns: [{
                title: '题目',
                key: 'subject',
                type: 'text',
                required: true,
            }, {
                title: '描述',
                key: 'textarea',
                type: 'textarea',
                required: true,
            }, {
                title: '关联项目',
                key: 'desc',
                descTxt: '',
                type: 'inputNest',
                required: true,
            }],
            // 发观点
            viewpointform: {
                subject: '',
                textarea: '121212',
                resource: 0,
                show: false,
                title: '新建评论'
            },

            viewpointColumns: [{
                title: '内容',
                key: 'textarea',
                type: 'textarea',
                placeholder: '请输入内容',
                required: true,
            }, {
                title: '状态',
                key: 'resource',
                type: 'radio',
                required: true,
                radioArr: [{
                    lable: '未上线',
                    index: 0
                }, {
                    lable: '已上线',
                    index: 1
                }],
            }, {
                title: '关联观点',
                key: 'desc',
                type: 'text',
                placeholder: '请输入关联观点',
                required: true,
            }],
            // 新建马甲
            addRobotform: {
                imgArr: [{
                    name: '12bc97c493488ef414e6e01543836841.jpg',
                    url: 'http://pic34.photophoto.cn/20150228/0005018718275319_b.jpg',
                }],
                name: '',
                compent: '',
                job: '',
                show: false,
                title: '新建马甲'
            },
            addRobotColumns: [{
                title: '头图',
                key: 'imgArr',
                type: 'imgUp',
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
            }],
        }
    },
    created() {

    },
    methods: {
        clickUpData(data) {
            console.log(data)
        },
        search() { //搜索
            this.is_search = true;
        },
        handleSelectionChange(val) { //表格选中
            this.multipleSelection = val;
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
}

.handleMore {
    float: right;
}

</style>
