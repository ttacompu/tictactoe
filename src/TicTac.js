'use strict';

export default class TicTac {
    constructor(initObj) {
        this.model = {
            board: [[null, null, null], [null, null, null], [null, null, null]],
            currentUser: 0,
            isWin: false,
            size: 3,
            winningCoor: [],
            containerRef: 'con',
            messageRef: 'winMessage'
        };

        if (initObj) {
            this.model.containerRef = initObj.containerRef;
            this.model.messageRef = initObj.messageRef;
        }
    }

    reStart() {
        this.model.board = [[null, null, null], [null, null, null], [null, null, null]];
        this.model.currentUser = 0;
        this.model.isWin = false;
    }

    rowCheck(user) {
        var countCoordinate = [];
        var columnCoordinate = [];
        var diaCountCoordinate = [];
        var reverseDiaCountCoordinate = [];

        for (let i = 0; i < this.model.size; i++) {
            for (let j = 0; j < this.model.size; j++) {
                if (this.model.board[i][j] === user) {
                    countCoordinate.push({ i: i, j: j });
                }
                if (this.model.board[j][i] === user) {
                    columnCoordinate.push({ i: j, j: i });
                }

                if (i === j) {
                    if (this.model.board[i][j] === user) {
                        diaCountCoordinate.push({ i: i, j: j });
                    }
                    let k = this.model.size - j - 1;
                    if (this.model.board[i][k] === user) {
                        reverseDiaCountCoordinate.push({ i: i, j: k });
                    }
                }

                if (countCoordinate.length === this.model.size) {
                    this.model.winningCoor = countCoordinate;
                    return true;
                }
                if (columnCoordinate.length === this.model.size) {
                    this.model.winningCoor = columnCoordinate;
                    return true;
                }
                if (diaCountCoordinate.length === this.model.size) {
                    this.model.winningCoor = diaCountCoordinate;
                    return true;
                }
                if (reverseDiaCountCoordinate.length === this.model.size) {
                    this.model.winningCoor = reverseDiaCountCoordinate;
                    return true;
                }
            }
            countCoordinate.length = 0;
            columnCoordinate.length = 0;
        }
        return false;
    }

    findingDivwithCoor(coor) {
        let divArr = $("div.col");
        if (divArr.length) {
            divArr.each((index, item) => {
                let current = $(item);
                let location = current.data("loc");
                if (location === coor.i + "," + coor.j) {
                    current.addClass("win");
                }
            })
        }
    }

    paintwinningStratagy(coors) {
        coors.forEach((coor) => {
            this.findingDivwithCoor(coor);
        });
    }

    modelUpdate(loc) {
        var currentState = this.model.board[loc.i][loc.j];
        if (currentState === null && !this.model.isWin) {
            this.model.currentUser = Number(!this.model.currentUser);
            this.model.board[loc.i][loc.j] = this.model.currentUser;
            this.model.isWin = this.rowCheck(this.model.currentUser);
            this.draw();
            if (this.model.isWin) {
                this.paintwinningStratagy(this.model.winningCoor);
            }else{
                if(this.checkAllMarked()){
                     let $winMessage = $("#" + this.model.messageRef);
                     $winMessage.append("Game Over!!! please restart it");
                }
                
            }
        }

    }

    checkAllMarked(){
        for (let i = 0; i < this.model.size; i++) {
            for (let j = 0; j < this.model.size; j++) {
                    if(this.model.board[i][j] == null){
                        return false;
                    }
            }
        }
        return true;
    }

    draw() {
        let $container = $("#" + this.model.containerRef);
        $container.empty();
        this.model.board.forEach(function (row, i) {
            let $row = $("<div class='row'></div>");
            row.forEach(function (data, j) {
                let $col = $("<div class='col' data-loc=" + i + "," + j + "></div>");
                if (data === 0) {
                    let $span = $("<span><i class='material-icons'>panorama_fish_eye</i></span>")
                    $col.append($span);
                } else if (data === 1) {
                    let $span = $("<span><i class='material-icons'>clear</i></span>")
                    $col.append($span);
                }
                $row.append($col);
            })

            $container.append($row);
        });

        let $winMessage = $("#" + this.model.messageRef);
        if(this.model.isWin ===  true){
            let winner = (this.model.currentUser == 0) ? "O" : "X";
            let text = "user " + winner + " win!!";
            $winMessage.append(text);
        }else{
            $winMessage.empty();
        }

        $container.on("click", ".col", (event)=>{
            let location = $(event.currentTarget).data("loc");
            let i, j;
            if(location){
                    let arr = location.split(",");
                    i = arr[0], j = arr[1];
                    this.modelUpdate({i : i, j : j});
            }
        })
    }
}