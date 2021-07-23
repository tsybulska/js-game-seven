function tetris(stopGameFlag) {
    const $root = document.querySelector('.tetris__root')
    let $alert = document.getElementById('tetris__alert')
    const $buttonNewGame = document.getElementById('tetris__button')
    const alertNewGame = `Let's get started!`
    const width = 10
    const height = 20
    const squareAmount = width * height // 10*20
    let current
    let currentPosition
    let currentColor
    let currentIndex
    let currentRotation = 0
    let lines
    let squares
    let timerId
    const colors =['color1', 'color2', 'color3', 'color4', 'color5']

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    function createBoard() {
        for (let i = 0; i < squareAmount; i++) {
            let squareDiv = document.createElement('div')
            if (i >= squareAmount - width) squareDiv.classList.add('base')
            $root.appendChild(squareDiv)
        }

        squares = $root.querySelectorAll('div')
    }

    function control(e) {
        if (e.keyCode === 38)
            rotate()
        else if (e.keyCode === 39)
            moveRight()
        else if (e.keyCode === 37)
            moveLeft()
        else if (e.keyCode === 40)
            moveDown()
    }

    function randomCurrent() {
        current = theTetrominoes[Math.floor(Math.random() * theTetrominoes.length)][currentRotation]
    }

    function randomColor() {
        currentColor = colors[Math.floor(Math.random() * colors.length)]
    }

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
            squares[currentPosition + index].classList.add(currentColor)
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
            squares[currentPosition + index].classList.remove(currentColor)
        })
    }

    function moveDown() {
        undraw()
        currentPosition = currentPosition + width
        draw()
        freeze()
    }

    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('freeze'))) currentPosition -= 1
        draw()
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('freeze'))) currentPosition += 1
        draw()
    }

    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) currentRotation = 0
        randomCurrent()
        draw()
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('base') || squares[currentPosition + index + width].classList.contains('freeze'))) {
            current.forEach(index => squares[index + currentPosition].classList.add('freeze'))
            randomCurrent()
            randomColor()
            currentPosition = 4
            addScore()
            gameOver()
        }
    }

    function addScore() {
        for (currentIndex = 0; currentIndex < squareAmount; currentIndex += width) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]

            if (row.every(index => squares[index].classList.contains('freeze'))) {
                score += 10
                lines += 1
                $alert.textContent = score + ', lines ' + lines

                row.forEach(index => {
                    squares[index].classList.remove('freeze') || squares[index].classList.remove('block')
                    colors.forEach(color => {
                        if (squares[index].classList.contains(color)) squares[index].classList.remove(color)
                    })
                })

                const squaresRemoved = squares.splice(currentIndex, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('freeze'))) {
            $alert.textContent = 'End'
            clearInterval(timerId)
            timerId = null
            document.removeEventListener('keydown', control)
        }
    }

    function clearGame() {
        clearInterval(timerId)
        timerId = null
        currentIndex = 0
        currentRotation = 0
        currentPosition = 4
        lines = 0
        $alert.textContent = alertNewGame
        $root.textContent = ''
    }

    function newGame() {
        stopGameFlag = false
        $buttonNewGame.textContent = 'New game'
        clearGame()
        createBoard()
        randomCurrent()
        randomColor()
        draw()
        timerId = setInterval(moveDown, 1000)
        document.addEventListener('keydown', control)
    }

    $buttonNewGame.addEventListener('click', newGame)

    if (stopGameFlag) {
        clearGame()
        $buttonNewGame.textContent = 'Start'
    }
}