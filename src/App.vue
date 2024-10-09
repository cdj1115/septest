<template>
  <div>
    <!-- app.vue只需要留一个路由出口 router-view 即可 -->

    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
<style scoped></style>
