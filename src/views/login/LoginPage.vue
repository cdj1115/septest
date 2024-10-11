<template>
  <div class="flex h-[100vh]">
    <!-- 左侧广告图片部分 -->
    <div class="w-[40vw] h-full">
      <el-carousel autoplay loop height="100vh">
        <el-carousel-item>
          <img
            src="@/assets/images/appm3V1L6Y3C3podIGShCo686dXRRY4i.png"
            alt="promotional image"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="@/assets/images/app9KTBmXHMK2mtI9RHyzPDs-h0NXne1.png"
            alt="promotional image"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="@/assets/images/appzx4bpYR9rpFdZULrF9EFycs2l-416.png"
            alt="promotional image"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 右侧登录表单部分 -->

    <div class="w-1/2 h-[100vh] flex items-center p-5">
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
                  class="w-[300px] h-[40px] text-white rounded-[5px]"
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
                  class="w-[300px] h-[40px] text-white rounded-[5px]"
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
import { to } from "await-to-js";
import { getLogin } from "../../api/index";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
const router = useRouter();
const agreed = ref(false);
const accountLoginForm = ref({
  username: "3217915440@qq.com",
  password: "cdj1115",
  // client_id: import.meta.env.VITE_CLIENT_ID,
  // client_secret: import.meta.env.VITE_CLIENT_SECRET,
  // scope: import.meta.env.VITE_CLIENT_SCOPE,
  // grant_type: "password",
});
const activeTab = ref("account"); // 默认展示邮箱登录
const phoneLoginForm = ref({
  phone: "",
  code: "",
});
const handleLayout = async () => {
  // 检查用户是否同意协议
  if (!agreed.value) {
    ElMessage({
      message: "请先同意协议",
      type: "warning",
      plain: true,
    });
    return;
  }

  // 前端校验：检查账号和密码是否为空
  if (!accountLoginForm.value.username || !accountLoginForm.value.password) {
    ElMessage.error("账号和密码不能为空");
    return;
  }

  // 校验邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(accountLoginForm.value.username)) {
    ElMessage.error("请输入有效的邮箱地址");
    return;
  }

  // 开始登录请求
  try {
    const res = await getLogin({
      username: accountLoginForm.value.username,
      password: accountLoginForm.value.password,
      grant_type: "password",
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      scope: import.meta.env.VITE_CLIENT_SCOPE,
    });

    // 校验响应
    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
      router.push("/layout");
      ElMessage.success("登录成功");
    } else {
      ElMessage.error("账号或密码错误");
    }
  } catch (err) {
    // 捕获请求失败的异常
    console.error("登录请求失败", err);
    ElMessage.error("登录请求失败，请重试");
  }
};

const handleTabClick = (tab) => {
  console.log("当前选中的Tab:", tab.props.label, tab.props.name);
};

</script>

<style scoped></style>
