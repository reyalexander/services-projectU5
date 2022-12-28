const main = document.querySelector(".row");
const body = document.querySelector("body");

URL = 'http://127.0.0.1:8000/api/';

async function getTask() {
  const id = new URLSearchParams(window.location.search).get("id");
  const extra = id ? `${id}/` : "";

  try {
    const response = await fetch(URL + `services/add_service/${extra}`);
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
    console.log('No hay tokenssssss')
  }else{
    main.innerHTML = "";
    main.innerHTML += `      
    <div class="mb-5">
      <a href="./post.html" class="btn btn-primary">Crear</a>
    </div>`;
    
    data.results.forEach((task) => {
      const fechaInicio = new Date(task.created_at).getTime();
      const fechaFin = new Date().getTime();
      const diff = fechaFin - fechaInicio;
      const format_date = Math.round(diff / (1000 * 60 * 60 * 24));
      const {service, amount, payment_date , id} = task;
      console.log(task)
      for (const i in task){
        datos = task.service
        console.log('Service: '+ {i: i})
        
          if (task[i].service === 'NF'){
            console.log('Hol')
            console.log(task.service.i)
            task.service[i] = 'Netflix'
          
        }
        
      }
      
      main.innerHTML += `
      <div class="col-4">
        <div class="card mb-2">
          <div class="card-body">
            <h4>${service}</h2>
            <p>
              Amount: ${amount}
            </p>
            <p class="card-text"><small class="text-muted">Payment date: ${payment_date}</small></p>
          </div>
          <div class="mb-3 text-center">
            <a href="./edit.html?id=${id}" class="btn btn-primary">Editar</a>
            <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>`;
    });
  }
}

function renderTodo(data) {
  const {service, amount , payment_date, id} = data;
  body.innerHTML = `
  <div class="container-sm">
    <div class="card mt-5 shadow col-lg-4 mx-auto p-5 py-md-5 ">
      <div class="col-lg-25 mx-auto p-4 py-md-5">
        <main>
          <h1 style='color:blue;'>Detail Service</h1>
          <p class="fs-5 col-md-8">
            Service: ${service}
          </p>
          <p class="fs-5 col-md-8">
            Amount: ${amount}
          </p>
          <p class="fs-5 col-md-8"><small>Payment date:<br> ${payment_date}</small></p>
          <div class="mb-5">
            <a href="./index.html" class="btn btn-primary">Regresar</a>
            <a href="./edit.html?id=${id}" class="btn btn-primary">Editar</a>
            <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
          </div>
        </main>
      </div>
    </div>
  </div>`;
}


getTask();
