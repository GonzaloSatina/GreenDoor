// Variables
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    listaProductos.addEventListener('click', agregarProducto);

    // Cuando se elimina un Producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade el Producto al carrito
function agregarProducto(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const Producto = e.target.parentElement.parentElement;
        // Enviamos el Producto seleccionado para tomar sus datos
        leerDatosProducto(Producto);
    }
}

// Lee los datos del Producto
function leerDatosProducto(Producto) {
    const infoProducto = {
        imagen: Producto.querySelector('img').src,
        titulo: Producto.querySelector('h5').textContent,
        precio: Producto.querySelector('.precio').textContent,
        id: Producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    if (articulosCarrito.some(Producto => Producto.id === infoProducto.id)) {
        const Productos = articulosCarrito.map(Producto => {
            if (Producto.id === infoProducto.id) {
                Producto.cantidad++;
                return Producto;
            } else {
                return Producto;
            }
        })
        articulosCarrito = [...Productos];
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    console.log(articulosCarrito)



    // console.log(articulosCarrito)
    carritoHTML();
}

// Elimina el Producto del carrito en el DOM
function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-producto')) {
        // e.target.parentElement.parentElement.remove();
        const ProductoId = e.target.getAttribute('data-id')

        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(Producto => Producto.id !== ProductoId);

        carritoHTML();
    }
}


// Muestra el Producto seleccionado en el Carrito
function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(Producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>  
                    <img src="${Producto.imagen}" width=100>
               </td>
               <td>${Producto.titulo}</td>
               <td>${Producto.precio}</td>
               <td>${Producto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-producto" data-id="${Producto.id}">X</a>
               </td>
          `;
        contenedorCarrito.appendChild(row);
    });

}

// Elimina los Productos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';


    // forma rapida (recomendada)
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}