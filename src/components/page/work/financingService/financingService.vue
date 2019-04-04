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
        <el-menu-item index="1">未处理</el-menu-item>
        <el-menu-item index="2">已处理</el-menu-item>
        <el-button
          type="primary"
          plain
          @click="handleBatch()"
          style="float:right;margin-top:12px;"
          size="medium"
          v-if="activeIndex==1"
        >批量处理</el-button>
      </el-menu>
      <!-- 未处理table -->
      <el-table
        :data="financingData"
        border
        class="table"
        @selection-change="handleSelectionChange"
        key="untreated"
        v-if="activeIndex==1"
        style="margin-top:20px;"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="time" label="申请时间"></el-table-column>
        <el-table-column prop="name" label="申请人姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="company" label="公司"></el-table-column>
        <el-table-column prop="requirement" label="需求"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handle(scope.$index, scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 已处理table -->
      <el-table
        :data="financingData"
        border
        class="table"
        key="processed"
        v-if="activeIndex==2"
        style="margin-top:20px;"
      >
        <el-table-column prop="time" label="申请时间"></el-table-column>
        <el-table-column prop="name" label="申请人姓名"></el-table-column>
        <el-table-column prop="phone" label="申请人手机号"></el-table-column>
        <el-table-column prop="type" label="申请服务类型"></el-table-column>
        <el-table-column prop="handleTime" label="处理时间"></el-table-column>
        <el-table-column prop="handleEmployee" label="处理员工姓名"></el-table-column>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      financingData: [
        {
          time: "",
          name: "Luis",
          phone: "1311111111",
          company: "",
          type: "",
          requirement: "",
          handleTime: "",
          handleEmployee: "Luis"
        },
        {
          time: "",
          name: "Luis",
          phone: "1311111111",
          company: "",
          type: "",
          requirement: "",
          handleTime: "",
          handleEmployee: "Luis"
        }
      ],
      handleInfo: false,
      cur_page: 1, // 当前页码
      total: 1000
    };
  },
  methods: {
    // 批量处理
    handleBatch() {
      this.$confirm("确定由你处理此申请？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "处理成功!"
          });
          this.activeIndex = "2";
        })
        .catch(() => {});
    },
    // 处理
    handle(key, keyPath) {
      this.$confirm("确定由你处理此申请？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "处理成功!"
          });
          this.activeIndex = "2";
        })
        .catch(() => {});
      console.log(key, keyPath);
    },
    // tab切换
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
      this.cur_page = 1;
    },
    // 选择
    handleSelectionChange(e) {
      console.log(e);
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