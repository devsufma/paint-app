class Circle{
    constructor(cx, cy) {
        this.p1 = new Point(cx, cy);
        this.p2;
        this.r = 0;
        this.color = "black";
    }

    addSecondPoint(cx, cy){
        this.p2 = new Point(cx, cy);
    }

    pick(mx, my, t) {
        var a = (mx+t) - this.p1.x;
        var b = (my+t) - this.p1.y;
        var r = Math.sqrt(a*a + b*b);

        return  (r < this.r);
    }

    translate(cx, cy){
        this.p1.translate(cx, cy);
        this.p2.translate(cx, cy);
    }

    scale(cx, cy){
        this.p1.scale(cx, cy);
        this.p2.scale(cx, cy);
    }

    selected(){
        this.color = "red";
    }

    restore(){
        this.color = "black";
    }

    draw(){
        var dx = this.p1.x - this.p2.x;
        var dy = this.p1.y - this.p2.y;
        var dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
        this.r = dist;
        context.beginPath();
        context.strokeStyle = this.color;
        context.arc(this.p1.x, this.p1.y, dist, 0, Math.PI*2);
        context.stroke();
        context.closePath();
    }

}
