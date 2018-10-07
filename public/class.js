class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        // console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.energy = 8;
    }
    mul() {
        this.multiply++;
        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(4);
        var arrayall = newCell1.concat(newCell2);
        var newCell = random(arrayall);

        var x = newCell[0];
        var y = newCell[1];
        if (matrix[y][x] == 4) {
            this.die();

            for (var i in quickSandArr) {
                if (x == quickSandArr[i].x && y == quickSandArr[i].y) {
                    quickSandArr.energy += 5;

                    break;
                }
            }
        }
        else {
            if (this.multiply >= 8 && newCell) {
                var newEater = new GrassEater(newCell[0], newCell[1], this.index);
                EaterArr.push(newEater);
                matrix[newCell[1]][newCell[0]] = this.index;
                this.multiply = 0;
            }
        }

        // console.log(newCell, this.multiply);
    }

    chooseCell(character0) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character0) {
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
        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(4);
        var arrayall = newCell1.concat(newCell2);
        var cord = random(arrayall);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            if (matrix[y][x] == 4) {
                this.die();

                for (var i in quickSandArr) {
                    if (x == quickSandArr[i].x && y == quickSandArr[i].y) {
                        quickSandArr.energy++

                        break;
                    }
                }
            }
            else {
                matrix[y][x] = 2;
            }
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;
            if (this.energy <= 4) {
                this.die();
            }
        }

    }
    eat() {
        var EatGrass = this.chooseCell(1);
        var randEatGrass = random(EatGrass);
        if (randEatGrass) {
            var x = randEatGrass[0];
            var y = randEatGrass[1];

            matrix[this.y][this.x] = 0;
            // grassArr[y][x] = 0;
            matrix[y][x] = 2;

            this.energy++;

            this.x = x;
            this.y = y;
            //if(matrix[randEatGrass[0]][randEatGrass[1]] == 1){
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            //}

            if (this.energy >= 7) {
                this.mul();
            }
        }

        else {
            this.move();
        }
    }
    die() {
        for (var i in EaterArr) {
            if (this.x == EaterArr[i].x && this.y == EaterArr[i].y) {
                EaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}

class Gishadich {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.energy = 15;
        this.hinVandak = 0;
    }
    mul() {
        this.multiply++;   //////////
        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(4);
        var arrayall = newCell1.concat(newCell2);
        var newCell = random(arrayall);

        var x = newCell[0];
        var y = newCell[1];
        if (matrix[y][x] == 4) {
            this.die();

            for (var i in quickSandArr) {
                if (x == quickSandArr[i].x && y == quickSandArr[i].y) {
                    quickSandArr.energy += 5;
                    break;
                }
            }
        }
        else {
            if (this.multiply >= 5 && newCell) {
                var newGishadich = new Gishadich(newCell[0], newCell[1], this.index);
                GishatichArr.push(newGishadich);
                matrix[newCell[1]][newCell[0]] = this.index;
                this.multiply = 0;
            }
        }
        // console.log(newCell, this.multiply);
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
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
        var cords = goCells1.concat(goCells2);
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

            if (matrix[y][x] == 4) {
                this.die();
                for (var i in GishatichArr) {
                    if (x == GishatichArr[i].x && y == GishatichArr[i].y) {
                        GishatichArr.energy += 5;
                        break;
                    }
                }
            }
            else {
                matrix[y][x] = this.index;
            }

            // if (this.multiply >= 8 && newCell) {
            //     var newEater = new GrassEater(newCell[0], newCell[1], this.index);
            //     EaterArr.push(newEater);
            //     matrix[newCell[1]][newCell[0]] = this.index;
            //     this.multiply = 0;
            // }
            this.x = x;
            this.y = y;

            this.energy -= 1;

            if (this.energy < -8) {
                this.die();
            }
            // console.log(newCell,this.move);
        }
    }
    eat() {

        var EatEater = this.chooseCell(2);
        var randEatEater = random(EatEater);
        if (randEatEater) {
            var x = randEatEater[0];
            var y = randEatEater[1];

            matrix[this.y][this.x] = 0;
            matrix[y][x] = 3;

            this.energy += 5;

            this.x = x;
            this.y = y;
            for (var i in EaterArr) {
                if (x == EaterArr[i].x && y == EaterArr[i].y) {
                    EaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 18) {
                this.mul();
            }
        }

        else {
            this.move();
        }

    }
    die() {
        for (var i in GishatichArr) {
            if (this.x == GishatichArr[i].x && this.y == GishatichArr[i].y) {
                GishatichArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
class Amenaget {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.hinVandak = 0;
        this.too = 0;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
class Gold {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.hinVandak = 0;
        this.energy = 1;
    }
    disappear() {
        var goldArr = []; // Nicolas Flamel (philosopher's stone)
        for (var i in goldArr) {
            if (this.x == goldArr[i].x && this.y == goldArr[i].y) {
                goldArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
class floresiensis {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.hinVandak = 0;
        this.energy = 25;
    }
    mul() {
        this.multiply++;
        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        var arrayall = newCell1.concat(newCell2);
        var newCell = random(arrayall);

        var x = newCell[0];
        var y = newCell[1];
            if (this.multiply >= 8 && newCell) {
                var newEater = new GrassEater(newCell[0], newCell[1], this.index);
                EaterArr.push(newEater);
                matrix[newCell[1]][newCell[0]] = this.index;
                this.multiply = 0;
            }
        

        // console.log(newCell, this.multiply);
    }
    chooseCell(character0) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character0) {
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
            } else if (matrix[y][x] == 6) {
                this.hinVandak = 0;
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

            this.energy --;
            if (this.energy < 25) {
                this.die();
            }
        }
                
        
    }
    die() {
        var floresiensisArr = []; // Nicolas Flamel (philosopher's stone)
        for (var i in floresiensisArr) {
            if (this.x == floresiensisArr[i].x && this.y == floresiensisArr[i].y) {
                floresiensisArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
class God {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }

    chooseCell(character0) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character0) {
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
        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        var newCell3 = newCell2.concat(this.chooseCell(6));
        var arrayall = newCell1.concat(newCell3);
        var cord = random(arrayall);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

                matrix[y][x] = 8;

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }

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