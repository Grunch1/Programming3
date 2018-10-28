var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var server = require("http").Server(app);
var io = require("socket.io")(server);

var Grass = require("./modules/grass")
var GrassEater = require("./modules/grasseater");
var Predator = require("./modules/predator");
var Bird = require("./modules/bird");
var Egg = require("./modules/egg");
var Male = require("./modules/male");
var Female = require("./modules/female")
var Virus = require('./modules/virus')
var TXCgrass = require("./modules/txcgrass")
var Fire = require("./modules/fire")

var grassArr = [];
var grasslifeArr=[0, 0];

var GrassEaterArr = [];
var grasseaterlifeArr=[0, 0];

var PredatorArr = [];
var predatorlifeArr=[0, 0];

var BirdArr = [];
var birdlifeArr=[0, 0];

var EggArr = [];
var egglifeArr = [0, 0];

var MaleArr = [];
var malelifeArr = [0, 0];

var FemaleArr = [];
var femalelifeArr = [0, 0];

var VirusArr = [];
var viruslifeArr = [0, 0];

var TXCgrassArr = [];
var txcgrasslifeArr = [0, 0];

var FireArr = [];
var firelifeArr = [0, 0];

var createMatrix = require("./modules/matrix")

var matrix = createMatrix(100, 100);
for (var y = 0; y < matrix.length; y++) {
  for (var x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] == 1) {
      grassArr.push(new Grass(x, y, 1))
    }
    else if (matrix[y][x] == 2) {
      GrassEaterArr.push(new GrassEater(x, y, 2))
    }
    else if (matrix[y][x] == 3) {
      PredatorArr.push(new Predator(x, y, 3))
    }
    else if (matrix[y][x] == 5) {
      EggArr.push(new Egg(x, y, 5))
    }
    else if (matrix[y][x] == 4) {
      BirdArr.push(new Bird(x, y, 4))
    }
    else if (matrix[y][x] == 6) {
      MaleArr.push(new Male(x, y, 6))
    }
    else if (matrix[y][x] == 7) {
      FemaleArr.push(new Female(x, y, 7))
    }
    else if (matrix[y][x] == 8) {
      VirusArr.push(new Virus(x, y, 8))
    }
    else if (matrix[y][x] == 9) {
      TXCgrassArr.push(new TXCgrass(x, y, 9))
    }
    else if (matrix[y][x] == 10) {
      FireArr.push(new Fire(x, y, 10))
    }
  }
}

grasslifeArr[0]       += grassArr.length;
grasseaterlifeArr[0]  += GrassEaterArr.length;
predatorlifeArr[0]    += PredatorArr.length;
egglifeArr[0]         += EggArr.length;
malelifeArr[0]        += MaleArr.length;
femalelifeArr[0]      += FemaleArr.length;
viruslifeArr[0]       += VirusArr.length;
txcgrasslifeArr[0]    += TXCgrassArr.length;
firelifeArr[0]        += FireArr.length;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3000);

var framerate = 5;

var drawTime = 1000 / framerate;

