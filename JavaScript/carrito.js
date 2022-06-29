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
                <td><input type="number" class="subtotal" value="0" /></td>
            </tr>
        `
    }
    );

    //lista = [];

    //const input = document.querySelector('.subtotal');

    //let suma = lista.price * input.value;
    //console.log(suma);

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