var Venom = require("./Parent");
module.exports = class Gold extends Venom {
    constructor(x, y, index) {
        super(x, y, index);
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