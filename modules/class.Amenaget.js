var Venom = require("./Parent");
module.exports = class Amenaget extends Venom  {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
        this.hinVandak = 0;
        this.too = 0;
    }
    chooseNCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
        
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {
        var goCells1 = this.chooseCell(0);
        var goCells2 = this.chooseCell(1);
        var goCells3 = goCells2.concat(this.chooseCell(6));
        var cords = goCells1.concat(goCells3);
        var cord = random(cords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[this.y][this.x] = this.hinVandak;
            if (matrix[y][x] == 0) {
                this.hinVandak = 0;
            } else if (matrix[y][x] == 1) {
                this.hinVandak = 1;
            } else if (matrix[y][x] == 4) {
                this.hinVandak = 4;
            } else if (matrix[y][x] == 5) {
                this.hinVandak = 5;
            }

                matrix[y][x] = this.index;
            

            // if (this.multiply >= 8 && newCell) {
            //     var newEater = new GrassEater(newCell[0], newCell[1], this.index);
            //     EaterArr.push(newEater);
            //     matrix[newCell[1]][newCell[0]] = this.index;
            //     this.multiply = 0;
            // }
            this.x = x;
            this.y = y;
            // console.log(newCell,this.move);

            this.too ++;
            if (this.too > 250) {
                this.die();
            }
        }
        for (var i in this.chooseNCell(0)) {
            var liveTArr = this.chooseNCell(0);
                var x = liveTArr[i][0];
                var y = liveTArr[i][1];
                matrix[y][x] = 6;
        }
    }
    die() {
        var amenagetArr = []; // Nicolas Flamel (philosopher's stone)
        for (var i in amenagetArr) {
            if (this.x == amenagetArr[i].x && this.y == amenagetArr[i].y) {
                amenagetArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}

// class Amenaget {
//     constructor(x, y, index) {
//         this.x = x;
//         this.y = y;
//         this.index = 5;
//         this.hinVandak = 0;
//         this.zzvcralq = 0;
//     }
//     chooseCell() {
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[y][x] != 4) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }
//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }
//     move() {
//         var cords = this.chooseCell(0);
//         var cords2 = cords.concat(this.chooseCell(1));
//         var cord = random(cords2);

//         for (var i in this.directions) {   ///////////////////////////////////////////
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 for (var y = 0; y < 9; y++) {
//                     for (var x = 0; x < 9; x++) {
//                         matrix[x][y] = 6;
//                     }
//                 }
//             }
//         }                                  /////////////////////////////////////////////
//         if (cord) {
//             var x = cord[0];
//             var y = cord[1];
//             matrix[this.y][this.x] = this.hinVandak;
//             if (matrix[y][x] == 0) {
//                 this.hinVandak = 0;
//             } else if (matrix[y][x] == 1) {
//                 this.hinVandak = 1;
//             }
//             else if (matrix[y][x] == 4) {
//                 this.hinVandak = 4;
//             }

//             for (var x = 0; x < this.directions.length; x++) {
//                 for (var y = 0; y < 1; y++) {
//                     matrix[y][x] = 6;
//                 }
//             }

//             this.x = x;
//             this.y = y;
//             this.zzvcralq++;
//             // if (zzvcralq >= 250) {
//             //     this.die();
//             // }
//         }
//     }
//     die() {
//         for (var i in amenagetArr) {
//             // if (this.x == amenagetArr[i].x && this.y == amenagetArr[i].y) {
//             //     amenagetArr.splice(i, 1);
//             //     break;
//             // }
//             amenagetArr.length = 0;
//             amenagetArr = 0;
//         }
//         matrix[this.y][this.x] = 0;
//     }
// }
// if(var t = 0;){

//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
// }