'use strict'
var bomb = ''
const flag = '🚩'
// const count=
var gBorad = buildBoard()
console.table(buildBoard())

//TODO:add boardSize and numOfBombs
function buildBoard() {
    const board = [];
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                row: i,
                collum: j,
                bomb: false,
                marked: false
            }

        }

    }

    var bombCount = 2//TODO: add numOfBombs
    var currBombs = 0
    while (currBombs < bombCount) {

        var randomRow = getRandomInt(0, board.length)
        var randomCol = getRandomInt(0, board[0].length)

        if (!board[randomRow][randomCol].bomb) {
            board[randomRow][randomCol].bomb = true
            currBombs++;
        }

    }
    return board
}
function renderBoard(board) {
    var strHTML = '<table>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            const cellContent = currCell.bomb ? bomb : (currCell.nearbyBombCounter > 0 ? currCell.nearbyBombCounter : '')
            const cellClass = currCell.bomb ? 'bomb hide' : 'empty hide'
            strHTML += `<td class="${cellClass}" onclick="cellClicked(${i}, ${j})"oncontextmenu="CellMarked(event, ${i}, ${j}); return false;">${cellContent}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    document.getElementsByClassName('board')[0].innerHTML = strHTML
}
function setMinesNegsCount(board, rowIdx, colIdx) {

    var nearbyBombCounter = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]

            if (currCell.bomb) {
                nearbyBombCounter++
            }

        }
    }
    board[rowIdx][colIdx].nearbyBombCounter = nearbyBombCounter
}


function CellMarked(event, row, col) {
    event.preventDefault()
    const CellMarked = gBorad[row][col]
    const cellElement = document.querySelector(`[onclick="cellClicked(${row}, ${col})"]`)
    if (!CellMarked.marked) {
        CellMarked.marked = true
        cellElement.innerHTML = flag
    }
    else {
        CellMarked.marked = false
        cellElement.innerHTML = ''
    }



}


function expandShown(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            const cellElement = document.querySelector(`[onclick="cellClicked(${row}, ${col})"]`)
            if (currCell.bombCount == 0) {



            }





        }
    }
}

function cellClicked(row, col) {


    const cellClicked = gBorad[row][col]
    const cellElement = document.querySelector(`[onclick="cellClicked(${row}, ${col})"]`)
    // if (gBorad[row][col].bomb)
    if (cellClicked.bomb) {
        alert('boom')
        cellElement.innerHTML = '💥'
    }
    else {
        setMinesNegsCount(gBorad, row, col)
        cellElement.innerHTML = cellClicked.nearbyBombCounter
    }

    // console.log(`Cell clicked at row ${row} and column ${col} and is ${cellClicked.bomb}`)

}

renderBoard(gBorad)



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}