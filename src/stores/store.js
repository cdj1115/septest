// store.js
import { defineStore } from "pinia";

export const useRepoStore = defineStore("repo", {
  state: () => ({
    repoData: {},
  }),
  actions: {
    setRepoData(data) {
      this.repoData = data;
    },
  },
});





