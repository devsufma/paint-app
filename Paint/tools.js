function multiplyMatriz(matrix1, matrix2){

    let i = 0;
    let j = 0;
    matrix3 = [[],[],[]];
    for (i = 0; i < 3; i++) {
        let result = 0;
        for (j = 0; j < 3; j++) {
            result += matrix1[i][j]*matrix2[j][0];
        }
        matrix3[i][0] = result;
    }
    return {x:matrix3[0][0], y:matrix3[1][0]}
}
