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
    let speed = 0.9

    function createBoard() {
        for (let i = 0; i < squareAmount; i++) {
            let squareDiv = document.createElement('div')
            $root.appendChild(squareDiv)
        }

        squares = $root.querySelectorAll('div')
    }

    function moveOutcomes() {
        let head = currentSnake[0]

        if (
            (head + width >= (width * width) && direction === width ) || // hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // hits right
            (head % width === 0 && direction === -1) || // hits left
            (head - width < 0 && direction === -width) || // hits the top
            squares[head + direction].classList.contains('snake') // goes into itself
        ) {
            $alert.textContent = 'Boom Crash! Your score is ' + result
            return clearInterval(interval)

        } else {
            let tail = currentSnake.pop()
            squares[tail].classList.remove('snake')
            currentSnake.unshift(head + direction)
            head = currentSnake[0]

            if (squares[head].classList.contains('apple')) {
                squares[head].classList.remove('apple')
                currentSnake.push(tail)
                randomApple()
                result++
                $result.textContent = result
                clearInterval(interval)
                intervalTime = intervalTime * speed
                interval = setInterval(moveOutcomes, intervalTime)
            }

            squares[head].classList.add('snake')
        }
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
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

    function clearGame() {
        result = 0
        $result.textContent = result
        clearInterval(interval)
        direction = 1
        intervalTime = 1000
        currentIndex = 0
        currentSnake = [2, 1, 0]
        $alert.textContent = alertNewGame
        $root.textContent = ''
        document.removeEventListener('keyup', control)
    }

    function newGame() {
        stopGameFlag = false
        $buttonNewGame.textContent = 'New game'
        clearGame()
        createBoard()
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        randomApple()
        interval = setInterval(moveOutcomes, intervalTime)
        document.addEventListener('keyup', control)
    }

    if (stopGameFlag) {
        clearGame()
        $buttonNewGame.textContent = 'Start'
    }

    $buttonNewGame.addEventListener('click', newGame)
}