<template>
  <div>
    <h1>仓库信息</h1>
    <p><strong>仓库名称:</strong> {{ repoName }}</p>
    <p><strong>仓库描述:</strong> {{ repoDescription }}</p>
    <p><strong>更新时间:</strong> {{ formattedUpdatedDate }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRepoStore } from "../../stores/store";
import { getRepo } from "../../api"; // 假设你有一个 API 请求函数

const store = useRepoStore(); // 创建 store 的实例
const router = useRouter();

const repoName = ref("");
const repoDescription = ref("");
const updatedDate = ref("");

// 从 localStorage 读取仓库数据
const loadFromLocalStorage = () => {
  const storedRepo = localStorage.getItem("repoData");
  if (storedRepo) {
    const parsedData = JSON.parse(storedRepo);
    store.setRepoData(parsedData);
    repoName.value = parsedData.name || "无";
    repoDescription.value = parsedData.description || "无";
    updatedDate.value = parsedData.updated_at || "无";
  }
};

// 使用 onMounted 生命周期钩子来获取数据
onMounted(async () => {
  // 先从 localStorage 加载数据
  loadFromLocalStorage(); 

  // 如果 Pinia 中没有仓库数据，发起 API 请求
  if (!store.repoData.name) {
    try {
      const res = await getRepo(); // 发起 API 请求
      if (res.status === 200) {
        // 将数据存储到 Pinia 和 localStorage
        store.setRepoData(res.data);
        localStorage.setItem("repoData", JSON.stringify(res.data));
        repoName.value = res.data.name || "无";
        repoDescription.value = res.data.description || "无";
        updatedDate.value = res.data.updated_at || "无"; // 假设 API 返回的更新时间字段是 updated_at
      } else {
        ElMessage.warning("未找到仓库信息，请返回并重试。");
      }
    } catch (error) {
      ElMessage.error("加载仓库信息失败，请稍后重试。");
      console.error("API 请求错误:", error);
    }
  } else {
    // 如果 Pinia 里已经有数据，直接渲染
    repoName.value = store.repoData.name || "无";
    repoDescription.value = store.repoData.description || "无";
    updatedDate.value = store.repoData.updated_at || "无";
  }
});

// 计算并格式化更新时间
const formattedUpdatedDate = computed(() => {
  if (!updatedDate.value || updatedDate.value === "无") {
    return "无";
  }

  const updatedTime = new Date(updatedDate.value); // 将字符串转换为 Date 对象

  // 添加有效性检查
  if (isNaN(updatedTime.getTime())) {
    return "无效的日期"; // 处理无效日期情况
  }

  const now = new Date(); // 当前时间
  const diffInMinutes = Math.floor((now - updatedTime) / (1000 * 60)); // 计算时间差，转换为分钟

  if (diffInMinutes < 1) {
    return "刚刚"; // 小于1分钟
  } else if (diffInMinutes === 1) {
    return "1分钟前"; // 1分钟
  } else {
    return `${diffInMinutes}分钟前`; // 2分钟及以上
  }
});
</script>
