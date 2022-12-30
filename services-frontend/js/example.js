import Header from "../components/Header.js";
import APIDATA from "../js/apiDataStorage.js";

// Función que retorna la estructura de la SPA.
function view(){
  const userdata = localStorage.getItem('usuario')
  const userObj = JSON.parse(userdata)
  return `
  ${Header}
  <div class="card mx-auto container-login" style="width: 25rem;">
    <div class="d-flex justify-content-center mt-4">
      <h3 class="card-title">Agregar Pago</h3>
    </div>

    <div class="card-body">
      <form class="register-form">

        <!-- User id -->
        <input type="hidden" id="user_id" class="form-control" value="${userObj.id}" />

        <!-- Amount input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="amount">Monto de pago</label>
          <input type="text" id="amount" class="form-control" />
        </div>

        <!-- Expiration date input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="expiration_date">Fecha de expiración</label>
          <input type="date" id="expiration_date" class="form-control" />
        </div>

        <!-- Service input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="service_id">Servicio</label>
          <select id="service_id" class="form-select" aria-label="Default select example">
            <option selected>Seleccione un servicio</option>
            ${ services ? APIDATA.services.map(renderOptions).join("") : "" }
          </select>
        </div>

        <div class="d-flex justify-content-center">
          <button id="create-payment" class="btn btn-primary" type="submit">Realizar pago</button>
        </div>

      </form>
    </div>
  </div>
  `;
}

function renderOptions(service){
  return `
    <option value="${service.id}">${service.name}</option>
  `
}

function createPayment() {
  const paymentForm = document.querySelector(".register-form")
  paymentForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    const {user_id, amount, expiration_date, service_id} = e.target.elements
    const new_payment = {
      'User_id': user_id.value,
      'Amount': amount.value,
      'ExpirationDate': expiration_date.value,
      'Service_id': service_id.value
    }
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v2/pagos/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(new_payment),
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error);
    }

    DOMHandler.load(Home);
  })
}

// Clase "Home" con los métodos toString() para renderizar los componentes de la SPA y setListeners()
// que establece los listeners para los eventos de selección de una categoria ó de busqueda de productos
// por texto.
const AddPaymet = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners()
    createPayment();
  }
}
export default AddPaymet;