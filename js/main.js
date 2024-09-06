
class Producto{
    constructor(nombre, peso, precio, img){
        this.nombre = nombre;
        this.peso = peso;
        this.precio = precio;
        this.img = img;
    }
}

const producto1 = new Producto ("Leña", "Bolsa de 6kg", parseInt(1500), "assets/img/bolsaAsado.jpeg");
const producto2 = new Producto ("Carbón", "Bolsa de 3kg", parseInt(1500), "assets/img/carbon1.jpg");
const producto3 = new Producto ("Leña", "Bolsa de 15kg", parseInt(3500), "assets/img/descarga.jpg");
const producto4 = new Producto ("Leña", "suelta por kg", parseInt(200), "assets/img/leña-ASADO.jpeg");



let carrito = {
    producto1: { ...producto1, cantidad: 0 },
    producto2: { ...producto2, cantidad: 0 },
    producto3: { ...producto3, cantidad: 0 },
    producto4: { ...producto4, cantidad: 0 }
};

let catalogo = [producto1, producto2, producto3, producto4];

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
    for (const key in obj) {
        const producto = obj[key];
        html += 
        `<div class="">
            <h2>Cantidad de ${producto.nombre} (${producto.peso}): ${producto.cantidad}</h2>
        </div>`;
    }
    contenedorCarrito.innerHTML = html;
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
            
            contenedor.innerHTML += html;

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
                    if (ingreso && !isNaN(ingreso) && ingreso > 0) {
                        carrito[`producto${parseInt(index) + 1}`].cantidad = sumar(carrito[`producto${parseInt(index) + 1}`].cantidad, ingreso);
                        Swal.fire({
                            title: "Producto Agregado",
                            text: `Agregaste ${ingreso} unidades de ${carrito[`producto${parseInt(index) + 1}`].nombre} al carrito.`,
                            icon: "success"
                        });
                        document.getElementById(`cantidad-container-${index}`).style.display = "none";
                    } else {
                        Swal.fire({
                            title: "Cantidad invalida",
                            icon: "error"
                        });
                    }
                });
            });
        }
        const borrarProducto = document.getElementById("btn-delete");

borrarProducto.addEventListener("click", () => {
    let eliminarHtml = `
        <div class="eliminar-producto">
            <label for="producto-eliminar">¿Qué producto necesita quitar del carrito?</label>
            <select id="producto-eliminar">
                <option value="1">Leña (6kg)</option>
                <option value="2">Carbón</option>
                <option value="3">Leña (15kg)</option>
                <option value="4">Leña suelta</option>
            </select>
            <label for="cantidad-eliminar">Ingrese la cantidad que desea eliminar:</label>
            <input type="number" id="cantidad-eliminar" min="1" value="1">
            <button id="btn-confirmar-eliminar">Confirmar eliminación</button>
        </div>
    `;
    contenedor.innerHTML = eliminarHtml;

    document.getElementById("btn-confirmar-eliminar").addEventListener("click", () => {
        let productoSeleccionado = document.getElementById("producto-eliminar").value;
        let cantidadEliminar = parseInt(document.getElementById("cantidad-eliminar").value);

        if (productoSeleccionado && cantidadEliminar && !isNaN(cantidadEliminar)) {
            let productoKey = `producto${productoSeleccionado}`;
            if (carrito[productoKey]) {
                if (cantidadEliminar >= carrito[productoKey].cantidad) {
                    carrito[productoKey].cantidad = 0;
                    Swal.fire({
                        title: "Producto eliminado",
                        text: `Eliminaste ${ingreso} unidades de ${carrito[`producto${parseInt(index) + 1}`].nombre} al carrito.`,
                        icon: "success"
                    });
                } else {
                    carrito[productoKey].cantidad = restar(carrito[productoKey].cantidad, cantidadEliminar);
                    Swal.fire({
                        title: "Producto Eliminado",
                        text: `Se eliminaron ${cantidadEliminar} unidades de ${carrito[productoKey].nombre}.`,
                        icon: "success"
                    });
                }
            } else {
                Swal.fire({
                    title: "El producto seleccionado no es válido",
                    icon: "error"
                });
            }
        } else {
            Swal.fire({
                title: "Cantidad invalida",
                icon: "error"
            });
        }
        document.querySelector('.eliminar-producto').remove();
        crearHTML(catalogo);
    });
});


    crearHTML(catalogo);
