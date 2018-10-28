var side = 16;
var socket;
var matrix;


function setup() 
{
    frameRate(0);
    socket = io.connect();

    socket.on('get matrix', function(mtx){
        socket.on ("season", season);
        noLoop();
        matrix = mtx;
        createCanvas(matrix.length * side, matrix[0].length * side);

        socket.on('redraw', function(mtx){
            matrix = mtx;
            redraw();
            console.log("tick");
        });
    });

    window.addEventListener('click', function(){ 
        socket.emit('stop drawing', true);
    })
    
    background('#acacac');
}

function draw() 
{
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                // if(season == 0) {fill("#acacac");} else
                fill("#acacac");

                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) { // grass
                if(season == 0) fill("green");
                else fill(0, 148, 76);
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
        }
    }
}

