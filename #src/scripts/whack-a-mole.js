function whackAMole(stopGameFlag) {
    const $root = document.querySelector('.whack-a-mole__root')
    let $time = document.getElementById('whack-a-mole__time')
    let $result = document.getElementById('whack-a-mole__result')
    const $buttonNewGame = document.getElementById('whack-a-mole__button')
    const imgPath = './assets/icons/sprite.svg#smiley'
    const hitImgPath = './assets/icons/sprite.svg#smiley-f'

    let squares
    const squareAmount = 6
    const timeStart = 60
    let currentTime = timeStart
    let result = 0
    let hitPosition
    let timer
    let countDownTimer

    function createBoard() {
        for (let i = 0; i < squareAmount; i++) {
            let squareDiv = document.createElement('div')
            let squareImg = document.createElement('img')

            squareImg.setAttribute('src', imgPath)
            squareImg.setAttribute('alt', 'mole')
            squareDiv.setAttribute('data-whackamole', i)
            squareDiv.addEventListener('mouseup', calcResult)
            squareDiv.appendChild(squareImg)
            $root.appendChild(squareDiv)
        }

        squares = $root.querySelectorAll('div')
        moveMole()
        countDownTimer = setInterval(countDown, 1000)
    }

    function randomSquare() {
        let randomPosition = squares[Math.floor(Math.random() * squareAmount)]

        squares.forEach(item => {
            item.querySelector('img').setAttribute('src', imgPath)
            item.classList.remove('mole')
        })

        randomPosition.classList.add('mole')
        hitPosition = randomPosition.dataset.whackamole
    }

    function calcResult() {
        if ((this.dataset.whackamole === hitPosition)) {
            this.querySelector('img').setAttribute('src', hitImgPath)
            result++
            $result.textContent = result
            hitPosition = null
        }
    }

    function moveMole() {
        timer = setInterval(randomSquare, 700)
    }

    function countDown() {
        currentTime--
        $time.textContent = currentTime

        if (parseInt(currentTime) === 0) {
            clearInterval(timer)
            clearInterval(countDownTimer)
            $result.textContent = 'Game over! Your final score is ' + result
        }
    }

    function clearGame() {
        result = 0
        $result.textContent = result
        hitPosition = null
        clearInterval(timer)
        clearInterval(countDownTimer)
        currentTime = timeStart
        $time.textContent = currentTime
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