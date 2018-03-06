var Usuario = function(nombre, email, telefono, pelicula, sesion, dia, filas, butacas, precio) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.pelicula = pelicula;
    this.sesion = sesion;
    this.dia = dia;
    this.filas = filas;
    this.butacas = butacas;
    this.precio = precio;
}

$(function() {
    $("#buyProcess2 div").css("opacity", "0.3");

    if (location.href == "file:///F:/DAW2/DOR/9%20-%20Proyectos/Compra%20de%20entradas/pages/SelectButacas.html") {
        $("#buyProcess2 div").first().css("background-color", "#ba0a0a");
        $("#buyProcess2 div").first().css("opacity", "1");
    } 
    else if (location.href == "file:///F:/DAW2/DOR/9%20-%20Proyectos/Compra%20de%20entradas/pages/formulario.html") {
        $("#buyProcess2 div h5").css("color", "white");    
        $("#buyProcess2 div").css("opacity", "1");
        $("#buyProcess2 div").css("background-color", "#ba0a0a");
        $("#buyProcess2 div").first().css("background-color", "white");
        $("#buyProcess2 div h5").first().css("color", "black");
        $("#buyProcess2 div").first().css("opacity", "0.3");
    }
});

function PriceSettings() {
    var precio = 4.50;
    precio = precio * localStorage.getItem("numButacas");

    var pelicula = localStorage.getItem("titulo");
    var fecha = new Date();
    var hora = fecha.getHours() + ":" + fecha.getMinutes();
    var dia = fecha.getDate() + "/" + fecha.getMonth() + 1 + "/" + fecha.getFullYear();

    var butacasElegidas = [];
    var filasElegidas = [];
    var numButacas = 0;

    $("#img-pelicula").attr("src", "../" + localStorage.getItem("foto"));
    $("#Pelicula").text(" Película: " + pelicula);
    $("#Sesion").text(" Sesión: " + localStorage.getItem("sesion"));
    $("#Hora").text(" Hora de compra: " + hora);
    $("#Dia").text(" Día: "+ dia);
    $("#precioTotal").text("Precio Total: " + precio + "€");
    $("#nButaca").text("Sus butacas: " + localStorage.getItem("butacas"));
    $("#Fila").text("Sus filas: "+localStorage.getItem("filas"));
}

function EnviarFormulario() {

    var arrayUsuarios =  JSON.parse(localStorage.getItem('jsonUsuario'));
    var users = usersList;
    var per = 0;
    
    if (arrayUsuarios == null || arrayUsuarios.length == 0) {
        arrayUsuarios = [];
       
        users.forEach(function(user) {
            arrayUsuarios.push(user);
        });

        if ($("#Nombre").val() != "" && $("#Telefono").val() != "" &&  $("#Email").val() != "" && $("#credit_card").val() != "") {
            var usuario = new Usuario($("#Nombre").val(), $("#Email").val(), $("#Telefono").val(), $("#Pelicula").text(), $("#Sesion").text(), $("#Dia").text(), $("#Fila").text(), $("#nButaca").text(), $("#precioTotal").text());
            arrayUsuarios.push(usuario);
            localStorage.setItem('jsonUsuario', JSON.stringify(arrayUsuarios));
            alert('Su formulario ha sido enviado y sus butacas reservadas\n¡Disfrute de la película!');
        }
    } 
    else {
       users.forEach(function(usuarioRegistrado){
            if (usuarioRegistrado.nombre === $("#Nombre").val()) {
                per +=1;
                alert($("#Nombre").val() + " ya ha sacado su entrada");
            }
        });

        if (per == 0 && $("#Nombre").val() != "" && $("#Telefono").val() != "" &&  $("#Email").val() != "" && ("#credit_card").val() != "") {
            var usuario = new Usuario($("#Nombre").val(), $("#Email").val(), $("#Telefono").val(), $("#Pelicula").text(), $("#Sesion").text(), $("#Dia").text(), $("#Fila").text(), $("#nButaca").text(), $("#precioTotal").text());
            arrayUsuarios.push(usuario);
            localStorage.setItem('jsonUsuario', JSON.stringify(arrayUsuarios));
            alert('Su formulario ha sido enviado y sus butacas reservadas\n¡Disfrute de la película!');
        }
    }  
     
    ocupaButaca();
}

function ocupaButaca() {
    
    var butacas = JSON.parse(localStorage.getItem('tazas'));
    var seats = data;
    var arrayButacas = [];
    var seat = localStorage.getItem("butacas");
    seat = seat.split(",");
    
    butacas.forEach(function(butaca) {
        arrayButacas.push(butaca);
    });

    arrayButacas.forEach(function(butaca) {
        for (var i = 0; i <= seat.length; i++) {
            if (seat[i] == butaca.id) {
               butaca.selected = "";
               butaca.selected = "chosen";
            }
        }
    });

    localStorage.setItem('tazas', JSON.stringify(arrayButacas));
}