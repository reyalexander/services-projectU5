const main = document.querySelector(".row");
const body = document.querySelector("body");

async function getTask() {
  const id = new URLSearchParams(window.location.search).get("id");
  const extra = id ? `${id}/` : "";

  try {
    const response = await fetch(`http://127.0.0.1:8000/api2/api/v1/todo/${extra}`);
    const data = await response.json();
    id ? renderTodo(data) : renderTasks(data);
  } catch (error) {
    console.log(error);
  }
}

function renderTasks(data) {
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
    const {title, body, id} = task;
    main.innerHTML += `
    <div class="col-4">
      <div class="card mb-2">
        <div class="card-body">
          <h4>${title}</h2>
          <p>
            ${body}
          </p>
          <p class="card-text"><small class="text-muted">Creado hace ${format_date} días</small></p>
          <a href="./detail.html?id=${id}" class="btn btn-primary">Revisar</a>
        </div>
      </div>
    </div>`;
  });
}

function renderTodo(data) {
  const {title, body : bodyTodo, status, created_at, id} = data;
  body.innerHTML = `
  <div class="col-lg-8 mx-auto p-4 py-md-5">
    <main>
      <h1>Detalle</h1>
      <p class="fs-5 col-md-8">
        Título: ${title}
      </p>
      <p class="fs-5 col-md-8">
        ${bodyTodo}
      </p>
      <p class="fs-5 col-md-8"><small>Estado: ${status}</small></p>
      <p class="fs-5 col-md-8"><small>Fecha de creación: ${created_at}</small></p>
      <div class="mb-5">
        <a href="/" class="btn btn-primary">Regresar</a>
        <a href="./edit.html?id=${id}" class="btn btn-primary">Editar</a>
        <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
      </div>
    </main>
  </div>`;
}


getTask();
