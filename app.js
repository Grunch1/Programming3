var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


var matrix = require('./modules/matrix');
var Amenaget = require('./modules/class.Amenaget');
var Gishadich = require('./modules/class.Gishadich');
var God = require('./modules/class.God');
var Gold = require('./modules/class.God');
var Grass = require('./modules/class.grass');
var GrassEater = require('./modules/class.GrassEater');
var Event = require('./modules/Event');

var grassArr = [];
var EaterArr = [];
var GishatichArr = [];
var quickSandArr = [];
var amenagetArr = []; // Nicolas Flamel (phil's stone)
var goldArr = [];
var godArr = [];
var eventArr = [];
var stats;
var goldQuantity;

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
  
    else if (matrix[y][x] == 8) {
      var God = new Gold(x, y, 8);
      godArr.push(God);
    }
    else if (matrix[y][x] == 9) {
      var evnt = new Event(x, y, 9);
      eventArr.push(evnt);
    }

  }
}

app.use(express.static("."));

app.get('/', function (req, res) {
  res.redirect('public/index.html');
});

server.listen(3000);

var frameRate = 5;
var drawTime = 1000 / frameRate;
var frameCount = 0;
var seconds;
var season;

io.on('connection', function (socket) {
  socket.emit('get matrix', matrix);

  var interval = setInterval(function () {
    
    frameCount++;
    if(frameCount >= 30){
        stats = {                               /////

          "Grass": grassArr.length,
          "GrassEater": EaterArr.length,
          "Predator": GishatichArr.length,
          "Gold": goldArr.length,
          "Nicolas Flamel": amenagetArr.length,
          "Booms": eventArr.length,
          "Rocks": "36",
          "God": goldQuantity

        };
        socket.emit('stats', stats);
        main(stats); // goes to json
      }

    for (var i in grassArr) {
      grassArr[i].mul(grassArr, matrix);
    }
    for (var i in EaterArr) {
      EaterArr[i].eat(EaterArr, grassArr, matrix);
    }
    for (var i in GishatichArr) {
      GishatichArr[i].eat(GishatichArr, EaterArr, matrix);
    }
    for (var i in amenagetArr) {
      amenagetArr[i].move(grassArr, EaterArr, GishatichArr, amenagetArr, matrix);
    }
    for (var i in eventArr) {
      eventArr[i].Kill(grassArr, EaterArr, GishatichArr, goldArr, matrix);
    }
    // for (var i in goldArr) {
    //   ++goldQuantity;
      
    // }
    // for (var i in goldArr) {
    //     goldArr[i].disappear();
    // }
    // for (var i in godArr) {
    //     godArr[i].move();
    // }

    seconds = frameCount / 5;

    if (seconds <= 5) {
      season = 1;
      socket.emit("get season", season);
    }
    else if (seconds <= 10) {
      season = 0;
      socket.emit("get season", season);
    }
    else {
      seconds = 0;
      frameCount = 0;
    }

    socket.emit('redraw', matrix);

    
  }, drawTime);

  socket.on('stop drawing', function () {
    clearInterval(interval);


  });

});

function main(stat) {
  var file = "obj.json";
  fs.writeFileSync(file, JSON.stringify(stat));
}