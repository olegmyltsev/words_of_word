const getBtn = document.getElementsByClassName("btn")
function buttonSound() {
    let audio = new Audio("audio/button.mp3")
    audio.play()}
for (let buttonsCount = 0; buttonsCount < getBtn.length; buttonsCount++) {
    getBtn[buttonsCount].addEventListener("click",function (){ buttonSound() })
}
function rightSound() {
    let rightAudio = new Audio("audio/righte.mp3")
    rightAudio.play()
}

