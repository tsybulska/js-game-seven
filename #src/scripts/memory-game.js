function memoryGame(stopGameFlag) {
    let cardArray = [
        {
            name: 'leaf',
            img: './assets/icons/sprite.svg#leaf'
        },
        {
            name: 'brightness-up',
            img: './assets/icons/sprite.svg#brightness-up'
        },
        {
            name: 'star',
            img: './assets/icons/sprite.svg#star'
        },
        {
            name: 'flame',
            img: './assets/icons/sprite.svg#flame'
        },
        {
            name: 'mountain',
            img: './assets/icons/sprite.svg#mountain'
        },
        {
            name: 'music',
            img: './assets/icons/sprite.svg#music'
        }
    ]

    const $root = document.querySelector('.memory-game__root')
    let $alert = document.querySelector('#memory-game__alert')
    let $result = document.querySelector('#memory-game__result')
    const $buttonNewGame = document.querySelector('#memory-game__button')
    const alertNewGame = 'Flip two cards'
    const searchImgPath = './assets/icons/sprite.svg#search'
    const checkImgPath = './assets/icons/sprite.svg#check'
    let cards
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    cardArray = [...cardArray, ...cardArray]

    function createBoard() {
        cardArray.sort(() => 0.5 - Math.random())

        for (let i = 0; i < cardArray.length; i++) {
            let cardDiv = document.createElement('div')
            let cardImg = document.createElement('img')

            cardImg.setAttribute('src', searchImgPath)
            cardImg.setAttribute('alt', 'card')
            cardDiv.setAttribute('data-memorygameid', i)
            cardDiv.addEventListener('click', flipCard)
            cardDiv.appendChild(cardImg)
            $root.appendChild(cardDiv)
        }

        cards = $root.querySelectorAll('div')
    }

    function checkForMatch() {
        const optionOne = cardsChosen[0]
        const optionTwo = cardsChosen[1]
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if (optionOneId === optionTwoId) {
            $alert.textContent = 'You have clicked the same image'
            hideCards()
        } else if (optionOne === optionTwo) {
            $alert.textContent = 'You found a match'
            cards[optionOneId].querySelector('img').setAttribute('src', checkImgPath)
            cards[optionTwoId].querySelector('img').setAttribute('src', checkImgPath)
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosenId)
        } else {
            $alert.textContent = 'Try again'
            hideCards()
        }

        cardsChosen = []
        cardsChosenId = []
        $result.textContent = cardsWon.length

        if (cardsWon.length === cardArray.length/2) {
            $alert.textContent = 'Congratulations! You found them all'
        }
    }

    function flipCard(event) {
        let cardImg = event.target.closest('div').querySelector('img')
        let cardId = event.target.closest('div').getAttribute('data-memorygameid')

        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        cardImg.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) setTimeout(checkForMatch, 500)
        if (cardsChosen.length > 2) hideCards()
    }

    function hideCards() {
        cards.forEach(item => {
            if (!cardsWon.flat(Infinity).includes(item.dataset.memorygameid)) item.querySelector('img').setAttribute('src', searchImgPath)
        })
    }

    function clearGame() {
        cardsChosen = []
        cardsChosenId = []
        cardsWon = []
        $alert.textContent = alertNewGame
        $result.textContent = cardsWon.length
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