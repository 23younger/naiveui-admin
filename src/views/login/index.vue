<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="websiteConfig.loginImage" alt="" />
        </div>
        <div class="view-account-top-desc">{{ websiteConfig.loginDesc }}</div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formData"
          :rules="rules"
          v-show="!showVerifySms"
        >
          <n-form-item path="username">
            <n-input v-model:value.trim="formData.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value.trim="formData.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="code">
            <n-input v-model:value.trim="formData.code" placeholder="请输入验证码">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <CreateOutline />
                </n-icon>
              </template>
            </n-input>
            <div class="verify-code" v-debounce="getVerifyCode">{{ formData.verification }}</div>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="formData.agree">下次登录记住我的身份</n-checkbox>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              @click="handleSubmit(1)"
              size="large"
              :loading="isValidate"
              block
            >
              {{ isValidate ? '登录验证中' : '立即登录' }}
            </n-button>
          </n-form-item>
        </n-form>

        <!-- 短信验证码表单 -->
        <n-form
          ref="smsFormRef"
          label-placement="left"
          size="large"
          :model="smsFormData"
          :rules="smsRules"
          v-show="showVerifySms"
        >
          <n-form-item path="verifySmsCode">
            <n-input v-model:value.trim="smsFormData.verifySmsCode" placeholder="请输入短信验证码">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <CreateOutline />
                </n-icon>
              </template>
            </n-input>
            <n-button
              type="primary"
              size="large"
              :disabled="!canSendSecond"
              v-debounce="getVerifySmsCode"
              >{{ sendVerifySmsCodeText }}</n-button
            >
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="formData.agree">下次登录记住我的身份</n-checkbox>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              @click="handleSubmit(2)"
              size="large"
              :loading="isValidate"
              block
            >
              {{ isValidate ? '登录验证中' : '立即登录' }}
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { PersonOutline, LockClosedOutline, CreateOutline } from '@vicons/ionicons5';
  import { PageEnum } from '@/enums/pageEnum';
  import { websiteConfig } from '@/config/website.config';
  import { checkLoginNameApi, getVerifyCodeApi, sendVerifySmsApi } from '@/api/system/user';
  import { AesEncode } from '@/utils/crypto';
  import { md5 } from 'js-md5';
  import commonSetting from '@/settings/commonSetting';
  import { storage } from '@/utils/Storage';
  import { FormRules } from 'naive-ui';
  interface FormState {
    loginName: string;
    loginPwd: string;
    verification: string;
    imgToken: string | undefined;
  }

  const smsFormRef = ref();
  const showVerifySms = ref<boolean>(false);
  const sendVerifySmsCodeText = ref<string>('点击发送验证码');
  const canSendSecond = ref<boolean>(true);
  const countdown = ref<number>(60);
  const sendInterval = ref();
  const isValidate = ref<boolean>(false);

  const formRef = ref();
  const message = useMessage();
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const formData = reactive({
    username: '',
    password: '',
    code: '',
    verification: '',
    imgToken: '',
    agree: true,
  });

  onMounted(() => {
    const loginRemember = storage.getCookie('loginRemember');
    if (loginRemember) {
      if (parseInt(loginRemember) === 1) {
        formData.username = storage.getCookie('loginRememberName');
        formData.password = storage.getCookie('loginRememberPwd');
      } else {
        formData.agree = false;
      }
    }
  });

  const smsFormData = reactive({
    verifySmsCode: '',
  });

  const checkLoginNameV = async (_, value, callback) => {
    if (!value) {
      callback(new Error('账号不能为空'));
    } else {
      let res = await checkLoginNameApi(formData.username);
      if (!res) {
        callback(new Error('无此用户'));
      } else {
        callback();
      }
    }
  };

  const rules: FormRules = {
    username: { required: true, validator: checkLoginNameV, trigger: 'blur' },
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
    ],
    code: { required: true, message: '验证码不能为空', trigger: 'blur' },
  };

  const smsRules: FormRules = {
    verifySmsCode: { required: true, message: '请输入短信验证码', trigger: 'blur' },
  };

  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const getVerifyCode = async () => {
    try {
      let data = await getVerifyCodeApi();
      formData.verification = data.verification;
      formData.imgToken = data.imgToken;
    } catch (error) {
      // 处理验证码获取失败
      formData.imgToken = '';
    }
  };

  //发送短信验证码
  const getVerifySmsCode = () => {
    if (!canSendSecond.value) return;
    canSendSecond.value = false;
    sendVerifySmsApi({
      loginName: AesEncode(formData.username),
      loginPwd: AesEncode(md5(formData.password).toUpperCase()),
    })
      .then(() => {
        let si = setInterval(function () {
          if (countdown.value === 0) {
            clearInterval(sendInterval.value);
            sendVerifySmsCodeText.value = '点击发送验证码';
            canSendSecond.value = true;
            countdown.value = 60;
            sendInterval.value = null;
          } else {
            countdown.value = countdown.value - 1;
            sendVerifySmsCodeText.value = `${countdown.value}秒后重试`;
          }
        }, 1000);
        sendInterval.value = si;
      })
      .catch(() => {
        canSendSecond.value = true;
      });
  };

  // 初始化获取验证码
  getVerifyCode();

  /**
   * @param submitType 1-普通 2-sms
   */
  const handleSubmit = (submitType) => {
    if (isValidate.value) {
      return false;
    }
    const ref = submitType === 1 ? formRef : smsFormRef;
    ref.value.validate(async (errors) => {
      if (!errors) {
        isValidate.value = true;
        message.loading('用户信息验证中');
        const { username, password, code, imgToken } = formData;
        const { verifySmsCode } = smsFormData;
        const params: FormState = {
          loginName: AesEncode(username),
          loginPwd: AesEncode(md5(password).toUpperCase()),
          verification: submitType === 1 ? AesEncode(code) : AesEncode(verifySmsCode),
          imgToken: submitType === 1 ? AesEncode(imgToken) : undefined,
        };
        try {
          const { code, msg } = await userStore.login(params, submitType);
          message.destroyAll();
          if (code === 0 || code === 3) {
            // 存储输入信息
            const { storageExpires } = commonSetting;
            if (formData.agree) {
              storage.setCookie('loginRemember', '1', storageExpires * 24 * 60 * 60);
              storage.setCookie('loginRememberName', username, storageExpires * 24 * 60 * 60);
              storage.setCookie('loginRememberPwd', password, storageExpires * 24 * 60 * 60);
            } else {
              storage.setCookie('loginRemember', '0', storageExpires * 24 * 60 * 60);
            }
            message.success('登录成功，即将进入系统', {
              duration: 1000,
              onLeave() {
                if (code === 3) {
                  message.warning(
                    '为了保障您的账号信息安全，请修改登录密码，需包含8位数字、字母、特殊字符'
                  );
                  // 去修改密码页
                  router.replace('/system/pwd_reset');
                } else {
                  const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
                  if (route.name === LOGIN_NAME) {
                    router.replace('/');
                  } else router.replace(toPath);
                }
              },
            });
            return;
          }

          // 处理异常信息
          if (submitType === 1) {
            // 普通登录
            if (
              msg === '短信锁已过期' ||
              msg === '不是常用IP登录' ||
              msg === '上次登录时间超过7天' ||
              msg === '错误次数超过3次'
            ) {
              showVerifySms.value = true;
              canSendSecond.value = true;
            } else {
              message.warning(msg);
              getVerifyCode();
            }
          } else {
            // sms登录
            message.warning(msg);
            getVerifyCode();
            showVerifySms.value = false;
          }
        } catch (error) {
          console.log('error', error);
          message.info('登录失败');
        } finally {
          isValidate.value = false;
        }
      } else if (submitType === 1) {
        message.error('请填写完整信息，并且进行验证码校验');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  .verify-code {
    background: #d8d8d8;
    border-radius: 5px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    cursor: pointer;
    width: 20%;
    height: 40px;
    margin-left: 8px;
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
