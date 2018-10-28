var Venom = require("./Parent");
module.exports = class Event extends Venom {
    constructor(x, y, index) {
        return super(x, y, index);
        this.energy = 8;
    }
    // color code tomato/red/maroon
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
    kill() {
        this.energy--;
        if ( (this.chooseCell(1)) || (this.chooseCell(2)) || (this.chooseCell(3)) || (this.chooseCell(6)) ) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == character0) {
                        for (var i in grassArr) {
                            if (x == grassArr[i].x && y == grassArr[i].y) {
                                grassArr.splice(i, 1);
                                break;
                            }
                        }

                        for (var i in GishatichArr) {
                            if (this.x == GishatichArr[i].x && this.y == GishatichArr[i].y) {
                                GishatichArr.splice(i, 1);
                                break;
                            }
                        }
                        matrix[this.y][this.x] = 0;

                        var goldArr = []; // Nicolas Flamel (philosopher's stone)
                        for (var i in goldArr) {
                            if (this.x == goldArr[i].x && this.y == goldArr[i].y) {
                                goldArr.splice(i, 1);
                                break;
                            }
                        }

                        matrix[this.y][this.x] = 0;
                        for (var i in EaterArr) {
                            if (this.x == EaterArr[i].x && this.y == EaterArr[i].y) {
                                EaterArr.splice(i, 1);
                                break;
                            }
                        }
                        this.energy = 8;
                        matrix[this.y][this.x] = 9;
                    }
                }
            }

        }
    }
}