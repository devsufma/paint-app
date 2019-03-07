class Polygon {

    constructor(){
        this.coord = [];
        this.start = false;
        this.color = "black";
    }

    getTotalCoords(){
        return this.coord.length;
    }

    addPoint(x,y){
        this.coord.push(new Point(x,y));
    }

    drawning(){
        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo(this.coord[0].x, this.coord[0].y);
        for(let i = 0; i < this.coord.length; i++){
            context.lineTo(this.coord[i].x, this.coord[i].y);
        }
        context.stroke();
        context.closePath();
    }

    draw() {

        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo(this.coord[0].x, this.coord[0].y);
        for(let i = 0; i < this.coord.length; i++){
            context.lineTo(this.coord[i].x, this.coord[i].y);
        }
        context.lineTo(this.coord[0].x, this.coord[0].y);
        context.stroke();
        context.closePath();
    }

    translate(cx, cy){

        for(let i = 0; i < this.coord.length; i++){
            this.coord[i].translate(cx,cy);
        }

        this.draw();
    }

    scale(cx,cy){
        for(let i = 0; i < this.coord.length; i++){
            this.coord[i].scale(cx, cy);
        }
        this.draw();
    }

    selected(){
        this.color = "red";
    }

    restore(){
        this.color = "black";
    }

    pick(mx, my){

        let ni = 0;
        let fst = this.coord.length -1;
        let xc
        let p1, p2

        for(let i =0; i < this.coord.length; i++){
            p1 = this.coord[i];
            p2 = this.coord[fst];

            if(!(p1.y == p2.y) && !((p1.y > my) && (p2.y > my)) &&
                !((p1.y < my) && (p2.y < my)) && !((p1.x < mx) && (p2.x < mx))){
                if(p1.y == my){
                    if((p1.x > mx) && (p2.y > my))
                        ni++;
                }else{
                    if(p2.y == my){
                        if((p2.x > mx) && (p1.y > my))
                            ni++;
                    }else{
                        if((p1.x > mx) && (p2.x > mx)) {
                            ni++;
                        }else{
                            let dx = p1.x - p2.x;
                            xc = p1.x;
                            if( dx != 0){
                                xc += (my - p1.y) * dx / (p1.y - p2.y);
                                if(xc > mx)
                                    ni++;
                            }
                        }
                    }
                }
            }
            fst = i;
        }
        return(ni%2);
    }

}
