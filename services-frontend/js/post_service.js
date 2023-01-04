
const formTodo = document.getElementById('form');
const nameS = document.getElementById('name');
const description = document.getElementById('description');
const logo = document.getElementById('logo');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
let msg2 = document.getElementById("msg2");
formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});


let formValidation = () => {
  if (nameS.value === "") {
    msg.classList.remove("d-none");
  }
  if(description.value === ""){
    msg1.classList.remove("d-none");
  }
  if(logo.value === ""){
    msg2.classList.remove("d-none");
  }
  if (nameS.value !== "" && description.value !== "" && logo.value !== ""){
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    msg2.classList.add("d-none");
    acceptData();
  }
};

URL = 'http://127.0.0.1:8000/api/'
async function acceptData(){
    const data = {
        name: nameS.value,
        description: description.value,
        logo: logo.value,
        user: 1,
    }
    console.log(data)
    await fetch(URL + 'services/add_service/', {
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
                    window.location.replace("../index.html");
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