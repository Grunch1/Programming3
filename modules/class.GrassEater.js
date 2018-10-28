var Venom = require("./Parent");
module.exports = class GrassEater extends Venom {
    constructor(x, y, index) {
        super(x, y, index);
        this.ser = 0;
        this.multiply = 0;
        this.energy = 8;
        if (Math.random() >= 0.5) this.ser = 1;
    }

    
    mul(EaterArr, matrix) {
        this.multiply++;
        var newCell1 = this.chooseCell(0, matrix);
        var newCell2 = this.chooseCell(4, matrix);
        var arrayall = newCell1.concat(newCell2);
        var newCell = this.random(arrayall);
       
        var x = newCell[0];
        var y = newCell[1];
        if (matrix[y][x] == 4) {
            this.die(EaterArr, matrix);

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

    chooseCell(character0, matrix) {
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
    move(EaterArr, matrix) {
        var newCell1 = this.chooseCell(0, matrix);
        var newCell2 = this.chooseCell(4, matrix);
        var arrayall = newCell1.concat(newCell2);
        var cord = this.random(arrayall);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;
            if (this.energy <= 4) {
                this.die(EaterArr, matrix);
            }
        }

    }
    eat(EaterArr, grassArr, matrix) {
        var EatGrass = this.chooseCell(1, matrix);
        var randEatGrass = this.random(EatGrass);
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

            if ( (this.ser = 1) && (this.energy >= 7) ) {
                this.mul(EaterArr, matrix);
            }
        }

        else {
            this.move(EaterArr, matrix);
        }
    }
    die(EaterArr, matrix) {
        for (var i in EaterArr) {
            if (this.x == EaterArr[i].x && this.y == EaterArr[i].y) {
                EaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
