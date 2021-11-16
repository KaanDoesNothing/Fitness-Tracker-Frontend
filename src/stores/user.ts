import {defineStore} from "pinia";
import {setDarkMode} from "../utils";
import {Storage} from "@capacitor/storage";

export const useUserStore = defineStore("user", {
    state: (): any => {
        return {token: undefined, isMobile: true, isDarkMode: false, settings: {compactMode: true}}
    },
    actions: {
        async setDarkMode(value: boolean) {
            this.isDarkMode = value;

            await Storage.set({key: "darkmode", value: `${value}`});
            setDarkMode(value);
        },
        async setSettings(newData: any) {
            this.settings = newData;

            await Storage.set({key: "settings", value: JSON.stringify(newData)});
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