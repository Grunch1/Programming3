var matrix = matrixcreator(62, 62);

// matrix[15][20] = 4;
// matrix[15][21] = 4;
// matrix[15][19] = 4;
// matrix[14][21] = 4;
// matrix[14][20] = 4;
// matrix[14][19] = 4;
// matrix[16][21] = 4;
// matrix[16][20] = 4;
// matrix[16][19] = 4;
matrix[61][50] = 3;

matrix[52][56] = 5;
matrix[36][42] = 9;

matrix[3][12] = 7;
matrix[3][13] = 8;
matrix[3][14] = 7;
matrix[2][12] = 7;
matrix[2][13] = 7;
matrix[2][14] = 7;
matrix[4][12] = 7;
matrix[4][13] = 7;
matrix[4][14] = 7;

matrix[2][8] = 7;
matrix[2][3] = 7;
matrix[3][5] = 7;
matrix[3][4] = 7;
matrix[4][5] = 7;
matrix[2][6] = 7;
matrix[2][7] = 7;
matrix[5][5] = 7;
matrix[5][6] = 7;
matrix[4][7] = 7;
matrix[4][6] = 7;
matrix[2][5] = 7;
matrix[1][4] = 7;

matrix[30][34] = 7;
matrix[30][36] = 7;
matrix[30][37] = 7;
matrix[29][36] = 7;
matrix[29][37] = 7;
matrix[28][38] = 7;
matrix[28][36] = 7;
matrix[28][33] = 7;
matrix[28][34] = 7;
matrix[29][35] = 7;
matrix[31][32] = 7;
matrix[31][33] = 7;
matrix[31][33] = 7;
matrix[30][32] = 7;
matrix[30][33] = 7;
matrix[29][33] = 7;

function matrixcreator(m, n) {
    var myArray = [0, 1, 2];
    var dude = [];
    for (var y = 0; y < m; y++) {
        dude[y] = [];
        for (var x = 0; x < n; x++) {
            var ind = getRandomInt(0, 1);
            // console.log(ind);
            dude[y][x] = myArray[ind];
            if (y == x || y + x == m - 1) {
                dude[y][x] = 2;
            }
            else if (x == (m / 2)) {
                dude[y][x] = 3;
                // console.log(ind);
            }
            if(x == m && y == n){ //////////////////////////
                dude[m][n] = 5;
            }
            // if(x == 15 && y == 20){ 
            //     dude[m][n] = 5;
            // }
        }
    }
    // dude[60][30] = 2;
    return dude
}
// quickSandArr[15][20] = 4;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

module.exports = matrix;