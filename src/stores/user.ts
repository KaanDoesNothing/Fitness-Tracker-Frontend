import {defineStore} from "pinia";
import {fetchExercises, fetchWorkouts, setDarkMode} from "../utils";
import {Storage} from "@capacitor/storage";

export const useUserStore = defineStore("user", {
    state: (): userStore => {
        return {token: null, isMobile: true, isDarkMode: false, settings: {compactMode: true}, cache: {exercises: [], workouts: []}}
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
        },
        async updateCache() {
            if(!this.token) return;

            this.cache.exercises = await fetchExercises({token: this.token});
            this.cache.workouts = await fetchWorkouts({token: this.token});
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

export interface userStore {
    token: string | null,
    isMobile: boolean,
    isDarkMode: boolean,
    settings: {
        compactMode: boolean
    },
    cache: {
        exercises: [],
        workouts: []
    }
}