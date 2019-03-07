
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var shapes = [];
var shape = 0;

function reset(){
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].resetColor();
    }
}

function reDraw(){
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].draw();
    }
}

function restoreDraw(){
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].restore();
    }
    reDraw();
}


var previousX = 0;
var previousY = 0;
var shapeSelected = null;

var btnCurrentAction = "none";
var numberOfClicks = 0;

var cx;
var cy;
var mousePressed = false;
var shapeDragging = false;

function onDown(event){

    cx = event.clientX - context.canvas.offsetLeft;
    cy = event.clientY - context.canvas.offsetTop;

    mousePressed = true;
    switch (btnCurrentAction) {
        case "Point":
            if(numberOfClicks == 0){
                shape = new Point(cx, cy);
                shapes.push(shape);
                shape.draw();
                numberOfClicks = 0;
            }
            break;
        case "Line":
            if(numberOfClicks == 0){
                shape = new Line(cx, cy);
                shapes.push(shape);
                numberOfClicks++;
            }else if(numberOfClicks == 1){
                shape.addSecondPoint(cx,cy);
                shape.draw();
                numberOfClicks = 0;
            }
            break;
        case "Circle":
            if(numberOfClicks == 0){
                shape = new Circle(cx, cy);
                shapes.push(shape);
                numberOfClicks++;
            }else if(numberOfClicks == 1){
                shape.addSecondPoint(cx,cy);
                shape.draw();
                numberOfClicks = 0;
            }
            break;
        case "Polygon":
            if(numberOfClicks == 0){
                shape = new Polygon();
                shape.addPoint(cx,cy);
                shapes.push(shape);
                numberOfClicks++;
            }else{

                shape.addPoint(cx,cy);

                numberOfClicks++;
                shape.drawning();
            }
            break;
        case "pick":
            for (let i = 0; i < shapes.length; i++) {
                /*Ponto*/
                if(shapes[i] instanceof Point){
                    if(shapes[i].pick(cx, cy, 5)){

                        if(shapeSelected != null)
                        shapeSelected.restore();
                        shapeSelected = shapes[i];
                        shapeSelected.selected();

                        previousX = cx;
                        previousY = cy;
                    }
                }
                /*Linha*/
                if(shapes[i] instanceof  Line){
                    if(shapes[i].pick(cx, cy, 20)){
                        if(shapeSelected != null)
                            shapeSelected.restore();
                        shapeSelected = shapes[i];
                        shapeSelected.selected();
                        previousX = cx;
                        previousY = cy;
                    }
                }

                /*Circulo*/
                if(shapes[i] instanceof Circle){
                    if(shapes[i].pick(cx, cy, 20)){
                        if(shapeSelected != null)
                            shapeSelected.restore();
                        shapeSelected = shapes[i];
                        shapeSelected.selected();
                        previousX = cx;
                        previousY = cy;
                    }
                }

                /*Poligono*/
                if(shapes[i] instanceof  Polygon){
                    if(shapes[i].pick(cx, cy)){
                        if(shapeSelected != null)
                            shapeSelected.restore();
                        shapeSelected = shapes[i];
                        shapeSelected.selected();
                        previousX = cx;
                        previousY = cy;
                    }
                }

            }
            reDraw();
            break;
    }
}

function onUp(){
    mousePressed = false;
    shapeDragging = false;
}

function onMove(event){
    if(mousePressed){

        switch (btnCurrentAction) {
            case "translate":
                var x = (event.clientX - context.canvas.offsetLeft)-cx;
                var y = (event.clientY - context.canvas.offsetTop)-cy;
                context.save();
                var backCanvas = document.createElement('canvas');
                backCanvas.width = canvas.width;
                backCanvas.height = canvas.height;
                var backContext = backCanvas.getContext('2d');
                backContext.drawImage(canvas,0,0);

                for (let i = 0; i < shapes.length; i++) {
                    /*Ponto*/
                    if(shapes[i] instanceof Point){
                        if(shapes[i].pick(cx, cy, 5)){
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                    /*Linha*/
                    if(shapes[i] instanceof  Line){
                        if(shapes[i].pick(cx, cy, 5)){
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                    /*Circulo*/
                    if(shapes[i] instanceof  Circle){
                        if(shapes[i].pick(cx, cy, 5)){
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                    /*Poligono*/
                    if(shapes[i] instanceof  Polygon){
                        if(shapes[i].pick(cx, cy)){
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                }

                if(shapeDragging){
                    shapeSelected.translate(x, y);
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.restore();
                reDraw();

                cx = event.clientX - context.canvas.offsetLeft;
                cy = event.clientY - context.canvas.offsetTop;
                break;
        }
    }
}

/*Adicionando evento ao botão btnPoint */
document.getElementById('btnPoint').addEventListener('click', function(){
    btnCurrentAction = "Point";

    if(shapes.length > 0){
        restoreDraw();
    }
})

/*Adicionando evento ao botão btnLine */
document.getElementById('btnLine').addEventListener('click', function(){
    btnCurrentAction = "Line";

    if(shapes.length > 0){
        restoreDraw();
    }
})

/*Adicionando evento ao botão btnCircle */
document.getElementById('btnCircle').addEventListener('click', function(){
    btnCurrentAction = "Circle";
})

/*Adicionando evento ao botão btnPolygon */
document.getElementById('btnPolygon').addEventListener('click', function(){
    btnCurrentAction = "Polygon";

    if(shapes.length > 0){
        restoreDraw();
    }
})

/*Adicionando evento ao botão btnPick */
document.getElementById('btnPick').addEventListener('click', function(){
    btnCurrentAction = "pick";

    if(shapes.length > 0){
        restoreDraw();
    }
})

/*Adicionando evento ao botão btnTranslate */
document.getElementById('btnTranslate').addEventListener('click', function(){
    btnCurrentAction = "translate";
    restoreDraw();
})

/*Adicionando evento ao botão btnScale */
document.getElementById('btnScale').addEventListener('click', function(){
    context.save();

    var backCanvas = document.createElement('canvas');
    backCanvas.width = canvas.width;
    backCanvas.height = canvas.height;
    var backContext = backCanvas.getContext('2d');
    backContext.drawImage(canvas,0,0);

    shapeSelected.scale(previousX, previousY);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    reDraw();
})

/*Adicionando evento ao botão btnClear */
document.getElementById('btnClear').addEventListener('click', function (){
    btnCurrentAction = "clear";
    context.clearRect(0, 0, canvas.width, canvas.height);
    shapes = [];
})

canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);

canvas.addEventListener('dblclick', function(){

    if(btnCurrentAction == "Polygon"){
        numberOfClicks = 0;
        shape.draw();
    }
}, false);
