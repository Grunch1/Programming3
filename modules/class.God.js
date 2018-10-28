var Venom = require("./Parent");
module.exports = class God extends Venom {
    constructor(x, y, index) {
        super(x, y, index);
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
        var newCell1 = this.chooseCell(0, matrix);
        var newCell2 = this.chooseCell(1, matrix);
        var newCell3 = newCell2.concat(this.chooseCell(6, matrix));
        var arrayall = newCell1.concat(newCell3);
        var cord = this.random(arrayall);

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
