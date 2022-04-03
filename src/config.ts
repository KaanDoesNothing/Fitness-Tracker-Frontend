let apiVersion = "v2";

export let api = window.location.origin === "http://localhost:3000" ? `http://localhost:5555/api/${apiVersion}` : `https://api.fitness.kaanlikescoding.me/api/${apiVersion}`;

let customAPI = localStorage.get("backend");

if(customAPI) api = customAPI;

// export let api = "http://localhost:5555/api";