const showAllCart = document.querySelector('.bebe');

var lista = [];

showAllCart.addEventListener('click', (e) =>{
    e.preventDefault();
    mostrarCarrito();   
});

function añadirCarro(id){
    //console.log(id);
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>lista.push(json))
}


function mostrarCarrito(json){

    console.log(lista);
}

function leerCookie(){

    let recib = localStorage.getItem("pepe");

    if (recib == null || recib == "null") {
        
        console.log("No hay cookies");

    } else{

        console.log(recib);
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