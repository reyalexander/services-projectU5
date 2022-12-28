const formTodo = document.getElementById('form');
const service = document.getElementById('service');
const amount = document.getElementById('amount');
const payment_date = document.getElementById('payment-date');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
let msg2 = document.getElementById("msg2");
formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});


let formValidation = () => {
  if (service.value === "") {
    msg.classList.remove("d-none");
  }
  if(amount.value === ""){
    msg1.classList.remove("d-none");
  }
  if(payment_date.value === ""){
    msg2.classList.remove("d-none");
  }
  if (service.value !== "" && amount.value !== "" && payment_date.value !== ""){
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    msg2.classList.add("d-none");
    acceptData();
  }
};

async function acceptData(){
    const id = new URLSearchParams(window.location.search).get("id");
    const data = {
        service: service.value,
        amount: amount.value,
        payment_date: payment_date.value,
        user_id: 1,
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
  const id = new URLSearchParams(window.location.search).get("id");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/services/add_service/${id}/`);
        const data = await response.json();
        service.value = data.service;
        amount.value = data.amount;
        payment_date.value = data.payment_date;
      } catch (error) {
        console.log(error);
      }
}

function returnTodo(){
    window.location.replace(`./detail.html?id=${id}`);
}

setData();