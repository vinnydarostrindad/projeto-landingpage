const divToAppear = document.querySelector('#helpAlgorithmText')
const spninTheBtn = document.querySelector('#hideTextBtn')

addEventListener ('resize', () => {
    if (window.innerWidth > 825) {
        divToAppear.classList.remove('hideText')
        spninTheBtn.children[0].classList.remove('textHidden')
    }
})