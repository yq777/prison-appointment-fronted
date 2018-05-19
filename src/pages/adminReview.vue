<template>
  <div class="adminReview-page">
    <div class="adminReview-page-admin-info">
      <span style="margin-right: 10px">欢迎，XXX</span>
      <el-button type="text" size="middle" @click="logout">退出</el-button>
    </div>
    <div class="adminReview-page-form">
      <el-table
        :data="appointmentList"
      >
        <el-table-column label="ID">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="prison_name" label="会见人员">
        </el-table-column>
        <el-table-column prop="meet_time" label="会见时间">
          <template slot-scope="scope">
            <span v-show="scope.row.meet_time == ''">未安排</span>
            <span v-show="scope.row.meet_time != ''">{{scope.row.meet_time}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="meet_pos" label="会见地点">
          <template slot-scope="scope">
            <span v-show="scope.row.meet_pos == ''">未安排</span>
            <span v-show="scope.row.meet_pos != ''">{{scope.row.meet_pos}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="warning" v-show="scope.row.status == 0">未审核</el-button>
            <el-button type="success" v-show="scope.row.status == 2">已通过</el-button>
            <el-button type="danger" v-show="scope.row.status == 1">未通过</el-button>
            <el-button type="info" v-show="scope.row.status == 3">已会见</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-show="scope.row.status == 0" @click="pass(scope.row)">通过</el-button>
            <el-button type="text" v-show="scope.row.status == 0" @click="refuse(scope.row)">拒绝</el-button>
            <el-button type="text" v-show="scope.row.status == 1" @click="pass(scope.row)">通过</el-button>
            <el-button type="text" v-show="scope.row.status == 2" @click="refuse(scope.row)">拒绝</el-button>
            <span v-show="scope.row.status==  3">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="meet_record" label="备注" width="180">
        </el-table-column>

      </el-table>

      <el-dialog title="会见审核" :visible.sync="dialogFormVisible" width="30%">
        <el-form>
          <el-form-item label="会见时间" :label-width="formLabelWidth" required="required">
            <el-date-picker v-model="meet_time" type="datetime" placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="会见地点" :label-width="formLabelWidth" required="required">
            <el-select v-model="meet_pos" placeholder="请选择会见地点">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ObjectUtils from "../utils/ObjectUtils";
  import StringUtils from "../utils/StringUtils";

  export default {
    components: {ElButton},
    data() {
      return {
        appointmentList: [{
          id: '1',
          name: '张某',
          prison_id: '1',
          prison_name: '李某',
          description: 'sjdkhfjsdhfs',
          status: 0,
          meet_time: '',
          meet_pos: '',
          meet_record: 'this meeting record!!!!'
        }, {
          id: '2',
          name: '陈某',
          prison_id: '2',
          prison_name: '黄某',
          description: 'this is description from appointment',
          status: 1,
          meet_time: '2018-05-04 09:00:00',
          meet_pos: '1-103',
          meet_record: 'this meeting record!!!!'
        }, {
          id: '3',
          name: '杨某',
          prison_id: '3',
          prison_name: '秦某',
          description: 'this is description from appointment',
          status: 2,
          meet_time: '2018-05-07',
          meet_pos: '1-102',
          meet_record: 'this meeting record!!!!'
        }, {
          id: '4',
          name: '杨某',
          prison_id: '5',
          prison_name: '秦某',
          description: 'this is description from appointment',
          status: 3,
          meet_time: '2018-05-01',
          meet_pos: '1-106',
          meet_record: 'this meeting record!!!!'
        }],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        appointment: {},
        meet_time: '',
        meet_pos: '',
      }
    },
    created() {
    },
    methods: {
      pass(obj) {
        this.appointment = ObjectUtils.deepCopy(obj);
        this.dialogFormVisible = true;
        this.meet_time = this.appointment.meet_time;
        this.meet_pos = this.appointment.meet_pos;
      },
      refuse(obj) {
        this.$confirm("是否拒绝？", "提示", {
          type: "warning",
        }).then(() => {

        })

      },
      confirm() {
        if (StringUtils.isBlank(this.meet_time)) {
          this.$message.error("请选择会见时间");
          return false;
        }
        if (StringUtils.isBlank(this.meet_pos)) {
          this.$message.error("请选择会见地点");
          return false;
        }
        this.dialogFormVisible = false
      },
      logout() {
        this.$confirm("是否退出当前登录？", "提示", {
          type: "warning",
        }).then(() => {

        })

      }
    }
  }
</script>
<style lang="less">
  .el-button + .el-button {
    margin-left: 0px;
  }

  .adminReview-page-admin-info {
    height: 50px;
    line-height: 50px;
    margin-left: 5px;
  }
</style>
