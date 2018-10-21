var matrix = matrixcreator(62, 62);
var side = 16;
var grassArr = [];
var EaterArr = [];
var GishatichArr = [];
var quickSandArr = [];
var amenagetArr = []; // Nicolas Flamel (philosopher's stone)
var goldArr = [];
var floresiensisArr = [];
var godArr = [];

var seconds = 0;
var demotime = 0;
var season = 0; // 0 = summer, 1 = winter;
// matrix[15][20] = 4;
// matrix[15][21] = 4;
// matrix[15][19] = 4;
// matrix[14][21] = 4;
// matrix[14][20] = 4;
// matrix[14][19] = 4;
// matrix[16][21] = 4;
// matrix[16][20] = 4;
// matrix[16][19] = 4;

matrix[52][56] = 5;

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
            if(x == m && y == n){ ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                dude[m][n] = 5;
            }
            // if(x == 15 && y == 20){ /////////////////////
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
// function cl(m,n) {
//     var s = console.log(m,n);
//     return s
// }
// cl()
// cl(2, " had");
function setup() {
    frameRate(5);
    createCanvas(matrix.length * side, matrix[0].length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                EaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var gi = new Gishadich(x, y, 3);
                GishatichArr.push(gi);
            }
            else if (matrix[y][x] == 4) {
                var qs = new QuickSand(x, y, 4);
                quickSandArr.push(qs);
            }
            else if (matrix[y][x] == 5) {
                var ps = new Amenaget(x, y, 5);
                amenagetArr.push(ps);   
            }
            else if (matrix[y][x] == 6) {
                var gd = new Gold(x, y, 6);
                goldArr.push(gd);
            }
            else if (matrix[y][x] == 7) {
                var fls = new Gold(x, y, 7);
                floresiensisArr.push(fls);
            }
            else if (matrix[y][x] == 8) {
                var God = new Gold(x, y, 8);
                godArr.push(God);
            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) { // grass
                if(season = 0){
                    fill("white");
                }
                else fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) { // Grasseater
                fill("#DDB77B");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) { // Gishadich
                fill("#8B0000");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("#FF4500");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) { // Philosopher
                fill("#FF00FF");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#FFDF00");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill("#000201");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 8) {
                fill("#7DF9FF");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in EaterArr) {
        EaterArr[i].eat();
    }
    for (var i in GishatichArr) {
        GishatichArr[i].eat();
    }
    for (var i in amenagetArr) {
        amenagetArr[i].move();
    }
    // for (var i in goldArr) {
    //     goldArr[i].disappear();
    // }
    // for (var i in godArr) {
    //     godArr[i].move();
    // }
    // for (var i in floresiensisArr) {
    //     floresiensisArr[i].eat();
    // }

    // for (var i in quickSandArr) {
    //        quickSandArr[i].mojo();
    //     // console.log(quickSandArr.length);
    // }
    demotime += 1;
    if (demotime >= 60/frameCount){
        demotime = 0;
        seconds++; 
    }

    if (seconds <=7){   ///////////////////////////////////////////////////////////////////////
        textSize(32);
        fill(0, 102, 153);
        text('summer', 10, 30);
    }
    else if(seconds <=15){
        textSize(32);
        fill(0, 102, 153);
        text('winter', 10, 30);
        season = 1;
    }
    else {
        seconds = 0;
        season = 0;
    };
    
}
//this.getNewCoordinates();
// Homo floresiensis
