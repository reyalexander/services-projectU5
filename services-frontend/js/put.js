const formTodo = document.getElementById('form');
const title = document.getElementById('title');
const body = document.getElementById('body');
const statusTodo = document.getElementById('status');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
const id = new URLSearchParams(window.location.search).get("id");

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
    await fetch(`http://127.0.0.1:8000/api2/api/v1/todo/${id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Actualizado!',
                'Los datos se actualizaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    returnTodo();
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

async function setData(){
    try {
        const response = await fetch(`http://127.0.0.1:8000/api2/api/v1/todo/${id}/`);
        const data = await response.json();
        title.value = data.title;
        body.value = data.body;
        statusTodo.value = data.status;
      } catch (error) {
        console.log(error);
      }
}

function returnTodo(){
    window.location.replace(`./detail.html?id=${id}`);
}

setData();