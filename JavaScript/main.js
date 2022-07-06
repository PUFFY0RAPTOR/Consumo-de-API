const titulo = document.getElementById('h1');
const input = document.querySelector('input');
const info = document.getElementById('contenedor'); 
const button = document.getElementById('primerBoton');
const botoncito = document.getElementById('botoncito');
const actualizar = document.getElementById('actualizar');
const eliminar = document.getElementById('eliminar');
const contProductos = document.getElementById('contProductos');
const showAll = document.getElementById('todos');
const cookie = document.querySelector('.cookie');

var listaId = [];

cookie.addEventListener('click', (e) =>{
    e.preventDefault();
    productoTraer(input.value);
    //console.log(input.value);
})

button.addEventListener('click', (e) =>{
    e.preventDefault(); //Evita recargar la página
    traerProductos(input.value);
});

showAll.addEventListener('click', (todos) =>{
    todos.preventDefault();
    mostrarTodosProd();
    swal({
        icon: "success",
        title: "Productos traídos correctamente"
    });
});

botoncito.addEventListener('click', (s) => {
    s.preventDefault();
    registrarProductos();
    swal({
        icon: "success", 
        title: "Producto agregado correctamente"
    });
});

actualizar.addEventListener('click', (actual) => {
    actual.preventDefault();
    actualProductos(input.value);
    if (input.value == 0){
        swal({
            icon: "warning", 
            title: "Debe buscar un producto antes para que pueda ser editado"
        });
    }else {
        swal({
            icon: "success", 
            title: "Producto actualizado correctamente"
        });
    }
});

eliminar.addEventListener('click', (pep) => {
    pep.preventDefault();
    eliminarProducto(input.value);
    swal({
        title: "¿Está seguro/a?",
        text: "Una vez eliminado no podrá recuperar este producto...",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((borrar) => {
        if (borrar) {
          swal("El producto se eliminó correctamente", {
            icon: "success",
          });
        } else {
          swal("No se eliminó ningún producto");
        }
      });
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
                <div class="col s2 m2">
                    <div class="card hoverable">
                        <div class="card-image">
                            <img src="${nomProductos.image}" width="400px" height="250px" />
                            <a onclick="envCookie(${nomProductos.id})" class="btn-floating halfway-fab waves-effect waves-light cyan darken-1"><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <!--<h4>${nomProductos.title}</h4>-->
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

function envCookie(dato){
    listaId.push(dato);
    console.log(listaId);
    localStorage.setItem("pepe", listaId);
    //console.log(localStorage.getItem("pepe"));
}

