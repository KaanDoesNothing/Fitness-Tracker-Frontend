import {defineStore} from "pinia";
import {setDarkMode} from "../utils";
import {Storage} from "@capacitor/storage";

export const useUserStore = defineStore("user", {
    state: (): any => {
        return {token: undefined, darkMode: false, isMobile: true, isDarkMode: false}
    },
    actions: {
        async setDarkMode(value: boolean) {
            this.isDarkMode = value;

            await Storage.set({key: "darkmode", value: `${value}`});
            setDarkMode(value);
        }
    }
    // actions: {
    //     setDarkMode(darkmode: boolean) {
    //         this.isDarkMode = darkmode;
    //
    //         setDarkMode(darkmode);
    //     }
    // }
});