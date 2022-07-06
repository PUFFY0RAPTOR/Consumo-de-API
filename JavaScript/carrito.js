const showAllCart = document.querySelector('.bebe');

var lista = [];

showAllCart.addEventListener('click', (e) =>{
    e.preventDefault();
    mostrarCarrito();   
    if (lista == 0){
        swal({
            icon: "warning",
            title: "El carrito está vacio"
        });
    }
});

function añadirCarro(id){
    //console.log(id);
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>lista.push(json))
}

function mostrarCarrito(){

    console.log(lista);

    let divProductos = document.querySelector('.carProductos');

    lista.forEach((lista) => {
        divProductos.innerHTML += `
            <tr>
                <td><img class="imgTabla" src="${lista.image}"/></td>
                <td>${lista.title}</td>
                <td>${lista.description}</td>
                <td>${lista.price}</td>
                <td><input type="number" class="subtotal" value="1" /></td>
                <td><button onclick="eliminarCarrito(${lista.id})" class="waves-effect waves-light btn red lighten-1"><i class="material-icons">delete</i>Eliminar</button></td>
            </tr>
        `
    }
    );
    totalPrecio();
}

function eliminarCarrito(valor){
    lista.pop(valor);
    //console.log(lista);
    //mostrarCarrito();
}

function leerCookie(){

    let recib = localStorage.getItem("pepe");
    let arr = JSON.parse("["+recib+"]");

    if (recib == null || recib == "null") {
        
        console.log("No hay cookies");

    } else{
        //console.log(arr);
        for (const i of arr) {
            if (i > 0){
                //console.log(i);
                añadirCarro(i);
            }
        }
    }
}

function eliminarCookie(){
    let borrar = localStorage.removeItem("pepe");

    if (borrar == null || borrar == "null"){
        console.log("Eliminada correctamente");
    }else{
        console.log(borrar);
    }
}

function totalPrecio(){
    const precio = document.getElementById('total');
    
    let suma = 0;

    lista.forEach((lista) => {
        suma += lista.price;
    });

    precio.innerHTML = suma;
}