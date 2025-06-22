var g_id_cliente = "" ;
function agregarcliente() {
    //obtenemos datos desde el formulario 
    var id_cliente = document.getElementById("txt_id_cliente").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
"id_cliente": id_cliente,
"dv": dv,
"nombres": nombres,
"apellidos": apellidos,
"email": email,
"celular": celular,
"fecha_registro": "2025-05-12T17:26:00.000Z"
});

const requestOptions = {
method: "GET",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("http://144.126.136.43/api/cliente", requestOptions)
.then((response) => {

    //verificamos si nos entrega el codigo 200
    if(response.status == 200){

      //Redirecciona a la lista de clientes 
    window.location.href = "lista.html";
    }
})
}

function listarClientes(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/cliente", requestOptions)
        .then((response) => response.json())
        .then((json) =>{
            json.forEach(completarFila);
            new DataTable('#tbl_lista')

        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function completarFila(element,index,arr){
    arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
    `<tr>
        <td>${element.id_cliente}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.fecha_registro}</td>
        <td>
            <a href="actualizar.html?id=${element.id_cliente}" class='btn btn-warning btn-sm'>Actualizar</a>
            <a href="eliminar.html?id=${element.id_cliente}" class='btn btn-danger btn-sm'>Eliminar</a>
        </td>
    </tr>`;
}


function actualizarCliente(){

    var id_cliente = document.getElementById("txt_id_cliente").value;

    var dv = document.getElementById("txt_dv").value;

    var nombres = document.getElementById("txt_nombres").value;

    var apellidos = document.getElementById("txt_apellidos").value;

    var email = document.getElementById("txt_email").value;

    var celular = document.getElementById("txt_celular").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular
    });

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://144.126.136.43/api/cliente/"+g_id_cliente, requestOptions)
        .then(response => {
          //verificamos si no sentrega un codigo 200

        if(response.status == 200){
            alert("Actualizado");
            //Redireccionamos a la lista de clientes 
            window.location.href ="lista.html";

        }
        })
        .then(result => console.log(result))
        .catch(error => console.error(error));
}

function obtenerIdActualizacion(){
  //obtenemos los parametros desde la URL
const queryString = window.location.search;

  //Extraccion de datos desde la seccion de parametros
const parametros = new URLSearchParams(queryString);
  //Extraccion de id_cliente

const p_id_cliente = parametros.get("id");
g_id_cliente = p_id_cliente
  //Onbtenemos los datos desde api

obtenerDatosActualizacion(p_id_cliente);
}

function obtenerDatosActualizacion(id_cliente){
    const requestOptions = {
    method : "GET",
    redirect: "follow"
    };

    fetch("http://144.126.136.43/api/cliente/"+id_clienten,requestOptions)
    .then((response)=> response.json())
    .then((json)=>json.forEach(completarFormulario))
    .then((result)=> console.log(result))
    .catch((error)=>console.error(error));
}
function completarNombreCliente(element,index,arr){

    var nombresClientes= element.nombres;
    var apellidosClientes= element.apellidos;
    
    document,getElementById("lbl_nombres_cliente").innerHTML = "<b>" + nombresClientes + "" + apellidosClientes + "</b>";
}

function completarFormulario(element,index,arr){
  //Nombres del cliente 

var nombresClientes = element.nombres;
document.getElementById("txt_nombres").value = nombresClientes;

    var apellidosClientes = element.apellidos;
document.getElementById("txt_apellidos").value = apellidosClientes;

    var emailClientes = element.email;
document.getElementById("txt_email").value = emailClientes;

    var dvClientes = element.dv;
document.getElementById("txt_dv").value = dvClientes;

    var RUTClientes = element.RUT;
document.getElementById("txt_RUT").value = RUTClientes;

    var celularClientes = element.celular;
document.getElementById("txt_celular").value = celularClientes;
}
function eliminarCliente(){
const requestOptions = {
    method: "DELETE",
    redirect:"follow"
};

fetch("http://144.126.136.43/api/cliente/"+g_id_cliente, requestOptions)
.then ((response)=> {
    if (response.status == 200){
    window.location.href = "listar.html";
    }else{
    alert("No se puede eliminar, registro es utilizado actualmente en otras tablas.")
    }
})
}