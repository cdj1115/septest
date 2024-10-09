<template>
  <div>
    <div>
      <h1 class="text-[18px] font-bold text-[#333]">代码仓库</h1>
    </div>
    <hr class="mt-[10px]" />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" >
      <el-tab-pane label="最近访问" name="first">
       <div class="ml-[50%] mt-[100px]">
        <img src="../../assets//images/4.png" alt="">
        <p class="w-[216px] text-center text-[#999] ">暂无数据</p>
      </div>
      </el-tab-pane>
      <el-tab-pane label="全部仓库" name="second">全部仓库</el-tab-pane>
      <el-tab-pane label="开源仓库" name="third">开源仓库</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style scoped>
.demo-tabs{
  margin-top: 10px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
