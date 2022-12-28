const formTodo = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");

formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (email.value === "") {
      msg.classList.remove("d-none");
    }
    if(password.value === ""){
      msg1.classList.remove("d-none");
    }
    if (email.value !== "" && password.value !== ""){
      msg.classList.add("d-none");
      msg1.classList.add("d-none");
      apiLoginToken();
    }
  };

URL = 'http://127.0.0.1:8000/api/users/'

function tokenSave(tokens,email){
    localStorage.tokens = JSON.stringify(tokens);
    localStorage.email = JSON.stringify(email);
}

function tokenRead(){
    let result;
    try{ result = JSON.parse(localStorage.tokens); }
    catch{}

    if (result != null && typeof(result) != 'object'){
        result = null
    }
    return result;
}

function tokenDelete(){
    localStorage.tokens = null
}

async function apiLoginToken(){
    const data = {
        email: email.value, 
        password: password.value
    }
    const res = await fetch(URL+'login/',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(res)
    const resData = await res.json();
    Tokens = resData;
    console.log(resData.ok)
    if (resData.ok == true){
        window.location.href = "./index.html";
    }else{
        Swal.fire({
            icon:"error",
            title: 'Oops...',
            text: "¡Email o contraseña incorrecta!"
        }) 
    }
    tokenSave(resData.tokens.access, resData.email);
    return resData;
}

async function apiTokenDoesNotWork(tokenAccess){
    const res = await fetch(URL+'jwt/verify/',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body: JSON.stringify({token: tokenAccess})
    });
    const resData = await res.json();
    const sirveP = (
        restDa != null && 
        typeof(resData) == 'object' &&
        Object.keys(resData).length == 0
    );

    return (sirveP ? null : resData);
}

async function apiTokenRefresh(tokenRefresh){
    const res = await fetch(URL+'jwt/refresh/',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body: JSON.stringify({token: tokenRefresh})
    });
    const resData = await res.json();
    return resData;
}

async function apiNeedLoginP(){
    var result = true;
    const tokX = tokenRead();
    if (tokX != null && tokX.refresh){
        const tokNew = await apiTokenRefresh(tokX.refresh);
        if (tokNew.access){
            tokX.access = tokNew.access;
            tokenSave(tokX);
            result = false;
        }
    }
    return result;
}

async function fetchWithToken(url,options){
    const tok = tokenRead();
    if (!tok || !tok.access){
        throw 'There aren´t token';
    }

    options = options || {};
    options.headers = options.headers || {};
    options.headers.Authorization = 'Bearer '+ tok.access;
    return fetch(url,options);
}