<template>
  <div>
    <el-table
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :max-height="height"
      @row-click="selTab"
    >
      <el-table-column v-if="selection" type="selection" width="55" align="center"></el-table-column>
      <el-table-column
        v-for="(item,i) in tableArr"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ||''"
        :align="item.align || 'center'"
        :style="item.style || {}"
      >
        <template slot-scope="scope">
          <img
            v-if="item.type == 'img' && scope.row[item.prop]"
            :src="scope.row[item.prop]"
            alt
            style="width: 60px;height: 60px"
          >
          <div v-if="item.type == 'img' && !scope.row[item.prop]">暂无</div>
          <div v-if="item.type == 'text' || !item.type">{{scope.row[item.prop] || '暂无'}}</div>
          <div v-if="item.type == 'html'">
            <div v-html="scope.row[item.prop]"></div>
          </div>
          <div v-if="item.type == 'time'">{{formatDate(scope.row[item.prop])}}</div>
          <div v-if="item.type == 'arrRole'">
            <span v-for="(itemIn,i) in item.loop" :key="i">
              <span
                v-for="(item,i) in scope.row[item.prop]"
                :key="i"
                style="margin-right:10px;"
                v-show="itemIn.permissionId == item"
              >{{itemIn.name}}</span>
            </span>
          </div>
          <div v-if="item.type == 'btnArr'">
            <span v-for="(itemS,i) in scope.row[item.prop]" :key="i">
              <el-popover
                placement="top"
                :value="show[scope.$index] && rowShow[i]"
                v-if="itemS.popoverFlag"
              >
                <p>{{itemS.popoverTxt}}</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleHide(scope,itemS.falsekey,i)"
                  >{{itemS.falseTxt || '取消'}}</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleEdit(scope,itemS.key,i)"
                  >{{itemS.trueTxt || '确定'}}</el-button>
                </div>
                <el-button
                  :style="itemS.style?itemS.style:{marginLeft: itemS.left || 10+'px'}"
                  :type="itemS.type || 'text'"
                  :icon="itemS.icon"
                  slot="reference"
                  @click="handleShow(scope,itemS.key,i)"
                >{{itemS.label}}</el-button>
              </el-popover>
              <el-button
                v-if="!itemS.popoverFlag"
                :style="itemS.style?itemS.style:{marginLeft: itemS.left || 10+'px'}"
                :type="itemS.type || 'text'"
                :icon="itemS.icon"
                @click="handleEdit(scope,itemS.key,i)"
              >{{itemS.label}}</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        :width="btnArr.length<=3?btnArr.length*(120+(height<1000?20:0)):180"
        fixed="right"
        :align="btnArr.length<=3?'center':'left'"
        v-if="btnArr[0]"
      >
        <template slot-scope="scope">
          <span v-for="(item,i) in btnArr" :key="i">
            <el-popover
              placement="top"
              :value="show[scope.$index] && rowShow[i]"
              v-if="item.popoverFlag"
            >
              <p>{{item.popoverTxt}}</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleHide(scope,item.falsekey,i)"
                >{{item.falseTxt || '取消'}}</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleEdit(scope,item.key,i)"
                >{{item.trueTxt || '确定'}}</el-button>
              </div>
              <el-button
                :style="item.style?item.style:{marginLeft: item.left || 10+'px'}"
                :type="item.type || 'text'"
                :icon="item.icon || 'el-icon-edit'"
                slot="reference"
                @click="handleShow(scope,item.key,i)"
              >{{item.label}}</el-button>
            </el-popover>
            <el-button
              v-if="!item.popoverFlag"
              :style="item.style?item.style:{marginLeft: item.left || 10+'px'}"
              :type="item.type || 'text'"
              :icon="item.icon || 'el-icon-edit'"
              :size="item.size || 'mini'"
              @click="handleEdit(scope,item.key,i)"
            >{{item.label}}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="sbFlex">
      <div>
        <el-button
          :type="item.type"
          :icon="item.icon || ''"
          :size="item.size || 'medium'"
          v-for="(item,i) in bottomBtnArr"
          :key="i"
          @click="$emit(item.key,null)"
        >{{item.label}}</el-button>
      </div>
      <div class="pagination" v-if="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          :page-size="pagesize"
          :current-page="pageIndex"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
/*
写入字段  tableData  
    字段描述   
              prop：写入的字段名
              label：需要展示的名称
              align：对齐方式
              width：宽度
              style：自定义的style

写入字段  btnArr  
    字段描述   
              label：需要展示的名称
              key：点击的方式
              icon：当前展示的ICON
              popoverFlag：是否启用popover组件
              popoverTxt：popover提示文字
              style：自定义的style

写入字段  bottomBtnArr  左下方的按钮
    字段描述   
              label：需要展示的名称
              key：点击的方式
              icon：当前展示的ICON
*/
import VueLazyload from "vue-lazyload";
import { formatDate } from "@/libs/storage";
export default {
  name: "tableList",
  props: {
    // 是否启用可变性按钮
    btnFlag: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    // 表格的配置
    tableArr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 写入的数据
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否开启筛选
    selection: {
      type: Boolean,
      default: false
    },
    // 按钮的配置
    btnArr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 是否开启分页
    pagination: {
      type: Boolean,
      default: true
    },
    // 最大高度
    height: {
      type: Number,
      default: 2000
    },
    // 每页显示的最大数量
    pagesize: {
      type: [Number, String],
      default: 10
    },
    pageIndex: {
      type: [Number, String],
      default: 1
    },
    // 下左侧显示功能性
    bottomBtnArr: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      visible2: false,
      show: [],
      rowShow: []
    };
  },
  methods: {
    // 更改的选择方法
    handleSelectionChange(val) {
      this.$emit("select", val);
    },
    // 点击更改页数的触发事件
    handleCurrentChange(val) {
      this.$emit("change", val);
    },
    // 按钮的点击事件
    handleEdit(scope, key, i) {
      this.$set(this.show, scope.$index, false);
      this.$set(this.rowShow, i, false);
      this.$emit(key, scope);
    },
    // 点击隐藏框
    handleHide(scope, key, i) {
      this.$set(this.show, scope.$index, false);
      this.$set(this.rowShow, i, false);
      this.$emit(key, scope);
    },

    // 点击出现框
    handleShow(scope, key, i) {
      this.$set(this.show, scope.$index, true);
      this.$set(this.rowShow, i, true);
    },
    // 时间格式的转换
    formatDate(time) {
      let date = new Date(parseInt(time));
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //
    selTab(row, event, column) {
      this.$emit("selTab", row);
    }
  },
  mounted() {},
  watch: {}
};
</script>
<style lang="less">
</style>
