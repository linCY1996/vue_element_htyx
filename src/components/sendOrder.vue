<template>
  <!--发布订单-->
  <el-dialog title="发布订单" :visible.sync="isShowOrder" :before-close="closeDialog">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动地点" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="12">
          <el-form-item prop="date1">
            <el-date-picker
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              v-model="ruleForm.date1"
              style="width: 100%;"
              @change="setdate()"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="选择职业" prop="type" id="priceDiv">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox v-for="(item,index) in jobType" :label="item.cid" name="type" :key="index">
            <span>{{item.cname}}</span>
            <input
              type="text"
              class="priceInput"
              v-model="item.price"
              placeholder="价格"
              style="width: 40px;height: 20px"
            />元
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: ["isShowOrder"],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      ruleForm: {
        name: "",
        address: "",
        region: "",
        date1: [],
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        jname: "",
        jphone: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入活动地点",
            trigger: "blur"
          }
        ],
        date1: [
          {
            type: "array",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "请选择活动资源",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请填写活动形式",
            trigger: "blur"
          }
        ]
      },
      jobType: []
    };
  },
  methods: {
    setdate() {
      this.ruleForm.date1 = this.ruleForm.date1
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    closeDialog() {
      this.$emit("update:isShowOrder", false);
    },
    // 创建订单
    submitForm(formName) {
      var that = this;
      let job = that.ruleForm.type;
      let str = "";
      for (var i = 0; i < job.length; i++) {
        for (var j = 0; j < that.jobType.length; j++) {
          if (job[i] == that.jobType[j].cid) {
            if (i == 0) {
              str += "c" + job[i] + "-" + that.jobType[j].price;
            } else {
              str += "_" + "c" + job[i] + "-" + that.jobType[j].price;
            }
          }
        }
      }
      that.$http
        .createIndepentOrder({
          dockingPeopleName: that.ruleForm.jname,
          dockingPeoplePhone: that.ruleForm.jphone,
          activityName: that.ruleForm.name,
          activityBeginTime: that.ruleForm.date1[0],
          activityAfterTime: that.ruleForm.date1[1],
          activityAddress: that.ruleForm.address,
          orderRemark: that.ruleForm.desc,
          cTypeStr: str,
          orderType: 2
        })
        .then(res => {
          if (res.success == true) {
            that.$message.success("成功发布订单");
            that.closeDialog();
            this.$parent.handleCurrentChange(1)  //子组件调用父组件方法
          }
        });
    }
  },
  mounted() {
    this.$http.getType({}).then(res => {
      var list = res.data;
      list.forEach(function(item) {
        item.price = 0;
      });
      this.jobType = list;
      console.log("jobType", this.jobType);
    });
  }
};
</script>