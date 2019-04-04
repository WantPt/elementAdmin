<template>
  <div>
    <div class="container">
      <!-- search -->
      <div class="handle-box">
        <el-select v-model="select_cate" placeholder="搜索选项" class="handle-select mr10">
          <el-option key="1" value="项目名称"></el-option>
          <el-option key="2" value="项目ID"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
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
          @click="handleBatch()"
          style="float:right;margin:12px 0 0 10px;"
          size="medium"
        >批量下线</el-button>
        <el-button
          type="primary"
          plain
          @click="newProject()"
          style="float:right;margin-top:12px;"
          size="medium"
        >新建</el-button>
      </el-menu>
      <!-- table -->
      <el-table
        :data="financingData"
        border
        class="table"
        @selection-change="handleSelectionChange"
        key="untreated"
        style="margin-top:20px;"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55"></el-table-column>
        <el-table-column label="头图">
          <template slot-scope="scope">
            <img :src="scope.row.src" alt="暂无图片" style="width:100px;">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="owner" label="所属用户"></el-table-column>
        <el-table-column prop="company" label="所属公司"></el-table-column>
        <el-table-column prop="stage" label="融资阶段"></el-table-column>
        <el-table-column prop="tag" label="行业标签"></el-table-column>
        <el-table-column prop="state" label="认领状况"></el-table-column>
        <el-table-column prop="bp" label="BP"></el-table-column>
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
          :page-size="pageSize"
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
          id: "1",
          src:
            "http://laiyipiao.oss-cn-hangzhou.aliyuncs.com/lyp15420029468334384.jpeg",
          name: "",
          owner: "Luis",
          company: "",
          stage: "种子轮",
          tag: "互联网",
          state: "未认领",
          bp: "无"
        },
        {
          id: "1",
          src:
            "http://laiyipiao.oss-cn-hangzhou.aliyuncs.com/lyp15420029468334384.jpeg",
          name: "",
          owner: "Luis",
          company: "",
          stage: "种子轮",
          tag: "互联网",
          state: "未认领",
          bp: "无"
        }
      ],
      handleInfo: false,
      select_cate: "",
      select_word: "",
      cur_page: 1, // 当前页码
      pageSize: 20,
      total: 1000
    };
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      this.$router.push({
        name: "projectEdit",
        query: {
          type: "edit"
        }
      });
    },
    // 批量处理
    handleBatch() {},
    // 新建
    newProject() {
      this.$router.push({
        name: "projectAdd",
        query: {
          type: "add"
        }
      });
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
    // 选择
    handleSelectionChange(e) {
      console.log(e);
    },
    //搜索
    search() {},
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
</style>