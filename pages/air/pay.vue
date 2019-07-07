<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{ order.price | toFixed }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" />
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  filters: {
    toFixed(price) {
      return Number(price).toFixed(2)
    }
  },
  data() {
    return {
      order: {},
      // 定时器
      timeId: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.$axios({
        url: `/airorders/${this.$route.query.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then((res) => {
        this.order = res.data

        // 生成二维码到canvas
        const stage = document.querySelector('#qrcode-stage')
        QRCode.toCanvas(stage, this.order.payInfo.code_url, {
          width: 200
        })

        // 判断是否付款成功
        this.timeId = setInterval(async () => {
          const isPay = await this.isPay()
          if (isPay) {
            this.$message.success('支付成功')
            clearInterval(this.timeId)
            return true
          }
        }, 3000)
      })
    }, 200)
  },
  // 网页销毁就把定时器停止
  destroyed() {
    clearInterval(this.timeId)
  },
  methods: {
    // 是否付款成功
    isPay() {
      this.$axios({
        url: 'airorders/checkpay',
        method: 'POST',
        data: {
          id: this.$route.query.id,
          nonce_str: this.order.price,
          out_trade_no: this.order.orderNo
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        const { statusTxt } = res.data
        if (statusTxt === '支付成功') {
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>
