
alert("Bienvenido a Forestales Búfalo, venta de leña y carbón");

class Cliente{
    constructor(nombre, email, contraseña){
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
    }
    ingresarCuenta(nombre, contraseña){
        
    }
}


const cliente1 = new Cliente ("Agustin Sosa", "agustin@gmail.com", "agustin1234");

class Producto{
    constructor(nombre, peso, precio){
        this.nombre = nombre;
        this.peso = peso;
        this.precio = precio;
    }
}

const producto1 = new Producto ("Leña", "Bolsa 6kg", 1500);
const producto2 = new Producto ("Carbón", "Bolsa 3kg", 1500);
const producto3 = new Producto ("Leña", "Bolsa 15kg", 3500);
const producto4 = new Producto ("Leña", "a granel x kg", 200);



// let contraseña = "1234";
let ingresar = false;
let carrito = {
    producto1: 0,
    producto2: 0,
    producto3: 0,
    producto4: 0
};

let catalogo = [producto1, producto2, producto3, producto4];

for (let i = 3; i>=1; i--) {
    let ingreso = prompt("Introduzca el pin de ingreso");
    if (ingreso == cliente1.contraseña){
        ingresar = true;
        break;
    } else{
        alert("Contraseña incorrecta");
    }
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
        if(filtro >= arr[i]){
            result.push(arr[i])
        } 
    }
    return result;
}


if(ingresar){
    let menu = prompt("Elegir opción: \n1 - Ingresar al catalogo \n2 - Comprar Leña (6kg) \n3 - Comprar Carbón (3kg) \n4 - Consultar carrito \n5 - Eliminar leña del carrito \n6 - Eliminar carbón del carrito \n7 - Salir");
while(menu != "7"){
    if(menu == "1"){
        let listCatalogo = "";
        let menuCatalogo = prompt("Elegir opcion: \n1 - Ver catalogo completo \n2 - Buscar producto");
        if(menuCatalogo == "1"){
            for (let i = 0; i < catalogo.length; i++) {
                listCatalogo =  listCatalogo + catalogo[i].nombre + " precio: $" + catalogo[i].precio + "\n";
            }
            
            alert("Catalogo de productos: " + listCatalogo);
        }else if(menuCatalogo == "2"){
            let menuBuscarProducto = prompt(" \n1 - Filtrar por nombre \n2 - filtrar por precio")
            if(menuBuscarProducto == "1"){
                let ingreso = prompt("Ingrese el nombre del producto");
                let busquedaNombres = "";
                let arrayNombres = buscarPorNombre(catalogo, ingreso);
                for (let i = 0; i < arrayNombres.length; i++) {
                    busquedaNombres =  busquedaNombres + arrayNombres[i].nombre + " precio: $" + arrayNombres[i].precio + "\n";
                }
            alert("Productos: " + busquedaNombres);
            } else if(menuBuscarProducto == "2"){
                let ingreso = prompt("Ingrese el precio del producto");
                let busquedaPrecios = "";
                let arrayPrecios = buscarPorPrecio(catalogo, ingreso);
                for (let i = 0; i < arrayPrecios.length; i++) {
                    busquedaPrecios =  busquedaPrecios + arrayPrecios[i].nombre + " precio: $" + arrayPrecios[i].precio + "\n";
                }
                alert("Productos: " + busquedaPrecios);
            }
            
        }
        
        
    } else if(menu == "2"){
        let leña = prompt("Ingrese la cantidad de bolsas que necesite");
        carrito.producto1 = sumar(carrito.producto1, leña);
        alert("Producto sumado al carrito con exito");
    }else if(menu == "3"){ 
        let carbon = prompt("Ingrese la cantidad de bolsas que necesite");
        carrito.producto2 = sumar(carrito.producto2, carbon);
        alert("Producto sumado al carrito con exito");
    } else if(menu == "4"){
        alert(
            "Cantidad de bolsas de leña: " + +carrito.producto1 + "\nCantidad de bolsas de carbón: " + +carrito.producto2
        );
    } else if(menu == "5"){
        let leña = prompt("Ingrese la cantidad de bolsas que necesite quitar");
        if(+leña > carrito.producto1){
            carrito.producto1 = 0;
            alert("Producto eliminado con exito");
        } else{
            carrito.producto1 = restar(carrito.producto1, leña);
            alert("Producto eliminado con exito");
        }
    } else if(menu == "6"){
        let carbon = prompt("Ingrese la cantidad de bolsas que necesite quitar");
        if(+carbon > carrito.producto2){
            carrito.producto2 = 0;
            alert("Producto eliminado con exito");
        } else{
            carrito.producto2 = restar(carrito.producto2, carbon);
            alert("Producto eliminado con exito");
        }
    }
    menu = prompt("Elegir opción: \n1 - Ingresar al catalogo \n2 - Comprar Leña (6kg) \n3 - Comprar Carbón (3kg) \n4 - Consultar carrito \n5 - Eliminar leña del carrito \n6 - Eliminar carbón del carrito \n7 - Salir");
}
} else{
    alert("Intentos de ingreso agotados, revise su gmail para recuperar su contraseña");
}




