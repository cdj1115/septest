<template>
  <div class="flex h-screen">
    <!-- 左侧导航栏 -->
    <nav
      class="w-16 h-full bg-gray-500 text-white flex flex-col items-center py-4"
    >
      <el-menu
        class="w-full h-full"
        :default-active="activeMenu"
        @select="handleSelect"
      >
        <el-menu-item index="1" class="flex flex-col items-center mb-1">
          <Icon
            icon="icon-park-outline:workbench"
            width="24"
            height="24"
            style="color: black"
          />
          <span class="text-xs mt-1">工作台</span>
        </el-menu-item>

        <el-menu-item index="2" class="flex flex-col items-center mb-1">
          <Icon
            icon="eos-icons:project-outlined"
            width="24"
            height="24"
            style="color: black"
          />
          <span class="text-xs mt-1">项目</span>
        </el-menu-item>

        <el-menu-item index="3" class="flex flex-col items-center mb-1">
          <Icon
            icon="eos-icons:ai"
            width="32"
            height="32"
            style="color: black"
          />
          <span class="text-xs mt-1">AI</span>
        </el-menu-item>

        <el-menu-item index="4" class="flex flex-col items-center mb-1">
          <Icon
            icon="ph:code-fill"
            width="24"
            height="24"
            style="color: black"
          />
          <span class="text-xs mt-1">代码</span>
        </el-menu-item>

        <el-menu-item index="5" class="flex flex-col items-center mb-1">
          <Icon
            icon="fluent-mdl2:product"
            width="24"
            height="24"
            style="color: black"
          />
          <span class="text-xs mt-1">制品</span>
        </el-menu-item>

        <el-menu-item index="6" class="flex flex-col items-center mb-1">
          <Icon icon="mdi:chart-line" width="24" height="24" />
          <span class="text-xs mt-1">洞察</span>
        </el-menu-item>

        <el-menu-item index="7" class="flex flex-col items-center mb-1">
          <Icon icon="mdi:book-open" width="24" height="24" />
          <span class="text-xs mt-1">知识</span>
        </el-menu-item>

        <el-menu-item index="8" class="flex flex-col items-center mb-1">
          <Icon
            icon="fluent-mdl2:automate-flow"
            width="24"
            height="24"
            style="color: black"
          />
          <span class="text-xs mt-1">自动化</span>
        </el-menu-item>
      </el-menu>
    </nav>

    <!-- 右侧的内容区域 -->
    <div class="flex-1 p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const router = useRouter();
const activeMenu = ref("1");

const handleSelect = (index) => {
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

onMounted(() => {
  // 根据当前路由设置激活的菜单项
  activeMenu.value = router.currentRoute.value.path.split("/")[1] || "1";
});
</script>

<style scoped>
/* TailwindCSS 提供的工具类已经足够，你可以根据需求调整自定义样式 */
</style>
