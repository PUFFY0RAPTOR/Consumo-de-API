const titulo = document.getElementById('h1');
const input = document.querySelector('input');
const info = document.getElementById('contenedor'); 
const button = document.querySelector('button');
const botoncito = document.getElementById('botoncito');
const actualizar = document.getElementById('actualizar');
const input2 = document.getElementById('input2');
const eliminar = document.getElementById('eliminar');

button.addEventListener('click', (e) =>{
    e.preventDefault(); //Evita recargar la página
    traerProductos(input.value);
});

botoncito.addEventListener('click', (s) => {
    s.preventDefault();
    registrarProductos();
})

actualizar.addEventListener('click', (actual) => {
    actual.preventDefault();
    actualProductos(input.value);
})

eliminar.addEventListener('click', (pep) => {
    pep.preventDefault();
    eliminarProducto(input.value);
})


function traerProductos(res){
    fetch(`https://fakestoreapi.com/products/${res}`)
    .then(res => res.json())
    .then(data => {
        verProductos(data)
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
