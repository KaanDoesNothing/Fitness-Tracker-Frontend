import momentjs from "moment";

export let capitalizeFirst = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export let sortWorkouts = (workouts) => {
    let final = {};
    workouts.forEach(workout => {
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

        let sorted = final[dateString];

        if(!sorted) final[dateString] = {date: dateString, workouts: []};

        final[dateString].workouts.push(workout);
    });

    return final;
}