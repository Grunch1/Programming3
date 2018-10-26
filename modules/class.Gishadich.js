var Venom = require("./Parent");
module.exports = class Gishadich extends Venom {
    constructor(x, y, index) {
        super(x, y, index);
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
