<template>
  <div class="bailer-index-page">
    <div class="m-bailer-info">
      <span style="margin-right: 10px">欢迎，XXX</span>
      <el-button type="text" size="middle">退出</el-button>
    </div>
    <el-table :data="bailerList">
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="会见人员" prop="prison_name"></el-table-column>
      <el-table-column label="会见地点" prop="meet_pos"></el-table-column>
      <el-table-column label="会见时间" prop="meet_time"></el-table-column>
      <el-table-column label="关押房号" prop="crime_room"></el-table-column>
      <el-table-column label="会见状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '3'">已会见</span>
          <span v-else>未会见</span>
        </template>
      </el-table-column>
      <el-table-column label="会见状态修改">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status === '2'" @click="showEditStatus(scope.row)">已会见</el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="会见记录">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '3'" type="text" @click="meetingContentShow(scope.row)">查看</el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="editStatusShow" title="会见记录" width="35%">
      <el-form label-width="90px">
        <el-form-item label="会见记录:" required>
          <el-input type="textarea" :rows="4" v-model="meet_record"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
    <el-button @click="editStatusShow = false">取 消</el-button>
    <el-button type="primary" @click="editStatusShow = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog :visible.sync="meetContentShow" title="会见记录" width="35%">
      <el-form label-width="90px">
        <el-form-item label="会见记录:">
          <span></span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ObjectUtils from "../utils/ObjectUtils";

  export default {
    components: {ElInput},
    data() {
      return {
        bailerList: [{
          status: '2'
        },
          {
            status: '3'
          }],
        editStatusShow: false,
        meetContentShow: false,
        meet_record: '',
        selectedPrison: {}
      }
    },
    created() {
    },
    methods: {
      meetingContentShow(val) {
        this.selectedPrison = ObjectUtils.deepCopy(val);
        this.meetContentShow = true;
      },
      showEditStatus(val) {
        this.selectedPrison = ObjectUtils.deepCopy(val);
        this.editStatusShow = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-bailer-info {
    height: 50px;
    line-height: 50px;
    margin-left: 5px;
  }
</style>