io.on("connection", function (socket) {
  socket.emit("get matrix", matrix);
  generateStats();
  var frameCount=0;
  var interval = setInterval(function () {
    for (let i in grassArr) {
      grassArr[i].mul(grassArr, TXCgrassArr, matrix, grasslifeArr, txcgrasslifeArr);
    }

    for (let i in GrassEaterArr) {
      GrassEaterArr[i].eat(GrassEaterArr, grassArr, TXCgrassArr, matrix, grasseaterlifeArr, grasslifeArr, txcgrasslifeArr);
    }

    for (var i in PredatorArr) {
      PredatorArr[i].eat(PredatorArr, GrassEaterArr, grassArr, matrix, grasseaterlifeArr, predatorlifeArr);
    }

    for (var i in BirdArr) {
      BirdArr[i].eat(BirdArr, PredatorArr, grassArr, matrix, birdlifeArr, predatorlifeArr, grasslifeArr );
    }
    for (var i in EggArr) {
      EggArr[i].mul(EggArr, BirdArr, matrix, egglifeArr, birdlifeArr);
    }
    for (var i in MaleArr) {
      MaleArr[i].eat(MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr, matrix, grasslifeArr, grasseaterlifeArr, predatorlifeArr, egglifeArr, birdlifeArr, malelifeArr);
    }
    for (var i in FemaleArr) {
      FemaleArr[i].eat(FemaleArr, MaleArr, grassArr, GrassEaterArr, PredatorArr, EggArr, BirdArr, matrix, femalelifeArr, grasslifeArr, grasseaterlifeArr, predatorlifeArr, egglifeArr, birdlifeArr, malelifeArr);
    }
    for (var i in VirusArr) {
      VirusArr[i].move(VirusArr, matrix, viruslifeArr);
    }
    for (var i in TXCgrassArr) {
      TXCgrassArr[i].TXCfire(TXCgrassArr, FireArr, matrix, txcgrasslifeArr, firelifeArr);
    }
    for (var i in FireArr) {
      FireArr[i].die(FireArr, matrix, firelifeArr);
    }
    
    frameCount++
    if(frameCount >= 60)
    {

      generateStats();
      /*var stat = {
        "Grass": grassArr.length,  "grass-alive":grasslifeArr[0], "grass-dead":grasslifeArr[1],
        "GrassEater" : GrassEaterArr.length,  "grasseater-alive":grasseaterlifeArr[0], "grasseater-dead":grasseaterlifeArr[1],
        "Predator": PredatorArr.length, "predator-alive":predatorlifeArr[0], "predator-dead":predatorlifeArr[1],
        "Bird":BirdArr.length, "bird-alive":birdlifeArr[0], "bird-dead":birdlifeArr[1],
        "Egg":EggArr.length, "egg-alive":egglifeArr[0], "egg-dead":egglifeArr[1],
        "Male":MaleArr.length, "male-alive":malelifeArr[0], "male-dead":malelifeArr[1],
        "Female":FemaleArr.length, "female-alive":femalelifeArr[0], "female-dead":femalelifeArr[1],
        "Virus":VirusArr.length,  "virus-alive":viruslifeArr[0], "virus-dead":viruslifeArr[1],
        "Toxic grass":TXCgrassArr.length, "txcgrass-alive":txcgrasslifeArr[0], "txcgrass-dead":txcgrasslifeArr[1],
        "Fire":FireArr.length, "fire-alive":firelifeArr[0], "fire-dead":firelifeArr[1],
      };
      socket.emit("get stat", stat)
      main(stat);*/

      frameCount = 0;
    }

    socket.emit("redraw", matrix)
  }, drawTime)

  function generateStats()
  {
    var stat = {
      "Grass": grassArr.length,  "grass-alive":grasslifeArr[0], "grass-dead":grasslifeArr[1],
      "GrassEater" : GrassEaterArr.length,  "grasseater-alive":grasseaterlifeArr[0], "grasseater-dead":grasseaterlifeArr[1],
      "Predator": PredatorArr.length, "predator-alive":predatorlifeArr[0], "predator-dead":predatorlifeArr[1],
      "Bird":BirdArr.length, "bird-alive":birdlifeArr[0], "bird-dead":birdlifeArr[1],
      "Egg":EggArr.length, "egg-alive":egglifeArr[0], "egg-dead":egglifeArr[1],
      "Male":MaleArr.length, "male-alive":malelifeArr[0], "male-dead":malelifeArr[1],
      "Female":FemaleArr.length, "female-alive":femalelifeArr[0], "female-dead":femalelifeArr[1],
      "Virus":VirusArr.length,  "virus-alive":viruslifeArr[0], "virus-dead":viruslifeArr[1],
      "Toxic grass":TXCgrassArr.length, "txcgrass-alive":txcgrasslifeArr[0], "txcgrass-dead":txcgrasslifeArr[1],
      "Fire":FireArr.length, "fire-alive":firelifeArr[0], "fire-dead":firelifeArr[1],
    };
    socket.emit("get stat", stat)
    main(stat);
  }

  function main(stat) {
    var file = "obj.json";
    fs.writeFileSync(file, JSON.stringify(stat));
  }
  
})