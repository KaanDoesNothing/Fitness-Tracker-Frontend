let apiVersion = "v2";

let api = window.location.origin === "http://localhost:3000" ? `http://localhost:5555/api/${apiVersion}` : `https://api.fitness.kaanlikescoding.me/api/${apiVersion}`;

try {
    let customAPI = localStorage.getItem("backend");

    if(customAPI) api = customAPI;
}catch(err) {
    console.log(err);
}

export {api};
// export let api = "http://localhost:5555/api";