<template>
  <div class="main">
    <div class="contain">
      <el-form ref="form" :model="form" label-width="100px" class="form" :rules="rules">
        <el-form-item label="ID" v-if="type=='edit'">
          <span>{{form.id}}</span>
        </el-form-item>
        <el-form-item label="头图" prop="imageUrl">
          <!-- 上传图片 -->
          <ImageUpload></ImageUpload>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item label="融资阶段" prop="select_round">
          <el-select v-model="form.select_round" class="handle-select mr10">
            <el-option :value="item.value" v-for="item in roundOptions" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业标签" prop="select_tag">
          <el-select v-model="form.select_tag" class="handle-select mr10">
            <el-option :value="item.value" v-for="item in tagOptions" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定位" prop="positioning">
          <el-input v-model="form.positioning"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input type="textarea" rows="5" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="认领状况">
          <el-row>
            <el-col :span="8">
              <el-radio v-model="form.state" label="1">未认领</el-radio>
              <el-radio v-model="form.state" label="2">已认领</el-radio>
            </el-col>
            <el-col :span="16" v-if="form.state=='2'">
              <el-col :span="4">
                <span>{{form.userName}}</span>
              </el-col>
              <el-col :span="20">
                <el-input v-model="form.userId" placeholder="输入用户ID"></el-input>
              </el-col>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="BP">
          <!-- application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
          application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,
          .PDF,
          .csv,
          text/plain 上传格式-->
          <el-upload
            :action="BPUploadUrl()"
            :om-success="handleBPSuccess"
            :limit="1"
            multiple
            method="post"
            :on-preview="handleBPPreview"
            accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .PDF"
            :headers="uploadHeaders()"
            :before-upload="beforeBPUpload"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
          <!-- BP文件上传后预览 -->
          <iframe
            :src="BPType=='pdf'?BPSrc:('https://view.officeapps.live.com/op/view.aspx?src='+BPSrc)"
            width="1000px"
            height="500px"
            frameborder="1"
          ></iframe>
        </el-form-item>
        <div class="tips" v-if="type=='edit'">
          <span style="margin-right:100px">最后编辑员工：</span>
          <span>最后编辑时间：</span>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="cancelButton">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ImageUpload from "../../../encapsulation/imgUpdata";
export default {
  components: {
    ImageUpload: ImageUpload
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        company: "",
        select_round: "",
        select_tag: "",
        state: "1",
        userId: "",
        userName: "Luis",
        positioning: "",
        introduction: "",
        imageUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 15, message: "长度不能大于 15 个字符", trigger: "blur" }
        ],
        company: [
          { required: true, message: "请输入所属公司", trigger: "blur" },
          { max: 20, message: "长度不能大于 20 个字符", trigger: "blur" }
        ],
        positioning: [
          { required: true, message: "请输入定位", trigger: "blur" },
          { max: 30, message: "长度不能大于 30 个字符", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请输入介绍", trigger: "blur" },
          { max: 200, message: "长度不能大于 200 个字符", trigger: "blur" }
        ],
        select_round: [
          { required: true, message: "请选择融资阶段", trigger: "blur" }
        ],
        select_tag: [
          { required: true, message: "请选择行业标签", trigger: "blur" }
        ],
        imageUrl: [{ required: true, message: "请上传头图", trigger: "blur" }]
      },
      type: "", // 页面类型：edit-->编辑 add-->新建
      roundOptions: [
        { key: "1", value: "未知" },
        { key: "2", value: "种子轮" },
        { key: "3", value: "天使轮" },
        { key: "4", value: "Pre-A轮" },
        { key: "5", value: "A轮" },
        { key: "6", value: "A+轮" },
        { key: "7", value: "Pre-B轮" },
        { key: "8", value: "B轮" },
        { key: "9", value: "B+轮" },
        { key: "10", value: "C轮" },
        { key: "11", value: "C+轮" },
        { key: "12", value: "D轮" },
        { key: "13", value: "E轮及以后" },
        { key: "14", value: "战略投资" },
        { key: "15", value: "定增" },
        { key: "16", value: "Pre-IPO" },
        { key: "17", value: "上市后" },
        { key: "18", value: "并购" }
      ],
      tagOptions: [
        { key: "1", value: "互联网" },
        { key: "2", value: "IT" },
        { key: "3", value: "游戏" },
        { key: "4", value: "软件" },
        { key: "5", value: "金融业" },
        { key: "6", value: "投资" },
        { key: "7", value: "传媒" },
        { key: "8", value: "广告" },
        { key: "9", value: "消费品" },
        { key: "10", value: "服务业" },
        { key: "11", value: "文化" },
        { key: "12", value: "制造业" },
        { key: "13", value: "汽车" },
        { key: "14", value: "电子通信" },
        { key: "15", value: "贸易批发" },
        { key: "16", value: "医药健康" },
        { key: "17", value: "教育培训" },
        { key: "18", value: "能源化工" },
        { key: "19", value: "环保" },
        { key: "20", value: "餐饮" },
        { key: "21", value: "交通物流" },
        { key: "22", value: "政府机构" },
        { key: "23", value: "旅游服务" },
        { key: "24", value: "农林牧渔" }
      ],
      BPSrc: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls", // BP文件上传后地址
      BPType: "office"
    };
  },
  methods: {
    beforeBPUpload(file) {
      // BP文件上传前
      if (file.type.indexOf("pdf") > 0) {
        this.BPType = "pdf";
      }
    },
    handleBPSuccess() {
      // BP文件上传成功
    },
    handleBPPreview() {
      // 点击文件列表中已上传的文件时的钩子
    },
    BPUploadUrl() {
      // BP文件上传地址处理
      return "https://jsonplaceholder.typicode.com/posts/";
    },
    uploadHeaders() {
      return {
        "Content-Type": "multipart/form-data",
        token: ""
      };
    },
    onSubmit() {
      // 提交
    },
    cancelButton() {
      //取消
      this.$router.go(-1);
    }
  },
  created() {
    this.type = this.$route.query.type;
  },
  mounted() {}
};
</script>

<style scoped>
.main {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  height: 100%;
}
.contain {
  width: 50%;
  height: 100%;
}
.form {
  padding: 30px 0 50px 30px;
}
.tips {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 10px;
  color: #606266;
  margin-bottom: 20px;
}
</style>
