class Cliente{
    constructor(nombre, email, contraseña){
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
    }
}

const cliente1 = new Cliente ("Agustin Sosa", "agustin@gmail.com", "1234");


let intentosRestantes = parseInt(localStorage.getItem('intentosRestantes')) || 3;

const inputPass = document.getElementById("contraseña");

inputPass.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        const valorIngresado = inputPass.value;
    
        if(intentosRestantes > 0){
            if (valorIngresado === cliente1.contraseña){
                
                localStorage.removeItem('intentosRestantes');
                console.log("Redirigiendo a productos.html");
                window.location.href="./productos.html"
                
            } else{
                intentosRestantes--;
                localStorage.setItem('intentosRestantes', intentosRestantes);
                Swal.fire({
                    title: "Contraseña incorrecta",
                    text: "Intentos restantes: " + intentosRestantes,
                    icon: "error"
                });
                if(intentosRestantes === 0){
                    Swal.fire({
                        title: "Intentos de ingreso agotados, revise su gmail para recuperar su contraseña",
                        icon: "warning"
                    });
                    inputPass.disabled = true;
                }
            }
        }
        
    }
});
