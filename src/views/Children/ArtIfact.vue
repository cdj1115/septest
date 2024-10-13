<template>
  <div>
    <h1>仓库信息</h1>
    <p><strong>仓库名称:</strong> {{ repoName }}</p>
    <p><strong>仓库描述:</strong> {{ repoDescription }}</p>
    <p><strong>更新时间:</strong> {{ formattedUpdatedDate }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const repoName = ref("");
const repoDescription = ref("");
const updatedDate = ref("");

// 使用 onMounted 生命周期钩子来获取参数
onMounted(() => {
  const storedData = localStorage.getItem('repoData');
  if (storedData) {
    const data = JSON.parse(storedData);
    repoName.value = data.name || "无";
    repoDescription.value = data.description || "无";
    updatedDate.value = data.updated_at || "无";
  }
});

// 计算并格式化更新时间
const formattedUpdatedDate = computed(() => {
  if (!updatedDate.value || updatedDate.value === "无") {
    return "无";
  }

  const updatedTime = new Date(updatedDate.value); // 将字符串转换为 Date 对象
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
