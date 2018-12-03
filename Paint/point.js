class Point{
    constructor(cx, cy){
        this.x = cx;
        this.y = cy;
        this.w = 4;
        this.h = 4;
        this.color = "black";
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.closePath();
    }

    selected(){
        this.color = "red";
    }

    restore(){
        this.color = "black";
    }

    pick(mx, my, t){

        if(((this.x-t) <= mx) && (mx <= (this.x+t))){
            if(((this.y-t) <= my) && (my <= (this.y+t))){
                return true;
            }
        }
        return false;

    }

    translate(dx, dy){
        let tx = dx;
        let ty = dy;

        let matrix1 = [[1,0,dx],
                        [0,1,dy],
                        [0,0,1]
                        ];
        let matrix2 = [[this.x],
                        [this.y],
                            [1]];

        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;
    }

    scale(dx, dy){

        let matrix1 = [[1.1, 0, 0,],
                        [0, 1.1, 0],
                        [0, 0, 1]];

        let matrix2 = [[this.x],
            [this.y],
            [1]];


        this.translate(-dx, -dy);
        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;
        this.translate(this.x-dx, this.y-dy);
    }

}
