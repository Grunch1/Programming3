var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
socket.emit("season", season)

var matrix = require('./modules/matrix');
var Amenaget = require('./modules/class.Amenaget.js');
var Gishadich = require('./modules/class.Gishadich.js');
var God = require('./modules/class.God.js');
var Gold = require('./modules/class.Gold.js');
var Grass = require('./modules/class.grass.js');
var GrassEater = require('./modules/class.GrassEater.js');
var Event = require('./modules/Event.js');
//var Venom = require('./modules/Parent.js');

var grassArr = [];
var EaterArr = [];
var GishatichArr = [];
var quickSandArr = [];
var amenagetArr = []; // Nicolas Flamel (phil's stone)
var goldArr = [];
var floresiensisArr = [];
var godArr = [];
var eventArr = [];

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
var seconds = 0;

io.on('connection', function (socket) {
  socket.emit('get matrix', matrix);

  var interval = setInterval(function () {
    frameCount++;
    seconds = 5 * frameCount;

    socket.emit('redraw', matrix);
  }, drawTime);

  socket.on('stop drawing', function () {
    clearInterval(interval);

    if (seconds <= 15) {   ////// people change, seasons also change
      textSize(32);
      fill(0, 102, 153);
      text('summer', 10, 30);
      // season = 0;
    }
    else if (seconds <= 30) {
      textSize(32);
      fill(0, 102, 153);
      text('winter', 10, 30);
      season = 1;
    }
    else {
      seconds = 0;
      season = 0;
    }
  });



});
