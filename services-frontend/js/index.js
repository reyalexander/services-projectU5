const main = document.querySelector(".row");
const navbar = document.querySelector("#navbar");
const secondary = document.querySelector("#services");
const body = document.querySelector("body");
const body2 = document.querySelector("body2");

URL = 'http://127.0.0.1:8000/api/';

fetch('http://127.0.0.1:8000/api/users/')
  .then(response => response.json())
  .then(myArray => {
    // Convert the array into a string
    const arrayString = JSON.stringify(myArray);

    // Store the string in localStorage
    localStorage.setItem('myArray', arrayString);
  });

// Retrieve the string from localStorage
const arrayString = localStorage.getItem('myArray');

// Convert the string back into an array
const myArray = JSON.parse(arrayString);

let storedEmail = JSON.parse(localStorage.getItem("email"))


async function getTask() {
  const id = new URLSearchParams(window.location.search).get("id");
  const extra = id ? `${id}/` : "";

  try {
    const response = await fetch(URL + `services/list_payment/${extra}`);
    const data = await response.json();
    id ? renderTodo(data) : renderTasks(data);
  } catch (error) {
    console.log(error);
  }
}

function renderTasks(data) {
  const tok = localStorage.getItem('tokens')
  console.log(tok)
  if (tok == null){
    window.location.href = "./login.html";
  }else{
    main.innerHTML = "";
    main.innerHTML += `      
    <div class="mb-5">
      <a href="./post.html" class="btn btn-primary">Crear Pago</a>
      <a href="./post_service.html" class="btn btn-primary">Crear Servicio</a>
    </div>`;
    
    data.results.forEach((task) => {
      const fechaInicio = new Date(task.created_at).getTime();
      const fechaFin = new Date().getTime();
      const diff = fechaFin - fechaInicio;
      const format_date = Math.round(diff / (1000 * 60 * 60 * 24));
      const {name,logo,service_payments, id} = task;
      
      console.log(service_payments)
      for (let i = 0; i < service_payments.length; i++) {
        main.innerHTML += `
          <div class="col-3">
            <div class="card mb-2">
              <div class="card-body">
                <!-- Card image -->
                <div class="col-md-4 d-none d-md-block ml-6 justify-content-center" >
                  <img src="${logo}" width="270" height="200"
                    alt="Card image cap" >
                  <a href="#!">
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>
                <!-- Card content -->
                <h4>${name}</h2>
                <p>
                  Amount: ${service_payments[i].amount}
                </p>
                
                <p class="card-text"><small class="text-muted">Payment date: ${service_payments[i].payment_date}</small></p>
                <p class="card-text"><small class="text-muted">Expiration date: ${service_payments[i].expiration_date}</small></p>
              </div>
              
              <div class="mb-3 text-center">
                <a href="./edit.html?id=${id}" class="btn btn-primary">Editar</a>
                <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
              </div>
            </div>
          </div>`;
      }
      for(let i=0; i < myArray.length; i++ ){
        if(storedEmail == myArray[i].email){
          navbar.innerHTML = "";
          navbar.innerHTML += `
            <a class="navbar-brand" href="#">Services</a>
            <!-- Icons -->
            <ul class="navbar-nav d-flex flex-row me-1">
                <li class="nav-item dropdown">
                    <!-- Dropdown menu -->
                    <div class="dropdown">
                      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                      </a>

                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item disabled" href="#">${myArray[i].first_name +" "+ myArray[i].last_name}</a></li>
                        <li><a class="dropdown-item" onclick="tokenDelete()" href="./login.html">Log out</a></li>
                      </ul>
                    </div>
                </li>
            </ul>`;
        }
      }
      
    });
  }
}

function renderTodo(data) {
  const {name,service_payments, id} = data;
  for (let i = 1; i < service_payments.length; i++) {
  body.innerHTML = `
  <div class="container-sm">
    <div class="card mt-5 shadow col-lg-4 mx-auto p-5 py-md-5 ">
      <div class="col-lg-25 mx-auto p-4 py-md-5">
        <main>
          <h1 style='color:blue;'>Detail Service</h1>
          <p class="fs-5 col-md-8">
            Service: ${name}
          </p>
          <p class="fs-5 col-md-8">
            Amount: ${service_payments[i].amount}
          </p>
          <p class="fs-5 col-md-8"><small>Payment date:<br> ${service_payments[i].payment_date}</small></p>
          <p class="card-text"><small class="text-muted">Expiration date: ${service_payments[i].expiration_date}</small></p>
          <div class="mb-5">
            <a href="./index.html" class="btn btn-primary">Regresar</a>
            <a href="./edit_service.html?id=${id}" class="btn btn-primary">Editar</a>
            <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
          </div>
        </main>
      </div>
    </div>
  </div>`;
  }
}

async function getServices() {
  const id = new URLSearchParams(window.location.search).get("id");
  const extra = id ? `${id}/` : "";

  try {
    const response = await fetch(URL + `services/add_service/${extra}`);
    const data = await response.json();
    id ? renderServicios(data) : renderServices(data);
  } catch (error) {
    console.log(error);
  }
}

function renderServices(data) {
  const tok = localStorage.getItem('tokens')
  console.log(tok)
  if (tok == null){
    window.location.href = "./login.html";
  }else{
    secondary.innerHTML = "";
    
    data.results.forEach((service) => {
      const fechaInicio = new Date(service.created_at).getTime();
      const fechaFin = new Date().getTime();
      const diff = fechaFin - fechaInicio;
      const format_date = Math.round(diff / (1000 * 60 * 60 * 24));
      const {name,description,logo, id} = service;
      
      secondary.innerHTML += `
        <div class="col-3">
          <div class="card mb-2">
            <div class="card-body">
              <!-- Card image -->
              <div class="col-md-2 d-none d-md-block ml-6 justify-content-center">
                <img src="${logo}"
                  alt="Card image cap" width="260" height="200"/>
                <a href="#!">
                  <div class="mask rgba-white-slight"></div>
                </a>
              </div>
              <!-- Card content -->
              <h4>${name}</h2>
              <p>
                Description: ${description}
              </p>
            </div>
            
            <div class="mb-3 text-center">
              <a href="./edit_service.html?id=${id}" class="btn btn-primary">Editar</a>
              <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>`;
      
      
    });
  }
}

function renderServicios(data) {
  const {name,description, id} = data;
  body2.innerHTML = `
  <div class="container-sm">
    <div class="card mt-5 shadow col-lg-4 mx-auto p-5 py-md-5 ">
      <div class="col-lg-25 mx-auto p-4 py-md-5">
        <main>
          <h1 style='color:blue;'>Detail Service</h1>
          <p class="fs-5 col-md-8">
            Service: ${name}
          </p>
          <p class="fs-5 col-md-8">
            Description: ${description}
          </p>
          <div class="mb-5">
            <a href="./index.html" class="btn btn-primary">Regresar</a>
            <a href="./edit_service.html?id=${id}" class="btn btn-primary">Editar</a>
            <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
          </div>
        </main>
      </div>
    </div>
  </div>`;
  
}

getTask();
getServices();