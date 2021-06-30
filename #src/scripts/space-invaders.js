function spaceInvaders(stopGameFlag) {
    const $root = document.querySelector('.space-invaders__root')
    let $alert = document.getElementById('space-invaders__alert')
    let $result = document.getElementById('space-invaders__result')
    const $buttonNewGame = document.getElementById('space-invaders__button')
    const alertNewGame = `Let's get started!`
    let winFlag = false

    let squares
    const squareAmount = 225 // 15*15
    const width = 15
    let direction
    let result
    let currentShooterIndex
    let goingRight
    let invadersInterval
    let aliensRemoved
    let alienInvaders

    function createBoard() {
        for (let i = 0; i < squareAmount; i++) {
            let squareDiv = document.createElement('div')
            $root.appendChild(squareDiv)
        }

        squares = $root.querySelectorAll('div')
        draw()
        squares[currentShooterIndex].classList.add('shooter')
        document.addEventListener('keydown', moveShooter)
        invadersInterval = setInterval(moveInvaders, 600)
        document.addEventListener('keydown', shoot)
    }

    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
    }

    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader')
        }
    }

    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')

        switch(e.key) {
            case 'ArrowLeft':
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
                break
            case 'ArrowRight':
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
                break
        }

        squares[currentShooterIndex].classList.add('shooter')
    }

    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

        remove()

        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1
                direction = -1
                goingRight = false
            }
        }

        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1
                direction = 1
                goingRight = true
            }
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction
        }

        draw()

        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            clearInterval(invadersInterval)
            $alert.textContent = 'Game Over'
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] > squares.length) {
                clearInterval(invadersInterval)
                $alert.textContent = 'Game Over'
            }
        }

        if (aliensRemoved.length === alienInvaders.length) {
            clearInterval(invadersInterval)
            $alert.textContent = 'You Win'
        }
    }

    function shoot(e) {
        let laserInterval
        let currentLaserIndex = currentShooterIndex

        function moveLaser() {
            if ((currentLaserIndex < 0) || (currentLaserIndex - width < 0)) {
                squares[currentLaserIndex].classList.remove('laser')
                clearInterval(laserInterval)
            } else {
                squares[currentLaserIndex].classList.remove('laser')
                currentLaserIndex -= width
                squares[currentLaserIndex].classList.add('laser')

                if (squares[currentLaserIndex].classList.contains('invader')) {
                    squares[currentLaserIndex].classList.remove('laser')
                    squares[currentLaserIndex].classList.remove('invader')
                    squares[currentLaserIndex].classList.add('boom')

                    setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
                    clearInterval(laserInterval)

                    let alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                    aliensRemoved.push(alienRemoved)
                    result++
                    $result.textContent = result
                }
            }
        }

        switch(e.key) {
            case 'ArrowUp':
                laserInterval = setInterval(moveLaser, 100)
        }
    }

    function clearGame() {
        winFlag = false
        direction = 1
        result = 0
        $result.textContent = result
        currentShooterIndex = 202
        goingRight = true
        aliensRemoved = []
        alienInvaders = [
            0,1,2,3,4,5,6,7,8,9,
            15,16,17,18,19,20,21,22,23,24,
            30,31,32,33,34,35,36,37,38,39
        ]
        clearInterval(invadersInterval)
        $alert.textContent = alertNewGame
        $root.textContent = ''
        document.removeEventListener('keydown', moveShooter)
        document.removeEventListener('keydown', shoot)
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