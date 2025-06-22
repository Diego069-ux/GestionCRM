function listarClientes() {
const requestOptions = {
    method: "GET",
    redirect: "follow"
};

fetch("http://144.126.136.43/api/cliente", requestOptions)
    .then((response) => response.json())
    .then((json) => {
    json.forEach(completarFila);
      new DataTable('#tbl_cliente'); // activa DataTable después de llenar la tabla
    })
    .catch((error) => console.error(error));
}

function completarFila(element, index, arr) {
const tabla = document.querySelector("#tbl_cliente tbody");
tabla.innerHTML += 
    <tr>
    <td>${element.id_cliente}-${element.dv}</td>
    <td>${element.nombres}</td>
    <td>${element.apellidos}</td>
    <td>${element.email}</td>
    <td>${element.celular}</td>
    <td>${element.fecha_registro}</td>
    <td>
        <a href="actualizar.html?id=${element.id_cliente}" class="btn btn-warning btn-sm">Actualizar</a>
        <a href="eliminar.html?id=${element.id_cliente}" class="btn btn-danger btn-sm">Eliminar</a>
    </td>
    </tr>
;
}