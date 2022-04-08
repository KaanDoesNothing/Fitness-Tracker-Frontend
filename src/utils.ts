import momentjs from "moment";
import axios from "axios";
import {api} from "./config";

export let setDarkMode = (darkmode: boolean) => {
    if(darkmode === true) {
        //@ts-ignore
        document.querySelector("body").classList.remove("bg-white");
        //@ts-ignore
        document.querySelector("html").classList.remove("bg-white");
        //@ts-ignore
        document.querySelector("body").classList.add("bg-black");
        //@ts-ignore
        document.querySelector("html").classList.add("bg-black");
    }else {
        //@ts-ignore
        document.querySelector("body").classList.remove("bg-black");
        //@ts-ignore
        document.querySelector("html").classList.remove("bg-black");
        //@ts-ignore
        document.querySelector("body").classList.add("bg-white");
        //@ts-ignore
        document.querySelector("html").classList.add("bg-white");
    }
}

export let capitalizeFirst = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export let sortWorkouts = (workouts: any) => {
    let final: any = {};

    workouts.forEach((workout: workout) => {
        let date = new Date(workout.createdAt);

        let workoutDate = date.toLocaleString().split(", ")[0];
        let currentDate = new Date().toLocaleString().split(", ")[0];

        let dateString = `${date.toLocaleString().split(", ")[0]}`;

        if(workoutDate === currentDate) {
            dateString = "Today"
        }

        if(parseInt(workoutDate.split("/")[1]) === parseInt(currentDate.split("/")[1]) - 1) {
            dateString = "Yesterday"
        }

        workout.timeAgo = momentjs(workout.createdAt).fromNow();
        workout.timestamp = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

        let sorted: any = final[dateString];

        if(!sorted) final[dateString] = {date: dateString, workouts: []};

        final[dateString].workouts.push(workout);
    });

    return final;
}

export let sortExercisesThisWeekForOverview = (workouts: any) => {
    //@ts-ignore
    let currentWeek = new Date().getWeek();

    let res = workouts.map((workout: workout) => {
        let date = new Date(workout.createdAt);

        //@ts-ignore
        if(date.getWeek() === currentWeek) return workout;
    }).filter((res: any) => res);

    return res;
}

export let sortWorkoutsThisWeekForOverview = (workouts: any) => {
    //@ts-ignore
    let currentWeek = new Date().getWeek();

    let days: number[] = [];

    let res = workouts.forEach((workout: workout) => {
        let date = new Date(workout.createdAt);

        //@ts-ignore
        if(date.getWeek() === currentWeek) {
            let day = date.getDay();
            if(!days.includes(day)) {
                days.push(day);
            }else {
                return;
            }
        }
    });

    return days;
}

export let fetchExercises = async (data: {token: string}) => {
    const res = await axios.post(`${api}/user/exercises`, null, {headers: {authorization: `Bearer ${data.token}`}});
    return res.data.exercises;
}
export let fetchWorkouts = async (data: {token: string}) => {
    const res = await axios.post(`${api}/user/workouts`, null, {headers: {authorization: `Bearer ${data.token}`}});
    return res.data.workouts;
}

export let fetchMessages = async (data: {token: string}) => {
    const res = await axios.post(`${api}/chat/messages`, null, {headers: {authorization: `Bearer ${data.token}`}});
    return res.data.messages;
}
