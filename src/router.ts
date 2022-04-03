import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Auth from "./pages/Auth.vue";
import Dashboard from "./pages/Dashboard.vue";
import Settings from "./pages/Settings.vue";
import SettingsLanguageSelector from "./pages/settings/languageSelector.vue";
import SettingsChangelogs from "./pages/settings/changelogs.vue";
import Overview from "./pages/dashboard/tabs/overview.vue";
import Workouts from "./pages/dashboard/tabs/workouts.vue";
import ViewWorkout from "./pages/dashboard/tabs/workouts/view.vue";
import Exercises from "./pages/dashboard/tabs/exercises.vue";
import EditExercise from "./pages/dashboard/tabs/exercises/edit.vue";
import Nutrition from "./pages/dashboard/tabs/nutrition.vue";
import NutritionSearch from "./pages/dashboard/tabs/nutrition/search.vue";
import NutritionView from "./pages/dashboard/tabs/nutrition/view.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/auth",
        name: "Authenticate",
        component: Auth
    },
    {
        path: "/dashboard/overview",
        name: "Overview",
        component: Overview
    },
    {
        path: "/dashboard/workouts",
        name: "Workouts",
        component: Workouts
    },
    {
        path: "/dashboard/workouts/:id",
        name: "View Workout",
        component: ViewWorkout
    },
    {
        path: "/dashboard/exercises",
        name: "Exercises",
        component: Exercises
    },
    {
        path: "/dashboard/exercises/:id",
        name: "Edit Exercise",
        component: EditExercise
    },
    {
        path: "/dashboard/nutrition",
        name: "Nutrition",
        component: Nutrition
    },
    {
        path: "/dashboard/nutrition/search",
        name: "Nutrition Search",
        component: NutritionSearch
    },
    {
        path: "/dashboard/nutrition/view/:id",
        name: "Nutrition View",
        component: NutritionView
    },
    // {
    //     path: "/dashboard/:tab",
    //     name: "Dashboard",
    //     component: Dashboard
    // },
    {
        path: "/settings",
        name: "Settings",
        component: Settings
    },
    {
        path: "/settings/language",
        name: "Language Selector",
        component: SettingsLanguageSelector
    },
    {
        path: "/settings/changelogs",
        name: "Changelogs",
        component: SettingsChangelogs
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
