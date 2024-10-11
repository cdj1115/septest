<template>
  <div>
    <div>
      <h1 class="text-[18px] font-bold text-[#333]">代码仓库</h1>
    </div>
    <hr class="mt-[10px]" />
    <div class="flex items-center mb-4 w-[200px] h-[100%] mt-[2%] ml-[10px]">
      <div
        class="w-[30px] h-[30px] rounded-full shadow-md flex items-center justify-center cursor-arrow"
      >
        <Icon
          icon="si:arrow-left-line"
          width="30"
          height="30"
          style="color: skyblue"
        />
      </div>
      <h2 class="text-xl font-bold ml-[30px]">创建代码仓库</h2>
    </div>
    <div class="max-w-[50%] bg-white p-6 rounded-lg shadow-md">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label
            for="form.project"
            class="block text-sm font-bold text-gray-700"
            >所属项目
          </label>
          <input
            type="text"
            id="form.project"
            v-model="form.project"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="所属项目"
            required
          />
        </div>

        <div class="flex items-center">
          <label for="repoType" class="block text-sm font-bold text-gray-700"
            >仓库类型</label
          >
          <div class="w-[80px] flex justify-between ml-[20px]">
            <div class="ml-[5px]">
              <Icon icon="devicon:git" width="18  " height="18  " />
            </div>
            <h1 class="text-[14px] text-[#585858]">GIT仓库</h1>
          </div>
        </div>

        <div class="mb-4 mt-[10px]">
          <label for="name" class="block text-sm font-bold text-gray-700"
            >仓库名称
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="请输入仓库名称"
            required
          />
        </div>

        <div class="mb-4">
          <label for="path" class="block text-sm font-bold text-gray-700"
            >仓库路径</label
          >
          <input
            type="text"
            id="path"
            v-model="form.path"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="请输入仓库路径"
            required
          />
        </div>

        <div class="mb-4">
          <label
            for="repoDescription"
            class="block text-sm font-bold text-gray-700"
            >仓库描述</label
          >
          <textarea
            id="repoDescription"
            v-model="form.description"
            class="mt-1 p-2 block w-full h-[80px] border border-gray-300 rounded-md"
            placeholder="请输入仓库描述"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700"
            >初始化仓库</label
          >
          <div class="mt-1 ml-[10px]">
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="form.auto_init"
                class="form-checkbox"
              />
              <span class="ml-2 text-[14px]">生成README文件</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="form.auto_init"
                class="form-radio"
              />
              <span class="ml-2 text-[14px]">添加.gitignore文件</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="form.auto_init"
                class="form-radio"
              />
              <span class="ml-2 text-[14px]"
                >添加分支模型(仓库创建后将根据所选模型创建分支)</span
              >
            </label>
          </div>
        </div>

        <div class="mb-4 mt-[20px]">
          <label class="block text-sm font-bold text-gray-700">是否开源</label>
          <div class="mt-1 ml-[10px]">
            <label class="inline-flex items-center">
              <input
                type="radio"
                v-model="form.private"
                :value="true"
                class="form-radio"
              />
              <span class="ml-2 text-[14px]"
                >私有仓库(仅对仓库成员可见，仓库成员可访问仓库)</span
              >
            </label>
            <br />
            <label class="inline-flex items-center">
              <input
                type="radio"
                v-model="form.private"
                :value="false"
                class="form-radio"
              />
              <span class="ml-2 text-[14px]">公开仓库</span>
            </label>
          </div>
        </div>

        <div>
          <button
            @click="getOnRepo"
            type="submit"
            class="w-150px bg-[#2B323D] text-white py-2 px-4 rounded-md"
          >
            创建仓库
          </button>
          <!-- 取消按钮 -->
          <button
            type="button"
            class="w-70px border-2 text-[#2B323D] py-2 px-4 rounded-md ml-[20px]"
            @click="cancelForm"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { createRepo, getRepo } from "../../api";
const router = useRouter();
// const repoDescription = ref('')
// const isPublic = ref(false)
const form = ref({
  project: "",
  name: "",
  path: "",
  description: "",
  // access_token: "0fe078827eb62914fd9d36a60f231a03",
});
const pathRegex = /^[a-zA-Z0-9][a-zA-Z0-9-_\.]{1,190}$/;
const getOnRepo = async () => {
  if (
    !form.value.project ||
    !form.value.name ||
    !form.value.path ||
    !form.value.description
  ) {
    ElMessage.error("请完善仓库信息");
    return;
  }
  // 对path做校验
  if (!pathRegex.test(form.value.path)) {
    ElMessage.error(
      "仓库路径格式不正确，只允许包含字母、数字或者下划线(_)、中划线(-)、英文句号(.)，必须以字母或数字开头，且长度为2~191个字符"
    );
    return;
  }
  // 提交表单时 发起请求
  // 创建仓库
  try {
    const res = await createRepo({
      project: form.value.project,
      name: form.value.name,
      description: form.value.description,
      private: true,
      auto_init: true,
      access_token: import.meta.env.VITE_ACCESS_TOKEN,
      path: form.value.path,
    });
    if (res.status === 201) {
      ElMessage.success("创建仓库成功");
      // 创建完成后 清空表单信息
      form.value = {};
      const repoRes = await getRepo();
      if (repoRes.status === 200) {
        router.push({
          path: "/code",
          query: {
            repoData: JSON.stringify(repoRes.data),
          },
        });
      }
      // router.push("/code");
      console.log(res);
    }
  } catch (error) {
    console.error("创建仓库失败", error);
    ElMessage.error("创建仓库失败，请重试");
  }
};

const cancelForm = () => {
  // 返回上一页
  router.push("/code");
};
</script>

<style scoped></style>
