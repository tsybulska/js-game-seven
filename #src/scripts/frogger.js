function frogger(stopGameFlag) {
    const $root = document.querySelector('.frogger__root')
    let $alert = document.getElementById('frogger__alert')
    let $time = document.getElementById('frogger__time')
    const $buttonNewGame = document.getElementById('frogger__button')
    const checkImgPath = './assets/icons/sprite.svg#check'
    const closeImgPath = './assets/icons/sprite.svg#close'
    const alertNewGame = `Let's get started!`
    const squareAmount = 81 // 9*9
    const width = 9
    const logStart = 18
    const carStart = 45
    let currentIndex
    let currentTime
    let squares
    let $logsLeft
    let $logsRight
    let $carsLeft
    let $carsRight
    let timerId

    function createBoard() {
        for (let i = 0; i < squareAmount; i++) {
            let squareDiv = document.createElement('div')
            $root.appendChild(squareDiv)
        }

        squares = $root.querySelectorAll('div')
        let endingBlock = squares[Math.floor(width/2)]
        endingBlock.classList.add('ending-block')
        endingBlock.appendChild(document.createElement('img'))
        endingBlock.querySelector('img').setAttribute('src', checkImgPath)
        endingBlock.querySelector('img').setAttribute('alt', 'ending-block')
        squares[currentIndex].classList.add('frog')

        let logCounter = 0
        let carCounter = 0

        function logNum(i) {
            logCounter++
            if (logCounter % 5 === 1) squares[i].classList.add('l1')
            if (logCounter % 5 === 2) squares[i].classList.add('l2')
            if (logCounter % 5 === 3) squares[i].classList.add('l3')
            if (logCounter % 5 === 4) squares[i].classList.add('l4')
            if (logCounter % 5 === 0) squares[i].classList.add('l5')
        }

        for (let i = logStart; i < logStart + width; i++) {
            squares[i].classList.add('log-left')
            logNum(i)
        }

        for (let i = logStart + width; i < logStart + width*2; i++) {
            squares[i].classList.add('log-right')
            logNum(i)
        }

        function carNum(i) {
            carCounter++
            if (carCounter % 3 === 1) squares[i].classList.add('c1')
            if (carCounter % 3 === 2) squares[i].classList.add('c2')
            if (carCounter % 3 === 0) squares[i].classList.add('c3')
        }

        for (let i = carStart; i < carStart + width; i++) {
            squares[i].classList.add('car-left')
            carNum(i)
        }

        for (let i = carStart + width; i < carStart + width*2; i++) {
            squares[i].classList.add('car-right')
            carNum(i)
        }

        $logsLeft = document.querySelectorAll('.log-left')
        $logsRight = document.querySelectorAll('.log-right')
        $carsLeft = document.querySelectorAll('.car-left')
        $carsRight = document.querySelectorAll('.car-right')
    }

    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog')

        switch(e.keyCode) {
            case 37:
                if(currentIndex % width !== 0) currentIndex -= 1
                break
            case 38:
                if(currentIndex - width >= 0) currentIndex -= width
                break
            case 39:
                if(currentIndex % width < width - 1) currentIndex += 1
                break
            case 40:
                if (currentIndex + width < width * width) currentIndex += width
                break
        }

        squares[currentIndex].classList.add('frog')
        lose()
        win()
    }

    function autoMoveCars() {
        $carsLeft.forEach(carLeft => moveCarLeft(carLeft))
        $carsRight.forEach(carRight => moveCarRight(carRight))
    }

    function moveCarLeft(carLeft) {
        if (carLeft.classList.contains('c1')) {
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
        } else if (carLeft.classList.contains('c2')) {
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
        } else if (carLeft.classList.contains('c3')) {
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
        }
    }

    function moveCarRight(carRight) {
        if (carRight.classList.contains('c1')) {
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
        } else if (carRight.classList.contains('c2')) {
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
        } else if (carRight.classList.contains('c3')) {
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
        }
    }

    function autoMoveLogs() {
        $logsLeft.forEach(logLeft => moveLogLeft(logLeft))
        $logsRight.forEach(logRight => moveLogRight(logRight))
    }

    function moveLogLeft(logLeft) {
        if (logLeft.classList.contains('l1')) {
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
        } else if (logLeft.classList.contains('l2')) {
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
        } else if (logLeft.classList.contains('l3')) {
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
        } else if (logLeft.classList.contains('l4')) {
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
        } else if (logLeft.classList.contains('l5')) {
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
        }
    }

    function moveLogRight(logRight) {
        if (logRight.classList.contains('l1')) {
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
        } else if (logRight.classList.contains('l2')) {
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
        } else if (logRight.classList.contains('l3')) {
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
        } else if (logRight.classList.contains('l4')) {
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
        } else if (logRight.classList.contains('l5')) {
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
        }
    }

    function moveWithLogLeft() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove('frog')
            currentIndex += 1
            squares[currentIndex].classList.add('frog')
        }
    }

    function moveWithLogRight() {
        if (currentIndex > 18 && currentIndex <= 26) {
            squares[currentIndex].classList.remove('frog')
            currentIndex -= 1
            squares[currentIndex].classList.add('frog')
        }
    }

    function win() {
        if (squares[4].classList.contains('frog')) {
            $alert.textContent = 'You Won'
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
    }

    function lose() {
        if ((currentTime === 0 ) || (squares[currentIndex].classList.contains('c1')) 
        || (squares[currentIndex].classList.contains('l5'))
        || (squares[currentIndex].classList.contains('l4'))
        ) {
            $alert.textContent = 'You Lose'
            squares[currentIndex].appendChild(document.createElement('img'))
            squares[currentIndex].querySelector('img').setAttribute('src', closeImgPath)
            squares[currentIndex].querySelector('img').setAttribute('alt', 'frog')
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
    }

    function movePieces() {
        currentTime--
        $time.textContent = currentTime
        autoMoveCars()
        autoMoveLogs()
        moveWithLogLeft()
        moveWithLogRight()
        lose()
    }

    function clearGame() {
        clearInterval(timerId)
        currentIndex = 76
        currentTime = 20
        $time.textContent = currentTime
        $alert.textContent = alertNewGame
        $root.textContent = ''
    }

    function newGame() {
        stopGameFlag = false
        $buttonNewGame.textContent = 'New game'
        clearGame()
        createBoard()
        timerId = setInterval(movePieces, 1000)
        document.addEventListener('keyup', moveFrog)
    }

    $buttonNewGame.addEventListener('click', newGame)

    if (stopGameFlag) {
        clearGame()
        $buttonNewGame.textContent = 'Start'
    }
}