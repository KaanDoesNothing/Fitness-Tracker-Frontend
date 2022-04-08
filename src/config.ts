let apiVersion = "v2";

let api = window.location.origin === "http://localhost:3000" ? `http://localhost:5555/api/${apiVersion}` : `https://api.fitness.kaanlikescoding.me/api/${apiVersion}`;

try {
    let customAPI = localStorage.getItem("backend");

    if(customAPI) api = customAPI;
}catch(err) {
    console.log(err);
}

let socketApi = window.location.origin === "http://localhost:3000" ? `ws://localhost:5555` : `wss://api.fitness.kaanlikescoding.me`;

export {api, socketApi};
// export let api = "http://localhost:5555/api";