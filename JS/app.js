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

function vaciarCarrito() {
    borrarHTML();
    articulosCarrito = [];
}


// Funciones
// Función que añade el Producto al carrito
function agregarProducto(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        // Enviamos el Producto seleccionado para tomar sus datos
        leerDatosProducto(productoSeleccionado);
    }
}

// Lee los datos del Producto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)

    if (existe) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                producto.precio = `$${Number(infoProducto.precio.slice(1)) * producto.cantidad}`;
                return producto;
            } else {
                return producto;
            }
        })
        articulosCarrito = [...productos];
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    carritoHTML();
}

// Elimina el Producto del carrito en el DOM
function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id')

        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}


// Muestra el Producto seleccionado en el Carrito
function carritoHTML() {

    borrarHTML();

    articulosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>  
                    <img src="${producto.imagen}" width=100>
               </td>
               <td>${producto.titulo}</td>
               <td>${producto.precio}</td>
               <td>${producto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
               </td>
          `;
        contenedorCarrito.appendChild(row);
    });

}

// Elimina los Productos del carrito en el DOM
function borrarHTML() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';


    // forma rapida 
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}