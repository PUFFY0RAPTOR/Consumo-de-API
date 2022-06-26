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