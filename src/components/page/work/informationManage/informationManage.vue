<template>
  <div>
    <div class="container">
      <!-- tab -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">已上线</el-menu-item>
        <el-menu-item index="2">未上线</el-menu-item>
        <el-button
          type="primary"
          plain
          size="medium"
          @click="handleAdd()"
          style="margin-top:12px;float:right;"
        >新建</el-button>
      </el-menu>
      <!-- table -->
      <el-table
        :data="informationData"
        border
        class="table"
        ref="multipleTable"
        style="margin-top:20px;"
      >
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="link" label="链接"></el-table-column>
        <el-table-column prop="realRead" label="阅读量（真实）"></el-table-column>
        <el-table-column prop="mockRead" label="阅读量（模拟）"></el-table-column>
        <el-table-column prop="time" label="定时"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="handleOffLine(scope.$index, scope.row)"
              v-if="activeIndex==1"
            >下线</el-button>
            <el-button
              type="text"
              @click="handleOnLine(scope.$index, scope.row)"
              v-if="activeIndex==2"
            >上线</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- dialog -->
      <el-dialog title="编辑资讯" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="60px" label-position="left" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="form.link"></el-input>
          </el-form-item>
          <el-form-item label="阅读量" v-if="!newInformation">
            <span style="width:12%;display:inline-block;">{{form.realRead}}</span>
            <el-input v-model="form.mockRead" style="width:87%;"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio v-model="state" label="1">未上线</el-radio>
            <el-radio v-model="state" label="2">已上线</el-radio>
          </el-form-item>
          <el-form-item label="定时">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="form.time"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-row v-if="!newInformation">
            <el-col :span="12">
              <span>最后编辑员工：</span>
            </el-col>
            <el-col :span="12">
              <span>最后编辑时间：</span>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      informationData: [
        {
          title: "Despacito",
          link: "http://localhost:8080",
          realRead: 10000,
          mockRead: 100000,
          time: ""
        }
      ],
      rules: {
        title: [
          { required: true, message: "请输入主题", trigger: "blur" },
          { max: 36, message: "长度不能大于 36 个字符", trigger: "blur" }
        ]
      },
      dialogVisible: false, // 编辑弹框控制
      form: {}, // 弹出框表单
      state: "1", // 状态
      activeIndex: "1",
      index: "",
      newInformation: false // 弹框内容控制
    };
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      this.newInformation = false;
      this.form = row;
      this.index = index;
      this.dialogVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.informationData, this.index, this.form);
      this.dialogVisible = false;
      this.$message.success(`修改第 ${this.index + 1} 行成功`);
    },
    // 下线
    handleOffLine(index, row) {
      console.log(index, row);
    },
    // 上线
    handleOnLine(index, row) {
      console.log(index, row);
    },
    // tab切换
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(key, keyPath);
    },
    // 新建
    handleAdd() {
      this.newInformation = true;
      this.form = {};
      this.index = "";
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
</style>

