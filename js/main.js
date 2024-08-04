
alert("Bienvenido a Forestales Búfalo, venta de leña y carbón");

let contraseña = "1234";
let ingresar = false;
let carrito = {
    leña: 0,
    carbon: 0
};

for (let i = 3; i>=1; i--) {
    let ingreso = prompt("Ingrese su contraseña");
    if (ingreso == contraseña){
        ingresar = true;
        break;
    } else{
        alert("Contraseña incorrecta");
    }
}

if(ingresar){
    let menu = prompt("Que desea comprar? \n1 - Bolsa de leña (6kg) \n2 - Bolsa carbón (3kg) \n3 - Consultar carrito \n4 - Eliminar leña del carrito \n5 - Eliminar carbon del carrito \n6 - Salir");
while(menu != "6"){
    if(menu == "1"){
        let leña = prompt("Ingrese la cantidad de bolsas que necesite");
        carrito.leña = carrito.leña + leña;
        alert("Producto sumado al carrito con exito");
    }else if(menu == "2"){ 
        let carbon = prompt("Ingrese la cantidad de bolsas que necesite");
        carrito.carbon = carrito.carbon + carbon;
        alert("Producto sumado al carrito con exito");
    } else if(menu == "3"){
        alert(
            "Cantidad de bolsas de leña: " + +carrito.leña + "\nCantidad de bolsas de carbón: " + +carrito.carbon
        );
    } else if(menu == "4"){
        let leña = prompt("Ingrese la cantidad de bolsas que necesite quitar");
        if(+leña > carrito.leña){
            carrito.leña = 0;
            alert("Producto eliminado con exito");
        } else{
            carrito.leña = carrito.leña - +leña;
            alert("Producto eliminado con exito");
        }
    } else if(menu == "5"){
        let carbon = prompt("Ingrese la cantidad de bolsas que necesite quitar");
        if(+carbon > carrito.carbon){
            carrito.carbon = 0;
            alert("Producto eliminado con exito");
        } else{
            carrito.carbon = carrito.carbon - +carbon;
            alert("Producto eliminado con exito");
        }
    }
    menu = prompt("Que desea comprar? \n1 - Bolsa de leña (6kg) \n2 - Bolsa carbón (3kg) \n3 - Consultar carrito \n4 - Eliminar leña del carrito \n5 - Eliminar carbon del carrito \n6 - Salir");
}
} else{
    alert("Intentos de ingreso agotados, revise su gmail para recuperar su contraseña");
}




