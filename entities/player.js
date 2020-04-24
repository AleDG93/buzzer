class Player {
    constructor(id, name, numOfSheep, position, gadget, heaven, win){
        this.id = id;
        this.name = name;
        this.numOfSheep = numOfSheep;
        this.position = position;
        this.gadget = gadget;
        this.heaven = heaven;
        this.win = win;
    }
}

module.exports = {
    Player
}