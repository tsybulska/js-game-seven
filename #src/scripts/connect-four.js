function connectFour(stopGameFlag) {
    const winningArrays = [
        [0, 1, 2, 3],
        [41, 40, 39, 38],
        [7, 8, 9, 10],
        [34, 33, 32, 31],
        [14, 15, 16, 17],
        [27, 26, 25, 24],
        [21, 22, 23, 24],
        [20, 19, 18, 17],
        [28, 29, 30, 31],
        [13, 12, 11, 10],
        [35, 36, 37, 38],
        [6, 5, 4, 3],
        [0, 7, 14, 21],
        [41, 34, 27, 20],
        [1, 8, 15, 22],
        [40, 33, 26, 19],
        [2, 9, 16, 23],
        [39, 32, 25, 18],
        [3, 10, 17, 24],
        [38, 31, 24, 17],
        [4, 11, 18, 25],
        [37, 30, 23, 16],
        [5, 12, 19, 26],
        [36, 29, 22, 15],
        [6, 13, 20, 27],
        [35, 28, 21, 14],
        [0, 8, 16, 24],
        [41, 33, 25, 17],
        [7, 15, 23, 31],
        [34, 26, 18, 10],
        [14, 22, 30, 38],
        [27, 19, 11, 3],
        [35, 29, 23, 17],
        [6, 12, 18, 24],
        [28, 22, 16, 10],
        [13, 19, 25, 31],
        [21, 15, 9, 3],
        [20, 26, 32, 38],
        [36, 30, 24, 18],
        [5, 11, 17, 23],
        [37, 31, 25, 19],
        [4, 10, 16, 22],
        [2, 10, 18, 26],
        [39, 31, 23, 15],
        [1, 9, 17, 25],
        [40, 32, 24, 16],
        [9, 17, 25, 33],
        [8, 16, 24, 32],
        [11, 17, 23, 29],
        [12, 18, 24, 30],
        [1, 2, 3, 4],
        [5, 4, 3, 2],
        [8, 9, 10, 11],
        [12, 11, 10, 9],
        [15, 16, 17, 18],
        [19, 18, 17, 16],
        [22, 23, 24, 25],
        [26, 25, 24, 23],
        [29, 30, 31, 32],
        [33, 32, 31, 30],
        [36, 37, 38, 39],
        [40, 39, 38, 37],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 16, 23, 30],
        [10, 17, 24, 31],
        [11, 18, 25, 32],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
    ]

    const $root = document.querySelector('.connect-four__root')
    let $alert = document.getElementById('connect-four__alert')
    let $player = document.getElementById('connect-four__player')
    const $buttonNewGame = document.getElementById('connect-four__button')
    const alertNewGame = `Let's get started!`
    let currentPlayer = 1
    let winFlag = false

    let squares
    const squareAmount = 49 // 7*6 + 7

    function createBoard() {
        for (let i = 0; i < squareAmount; i++) {
            let squareDiv = document.createElement('div')
            
            if (i >= squareAmount - 7) {
                squareDiv.classList.add('taken')
            } else {
                squareDiv.addEventListener('click', checkClick)
            }

            squareDiv.setAttribute('data-connectfour', i)
            $root.appendChild(squareDiv)
        }

        squares = $root.querySelectorAll('div')
    }

    function checkBoard() {
        for (let i = 0; i < winningArrays.length; i++) {
            let square1 = squares[winningArrays[i][0]]
            let square2 = squares[winningArrays[i][1]]
            let square3 = squares[winningArrays[i][2]]
            let square4 = squares[winningArrays[i][3]]

            if (square1.classList.contains('player-one') &&
                square2.classList.contains('player-one') &&
                square3.classList.contains('player-one') &&
                square4.classList.contains('player-one')
            ) {
                winFlag = true
                $alert.textContent = 'Player One Wins!'
            }

            if (square1.classList.contains('player-two') &&
                square2.classList.contains('player-two') &&
                square3.classList.contains('player-two') &&
                square4.classList.contains('player-two')
            ) {
                winFlag = true
                $alert.textContent = 'Player Two Wins!'
            }

            if (winFlag) {
                for (let i = 0; i < squares.length - 7; i++) {
                    squares[i].removeEventListener('click', checkClick)
                }
            }
        }
    }

    function checkClick(event) {
        for (let i = 0; i < squares.length - 7; i++) {
            if ((squares[i] === event.target) &&
                squares[i + 7].classList.contains('taken') &&
                !squares[i].classList.contains('taken')) {
                squares[i].classList.add('taken')
                squares[i].removeEventListener('click', checkClick)

                if (currentPlayer === 1) {
                    squares[i].classList.add('player-one')
                    currentPlayer = 2
                } else if (currentPlayer === 2) {
                    squares[i].classList.add('player-two')
                    currentPlayer = 1
                }

                $player.textContent = currentPlayer
            } else $alert.textContent = 'Cant go here'
            checkBoard()
        }
    }

    function clearGame() {
        currentPlayer = 1
        $player.textContent = currentPlayer
        winFlag = false
        $alert.textContent = alertNewGame
        $root.textContent = ''
    }

    function newGame() {
        stopGameFlag = false
        $buttonNewGame.textContent = 'New game'
        clearGame()
        createBoard()
    }

    $buttonNewGame.addEventListener('click', newGame)

    if (stopGameFlag) {
        clearGame()
        $buttonNewGame.textContent = 'Start'
    }
}