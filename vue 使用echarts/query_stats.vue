<template>
  <div class="middle_content">
    <div class="top_middle_content clearfix">
      <div class="left_table fl">
        <h3>营收统计</h3>
        <el-table :data="ystj" style="width: 100%" border>
          <el-table-column prop="subjectName" label="科目名称"> </el-table-column>
          <el-table-column prop="rechargeSum" label="充值金额(元)"> </el-table-column>
          <el-table-column prop="consumeSum" label="消费金额(元)"> </el-table-column>
          <el-table-column prop="refundingSum" label="退款中金额(元)"> </el-table-column>
          <el-table-column prop="refundedSum" label="退款金额(元)"> </el-table-column>
          <el-table-column prop="resetSum" label="清零金额(元)"></el-table-column>
          <el-table-column prop="balance" label="余额(元)"> </el-table-column>
        </el-table>
      </div>
      <div class="fr right_chart">
        <h3>营收饼状图</h3>
        <div ref="ys_pie" class="ys_pie"></div>
      </div>
    </div>
    <div class="jlqk_bar">
      <h3><span>计量情况</span></h3>
      <ul>
        <li
          :class="jlqk_tab == index ? 'active' : ''"
          v-for="(item, index) in jlqk"
          :key="index"
          @click="
            jlqk_tab = index;
            jlqk_search();
          "
        >
          {{ item.text }}
        </li>
      </ul>
      <h2>{{ newdata }}用量统计图</h2>
      <div ref="jlqk_bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "query_stats",
  methods: {
    ystj_search() {
      this.$axios.post("/pay/accountRecord/subjectRevenue", {}).then((res) => {
        this.ystj = res.data.rows;
        let pie_data = [];
        let legenddata = [];
        this.ystj.forEach((item) => {
          legenddata.push(item.subjectName);
        });
        for (let key in this.ystj) {
          pie_data.push({
            value: this.ystj[key].balance,
            name: this.ystj[key].subjectName,
          });
        }
        let pieecharts = this.$echarts.init(this.$refs.ys_pie);
        pieecharts.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            orient: "horizontal",
            y: "top",
            itemGap: 30,
            x: "center",
            data: legenddata,
          },
          series: [
            {
              startAngle: 270,
              minAngle: 20,
              name: "详情",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "16",
                  fontWeight: "bold",
                },
              },
              label: {
                normal: {
                  textStyle: { fontSize: "16" },
                },
              },
              labelLine: {
                lineStyle: {
                  color: "#235894",
                },
              },
              data: pie_data,
            },
          ],
        });
        window.addEventListener("resize", function () {
          pieecharts.resize();
        });
      });
    },
    jlqk_search() {
      this.$axios
        .post("/iot/statistics/totalUseCount?type=" + (this.jlqk_tab + 1))
        .then((res) => {
          let days = [];
          let hotwater = [];
          let coldwater = [];
          let electricity = [];
          for (let i in res.data.rows) {
            if (i == "冷水") {
              res.data.rows[i].forEach((it) => {
                coldwater.push(it.total);
              });
              if (this.jlqk_tab == 2) {
                res.data.rows[i].forEach((item) => {
                  days.push(parseFloat(item.days) + "月");
                });
              } else {
                res.data.rows[i].forEach((item) => {
                  days.push(item.days);
                });
              }
            } else if (i == "热水") {
              res.data.rows[i].forEach((it) => {
                hotwater.push(it.total);
              });
            } else {
              res.data.rows[i].forEach((it) => {
                electricity.push(it.total);
              });
            }
          }
          let jlqk_bar = this.$echarts.init(this.$refs.jlqk_bar);
          jlqk_bar.setOption({
            color: ["#3D9AFF", "#76B5F7", "#FFAE53"],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            grid: {
              left: "0%",
              right: "0%",
              bottom: "10%",
              top: "10%",
              containLabel: true,
            },
            calculable: true,
            xAxis: [
              {
                type: "category",
                axisTick: { show: false },
                data: days,
              },
            ],
            yAxis: [
              {
                type: "value",
              },
            ],
            series: [
              {
                name: "热水",
                type: "bar",
                barGap: 0,
                data: hotwater,
              },
              // {
              //   name: "冷水",
              //   type: "bar",
              //   data: coldwater,
              // },
              // {
              //   name: "电",
              //   type: "bar",
              //   data: electricity,
              // },
            ],
          });
          window.addEventListener("resize", function () {
            jlqk_bar.resize();
          });
        });
    },
  },
  mounted() {
    this.ystj_search();
    this.jlqk_search();
  },
  created() {},
  computed: {},
  watch: {},
  data() {
    return {
      newdata: "",
      ystj: [],
      ysecharts: [],
      jlqk_tab: 0,
      jlqk: [
        { text: "本日", id: 0 },
        { text: "本月", id: 1 },
        { text: "本年", id: 2 },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.left_table {
  padding: 23px 29px 0 29px;
  width: 49%;
  height: 350px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 8px rgba(229, 230, 255, 0.5);
  ::v-deep .el-table {
    margin-top: 31px;
    .el-table__header {
      th {
        font-size: 16px;
        font-family: $font-scme;
        font-weight: 500;
        color: #2d92ff;
      }
    }
    .el-table__body {
      td {
        font-size: 16px;
        font-family: $font-scre;
        font-weight: 400;
        color: #41545b;
      }
      tr:nth-child(odd) {
        background: #f1f9ff;
      }
    }
    tr {
      height: 58px;
      th,
      td {
        text-align: center;
      }
    }
  }
  h3 {
    font-size: 18px;
    font-family: $font-scme;
    font-weight: 500;
    color: #212d33;
  }
}
.jlqk_bar {
  h2 {
    font-size: 20px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    text-align: center;
    color: #212d33;
  }
  margin: 17px 0 10px 0;
  width: 100%;
  height: 430px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 8px rgba(229, 230, 255, 0.5);
  padding: 23px 28px;
  > div {
    width: auto;
    height: 340px;
  }
  ul {
    margin-top: 17px;
    width: 507px;
    height: 36px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #2c9dff;
    li:nth-child(2) {
      border-left: 1px solid #2c9dff;
      border-right: 1px solid #2c9dff;
    }
    li {
      cursor: pointer;
      &.active {
        background: #2c9dff;
        color: white;
      }
      display: inline-block;
      width: 33.333333%;
      text-align: center;
      line-height: 36px;
      height: 34px;
      font-size: 16px;
      font-family: $font-scme;
      font-weight: 500;
    }
  }
  h3 {
    font-size: 18px;
    font-family: $font-scme;
    font-weight: 500;
    color: #212d33;
  }
}
.right_chart {
  .ys_pie {
    width: auto;
    height: 320px !important;
  }
  h3 {
    font-size: 18px;
    font-family: $font-scme;
    font-weight: 500;
    color: #212d33;
  }
  width: 49%;
  height: 350px;
  padding: 23px 28px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 8px rgba(229, 230, 255, 0.5);
}
.middle_content {
  padding: 10px 17px 0 17px;
}
</style>
