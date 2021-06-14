function snake(stopGameFlag) {
    const $root = document.querySelector('.snake__root')
    let $alert = document.getElementById('snake__alert')
    let $result = document.getElementById('snake__result')
    const $buttonNewGame = document.getElementById('snake__button')
    const alertNewGame = `Let's get started!`

    let squares
    const squareAmount = 100 // 10*10
    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2, 1, 0]
    let direction = 1
    let result = 0
    let intervalTime = 0
    let interval = 0

    function createBoard() {
        for (let i = 0; i < squareAmount; i++) {
            let squareDiv = document.createElement('div')
            $root.appendChild(squareDiv)
        }

        squares = $root.querySelectorAll('div')
    }

    function moveOutcomes() {
        let tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)
        squares[currentSnake[0]].classList.add('snake')
    }

    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39) {
            direction = 1 // right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width // up arrow, the snake will go back ten divs
        } else if (e.keyCode === 37) {
            direction = -1 // left
        } else if (e.keyCode === 40) {
            direction = +width // down
        }
    }

    function randomApple() {
        while (squares[appleIndex].classList.contains('snake')) appleIndex = Math.floor(Math.random() * squares.length)
        squares[appleIndex].classList.add('apple')
    }

    function clearGame() {
        result = 0
        $result.textContent = result
        clearInterval(interval)
        direction = 1
        intervalTime = 1000
        interval = setInterval(moveOutcomes, intervalTime)
        currentIndex = 0
        currentSnake = [2, 1, 0]
        $alert.textContent = alertNewGame
        $root.textContent = ''
    }

    function newGame() {
        stopGameFlag = false
        $buttonNewGame.textContent = 'New game'
        clearGame()
        createBoard()
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        randomApple()
    }

    if (stopGameFlag) {
        clearGame()
        $buttonNewGame.textContent = 'Start'
    }

    $buttonNewGame.addEventListener('click', newGame)
    document.addEventListener('keyup', control)
}