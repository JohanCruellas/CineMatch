import { defineStore } from "pinia"

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      currentUser: null,
    }
  },
  actions: {
  },
  persist: true,
})
