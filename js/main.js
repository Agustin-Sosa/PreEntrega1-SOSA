let catalogo = [];
let carrito = [];

fetch('./data/productos.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al cargar el catálogo');
        } 
        return response.json();
    })
    .then((data) =>{
        catalogo = data;
        carrito = catalogo.map(producto => ({ ...producto, cantidad: 0 }));
        crearHTML(catalogo)
        cargarCarritoDesdeLocalStorage();
    })
    .catch((error) => {
        console.error("Hubo un problema con el fetch:", error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo cargar el catálogo de productos.',
            icon: 'error',
        });
    });
    

const verCarrito = document.getElementById("btn-carrito");

let carritoVisible = false;

verCarrito.addEventListener('click', () => {
    if (carritoVisible) {
        contenedorCarrito.innerHTML = "";
        verCarrito.innerText = "Ver carrito"; 
        carritoVisible = false; 
    } else {
        mostrarCarrito(carrito);
        verCarrito.innerText = "Ocultar carrito"; 
        carritoVisible = true; 
    }
});

function mostrarCarrito(obj) {
    let html = '';
    let hayProductos = false;
    for (const key in obj) {
        const producto = obj[key];
        if(producto.cantidad > 0){
            hayProductos = true;
            html += 
        `<div class="">
            <h2>Cantidad de ${producto.nombre} (${producto.peso}): ${producto.cantidad}</h2>
        </div>`;
        }
    }
    if(!hayProductos){
        html = `<div><h2>El carrito está vacío</h2></div>`;
    } else {
        html += 
        `<div>
            <button id="btn-delete">Eliminar producto del carrito</button>
            <button id="btn-encargar">Encargar</button>
        </div>`;
    }
    contenedorCarrito.innerHTML = html;

    if(hayProductos){
        contenedorCarrito.addEventListener("click", (e) => {
            if (e.target && e.target.id === "btn-delete") {
                mostrarEliminarProducto();
            }
            if (e.target && e.target.id === "btn-encargar") {
                mostrarFormularioEncargue();
            }
        });
    }
    

    
}

    function mostrarFormularioEncargue(){
        let encargarHTML = `
        <div class="formEncargue">
            <label for="">Nombre</label>
            <input type="text">
            <label for="">Apellido</label>
            <input type="text">
            <label for="">Telefono</label>
            <input type="number">
            <label for="">Dirección</label>
            <input type="text">
            <button id="finalizarCompra">Finalizar compra</button>
        </div>`;
        contenedorCarrito.innerHTML = encargarHTML;

        document.getElementById("finalizarCompra").addEventListener("click", ()=>{
            Swal.fire({
                title: "GRACIAS POR CONFIAR EN NOSOTROS!",
                text: "En las proximas horas nos comunicaremos con usted para realizar el envio de los productos.",
                icon: "success"
            });
            carrito = carrito.map(producto => ({ ...producto, cantidad: 0 }));
        guardarCarritoEnLocalStorage();
        mostrarCarrito(carrito); 
    });
}

    function mostrarEliminarProducto(){
        let eliminarHtml = `
                <div class="eliminar-producto">
                    <label for="producto-eliminar">¿Qué producto necesita quitar del carrito?</label>
                    <select id="producto-eliminar">
                        ${catalogo.map((producto, index) => 
                            `<option value="${index}">${producto.nombre} (${producto.peso})</option>`
                        ).join('')}
                    </select>
                    <label for="cantidad-eliminar">Ingrese la cantidad que desea eliminar:</label>
                    <input type="number" id="cantidad-eliminar" min="1" value="1">
                    <button id="btn-confirmar-eliminar">Confirmar eliminación</button>
                </div>
            `;
            contenedorCarrito.innerHTML = eliminarHtml;

            document.getElementById("btn-confirmar-eliminar").addEventListener("click", () => {
                let productoSeleccionado = parseInt(document.getElementById("producto-eliminar").value);
                let cantidadEliminar = parseInt(document.getElementById("cantidad-eliminar").value);

                if (!isNaN(productoSeleccionado) && cantidadEliminar > 0) {
                    if (cantidadEliminar >= carrito[productoSeleccionado].cantidad){
                        carrito[productoSeleccionado].cantidad = 0;
                    } else {
                        carrito[productoSeleccionado].cantidad = restar(carrito[productoSeleccionado].cantidad, cantidadEliminar);
                    }

                    guardarCarritoEnLocalStorage();
                    Swal.fire({
                        title: "Producto eliminado",
                        text: `Se eliminaron ${cantidadEliminar} unidades de ${carrito[productoSeleccionado].nombre}.`,
                        icon: "success"
                    });
                    mostrarCarrito(carrito);
                } else {
                    Swal.fire({
                        title: "Cantidad invalida",
                        icon: "error"
                    });
                }
            });
    }


