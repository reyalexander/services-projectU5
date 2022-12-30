let apiData;
const datos = []
const dataUsers = fetch('http://127.0.0.1:8000/api/users/')
  .then(response => response.json())
  .then(data => {
    apiData = data;
  });

datos = dataUsers
function tokenSave(datos){
    localStorage.datos = JSON.stringify(datos);
}

console.log(datos)
tokenSave(datos)