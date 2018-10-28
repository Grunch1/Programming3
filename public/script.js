var side = 16;
var socket;
var matrix;
var statis;
var season;// summer-0, winter-1

function setup() {
    frameRate(0);
    socket = io.connect();

    socket.on('get matrix', function (mtx) {
        noLoop();
        matrix = mtx;
        createCanvas(matrix.length * side + 400, matrix[0].length * side);

        socket.on("get season", function (lll) {
            season = lll;
        });
        socket.on('redraw', function (mtx) {
            matrix = mtx;
            redraw();
        });

        socket.on('stats', function (stats) {
            statis = stats;
        })
        // socket.on('all gold', function(VvV){
        //     goldQuantity = VvV;
        // });

        window.addEventListener('click', function () {
            socket.emit('stop drawing', true);
        })

        background('#acacac');
    });
}

    function draw() {
        background("#acacac")
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] == 0) {
                    // if(season == 0) {fill("#acacac");} else
                    fill("#acacac");

                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 1) { // grass
                    if (season == 0) fill("green");
                    else fill(0, 148, 56);
                    // fill("green");
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
                else if (matrix[y][x] == 5) { // Phi    losopher
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
                else if (matrix[y][x] == 9) {
                    fill("white");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 10) {
                    if (season == 0) fill("tomato");
                    else fill("red");
                    rect(x * side, y * side, side, side);
                }
            }
        }
        if (season == 0) {   // seasons
            textSize(32);
            fill(0, 102, 153);
            text('summer', 10, 30);
        }
        else {
            textSize(32);
            fill(0, 102, 153);
            text('winter', 10, 30);
        }

        var margin = 50;
        for (var i in statis) {
            fill('chocolate');
            textSize(30);
            text(i + ": " + statis[i], 1000, margin);
            margin += 40;
        }
        margin = 50;
    }

