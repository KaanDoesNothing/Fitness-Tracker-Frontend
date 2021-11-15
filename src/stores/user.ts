import {defineStore} from "pinia";

export const useUserStore = defineStore("user", {
    state: (): any => {
        return {token: undefined, darkMode: false, isMobile: true, isDarkMode: false}
    }
});