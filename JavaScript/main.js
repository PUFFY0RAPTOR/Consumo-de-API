const titulo = document.getElementById('h1');
const input = document.querySelector('input');
const info = document.getElementById('contenedor'); 
const button = document.getElementById('primerBoton');
const botoncito = document.getElementById('botoncito');
const actualizar = document.getElementById('actualizar');
const eliminar = document.getElementById('eliminar');
const contProductos = document.getElementById('contProductos');
const showAll = document.getElementById('todos');


button.addEventListener('click', (e) =>{
    e.preventDefault(); //Evita recargar la página
    traerProductos(input.value);
});

showAll.addEventListener('click', (todos) =>{
    todos.preventDefault();
    mostrarTodosProd();
});

botoncito.addEventListener('click', (s) => {
    s.preventDefault();
    registrarProductos();
});

actualizar.addEventListener('click', (actual) => {
    actual.preventDefault();
    actualProductos(input.value);
});

eliminar.addEventListener('click', (pep) => {
    pep.preventDefault();
    eliminarProducto(input.value);
});

window.addEventListener('load', (listica) =>{
    listica.preventDefault();
    pruebaLista();
});

function traerProductos(res){
    fetch(`https://fakestoreapi.com/products/${res}`)
    .then(res => res.json())
    .then(data => {
        verProductos(data)
    })
}

function mostrarTodosProd(){
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(data=>{
            tarjetas(data)
        })
}

function verProductos(nomProd){
    //console.log(nomProd);
    const nom = document.getElementById('nombreProducto');
    nom.textContent = nomProd.title;

    const img = document.getElementById('imgProducto');
    img.src = nomProd.image;

    const desc = document.getElementById('descripcion');
    desc.textContent = nomProd.description;

    const precio = document.getElementById('precio');
    precio.textContent = nomProd.price;
}

function tarjetas(nomProductos){

    let divisito = document.getElementById('contProductos');

    nomProductos.forEach(nomProductos => {
                                
        divisito.innerHTML += `
            <div id="divTarjeta">
                <div class="col s2">
                    <div class="card hoverable">
                        <div class="card-image">
                            <img src="${nomProductos.image}"/>
                            <a onclick="añadirCarro(${nomProductos.id})" class="btn-floating halfway-fab waves-effect waves-light cyan darken-1"><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <h4>${nomProductos.title}</h4>
                            <p>${nomProductos.description}</p>
                            <h4>${nomProductos.price}</h4>
                        </div>
                    </div>
                </div>
        </div>
        `
    });
}

function registrarProductos(){

    fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: 'test product',
                    price: 13.5,
                    description: 'lorem ipsum set',
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
}

function actualProductos(num){

    fetch(`https://fakestoreapi.com/products/${num}`,{
        method:"PUT",
        body:JSON.stringify(
            {
                title: 'Halo 5',
                price: 86,
                description: 'El último juego de una de las mejores sagas de todas',
                image: 'https://i.pravatar.cc',
                category: 'Games'
            }
        )
    })

    .then(res => res.json())
    .then(json => console.log(json))
}

function eliminarProducto(id){
    fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
}

function pruebaLista(){
    fetch('https://fakestoreapi.com/products?limit=5')
            .then(res=>res.json())
            .then((json)=>{
                listarProd(json)
            })
}

function listarProd(dato){
    //console.log(dato)

    let lista = document.getElementById('bodyTable');
    //lista.innerHTML= '';

    //let datosCambio = JSON.stringify(dato);
    //let datosCambio = dato;
    //let datosFinal = [];

    //datosFinal = datosCambio.appendChild();

    dato.forEach((dato) => {
        lista.innerHTML += `
        <tr>
            <td>${dato.title}</td>
            <td>${dato.category}</td>
            <td>${dato.price}</td>
            <td><img class="imgTabla" src="${dato.image}"/></td>
        </tr>
        `
    }); 
}

/*function envCookie(){

    let info = {
        "nombre":"Sebas",
        "apell":"per"
    };
    
    localStorage.setItem("pepe", info);
    //console.log(localStorage.getItem("pepe"));
}

function leerCookie(){

    let recib = localStorage.getItem("pepe");

    if (recib == null || recib == "null") {
        
        console.log("No hay cookies");

    } else{

        console.log(recib);

    }

}*/
