var jsonTransfer = data;

Taza = function (id, x, y, row, selected) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.row = row;
    this.selected = selected;
}

var arrayTazas = JSON.parse(localStorage.getItem('tazas'));


if (arrayTazas == null || arrayTazas.length == 0) { 
    arrayTazas = [];
    jsonTransfer.forEach(function(e) {
        arrayTazas.push(e);
    });
}

var g = document.getElementsByTagName('g')[0];

arrayTazas.forEach(function(butaca) {
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#taza");
    use.setAttribute("id", butaca.id);
    use.setAttribute("x", butaca.x);
    use.setAttribute("y", butaca.y);
    use.setAttribute("name", butaca.row);
    use.setAttribute("class", butaca.selected);
    g.appendChild(use);
});

$(function(){
     arrayTazas = [];

    $("use").each(function() {
        var id = $(this).attr('id').split('taza').pop();
        var x = $(this).attr('x');
        var y = $(this).attr('y');
        var row = $(this).attr('name');
        var selected = $(this).attr('class');
        
        var taza = new Taza(id, x, y, row, selected);
        arrayTazas.push(taza);
    });
    
    localStorage.setItem('tazas', JSON.stringify(arrayTazas));
})

$('use').on('click', function () {
    if ($(this).attr('class') == 'noSelected'){
        $(this).removeClass('noSelected').addClass('selected');
    }
    else
        $(this).removeClass('selected').addClass('noSelected');
});

$(function() {
    $("#buyProcess div").css("opacity", "0.3");

    if (location.href == "file:///F:/DAW2/DOR/9%20-%20Proyectos/Compra%20de%20entradas/pages/SelectButacas.html") {
        $("#buyProcess div").first().css("background-color", "#ba0a0a");
        $("#buyProcess div").first().css("color", "white");
        $("#buyProcess div").first().css("opacity", "1");
    } 
    else if (location.href == "file:///F:/DAW2/DOR/9%20-%20Proyectos/Compra%20de%20entradas/pages/formulario.html") {
        $("#buyProcess div").css("opacity", "1");
        $("#buyProcess div").css("background-color", "#ba0a0a");
        $("#buyProcess div").first().css("background-color", "white");
        $("#buyProcess div").first().css("color", "black");
        $("#buyProcess div").first().css("opacity", "0.3");
    }
});

function openForm() { 
    
    let selected = 0;
    var fecha = new Date();
    var hora = fecha.getHours() + ":" + fecha.getMinutes();
    var dia = fecha.getDate() + "/" +fecha.getMonth() + 1 + "/" + fecha.getFullYear();

    var butacasElegidas = [];
    var filasElegidas = [];
    var numButacas = 0;

    $("#Hora").text(" Hora: " + hora);
    $("#Dia").text(" Día: "+ dia);
   
    $("use").each(function() {
        if ($(this).hasClass("selected") == true) {
            selected++;
        }
    });

    if (selected == 0) {
        alert("Escoge al menos una butaca que no esté ocupada");
    }
    else {
        $("use").each(function() {
            if ($(this).hasClass("selected") == true) {
                numButacas++;
                filasElegidas.push($(this).attr("name"));
                butacasElegidas.push($(this).attr("id"));
                localStorage.setItem("filas", filasElegidas);
                localStorage.setItem("butacas", butacasElegidas);
                localStorage.setItem("numButacas", document.getElementsByClassName("selected").length);
                $("#nButaca").text(localStorage.getItem("butacas"));
                $("#Fila").text(localStorage.getItem("filas"));
            }
        });

        document.location="formulario.html";
    }
}

function goBefore() {
    document.location="datosPelicula.html";
}