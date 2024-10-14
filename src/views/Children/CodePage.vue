<template>
  <div>
    <div>
      <h1 class="text-[18px] font-bold text-[#333]">代码仓库</h1>
    </div>
    <hr class="mt-[10px]" />
    <el-tabs v-model="activeName" class="mt-[15px]" @tab-click="handleClick">
      <div class="ml-[90%] bg-[#2B323D] text-[#fff] text-center rounded-md">
        <button plain class="h-[35px]" @click="onRepo">创建代码仓库</button>
      </div>

      <div class="mt-[5%]">
        <el-tab-pane label="最近访问" name="first">
          <div class="ml-[50%] mt-[100px]">
            <img src="../../assets//images/4.png" alt="" />
            <p class="w-[216px] text-center text-[#999]">暂无数据</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全部仓库" @click="getOnRepo" name="second">
          <div v-if="tableData.length > 0">
            <div class="mb-[20px]">
              <el-dropdown>
                <div class="bg-[#F6F7FA] w-[100px] h-[30px] leading-[30px] text-center rounded-md">
                  <span class="el-dropdown-link">
                    所属项目
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>项目一</el-dropdown-item>
                    <el-dropdown-item>项目二</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown class="ml-[10px]">
                <div class="bg-[#F6F7FA] w-[100px] h-[30px] leading-[30px] text-center rounded-md">
                  <span class="el-dropdown-link">
                    公开性
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>私有</el-dropdown-item>
                    <el-dropdown-item>公开</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown class="ml-[10px]">
                <div class="bg-[#F6F7FA] w-[100px] h-[30px] leading-[30px] text-center rounded-md">
                  <span class="el-dropdown-link">
                    归档状态
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>未归档</el-dropdown-item>
                    <el-dropdown-item>已归档</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
                <el-input
                  v-model="input2"
                  style="width: 200px"
                  placeholder="搜索"
                  :prefix-icon="Search"
                  class="ml-[10px]"
                />
            </div>
            <div class="mt-[30px]">
              <el-table :data="tableData" style="width: 100%; ">
                <!-- 仓库名称列 -->
                <el-table-column label="仓库名称">
                  <template #default="scope">
                    <div class="w-[35%] flex justify-between items-center">
                      <div><el-avatar>{{ scope.row.avatar }}</el-avatar></div>
                      <div>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        <div>{{ scope.row.description  }}</div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <!-- 所属项目列 -->
                <el-table-column label="所属项目">{{ project }}</el-table-column>

                <!-- 合并请求列 -->
                 <el-table-column prop="merges" label="合并请求">
                  <template #default="scope">
                    <div style="display: flex; align-items: center;">
                      <Icon icon="pajamas:merge-request-open" width="20" height="20"  style="color: darkgray" />
                      <span class="ml-[10px]">{{ scope.row.merges }}</span>
                    </div>
                  </template>
                </el-table-column>

                <!-- <el-table-column prop="merges" label="合并请求"></el-table-column> -->

                <!-- 更新时间列 -->
                <el-table-column  label="更新时间">{{ formattedUpdatedDate }}</el-table-column>

                <!-- 操作列 -->
                <el-table-column label="操作" width="100">
                  <template #default="scope">
                    <div class=" w-[70px] flex justify-between items-center">
                      <!-- 删除图标 -->
                      <div @click="handleDelete(scope.row)" class="w-[28px] h-[28px] rounded-full cursor-arrow">
                          <Icon icon="material-symbols:delete" width="24" height="24" style="color: red" />
                      </div>
                      
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <div class="mt-[10px]">
              <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              @current-change="handlePageChange"
            />
            </div>
          </div>
          <!-- 仓库原始状态 -->
          <div v-else class="tab-content">
            <p class="text-center text-[#333] text-lg font-bold mt-8">
              欢迎使用代码仓库
            </p>
            <p class="text-center text-[#999] mt-2">
              代码仓库用于托管基于 GIT 或 SVN 管理的代码库。通过 Review
              合并请求来审查代码变更。<br>版本发布可以用来标记、发布代码版本。
            </p>

            <!-- 三个步骤展示 -->
            <div class="flex justify-between items-center mt-8">
              <div class=" flex flex-col items-center ml-[20%]">
                <svg width="168" height="128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><rect id="e" x="0" y="0" width="136" height="96" rx="3"/><rect id="a" x="24" y="21" width="90" height="10" rx="2"/><rect id="b" x="24" y="35" width="90" height="15" rx="2"/><rect id="c" x="24" y="7" width="50" height="10" rx="2"/><rect id="l" x="0" y="0" width="36" height="36" rx="2"/><mask id="f" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="90" height="10" fill="#fff"><use xlink:href="#a"/></mask><mask id="g" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="90" height="15" fill="#fff"><use xlink:href="#b"/></mask><mask id="h" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="50" height="10" fill="#fff"><use xlink:href="#c"/></mask><filter x="-3.7%" y="-4.2%" width="107.4%" height="110.4%" filterUnits="objectBoundingBox" id="d"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter1"/></filter><filter x="-44.4%" y="-38.9%" width="188.9%" height="188.9%" filterUnits="objectBoundingBox" id="k"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1"/></filter><path d="M4.104 1.465H.896c-.096 0-.15.101-.09.17l1.604 1.86a.122.122 0 00.18 0l1.604-1.86c.06-.069.006-.17-.09-.17z" id="i"/></defs><g fill="none" fill-rule="evenodd"><g transform="translate(16 16)"><use fill="#000" filter="url(#d)" xlink:href="#e"/><use fill="#F2F4F6" xlink:href="#e"/></g><g transform="translate(16 16)"><path d="M3 0h130a3 3 0 013 3v6H0V3a3 3 0 013-3z" fill="#606C80" opacity=".2"/><circle fill="#FFF" opacity=".747" cx="5.5" cy="4.5" r="1.5"/><circle fill="#FFF" opacity=".747" cx="11.5" cy="4.5" r="1.5"/><circle fill="#FFF" opacity=".747" cx="17.5" cy="4.5" r="1.5"/></g><g transform="translate(23 30)"><rect fill="#FFF" width="122" height="78" rx="2"/><use stroke="#DFE5F0" mask="url(#f)" stroke-width="2" fill-opacity=".25" fill="#E5EAEE" stroke-dasharray="2" xlink:href="#a"/><use stroke="#DFE5F0" mask="url(#g)" stroke-width="2" fill-opacity=".25" fill="#E5EAEE" stroke-dasharray="2" xlink:href="#b"/><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".5" x="8" y="39.5" width="12" height="4" rx="1"/><rect fill="#06F" fill-rule="nonzero" x="24" y="62" width="24" height="10" rx="1"/><rect fill="#E7EBF2" fill-rule="nonzero" x="50" y="62" width="24" height="10" rx="1"/><path stroke="#606C80" opacity=".072" stroke-linecap="square" d="M8 56h106"/><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".5" x="8" y="24" width="12" height="4" rx="1"/><use stroke="#DFE5F0" mask="url(#h)" stroke-width="2" fill-opacity=".25" fill="#E5EAEE" stroke-dasharray="2" xlink:href="#c"/><rect fill="#89D3EE" x="28" y="10" width="8" height="4" rx="1"/><g transform="translate(65 9.5)"><mask id="j" fill="#fff"><use xlink:href="#i"/></mask><use fill="#000" xlink:href="#i"/><g mask="url(#j)" fill="#202D40"><path d="M0 0h5v5H0z"/></g></g><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".5" x="8" y="10.5" width="12" height="4" rx="1"/></g><g transform="translate(122 25)"><use fill="#000" filter="url(#k)" xlink:href="#l"/><use fill="#FFF" xlink:href="#l"/><rect fill="#F5A623" opacity=".7" x="4" y="5" width="28" height="2" rx="1"/><rect fill="#F5A623" opacity=".401" x="4" y="9" width="20" height="2" rx="1"/><g transform="translate(4 16)"><rect fill="#51C48A" width="3" height="3" rx="1"/><rect fill="#DDE2F6" opacity=".5" x="5" y="1" width="15" height="1" rx=".5"/><rect fill="#DDE2F6" opacity=".5" x="25" y=".5" width="2" height="2" rx="1"/><rect fill="#DDE2F6" opacity=".5" x="25" y="6.5" width="2" height="2" rx="1"/><rect fill="#DDE2F6" opacity=".5" x="25" y="12.5" width="2" height="2" rx="1"/><rect fill="#DDE2F6" opacity=".5" x="5" y="7" width="15" height="1" rx=".5"/><rect fill="#DDE2F6" opacity=".5" x="5" y="13" width="15" height="1" rx=".5"/><rect fill="#F8C065" y="6" width="3" height="3" rx="1"/><rect fill="#5881FC" y="12" width="3" height="3" rx="1"/></g></g></g></svg>
                <p class="text-[#333] mt-4 font-bold">创建代码仓库</p>
                <p class="text-[#999] w-[250px] text-center">浏览、编辑代码以及查看代码提交记录</p>
              </div>

              <div class=" flex flex-col items-center">
                <svg width="168" height="128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter x="-3.7%" y="-4.2%" width="107.4%" height="110.4%" filterUnits="objectBoundingBox" id="a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter1"/></filter><filter x="-14.3%" y="-37.8%" width="128.6%" height="186.5%" filterUnits="objectBoundingBox" id="c"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1"/></filter><filter id="e"><feColorMatrix in="SourceGraphic" values="0 0 0 0 0.000000 0 0 0 0 0.670588 0 0 0 0 0.878431 0 0 0 1.000000 0"/></filter><filter x="-34.6%" y="-45.7%" width="169.2%" height="217.4%" filterUnits="objectBoundingBox" id="f"><feOffset dy="3" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"/><feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter2"/><feGaussianBlur stdDeviation=".75" in="shadowOffsetOuter2" result="shadowBlurOuter2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter2" result="shadowMatrixOuter2"/><feOffset dx="3" dy="3" in="SourceAlpha" result="shadowOffsetOuter3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" in="shadowOffsetOuter3" result="shadowMatrixOuter3"/><feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="shadowMatrixOuter2"/><feMergeNode in="shadowMatrixOuter3"/></feMerge></filter><circle id="h" cx="4.5" cy="4.5" r="4.5"/><circle id="j" cx="4.5" cy="4.5" r="4.5"/><circle id="l" cx="4.5" cy="4.5" r="4.5"/><path d="M2 0h108a2 2 0 012 2v33a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2z" id="d"/><path d="M2 0h35a2 2 0 012 2v19a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2z" id="g"/><rect id="b" x="0" y="0" width="136" height="96" rx="3"/></defs><g fill="none" fill-rule="evenodd"><g transform="translate(16 16)"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#F2F4F6" xlink:href="#b"/></g><g transform="translate(16 16)"><path d="M3 0h130a3 3 0 013 3v6H0V3a3 3 0 013-3z" fill="#606C80" opacity=".2"/><circle fill="#FFF" opacity=".747" cx="5.5" cy="4.5" r="1.5"/><circle fill="#FFF" opacity=".747" cx="11.5" cy="4.5" r="1.5"/><circle fill="#FFF" opacity=".747" cx="17.5" cy="4.5" r="1.5"/></g><g transform="translate(23 30)"><rect fill="#FFF" width="122" height="78" rx="2"/><g transform="translate(5 36)"><use fill="#000" filter="url(#c)" xlink:href="#d"/><use fill="#FFF" xlink:href="#d"/><rect fill="#E7EBF2" x="12" y="5" width="64" height="3" rx="1"/><rect fill="#1F85F4" fill-rule="nonzero" opacity=".604" x="101" y="5" width="8" height="3" rx="1"/><rect fill="#1F85F4" fill-rule="nonzero" opacity=".604" x="101" y="13" width="8" height="3" rx="1"/><rect fill="#1F85F4" fill-rule="nonzero" opacity=".604" x="101" y="21" width="8" height="3" rx="1"/><rect fill="#1F85F4" fill-rule="nonzero" opacity=".604" x="101" y="29" width="8" height="3" rx="1"/><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".5" x="91" y="5" width="6" height="3" rx="1"/><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".5" x="91" y="13" width="6" height="3" rx="1"/><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".5" x="91" y="21" width="6" height="3" rx="1"/><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".5" x="91" y="29" width="6" height="3" rx="1"/><rect fill="#E7EBF2" x="12" y="13" width="64" height="3" rx="1"/><rect fill="#E7EBF2" x="12" y="21" width="64" height="3" rx="1"/><rect fill="#E7EBF2" x="12" y="29" width="64" height="3" rx="1"/><circle cx="2.5" cy="2.5" r="2.5" transform="translate(4 4)" fill="#F24C3D"/><circle cx="2.5" cy="2.5" r="2.5" transform="translate(4 12)" fill="#FFAF58"/><circle cx="2.5" cy="2.5" r="2.5" transform="translate(4 20)" fill="#51C48A"/><g transform="translate(4 28)" fill="#5881FC"><circle cx="2.5" cy="2.5" r="2.5"/></g></g><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".7" x="5" y="28" width="16" height="3" rx="1"/><g transform="translate(5 5)"><rect fill="#09B1E5" fill-rule="nonzero" opacity=".146" width="12" height="12" rx="1.5"/><g transform="translate(2 2)" filter="url(#e)"><path d="M5.238.075a.05.05 0 01.012.032V.75H6.5a.5.5 0 01.5.5v3.836a1.5 1.5 0 11-1 0V1.75h-.75v.643a.05.05 0 01-.082.039L3.796 1.288a.05.05 0 01-.006-.07L5.168.068a.05.05 0 01.07.007zM2 0a1.5 1.5 0 01.5 2.914v2.172a1.5 1.5 0 11-1 0V2.914A1.5 1.5 0 012 0zm4.5 6a.5.5 0 100 1 .5.5 0 000-1zM2 6a.5.5 0 100 1 .5.5 0 000-1zm0-5a.5.5 0 100 1 .5.5 0 000-1z" fill="#202D40" fill-rule="nonzero"/></g></g><path fill="#F5F7FA" fill-rule="nonzero" d="M5 22h112v1H5z"/><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".7" x="22" y="5" width="24" height="4" rx="1"/><path d="M23 13h23v4H23a1 1 0 01-1-1v-2a1 1 0 011-1z" fill="#39C27D" opacity=".694"/><path d="M78 13h15a1 1 0 011 1v2a1 1 0 01-1 1H78v-4z" fill="#1F85F4" opacity=".5"/><path fill="#8FC2F9" d="M47 13h30v4H47z"/></g><g transform="translate(122 26)"><use fill="#000" filter="url(#f)" xlink:href="#g"/><use fill="#FFF" xlink:href="#g"/><g transform="translate(23 4)"><mask id="i" fill="#fff"><use xlink:href="#h"/></mask><circle stroke="#FFF" cx="4.5" cy="4.5" r="5"/><g mask="url(#i)" fill="#FFF" fill-rule="nonzero" opacity=".7"><path d="M4.5 6.375c-.786 0-1.429-.675-1.429-1.5V4.5c0-.825.643-1.5 1.429-1.5s1.429.675 1.429 1.5v.375c0 .825-.643 1.5-1.429 1.5zM5.214 7.125H3.786C2.786 7.125 2 7.95 2 9h5c0-1.05-.786-1.875-1.786-1.875z"/></g></g><g transform="translate(15 4)"><mask id="k" fill="#fff"><use xlink:href="#j"/></mask><circle stroke="#FFF" cx="4.5" cy="4.5" r="5"/><g mask="url(#k)" fill="#FFF" fill-rule="nonzero" opacity=".7"><path d="M4.5 6.375c-.786 0-1.429-.675-1.429-1.5V4.5c0-.825.643-1.5 1.429-1.5s1.429.675 1.429 1.5v.375c0 .825-.643 1.5-1.429 1.5zM5.214 7.125H3.786C2.786 7.125 2 7.95 2 9h5c0-1.05-.786-1.875-1.786-1.875z"/></g></g><g transform="translate(7 4)"><mask id="m" fill="#fff"><use xlink:href="#l"/></mask><circle stroke="#FFF" cx="4.5" cy="4.5" r="5"/><g mask="url(#m)" fill="#FFF" fill-rule="nonzero" opacity=".7"><path d="M4.5 6.375c-.786 0-1.429-.675-1.429-1.5V4.5c0-.825.643-1.5 1.429-1.5s1.429.675 1.429 1.5v.375c0 .825-.643 1.5-1.429 1.5zM5.214 7.125H3.786C2.786 7.125 2 7.95 2 9h5c0-1.05-.786-1.875-1.786-1.875z"/></g></g><g transform="translate(29 9)"><circle fill="#32BE77" cx="2.5" cy="2.5" r="2.5"/><path d="M.625 4.375h3.75V.625H.625z"/><path d="M4.096 1.363L1.92 3.78a.02.02 0 01-.032 0L.891 2.533A.02.02 0 01.908 2.5h.546a.02.02 0 01.016.008l.455.568L3.49 1.335a.02.02 0 01.016-.007h.574a.02.02 0 01.015.035z" fill="#FFF" fill-rule="nonzero"/></g><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".7" x="7" y="17" width="16" height="2" rx="1"/></g></g></svg>
                <p class="text-[#333] mt-4 font-bold">合并请求</p>
                <p class="text-[#999] w-[240px] text-center">发起合并请求并遂请协作者Review 变更内容</p>
              </div>

              <div class=" flex flex-col items-center mr-[20%]">
                <svg width="168" height="128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter x="-3.7%" y="-4.2%" width="107.4%" height="110.4%" filterUnits="objectBoundingBox" id="b"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" in="shadowBlurOuter1"/></filter><filter x="-70%" y="-50%" width="240%" height="240%" filterUnits="objectBoundingBox" id="d"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0.196078431 0 0 0 0 0.745098039 0 0 0 0 0.466666667 0 0 0 0.4 0" in="shadowBlurOuter1"/></filter><filter id="f"><feColorMatrix in="SourceGraphic" values="0 0 0 0 0.000000 0 0 0 0 0.439216 0 0 0 0 1.000000 0 0 0 1.000000 0"/></filter><filter x="-70%" y="-50%" width="240%" height="240%" filterUnits="objectBoundingBox" id="g"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0.196078431 0 0 0 0 0.745098039 0 0 0 0 0.466666667 0 0 0 0.4 0" in="shadowBlurOuter1"/></filter><filter id="i"><feColorMatrix in="SourceGraphic" values="0 0 0 0 0.000000 0 0 0 0 0.439216 0 0 0 0 1.000000 0 0 0 1.000000 0"/></filter><filter id="k"><feColorMatrix in="SourceGraphic" values="0 0 0 0 0.000000 0 0 0 0 0.439216 0 0 0 0 1.000000 0 0 0 1.000000 0"/></filter><circle id="e" cx="5" cy="5" r="5"/><circle id="h" cx="5" cy="5" r="5"/><rect id="c" x="0" y="0" width="136" height="96" rx="3"/><path d="M2 0h108a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2z" id="a"/><mask id="j" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="112" height="18" fill="#fff"><use xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><g transform="translate(16 16)"><use fill="#000" filter="url(#b)" xlink:href="#c"/><use fill="#F2F4F6" xlink:href="#c"/></g><g transform="translate(16 16)"><path d="M3 0h130a3 3 0 013 3v6H0V3a3 3 0 013-3z" fill="#606C80" opacity=".2"/><circle fill="#FFF" opacity=".747" cx="5.5" cy="4.5" r="1.5"/><circle fill="#FFF" opacity=".747" cx="11.5" cy="4.5" r="1.5"/><circle fill="#FFF" opacity=".747" cx="17.5" cy="4.5" r="1.5"/></g><g transform="translate(23 30)"><rect fill="#FFF" width="122" height="78" rx="2"/><path d="M7 11h108a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V13a2 2 0 012-2z" fill="#F4F6F8"/><g transform="translate(103 15)"><use fill="#000" filter="url(#d)" xlink:href="#e"/><use fill="#32BE77" xlink:href="#e"/></g><path d="M104.25 23.75h7.5v-7.5h-7.5z"/><path d="M111.193 17.726l-4.353 4.837a.042.042 0 01-.064-.002l-1.993-2.493a.042.042 0 01.032-.068h1.093c.013 0 .025.006.033.016l.908 1.135 3.133-3.481a.042.042 0 01.031-.014h1.149a.042.042 0 01.03.07z" fill="#FFF" fill-rule="nonzero"/><path d="M26 16h63a1 1 0 011 1v1a1 1 0 01-1 1H26a1 1 0 01-1-1v-1a1 1 0 011-1z" fill="#CFD8E5" fill-rule="nonzero"/><path d="M26 22h47a1 1 0 010 2H26a1 1 0 010-2z" fill="#CFD8E5" fill-rule="nonzero" opacity=".5"/><g transform="translate(8 14)"><rect fill="#1A78FF" fill-rule="nonzero" opacity=".15" width="12" height="12" rx="1.5"/><g transform="translate(2 2)" filter="url(#f)"><path d="M5.59 1a.05.05 0 01.046.068L3.412 7H2.344l2.237-5.968A.05.05 0 014.628 1h.961zM2.488 2.073a.05.05 0 01.011.031v1.05a.05.05 0 01-.018.038l-.945.81.945.81a.05.05 0 01.018.038v1.046a.05.05 0 01-.081.04L.049 4.04a.05.05 0 01-.008-.07l.008-.008 2.37-1.898a.05.05 0 01.07.008zm3.022 0a.05.05 0 01.053-.017l.017.01L7.96 3.97a.05.05 0 01.005.055l-.013.015-2.37 1.894a.05.05 0 01-.077-.02L5.5 5.896V4.85c0-.01.003-.019.009-.027l.009-.01.945-.81-.945-.811a.05.05 0 01-.015-.024L5.5 3.154v-1.05a.05.05 0 01.011-.031z" fill="#202D40" fill-rule="nonzero"/></g></g><rect fill="#CFD8E5" fill-rule="nonzero" opacity=".7" x="5" y="5" width="20" height="4" rx="1"/><g><path d="M7 33h108a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V35a2 2 0 012-2z" fill="#F4F6F8"/><g transform="translate(103 37)"><use fill="#000" filter="url(#g)" xlink:href="#h"/><use fill="#32BE77" xlink:href="#h"/></g><path d="M104.25 45.75h7.5v-7.5h-7.5z"/><path d="M111.193 39.726l-4.353 4.837a.042.042 0 01-.064-.002l-1.993-2.493a.042.042 0 01.032-.068h1.093c.013 0 .025.006.033.016l.908 1.135 3.133-3.481a.042.042 0 01.031-.014h1.149a.042.042 0 01.03.07z" fill="#FFF" fill-rule="nonzero"/><path d="M26 38h63a1 1 0 011 1v1a1 1 0 01-1 1H26a1 1 0 01-1-1v-1a1 1 0 011-1z" fill="#CFD8E5" fill-rule="nonzero"/><path d="M26 44h47a1 1 0 010 2H26a1 1 0 010-2z" fill="#CFD8E5" fill-rule="nonzero" opacity=".5"/><g transform="translate(8 36)"><rect fill="#1A78FF" fill-rule="nonzero" opacity=".15" width="12" height="12" rx="1.5"/><g transform="translate(2 2)" filter="url(#i)"><path d="M5.59 1a.05.05 0 01.046.068L3.412 7H2.344l2.237-5.968A.05.05 0 014.628 1h.961zM2.488 2.073a.05.05 0 01.011.031v1.05a.05.05 0 01-.018.038l-.945.81.945.81a.05.05 0 01.018.038v1.046a.05.05 0 01-.081.04L.049 4.04a.05.05 0 01-.008-.07l.008-.008 2.37-1.898a.05.05 0 01.07.008zm3.022 0a.05.05 0 01.053-.017l.017.01L7.96 3.97a.05.05 0 01.005.055l-.013.015-2.37 1.894a.05.05 0 01-.077-.02L5.5 5.896V4.85c0-.01.003-.019.009-.027l.009-.01.945-.81-.945-.811a.05.05 0 01-.015-.024L5.5 3.154v-1.05a.05.05 0 01.011-.031z" fill="#202D40" fill-rule="nonzero"/></g></g></g><g transform="translate(5 55)"><use stroke="#DFE5F0" mask="url(#j)" stroke-width="2" fill-opacity="0" fill="#F1F3F5" stroke-dasharray="2" xlink:href="#a"/><g opacity=".6"><path d="M21 5h63a1 1 0 011 1v1a1 1 0 01-1 1H21a1 1 0 01-1-1V6a1 1 0 011-1z" fill="#CFD8E5" fill-rule="nonzero"/><path d="M21 11h47a1 1 0 010 2H21a1 1 0 010-2z" fill="#CFD8E5" fill-rule="nonzero" opacity=".5"/><g transform="translate(3 3)"><rect fill="#1A78FF" fill-rule="nonzero" opacity=".15" width="12" height="12" rx="1.5"/><g transform="translate(2 2)" filter="url(#k)"><path d="M5.59 1a.05.05 0 01.046.068L3.412 7H2.344l2.237-5.968A.05.05 0 014.628 1h.961zM2.488 2.073a.05.05 0 01.011.031v1.05a.05.05 0 01-.018.038l-.945.81.945.81a.05.05 0 01.018.038v1.046a.05.05 0 01-.081.04L.049 4.04a.05.05 0 01-.008-.07l.008-.008 2.37-1.898a.05.05 0 01.07.008zm3.022 0a.05.05 0 01.053-.017l.017.01L7.96 3.97a.05.05 0 01.005.055l-.013.015-2.37 1.894a.05.05 0 01-.077-.02L5.5 5.896V4.85c0-.01.003-.019.009-.027l.009-.01.945-.81-.945-.811a.05.05 0 01-.015-.024L5.5 3.154v-1.05a.05.05 0 01.011-.031z" fill="#202D40" fill-rule="nonzero"/></g></g></g></g></g></g></svg>
                <p class="text-[#333] mt-4 font-bold">代码版本</p>
                <p class="text-[#999] w-[250px] text-center">发布，标记代码版本</p>
              </div>
            </div>
             <!-- 创建代码仓库按钮 -->
            <div class="ml-[45%] w-[150px] mt-[50px] bg-[#2B323D] text-[#fff] text-center rounded-md">
              <button plain class="h-[45px]" @click="onRepo">创建代码仓库</button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="开源仓库" name="third">
          <div class="ml-[50%] mt-[100px]">
            <img src="../../assets//images/4.png" alt="" />
            <p class="w-[216px] text-center text-[#999]">暂无数据</p>
          </div>
        </el-tab-pane>
      </div>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref,onMounted,computed } from "vue";
