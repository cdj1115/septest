<template>
  <div class="flex h-screen">
    <!-- 左侧导航栏 -->
    <nav class="w-16 h-screen text-white flex">
      <el-menu
        class="w-full h-[50vw] mb-[-1rem]"
        :default-active="activeMenu"
        @select="handleSelect"
      >
        <el-menu-item
          index="1"
          class="flex flex-col items-center w-full h-[50px]"
        >
          <Icon
            icon="icon-park-outline:workbench"
            width="24"
            height="24"
            style="color: black"
            class="mt-[10px]"
          />
          <span class="text-xs">工作台</span>
        </el-menu-item>

        <el-menu-item index="2" class="flex flex-col items-center">
          <Icon
            icon="eos-icons:project-outlined"
            width="24"
            height="24"
            style="color: black"
            class="mt-[10px]"
          />
          <span class="text-xs">项目</span>
        </el-menu-item>

        <el-menu-item index="3" class="flex flex-col items-center">
          <Icon
            icon="eos-icons:ai"
            width="48"
            height="48"
            style="color: black"
            class="mt-[10px]"
          />
          <span class="text-xs">AI</span>
        </el-menu-item>

        <el-menu-item index="4" class="flex flex-col items-center">
          <Icon
            icon="ph:code-fill"
            width="24"
            height="24"
            style="color: black"
            class="mt-[10px]"
          />
          <span class="text-xs">代码</span>
        </el-menu-item>

        <el-menu-item index="5" class="flex flex-col items-center">
          <Icon
            icon="fluent-mdl2:product"
            width="24"
            height="24"
            style="color: black"
            class="mt-[10px]"
          />
          <span class="text-xs">制品</span>
        </el-menu-item>

        <el-menu-item index="6" class="flex flex-col items-center">
          <Icon
            icon="mdi:chart-line"
            width="24"
            height="24"
            class="mt-[10px]"
          />
          <span class="text-xs">洞察</span>
        </el-menu-item>

        <el-menu-item index="7" class="flex flex-col items-center">
          <Icon icon="mdi:book-open" width="24" height="24" class="mt-[10px]" />
          <span class="text-xs">知识</span>
        </el-menu-item>

        <el-menu-item index="8" class="flex flex-col items-center">
          <Icon
            icon="fluent-mdl2:automate-flow"
            width="24"
            height="24"
            style="color: black"
            class="mt-[10px]"
          />
          <span class="text-xs">自动化</span>
        </el-menu-item>
        <el-menu-item
          index="9"
          class="flex flex-col items-center w-full h-[50px]"
        >
          <Icon
            icon="akar-icons:person"
            width="24"
            height="24"
            style="color: black"
            class="mt-[10px]"
          />
        </el-menu-item>
        <el-menu-item index="10" class="flex flex-col items-center">
          <Icon
            icon="hugeicons:more-02"
            width="24"
            height="24"
            style="color: #666666"
            class="mt-[10px]"
          />
        </el-menu-item>
        <el-menu-item index="11" class="flex flex-col items-center">
          <Icon
            icon="iconamoon:notification"
            width="24"
            height="24"
            class="mt-[10px]"
            style="color: #666666"
          />
        </el-menu-item>
        <el-menu-item index="12" class="flex flex-col items-center">
          <Icon
            icon="ri:settings-line"
            width="24"
            height="24"
            class="mt-[10px]"
            style="color: #666666"
          />
        </el-menu-item>
        <el-menu-item index="13" class="flex flex-col items-center">
          <Icon
            icon="icon-park-outline:thinking-problem"
            width="24"
            height="24"
            class="mt-[10px]"
            style="color: #666666"
          />
        </el-menu-item>
        <!-- 个人中心 -->
        <el-menu-item
          @click="drawer = true"
          index="14"
          class="flex flex-col items-center"
        >
          <Icon
            icon="bi:person-circle"
            width="24"
            height="24"
            class="mt-[10px]"
            style="color: #666666"
          />
        </el-menu-item>
        <!-- 抽屉 -->
        <div>
          <el-drawer
            class="ml-[65px]"
            direction="ltr"
            size="21%"
            v-model="drawer"
            title="I am the title"
            :with-header="false"
            :modal="false"
          >
            <div>
              <span class="text-[black]">Hi 于又术!</span>
              <div class="w-[145px] h-full flex justify-between items-start">
                <div class="m-[10px]">
                  <Icon
                    icon="proicons:person"
                    width="24"
                    height="24"
                    style="color: black"
                  />
                </div>
                <p class="text-[#2e2e2e] mt-[10px]">个人账户设置</p>
              </div>
              <div class="w-[145px] h-full flex">
                <div class="m-[10px]">
                  <Icon
                    icon="material-symbols:shopping-cart-outline"
                    width="24"
                    height="24"
                    style="color: black"
                  />
                </div>
                <p class="text-[#2e2e2e] ml-[10px] mt-[10px]">服务订购</p>
              </div>
              <div class="w-[145px] h-full flex">
                <div class="m-[10px]">
                  <Icon
                    icon="tdesign:member"
                    width="24"
                    height="24"
                    style="color: black"
                  />
                </div>
                <p class="text-[#2e2e2e] ml-[10px] mt-[10px]">邀请成员</p>
              </div>

              <div class="w-full h-full flex">
                <div class="m-[10px]">
                  <Icon
                    icon="mingcute:earth-fill"
                    width="24"
                    height="24"
                    style="color: black"
                  />
                </div>
                <p class="text-[#2e2e2e] ml-[10px] mt-[10px]">切换语言</p>
                <div class="h-full">
                  <p
                    class="text-[#AEAEAE] ml-[10px] mt-[10px] text-[12px] leading-6"
                  >
                    简体中文
                  </p>
                </div>
              </div>
              <div class="w-[145px] h-full flex">
                <div class="m-[10px]">
                  <Icon
                    icon="lsicon:work-order-outline"
                    width="24"
                    height="24"
                    style="color: black"
                  />
                </div>
                <p class="text-[#2e2e2e] ml-[10px] mt-[10px]">工单中心</p>
              </div>
              <div class="w-[145px] h-full flex">
                <div class="m-[10px]">
                  <Icon
                    icon="lucide:calendar-days"
                    width="24"
                    height="24"
                    style="color: black"
                  />
                </div>
                <p class="text-[#2e2e2e] ml-[10px] mt-[10px]">更新日志</p>
              </div>
              <div @click="outLogin" class="w-[145px] h-full flex cursor-arrow">
                <div class="m-[10px]">
                  <Icon
                    icon="mingcute:exit-fill"
                    width="24"
                    height="24"
                    style="color: black"
                  />
                </div>
                <p class="text-[#2e2e2e] ml-[10px] mt-[10px]">退出</p>
              </div>
            </div>
          </el-drawer>
        </div>
      </el-menu>
    </nav>

    <!-- 右侧的内容区域 -->
    <div class="flex-1 p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
const router = useRouter();
const activeMenu = ref("1");
const drawer = ref();
const handleSelect = (index: any) => {
  switch (index) {
    case "1":
      router.push("/workbench");
      break;
    case "2":
      router.push("/project");
      break;
    case "3":
      router.push("/ai");
      break;
    case "4":
      router.push("/code");
      break;
    case "5":
      router.push("/artifact");
      break;
    case "6":
      router.push("/insight");
      break;
    case "7":
      router.push("/knowledge");
      break;
    case "8":
      router.push("/automation");
      break;
    default:
      break;
  }
};
const outLogin = () => {
  localStorage.removeItem("token");
  router.push("/");
};
onMounted(async() => {
  // 根据当前路由设置激活的菜单项
  activeMenu.value = router.currentRoute.value.path.split("/")[1] || "1";
  
});
</script>

<style scoped></style>
