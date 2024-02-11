import { defineStore } from "pinia"

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      currentUser: null,
      filters : {
        genres: [],
        releaseYearMin : null,
        rating: null,
      },
    }
  },
  actions: {
  },
  persist: [ "currentUser"],
})
