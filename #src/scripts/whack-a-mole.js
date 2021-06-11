function whackAMole(flag) {
    const $root = document.querySelector('.whack-a-mole__root')
    let $time = document.querySelector('#whack-a-mole__time')
    const timeNewGame = $time.textContent
    let $result = document.querySelector('#whack-a-mole__result')
    const $buttonNewGame = document.querySelector('#whack-a-mole__button')
    const imgPath = './assets/icons/sprite.svg#smiley'
    const hitImgPath = './assets/icons/sprite.svg#smiley-f'

    let squares
    const squareAmount = 6
    let currentTime = timeNewGame
    let result = 0
    let hitPosition
    let timer = 0
    let countDownTimer = 0

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

    $buttonNewGame.addEventListener('click', newGame)

    function clearGame() {
        result = 0
        $result.textContent = result
        hitPosition = null
        currentTime = timeNewGame
        $time.textContent = currentTime
        clearInterval(timer)
        clearInterval(countDownTimer)
        $root.textContent = ''
    }

    function newGame() {
        $buttonNewGame.textContent = 'New game'
        clearGame()
        createBoard()
    }
}