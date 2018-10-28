var matrix;
var socket;
var side = 5;
var weather = 300;
var stat = {};
setInterval(function () {
    weather++
}, 100)
function setup() {
    frameRate(0);
    var socket = io.connect();
    socket.on("get matrix", function (mtx) {
        matrix = mtx
        createCanvas(matrix[0].length * side + 850, matrix.length * side);
        noLoop();

        socket.on("redraw", function (mtx) {
            matrix = mtx;
            redraw();
        })

        socket.on("get stat", function (data) {
            stat = data;
        })
    });

    background('#acacac');
}
var start = false;
function draw() {
    background('#acacac');
    var margin = 110;
    var N = 0;
    var Nx = 600;
    for (let i in stat) {
        textSize(20);
        start = true
        var y = 50;
        for (var c = 1; c <= 12; c++) {
            line(500, y, 1500, y)
            y += 40
        }

        N++
        if (N != 2 && N != 3) {
            if (stat[i] <= 2) {
                fill("red")
            }

            else if (stat[i] <= 5)
                fill("yellow")

            else {
                fill("green")
            }

            text(i + ": " + stat[i], Nx, margin);

        }
        else {
            fill(50)
            text(stat[i], Nx, margin);
        }
        Nx += 300
        if (N == 3) {
            Nx = 600
            N = 0
            margin += 40;
        }
    }
    if (start == true) {
        fill("white");
        text("born", 900, 70);
        text("dead", 1200, 70);
        fill(50)
        line(850, 50, 850, 490)
        line(1150, 50, 1150, 490)
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather % 300 > 150) {
                    fill('#20B2AA')

                }
                else {
                    fill('green')

                }


                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill('red');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill('purple');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('#FEB1B1');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill('#0000CD');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill('#FF00FF');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 8) {
                fill('black');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 9) {
                fill('lightgreen');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 10) {
                fill('orange');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac');
                rect(x * side, y * side, side, side);
            }
        }
    }
    if (start == true) {
        if (weather % 300 > 150) {
            fill('#20B2AA')

        }
        else {
            fill('green')

        }
        rect(580, 100, 12, 12);

        fill('yellow');
        rect(580, 140, 12, 12);

        fill('red');
        rect(580, 180-3, 12, 12);

        fill('purple');
        rect(580, 220-3, 12, 12);

        fill('#FEB1B1');
        rect(580, 260-2, 12, 12);


        fill('#0000CD');
        rect(580, 300-2, 12, 12);

        fill('#FF00FF');
        rect(580, 340-2, 12, 12);
        fill('black');
         rect(580, 380-2, 12, 12);

        fill('lightgreen');
        rect(580, 420-2, 12, 12);

        fill('orange');
        rect(580, 460-2, 12, 12);

    }
    if (weather % 300 > 150) {
        fill('blue')
        textSize(30)
        text("Game of life - winter", 600, 30)
    }
    else {
        fill("green")
        textSize(30)
        text("Game of life - spring", 600, 30)
    }
}