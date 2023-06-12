class node {
    constructor(row , col , distance){
        this.row = row;
        this.col = col;
        this.distance = distance;
    }
    getPosition(){
        return `${this.row}, ${this.col}`;
    }
}

module.exports = node;
