
const formTodo = document.getElementById('form');
const title = document.getElementById('title');
const body = document.getElementById('body');
const status = document.getElementById('status');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});


let formValidation = () => {
  if (title.value === "") {
    msg.classList.remove("d-none");
  }
  if(body.value === ""){
    msg1.classList.remove("d-none");
  }
  if (title.value !== "" && body.value !== ""){
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    acceptData();
  }
};

async function acceptData(){
    const data = {
        title: title.value,
        body: body.value,
        status: status.value,
        author: 1
    }
    await fetch("http://127.0.0.1:8000/api2/api/v1/todo/", {
        method: "POST",
        mode: "cors",
        headers: {
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
                    window.location.replace("./index.html");
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