import { ElMessage, ElMessageBox,ElNotification   } from "element-plus";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ArrowDown } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import type { TabsPaneContext } from "element-plus";
import { deleteRepo,createRepo } from "../../api/index"
import { useRouter } from "vue-router";
const router = useRouter();
const activeName = ref("first");
const input2 = ref('')
const repoData = ref({
  owner:"yu-youshu",
  repo:"my_name",
  access_token:"b2bf89b4f6897c98114173d56b6a1004"
});
// const avatar = ref("")
const forks = ref("")
const project = ref("");
const repoName = ref("");
const repoDescription = ref("");
const updatedDate = ref("");
const tableData = ref([
  { name: 'repoName.value', description: 'repoDescription.value', project: 'data.project', merges: 0, updateTime: 'updatedDate.value' }
])

onMounted(() => {
  const storedData = localStorage.getItem('repoData');
//   type tableData = {
//   name: string;
//   description: string;
//   project: string;
//   merges: number;
//   updateTime: string;
//   forks?: string; // 加入 `forks` 属性
// };
  if (storedData) {
    const data = JSON.parse(storedData);
    repoName.value = data.name || "无";
    repoDescription.value = data.description || "无";
    updatedDate.value = data.updated_at || "无";
    project.value = data.project || "无";
    forks.value = data.forks_count || "无";
    // avatar.value = data.avatar_url || "无";
  }
  // 更新表格中的数据
    tableData.value = [
      {
        name: repoName.value,
        description: repoDescription.value,
        project: project.value,
        merges: 0,
        updateTime: updatedDate.value,
      }
    ];
});
// 计算并格式化更新时间
const formattedUpdatedDate = computed(() => {
  if (!updatedDate.value || updatedDate.value === "无") {
    return "无";
  }

  const updatedTime = new Date(updatedDate.value); // 将字符串转换为 Date 对象
  const now = new Date(); // 当前时间
  const diffInMinutes = Math.floor((now.getTime() - updatedTime.getTime()) / (1000 * 60)); // 计算时间差，转换为分钟

  if (diffInMinutes < 1) {
    return "刚刚"; // 小于1分钟
  } else if (diffInMinutes === 1) {
    return "1分钟前"; // 1分钟
  } else if (diffInMinutes > 60) {
    const hoursAgo = Math.floor(diffInMinutes / 60);
    return `${hoursAgo}小时前`; // 超过60分钟
  } else {
    return `${diffInMinutes}分钟前`; // 2到60分钟
  }
});
const total = ref(1)
const pageSize = ref(10)
const handlePageChange = (page) => {
  console.log('当前页码：', page)
}

const handleEdit = (row) => {
  console.log('编辑行：', row)
}
// 点击删除图标时 连gitee上对应的仓库也一并删除了

const handleDelete = async (row) => {
  const owner = repoData.value.owner;
  const repo = repoData.value.repo;
  const token = repoData.value.access_token;

  // 打印检查参数
  console.log('Owner:', owner);
  console.log('Repo:', repo);
  console.log('Access Token:', token);
  console.log(`Request URL: https://gitee.com/api/v5/repos/${owner}/${repo}`);

  try {
    const res = await deleteRepo(owner, repo, token);

    if (res.status === 204) {
      ElMessage.success('仓库删除成功');
      // 删除表格中的行
      const index = tableData.value.indexOf(row);
      if (index !== -1) {
        tableData.value.splice(index, 1);
        ElMessage.success('行删除成功');
      }
    } else {
      ElMessage.error('删除仓库失败，请检查权限或仓库是否存在');
    }
  } catch (err) {
    console.error(err);
    ElMessage.error('删除仓库时发生错误');
  }
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const onRepo = () => {
   router.push("/createrepo")
}



</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
