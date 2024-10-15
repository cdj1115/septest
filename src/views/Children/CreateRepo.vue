<template>
  <div>
    <div>
      <h1 class="text-[18px] font-bold text-[#333]">代码仓库</h1>
    </div>
    <hr class="mt-[10px]" />
    <div v-if="loading" class="text-center text-blue-300 font-bold">
      创建仓库中，请稍候...
    </div>
    <div class="flex items-center mb-4 w-[200px] h-[100%] mt-[2%] ml-[10px]">
      <div
        class="w-[30px] h-[30px] rounded-full shadow-md flex items-center justify-center cursor-arrow"
      >
        <Icon
          icon="si:arrow-left-line"
          width="30"
          height="30"
          style="color: skyblue"
          @click="cancelForm"
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
                v-model="form.readme"
                class="form-checkbox"
              />
              <span class="ml-2 text-[14px]">生成README文件</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="form.gitignore"
                class="form-radio"
              />
              <span class="ml-2 text-[14px]">添加.gitignore文件</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="form.branchModel"
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
            >创建仓库
            <!-- <span v-if="loading">创建中...</span>
            <span v-else>创建仓库</span> -->
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
import { ElMessage,ElLoading  } from "element-plus";
import { useRouter } from "vue-router";
import { createRepo } from "../../api";
const router = useRouter();
const loading = ref(false);
const form = ref({
  readme: true,
  gitignore: true,
  branchModel: true,
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
  // 显示“创建中”提示
  loading.value = true;
  // 提交表单时 发起请求
  // 创建仓库
  try {
    loading.value = true;
    // 获取 token 并存储到 localStorage 中
    const token = import.meta.env.VITE_ACCESS_TOKEN;
    if (token) {
      localStorage.setItem("access_token", token); // 将 token 存储到 localStorage
    }
    const res = await createRepo({
      readme: form.value.readme,
      branchModel: form.value.branchModel,
      gitignore: form.value.gitignore,
      project: form.value.project,
      name: form.value.name,
      description: form.value.description,
      private: true,
      auto_init: true,
      // access_token: import.meta.env.VITE_ACCESS_TOKEN,
      access_token: localStorage.getItem("access_token"),
      path: form.value.path,
    });
    // 思路一:跳转的时候携带参数 另一个页面接受参数 然后渲染到页面上
    // 思路二:跳转到另一个页面在onmouted里再调用geRepo（）先写死 后面在想办法 然后再把返回的数据再次渲染到页面

    if (res.status === 201) {
      ElMessage.success("创建仓库成功");
      console.log(
        res.data.project,
        res.data.name,
        res.data.description,
        res.data.updated_at
      );
      console.log(res.data.forks_count);
      // 创建完成后 清空表单信息
      form.value = { ...form };
      // 将仓库数据存储到 localStorage
      localStorage.setItem("repoData", JSON.stringify(res.data));

      localStorage.setItem("repoData", JSON.stringify(res.data));
      router.push({
        path: "/code",
        query: {
          // forks:res.data.forks_count,
          // avatar:res.data.avatar_url,
          project: res.data.project,
          name: res.data.name,
          description: res.data.description,
          data: res.data.updated_at,
        },
      });
    }
  } catch (error) {
    console.error("创建仓库失败", error);
  } finally {
    loading.value = false;
  }
};

const cancelForm = () => {
  // 返回上一页
  router.push("/code");
};
</script>

<style scoped></style>
