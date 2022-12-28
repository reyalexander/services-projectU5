
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

URL = 'http://127.0.0.1:8000/api/'
async function acceptData(){
    const data = {
        service: service.value,
        amount: amount.value,
        payment_date: payment_date.value,
        user_id: 2,
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