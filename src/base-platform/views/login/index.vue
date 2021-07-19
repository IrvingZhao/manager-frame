<template>
  <pj-form ref="formEl" :model="form" :rules="formRules" class="login-form-area" label-width="0px">
    <div class="main">
      <img alt="" class="login-form-bg" src="./assets/bg.jpg" />
      <div class="login-form-bg-mask"></div>
      <div class="login-form">
        <div class="form-title">欢迎沃畅CDN</div>
        <pj-form-item prop="username">
          <pj-input placeholder="请输入用户名/手机号" v-model="form.username"></pj-input>
        </pj-form-item>
        <pj-form-item prop="password">
          <pj-input type="password" placeholder="请输入密码" v-model="form.password"></pj-input>
        </pj-form-item>
        <pj-form-item prop="captcha">
          <div class="vercode">
            <pj-input width="100" placeholder="请输入验证码" v-model="form.captcha" @keypress.enter="login"></pj-input>
            <div class="vercode-area" @click="updateVerCode">
              <img alt="" :src="verCodeData" />
            </div>
            <div class="changeVercode" @click="updateVerCode">看不清楚？</div>
          </div>
        </pj-form-item>
        <div class="login-button-area">
          <pj-button type="primary" class="login-button" @click="login">登录</pj-button>
        </div>
      </div>
    </div>
  </pj-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  mounted() {
    this.updateVerCode()
  },
  methods: {
    updateVerCode() {
      this.$axios.get('authn/captcha').then((res) => {
        if (res.checkSuccess()) {
          this.verCodeData = res.data.img
          this.form.captchaKey = res.data.key
        }
      })
    },
    login() {
      this.formEl
        .validate()
        .then(() => {
          this.$axios
            .post('authn/pass', { ...this.form })
            .then((res) => {
              if (res.checkSuccess()) {
                this.$store.commit('frame_user/accessToken', res.data.token)
                this.$cRoute.replacePrePath()
              }
            })
            .finally(() => {
              this.updateVerCode()
            })
        })
        .catch(() => undefined)
    }
  },
  setup() {
    const formEl = ref<any>(null)
    const verCodeData = ref<string>('')
    const form = ref<any>({
      username: '',
      password: '',
      captcha: '',
      captchaKey: ''
    })
    const formRules = ref<any>({
      username: {
        required: true,
        message: '请输入用户名/手机号'
      },
      password: {
        required: true,
        message: '请输入密码'
      },
      captcha: {
        required: true,
        message: '请输入验证码'
      }
    })

    return {
      form,
      formRules,
      formEl,
      verCodeData
    }
  }
})
</script>

<style scoped lang="scss">
.login-form-area {
  width: 100%;
  height: 100%;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .login-form-bg {
    position: absolute;
    z-index: -2;
    min-width: 100%;
    min-height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login-form-bg-mask {
    position: absolute;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 1) 100%);
    opacity: 0.7;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
}

.login-form {
  flex: 0 0 500px;

  .form-title {
    color: #fff;
    font-size: 40px;
    line-height: 56px;
    margin-bottom: 26px;
    text-align: center;
  }

  .form-item-area {
    margin: 10px 0;
  }

  .vercode {
    display: flex;
    justify-content: space-between;

    .el-input {
      flex: 0 0 200px;
    }

    .vercode-area {
      flex: 0 0 160px;
      height: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .changeVercode {
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #edf1f7;
      }
    }
  }

  .operator-area {
    text-align: right;
  }

  .login-button-area {
    text-align: center;

    .login-button {
      width: 200px;
    }
  }
}
</style>
