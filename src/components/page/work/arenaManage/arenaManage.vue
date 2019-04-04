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
        <el-table-column prop="id" label="ID" width="150"></el-table-column>
        <el-table-column prop="title" label="主题"></el-table-column>
        <el-table-column prop="positive" label="正方立场"></el-table-column>
        <el-table-column prop="claim" label="反方立场"></el-table-column>
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
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="cur_page"
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
        ></el-pagination>
      </div>
      <!-- dialog -->
      <el-dialog title="编辑资讯" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px" label-position="left" :rules="rules">
          <el-form-item label="主题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="正方立场" prop="positive">
            <el-input v-model="form.positive"></el-input>
          </el-form-item>
          <el-form-item label="反方立场" prop="claim">
            <el-input v-model="form.claim"></el-input>
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
          id: "",
          title: "Despacito",
          positive: "",
          claim: "",
          time: ""
        }
      ],
      dialogVisible: false, // 编辑弹框控制
      form: {}, // 弹出框表单
      state: "1", // 状态
      activeIndex: "1",
      index: "",
      newInformation: false, // 弹框内容控制
      rules: {
        title: [
          { required: true, message: "请输入主题", trigger: "blur" },
          { max: 36, message: "长度不能大于 36 个字符", trigger: "blur" }
        ],
        positive: [
          { required: true, message: "请输入正方立场", trigger: "blur" },
          { max: 15, message: "长度不能大于 36 个字符", trigger: "blur" }
        ],
        claim: [
          { required: true, message: "请输入反方立场", trigger: "blur" },
          { max: 15, message: "长度不能大于 36 个字符", trigger: "blur" }
        ]
      },
      cur_page: 1, // 当前页码
      total: 1000
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
      console.log(key, keyPath);
      this.activeIndex = key;
      this.cur_page = 1;
    },
    // 新建
    handleAdd() {
      this.newInformation = true;
      this.form = {};
      this.index = "";
      this.dialogVisible = true;
    },
    // 分页
    handleCurrentChange(val) {
      this.cur_page = val;
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

