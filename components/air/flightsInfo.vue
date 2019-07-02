<template>
  <div class="flight-item">
    <div @click="showFlightsList">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ data.airline_name }} </span> {{ data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span>{{ data.org_airport_name }}</span>
              <span>{{ data.org_airport_quay }}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ rankTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span>{{ data.dst_airport_name }}</span>
              <span>{{ data.dst_airport_quay }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ data.base_price / 2 }}</span>起
        </el-col>
      </el-row>
    </div>
    <div v-for="(item,index) in data.seat_infos" :key="index" class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row v-if="show" type="flex" justify="space-between" align="middle">
        <el-col :span="4">
          低价推荐
        </el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span> | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">
              ￥{{ item.org_settle_price }}
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button
                type="warning"
                size="mini"
              >
                选定
              </el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      show: false
    }
  },
  // 计算属性
  computed: {
    // 计算时差
    rankTime() {
      // 分割为 ['22','30'], ['00','30']
      const dep = this.data.dep_time.split(':')
      const arr = this.data.arr_time.split(':')
      // 转换为分钟
      // (22 * 60 + 30)  (00 * 60 + 30) 然后相减
      const depVal = dep[0] * 60 + +dep[1]
      const arrVal = arr[0] * 60 + +arr[1]
      // 相减
      let dis = arrVal - depVal
      // 如果是第二天凌晨 就加24小时  第二个数 加 24  在乘于60  在减去 第一个数
      if (dis < 0) {
        dis = arrVal + 24 * 60 - depVal
      }
      // 之后要取整 总数/60  总数%60
      return `${Math.floor(dis / 60)}时${dis % 60}分`
    }
  },
  methods: {
    showFlightsList() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{

            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            }

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>
