let apiVersion = "v3";

export let api = window.location.origin === "http://localhost:3000" ? `http://localhost:5555/api/${apiVersion}` : `https://api.fitness.kaanlikescoding.me/api/${apiVersion}`;

// export let api = "http://localhost:5555/api";