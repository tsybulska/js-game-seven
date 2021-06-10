document.addEventListener('DOMContentLoaded', () => {

function openAcc(el) {
    let panel = el.nextElementSibling;

    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;

        if (el === chooseTitle) chooseTitle.querySelector('svg').style.transform = 'rotate(180deg)'
    } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';

        if (el === chooseTitle) chooseTitle.querySelector('svg').style.transform = 'rotate(0deg)'
    }
}

const chooseTitle = document.querySelector('.hero__title')
const gameList = document.querySelector('.hero').querySelector('ul')
const gameContent = document.querySelectorAll('.content__item')

openAcc(chooseTitle)

chooseTitle.addEventListener('click', function (event) {
    openAcc(chooseTitle)
})


gameList.addEventListener('click', function (event) {
    let clickedItem = event.target.dataset.type
    openAcc(chooseTitle)

    for (let i = 0; i < gameContent.length; i++) {
        gameContent[i].style.display = 'none'

        if (gameContent[i].classList.contains(clickedItem)) {
            gameContent[i].style.display = 'flex'
        }
    }
})

memoryGame()
})