import {defineStore} from "pinia";
import {setDarkMode} from "../utils";

export const useUserStore = defineStore("user", {
    state: (): any => {
        return {token: undefined, darkMode: false, isMobile: true, isDarkMode: false}
    },
    // actions: {
    //     setDarkMode(darkmode: boolean) {
    //         this.isDarkMode = darkmode;
    //
    //         setDarkMode(darkmode);
    //     }
    // }
});