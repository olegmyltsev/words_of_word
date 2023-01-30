const getBtn = document.getElementsByClassName("btn")
function buttonSound(treck, timeout) {
    let audio = new Audio("../audio/" + treck + ".mp3")
    audio.play()}
for (let buttonsCount = 0; buttonsCount < getBtn.length; buttonsCount++) {
    getBtn[buttonsCount].addEventListener("click",function (){ buttonSound("button") })
}
function rightSound() {
    let rightAudio = new Audio("../audio/righte.mp3")
    rightAudio.play()
}

