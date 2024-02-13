import { defineStore } from "pinia"
import { LocalStorage } from "quasar"
import { jwtDecode } from "jwt-decode";

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
    checkAdminRights() {
      const token = LocalStorage.getItem("token");
      const decoded = jwtDecode(token);
      return decoded.isAdministrator;
    }
  },
  persist: [ "currentUser"],
})
