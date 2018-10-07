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
