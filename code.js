

var canvas = document.getElementById("canvas");

var pincel = canvas.getContext("2d");


/*Eventos*/
canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);

var btnPonto = document.getElementById("btnPonto");
var btnLinha = document.getElementById("btnLinha");
var btnCirculo = document.getElementById("btnCirculo");
var btnTranslate = document.getElementById("btnTranslate");
var btnClear = document.getElementById("btnClear");

var buttonAction = "Nenhum";
var desenhando = false;
var mousePressed = false;

var origemX;
var origemY;

var cx = 0;
var cy = 0;

var objects = [];

function addPoint(x, y) {
    var obj = {type: "Ponto", x: 0, y: 0}

    obj.x = x;
    obj.y = y;
    objects.push(obj);
}

function pickPoint(px, py, mx, my, t) {
    if (px < mx + t && px > mx - t) {
        if (py < my + t && py > my - t) {
            return true;
        }
    }
    return false;
}

function pick(mx, my) {
    var len = objects.length;

    for(var i = 0; i < len; i++) {
        var obj = objects[i];

        switch(obj.type) {
            case "Ponto":
                if(pickPoint(obj.x, obj.y, mx, my, 3)) {
                    alert("Ponto Selecionado!");
                    return obj;
                }
                break;
        }
    }
}

function onMove(event) {
    if(mousePressed) {
        switch(buttonAction) {
            case "Transladar":
                x = (event.clientX - pincel.canvas.offsetLeft) - cx;
                y = (event.clientY - pincel.canvas.offsetTop) - cy;

                pincel.save();

                var backCanvas = document.createElement("canvas");
                backCanvas.width = canvas.width;
                backCanvas.height = canvas.height;
                var backCtx = backCanvas.getContext("2d");
                backCtx.drawImage(canvas, 0, 0);

                pincel.transform(
                    1, 0,
                    0, 1,
                    x, y);

                pincel.clearRect(0, 0, canvas.width, canvas.height);

                pincel.drawImage(backCanvas, 0, 0);
                pincel.restore();

                cx = (event.clientX - pincel.canvas.offsetLeft);
                cy = (event.clientY - pincel.canvas.offsetTop);
                break; 
        }
    }
}

function onUp(event) {
    mousePressed = false;
}

function onDown(event) {
    cx = event.clientX - pincel.canvas.offsetLeft;
    cy = event.clientY - pincel.canvas.offsetTop;

    mousePressed = true;

    switch(buttonAction) {
        case "Ponto":
            console.log("Ponto");

            pincel.beginPath();
            pincel.fillRect(cx - 2, cy - 2, 4, 4);
            pincel.stroke();
            pincel.closePath();
            addPoint(cx, cy);
            break;
        case "Linha":
            console.log("Linha");

            if(!desenhando) {
                pincel.beginPath();
                origemX = cx;
                origemY = cy;
                pincel.moveTo(origemX, origemY);
                desenhando = true;
            } else {
                pincel.lineTo(cx, cy);
                pincel.stroke();
                pincel.closePath();
                desenhando = false;
            }
            break;
        case "Circulo":
            console.log("Circulo");
    
            if(!desenhando) {
                origemX = cx;
                origemY = cy;
                desenhando = true;
            } else {
                var finalX = cx;
                var finalY = cy;

                var r = Math.sqrt(Math.pow(finalX - origemX, 2) + Math.pow(finalY - origemY, 2));
                
                pincel.beginPath();

                pincel.arc(origemX, origemY, r, 0, 2*Math.PI);
                pincel.stroke();
                pincel.closePath();
                desenhando = false;
            }
            break;
        case "Transladar":
            pick(cx, cy);
            break;
    }
}


btnTranslate.addEventListener("click", function() {
    buttonAction = "Transladar";
});

btnClear.addEventListener("click", function() {
    pincel.clearRect(0, 0, canvas.width, canvas.height);

});

btnLinha.addEventListener("click", function() {
    buttonAction = "Linha";
});

btnPonto.addEventListener("click", function() {
    buttonAction = "Ponto";
});

btnCirculo.addEventListener("click", function() {
    buttonAction = "Circulo";
});



/*pincel.moveTo(10, 10);
pincel.lineTo(10, 50);
pincel.lineTo(50, 50);
pincel.lineTo(50, 10);
pincel.lineTo(10, 10);
pincel.stroke();

pincel.moveTo(60, 60);
pincel.lineTo(85, 100);
pincel.lineTo(35, 100);
pincel.lineTo(60, 60);
pincel.stroke();


pincel.moveTo(200, 200);
pincel.lineTo(300, 400);
pincel.lineTo(100, 250);
pincel.lineTo(300, 250);
pincel.lineTo(100, 400);
pincel.lineTo(200, 200);
pincel.stroke();


pincel.fillStyle = "red";
pincel.fillRect(100, 100, 100, 100);


pincel.beginPath();
pincel.arc(100,75,50,0,2*Math.PI);
pincel.stroke();
pincel.closePath();

*/