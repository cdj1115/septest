<!-- <template>
  <div>
    <el-row>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <div>
          <img
            src="../assets/images/appm3V1L6Y3C3podIGShCo686dXRRY4i.png"
            class="w-[72.5%]"
            alt=""
          />
        </div>
      </el-col>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple-light" />
        <el-form>
          <div class="flex justify-center items-center">
            <h1 class="text-[32px] text-[#333] font-bold mt-[20%] mr-[130px]">
              登录，即刻创造您的应用
            </h1>
          </div>
          <el-form-item>
            <h1>账号密码登录</h1>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="input"
              style="width: 340px"
              placeholder="账号"
              clearable
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const input = ref('')
</script> -->
<template>
  <div class="flex h-screen justify-center items-center">
    <!-- 左侧广告图片部分 -->
    <div class="w-1/2">
      <img
        src="../assets/images/appm3V1L6Y3C3podIGShCo686dXRRY4i.png"
        alt="promotional image"
        class="h-full object-cover w-[72.5%]"
      />
    </div>

    <!-- 右侧登录表单部分 -->

    <div class="w-1/2 flex items-center p-5">
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
              <div>
                <button
                  class="bg-[#0035e3] w-[300px] h-[40px] text-white rounded-[5px] mt-5"
                >
                  登录
                </button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="账号密码登录" name="account">
          <el-form :model="accountLoginForm" class="mt-4">
            <el-form-item class="w-[300px]">
              <el-input v-model="accountLoginForm.account" placeholder="账号" />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="accountLoginForm.password"
                placeholder="密码"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <div>
                
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <button
                  class="bg-[#0035e3] w-[300px] h-[40px] text-white rounded-[5px] mt-5"
                >
                  登录
                </button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <div>
          <span class="text-[12px] text-[#666666] text-center block mt-5"> 还未注册?<a href="#" class="text-[#0035e3] ml-1">立即注册</a> </span>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("phone"); // 默认展示手机号登录
const phoneLoginForm = ref({
  phone: "",
  code: "",
});
const accountLoginForm = ref({
  account: "",
  password: "",
});

const handleTabClick = (tab) => {
  console.log("当前选中的Tab:", tab.props.label, tab.props.name);
};

const submitLogin = (type) => {
  if (type === "phone") {
    console.log(
      "手机号:",
      phoneLoginForm.value.phone,
      "验证码:",
      phoneLoginForm.value.code
    );
  } else if (type === "account") {
    console.log(
      "账号:",
      accountLoginForm.value.account,
      "密码:",
      accountLoginForm.value.password
    );
  }
};
</script>

<style scoped></style>
