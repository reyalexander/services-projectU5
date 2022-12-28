const formTodo = document.getElementById("form");
const firstname = document.getElementById('first-name');
const lastname = document.getElementById('last-name');
const username = document.getElementById('username');
const email = document.getElementById('email');
const birthday = document.getElementById('birthday');
const password = document.getElementById('password');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
let msg2 = document.getElementById("msg2");
let msg3 = document.getElementById("msg3");
let msg4 = document.getElementById("msg4");
let msg5 = document.getElementById("msg5");

formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (firstname.value === "") {
        msg.classList.remove("d-none");
      }
    if (lastname.value === "") {
        msg1.classList.remove("d-none");
    }
    if (username.value === ""){
        msg2.classList.remove("d-none");
    }
    if (email.value === "") {
        msg3.classList.remove("d-none");
      }
    if (birthday.value === "") {
        msg4.classList.remove("d-none");
    }
    if (password.value === "") {
        msg5.classList.remove("d-none");
    }

    if (firstname.value !== "" && lastname.value !== "" && username.value !== "" && email.value !== "" && birthday.value !== "" && password.value !== ""){
      msg.classList.add("d-none");
      msg1.classList.add("d-none");
      msg2.classList.add("d-none");
      msg3.classList.add("d-none");
      msg4.classList.add("d-none");
      msg5.classList.add("d-none");
      registerUser();
    }
  };

  URL = 'http://127.0.0.1:8000/api/users/'

async function registerUser(){
    const data = {
        email: email.value,
        username: username.value,
        first_name: firstname.value,
        last_name: lastname.value,
        date_of_birth: birthday.value,
        password: password.value,
    }
    console.log(data)
    await fetch(URL + 'signup/', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("./login.html");
                }
            }) 
        }
        else{
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
}