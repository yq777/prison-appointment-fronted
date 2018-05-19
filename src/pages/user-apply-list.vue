<template>
  <div class="user-apply-list-page">
    <div class="m-user-info">
      <span style="margin-right: 10px">欢迎，XXX</span>
      <el-button type="text" size="middle" @click="logout">退出</el-button>
    </div>
    <div class="m-add">
      <el-button type="primary" @click="addMeetingApply">新增会见申请</el-button>
    </div>
    <el-table :data="applyList">
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="会见人员">
        <template slot-scope="scope">
          <a class="u-prison-name" @click="showPrisonInfo(scope.row)">{{scope.row.prison_name}}</a>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="warning" v-show="scope.row.status=== '0'">未审核</el-button>
          <el-button type="danger" v-show="scope.row.status=== '1'">已拒绝</el-button>
          <el-button type="success" v-show="scope.row.status=== '2'">已通过</el-button>
          <el-button type="info" v-show="scope.row.status=== '3'">已会见</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span v-show="scope.row.status==='0' || scope.row.status=== '3'">-</span>
          <el-button type="text" v-show="scope.row.status==='1'" @click="editApplyInfo(scope.row)">更改申请信息</el-button>
          <el-button type="text" v-show="scope.row.status==='2'" @click="editApplyInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="addMeetingApplyShow" title="新增会见申请" width="35%">
      <el-form label-width="90px">
        <el-form-item label="姓名:">
          <span></span>
        </el-form-item>
        <el-form-item label="会见人员:" required>
          <el-select filterable
                     remote
                     v-model="prison_id"
                     placeholder="请会见人员姓名"
                     :remote-method="remoteMethod"
                     :loading="loading">
            <el-option v-for="(item,index) in prisonList" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会见描述:" required>
          <el-input type="textarea" :rows="4" v-model="description" placeholder="请输入会见描述信息"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
    <el-button @click="addMeetingApplyShow = false">取 消</el-button>
    <el-button type="primary" @click="addMeetApply">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog :visible.sync="editMeetingApplyShow" title="更新/查看会见申请信息" width="35%">
      <el-form label-width="90px">
        <el-form-item v-show="selectedApplyInfo.status === '2'" label="会见时间:" required>
          <span></span>
        </el-form-item>
        <el-form-item v-show="selectedApplyInfo.status === '2'" label="会见地点:" required>
        </el-form-item>
        <el-form-item v-show="selectedApplyInfo.status === '1'" label="会见描述:" required>
          <el-input type="textarea" v-model="content" :rows="4" placeholder="请输入会见描述信息"></el-input>
        </el-form-item>
        <el-form-item v-show="selectedApplyInfo.status === '2'" label="会见描述:" required>
          <span></span>
        </el-form-item>
      </el-form>
      <span slot="footer">
    <el-button @click="editMeetingApplyShow = false">取 消</el-button>
    <el-button type="primary" @click="editMeetApply">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog :visible.sync="prisonInfoShow" title="罪犯信息" width="35%">
      <el-form label-width="80px">
        <el-form-item label="姓名:">
          <span></span>
        </el-form-item>
        <el-form-item label="性别:">
          <span></span>
        </el-form-item>
        <el-form-item label="入狱原因:">
          <span></span>
        </el-form-item>
        <el-form-item label="入狱时间:">
          <span></span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import ObjectUtils from "../utils/ObjectUtils";
  import StringUtils from "../utils/StringUtils";

  export default {
    data() {
      return {
        applyList: [
          {
            name: '111',
            prison_name: '张三',
            status: '0'
          },
          {
            name: '111',
            prison_name: '张三',
            status: '1'
          },
          {
            name: '111',
            prison_name: '张三',
            status: '2'
          },
          {
            name: '111',
            prison_name: '张三',
            status: '3'
          }
        ],
        addMeetingApplyShow: false,
        editMeetingApplyShow: false,
        prisonInfoShow: false,
        prison_id: '',
        selectedApplyInfo: {},
        prisonInfo: {},
        prisonList: [],
        content: '',
        list: [{
          label: 'haha',
          value: 'haha',
        },
          {
            label: 'houhou',
            value: 'haha',
          },
          {
            label: 'hehe',
            value: 'haha',
          },
        ],
        loading: false,
        description: ''
      }
    },
    created() {
    },
    methods: {
      addMeetingApply() {
        this.addMeetingApplyShow = true;
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.prisonList = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.prisonList = [];
        }
      },
      editApplyInfo(val) {
        this.selectedApplyInfo = ObjectUtils.deepCopy(val);
        this.editMeetingApplyShow = true;
      },
      showPrisonInfo(val) {
        this.prisonInfoShow = true;
      },
      addMeetApply() {
        if (StringUtils.isBlank(this.prison_id)) {
          this.$message.error("请选择会见人员");
          return false;
        }

        if (StringUtils.isBlank(this.description)) {
          this.$message.error("请输入会见描述");
          return false;
        }
        this.addMeetingApplyShow = false;
      },
      editMeetApply() {
        if (StringUtils.isBlank(this.content)) {
          this.$message.error("请输入会见描述");
          return false;
        }
        this.editMeetingApplyShow = false;
      },
      logout() {
        this.$confirm("退出登录？", "提示", {
          type: 'warning'
        }).then(() => {

        })
      }
    }
  }
</script>

<style lang="less">
  .user-apply-list-page {
    .m-user-info {
      height: 50px;
      line-height: 50px;
      margin-left: 5px;
    }
    .m-add {
      display: flex;
      justify-content: flex-end;
      margin: 0 10px 10px;
    }
    .u-prison-name {
      color: #57AAFF;
      cursor: pointer;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
</style>
