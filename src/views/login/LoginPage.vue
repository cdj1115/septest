<template>
  <div class="flex h-screen justify-center items-center">
    <!-- 左侧广告图片部分 -->
    <div class="w-1/2">
      <img
        src="@/assets/images/appm3V1L6Y3C3podIGShCo686dXRRY4i.png"
        alt="promotional image"
        class="h-full object-cover w-[72.5%]"
      />
    </div>

    <!-- 右侧登录表单部分 -->

    <div class="w-1/2 flex items-center p-5">
      <!--  -->
      <el-tabs
        v-model="activeTab"
        @tab-click="handleTabClick"
        class="max-w-md mx-auto"
      >
        <el-tab-pane label="手机号登录" name="phone">
          <el-form :model="phoneLoginForm" class="mt-4">
            <el-form-item class="w-[300px]">
              <el-input
                v-model="phoneLoginForm.phone"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="phoneLoginForm.code"
                placeholder="请输入验证码"
              />
            </el-form-item>
            <el-form-item>
              <div class="flex items-center justify-center">
                <input
                  type="checkbox"
                  v-model="agreed"
                  class="border-opacity-25 border-gray-300 bg-[#ff2c2c]"
                />
                <span class="text-[13px] text-[#666666]">
                  我已阅读并同意<a class="text-[#0035e3]" href="#">服务协议</a
                  >和<a class="text-[#0035e3]" href="#">隐私政策</a>
                </span>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <el-button
                  type="primary"
                  :plain="true"
                  @click="handleLayout"
                  class="bg-[#0035e3] w-[300px] h-[40px] text-white rounded-[5px]"
                >
                  登录
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="账号密码登录" name="account">
          <el-form :model="accountLoginForm" class="mt-4">
            <el-form-item class="w-[300px]">
              <el-input
                v-model="accountLoginForm.username"
                placeholder="账号"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="accountLoginForm.password"
                placeholder="密码"
                show-password
              />
            </el-form-item>

            <el-form-item>
              <div class="flex items-center justify-center">
                <input
                  type="checkbox"
                  v-model="agreed"
                  class="border-opacity-25 border-gray-300 bg-[#ff2c2c]"
                />
                <span class="text-[13px] text-[#666666]">
                  我已阅读并同意<a class="text-[#0035e3]" href="#">服务协议</a
                  >和<a class="text-[#0035e3]" href="#">隐私政策</a>
                </span>
              </div>
            </el-form-item>

            <el-form-item>
              <div>
                <el-button
                  type="primary"
                  :plain="true"
                  @click="handleLayout"
                  class="bg-[#0035e3] w-[300px] h-[40px] text-white rounded-[5px]"
                >
                  登录
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <div>
          <span class="text-[12px] text-[#666666] text-center block mt-5">
            还未注册?<a href="#" class="text-[#0035e3] ml-1">立即注册</a>
          </span>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getLogin } from "../../api/index";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
const router = useRouter();
const agreed = ref(false);
const accountLoginForm = ref({
  
  username: "",
  // account: "",
  password: "",
  // client_id: "",
  // client_secret: "",
  // scope:"",
  // grant_type: "password",
});
const activeTab = ref("phone"); // 默认展示手机号登录
const phoneLoginForm = ref({
  phone: "",
  code: "",
});
const handleLayout = async () => {
getLogin({
    username: accountLoginForm.value.username,
    password: accountLoginForm.value.password,
    // grant_type:accountLoginForm.value.grant_type,
    // client_id:accountLoginForm.value.client_id,
    // client_secret:accountLoginForm.value.client_secret,
    // scope:accountLoginForm.value.scope
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  if (agreed.value) {
    // 跳转手机登录页面
    router.push("/layout");
    ElMessage.success("登录成功");
  } else {
    // 提示用户未同意协议
    ElMessage({
      message: "请先同意协议",
      type: "warning",
      plain: true,
    });
  }
};

const handleTabClick = (tab) => {
  console.log("当前选中的Tab:", tab.props.label, tab.props.name);
};

// const submitLogin = (type) => {
//   if (type === "phone") {
//     console.log(
//       "手机号:",
//       phoneLoginForm.value.phone,
//       "验证码:",
//       phoneLoginForm.value.code
//     );
//   } else if (type === "account") {
//     console.log(
//       "账号:",
//       accountLoginForm.value.account,
//       "密码:",
//       accountLoginForm.value.password
//     );
//   }
// };
</script>

<style scoped></style>
