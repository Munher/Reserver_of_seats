var jsonPeliculas = peliculas;

function ChargeDinamicFilms() {
    jsonPeliculas.forEach(function(pelicula) {
        $("#pelicula" + pelicula.id).attr("src", pelicula.imagen);
        $("#titulo" + pelicula.id).text(pelicula.titulo);
    });
} 

$(".initialImages").click(function() {
    localStorage.setItem("titulo", $(this).attr("title"));
    localStorage.setItem("foto", $(this).attr("src"));
    CargarValores();
});

function CargaAsientos(value) {
    localStorage.setItem("sesion", value);
}

function CargarValores() {
    jsonPeliculas.forEach(function(pelicula) {
        if (pelicula.titulo == localStorage.getItem("titulo")) {
            $("#tituloSeleccionado").text(pelicula.titulo);
            $("#portadaSeleccionada").attr("src", "../" + pelicula.imagen);
            $("#sinopsisSeleccionada").text(pelicula.sinopsis);

            $("#horario1").val(pelicula.horarios[0]);
            $("#horario2").val(pelicula.horarios[1]);
            $("#horario3").val(pelicula.horarios[2]);
        }
    });
}

function goBegining() {
    document.location="../Index.html";
}

// Función que carga los datos de la entrada del cine en el formulario
function datosEntrada() {
    
    var fecha = new Date();
    var hora = fecha.getHours() + ":" + fecha.getMinutes();
    var dia = fecha.getDate() + "/" +fecha.getMonth() + 1 + "/" + fecha.getFullYear();

    var butacasElegidas = [];
    var filasElegidas = [];
    var numButacas = 0;

    $("#Hora").text(" Hora: "+hora);
    $("#Dia").text(" Día: "+dia);

    $("use").each(function() {
        if ($(this).hasClass("selected") == true) {
            numButacas++;
            filasElegidas.push($(this).attr("name"));
            butacasElegidas.push($(this).attr("id"));
            localStorage.setItem("filas", filasElegidas);
            localStorage.setItem("butacas", butacasElegidas);
        }
    });
}
