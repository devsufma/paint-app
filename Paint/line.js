class Line{
    constructor(cx,cy){
        this.point1 = new Point(cx,cy);
        this.point2;
        this.color = "black";
    }

    addSecondPoint(cx, cy){
        this.point2 = new Point(cx,cy);
    }

    translate(cx, cy){
        this.point1.translate(cx, cy);
        this.point2.translate(cx, cy);
    }

    scale(cx, cy){
        this.point1.scale(cx, cy);
        this.point2.scale(cx, cy);
    }

    pickCode(x, y, xmin, xmax, ymin, ymax){
        var cod = [];
        cod[0] = x < xmin;
        cod[1] = x > xmax;
        cod[2] = y < ymin;
        cod[3] = y > ymax;

        return cod;
    }

    pick(mx,my,t){
        let cod0, cod1, j;
        let x0 = this.point1.x, x1 = this.point2.x;
        let y0 = this.point1.y, y1 = this.point2.y;
        let xmin,xmax,ymin,ymax;

        xmin = mx - t;
        xmax = mx + t;
        ymin = my - t;
        ymax = my + t;

        cod1 = this.pickCode(x1, y1, xmin, xmax, ymin, ymax);

        do{
            cod0 = this.pickCode(x0, y0, xmin, xmax, ymin, ymax);

            for(j = 0; j < 4; j++)
                if(cod1[j] && cod0[j]) break;
            if(j != 4) break;

            if(cod0[0]){
                y0 += (xmin - x0)*(y1-y0)/(x1-x0);
                x0 = xmin;
            }else if(cod0[1]){
                y0 += (xmax - x0)*(y1-y0)/(x1-x0);
                x0 = xmax;
            }else if(cod0[2]){
                x0 += (ymin - y0)*(x1-x0)/(y1-y0);
                y0 = ymin;
            }else if(cod0[3]){
                x0 += (ymax - y0)*(x1-x0)/(y1-y0);
            }else{
                return true;
            }
        }while(1);

        return false;
    }

    selected(){
        this.color = "red";
    }

    restore(){
        this.color = "black";
    }

    draw(){

        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo(this.point1.x, this.point1.y);
        context.lineTo(this.point2.x, this.point2.y);
        context.stroke();
        context.closePath();
    }
}
