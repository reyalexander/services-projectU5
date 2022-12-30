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
  if(nameS.value === ""){
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

async function acceptData(){
    const id = new URLSearchParams(window.location.search).get("id");
    const data = {
        name: nameS.value,
        description: description.value,
        logo: logo.value,
    }
    console.log(data)
    await fetch(`http://127.0.0.1:8000/api/services/add_service/${id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Accept':'application/json',
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
                    returnServicios();
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
  const id = new URLSearchParams(window.location.search).get("id");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/services/add_service/${id}/`);
        const data = await response.json();
        nameS.value = data.name;
        description.value = data.description;
        logo.value = data.logo;
      } catch (error) {
        console.log(error);
      }
}

function returnServicios(){
  const id = new URLSearchParams(window.location.search).get("id");
  window.location.replace(`./detail.html?id=${id}`);
}

function renderOptions(services){
  return `
    <option value="${services.id}">${services.name}</option>
  `
}

setData();