function sumar(a,b){
    return a = a + parseFloat(b);
}

function restar(a,b){
    return a = a - parseFloat(b);
}

function buscarPorNombre(arr, filtro){
    filtro = filtro.charAt(0).toUpperCase();
    return arr.filter(el=> el.nombre.includes(filtro));
}


function buscarPorPrecio(arr, filtro){
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if(filtro <= arr[i].precio){
            result.push(arr[i])
        }
    }
    return result;
}



        function crearHTML(arr){
            let html = "";
            arr.forEach((producto, index) => {
                html += 
            `<div class="producto">
            <div class="producto-imagen">
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>
            <div class="producto-info">
                <h2>${producto.nombre}</h2>
                <h4>${producto.peso}</h4>
                <h4>Precio: $ ${producto.precio}</h4>
                <div class="producto-cantidad" id="cantidad-container-${index}" style="display: none;">
                    <label for="cantidad-${index}">Cantidad:</label>
                    <input type="number" id="cantidad-${index}" min="1" value="1">
                    <button class="btn-confirmar" data-producto="${index}">Confirmar</button>
                </div>
            </div>
            <div class="producto-agregar">
                <button class="btn-agregar" data-producto="${index}">Agregar al carrito</button>
            </div>
            </div>`;
            });
            
            contenedor.innerHTML = html;

            document.querySelectorAll(".btn-agregar").forEach(boton => {
                boton.addEventListener("click", (e) => {
                    let index = e.target.getAttribute("data-producto");
                    let cantidadContainer = document.getElementById(`cantidad-container-${index}`);
                    cantidadContainer.style.display = "block";
                });
            });
            document.querySelectorAll(".btn-confirmar").forEach(botonConfirmar => {
                botonConfirmar.addEventListener("click", (e) => {
                    let index = e.target.getAttribute("data-producto");
                    let inputCantidad = document.getElementById(`cantidad-${index}`);
                    let ingreso = parseInt(inputCantidad.value);
                    if (carrito[index]) {
                        if (ingreso && !isNaN(ingreso) && ingreso > 0) {
                            carrito[index].cantidad = sumar(carrito[index].cantidad, ingreso);
                            guardarCarritoEnLocalStorage();
                            Swal.fire({
                                title: "Producto Agregado",
                                text: `Agregaste ${ingreso} unidades de ${carrito[index].nombre} al carrito.`,
                                icon: "success"
                            });
                            document.getElementById(`cantidad-container-${index}`).style.display = "none";
                        } else {
                            Swal.fire({
                                title: "Cantidad invalida",
                                icon: "error"
                            });
                        }
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Producto no encontrado.",
                            icon: "error"
                        });
                    }
                });
            });
        }

    function guardarCarritoEnLocalStorage(){
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    
    function cargarCarritoDesdeLocalStorage(){
        const carritoGuardado = localStorage.getItem("carrito");
        if(carritoGuardado){
            let carritoCargado = JSON.parse(carritoGuardado);

            if (carritoCargado.length === catalogo.length) {
                carrito = carritoCargado;
            } else {
                carrito = catalogo.map(producto => ({ ...producto, cantidad: 0 }));
            }
        }
    }
    
    window.addEventListener("load", cargarCarritoDesdeLocalStorage);
