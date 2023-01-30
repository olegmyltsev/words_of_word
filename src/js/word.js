// получение элементов из html документа
const getInputField = document.getElementById("inputField");
const getWords = document.getElementById("words");
const getInputLetter = document.getElementsByClassName("btn_input-letter");
const getWordsContent = document.getElementsByClassName("words__content");
const getHelp = document.getElementById("help")
const getHelpContent = document.getElementById("helpContent")
const getMiss = document.getElementById("miss")
const getMissContent = document.getElementById("missContent")

const word = "киноварь"

// Массивы слов и подсказок
const words = ["аи", "ар", "ва", "ор", "аир", "акр", "арк", "ваи", "вар", "вок", "вор", "ива", "инь", "ион",
    "кар", "кир", "кои", "кон", "кор", "кри", "нар", "нок", "рак", "ров", "рок", "акон", "вика", "вина", "вино", "воин", "вона", "вонь", "икра", "инок", "кино", "конь", "кора", "корн", "корь", "кран", "кров", "навь", "наир", "нива", "новь", "нора", "нори", "нрав", "овин", "окиа", "оник", "рани", "рань", "ринк", "авьор", "акори", "варок", "икона", "инвар", "киноа", "коран", "кровь", "крона", "норка", "оркан", "рвань",];
const helps = ["Сорт шампанского", "Еденица площади", "Народность в Китае", "Громкий крик",
    "Лекарственное растение", "Англиийская еденица площади", "Крепость", "Народ в Западной Африке", "Вареная смола", "Круглая китайская сковорода", "Человек, занимающийся воровством", "Гибкое дерево", "Понятие китайской философии", "Электрически заряженная частица", "Чашеобразное углубление в верхней части гор ", "Земля, пропитанная нефтью", "Вид карпа","Одна партия какой-либо игры", "Вид корсета", "Народность в Канаде", "Гибрид верблюдов", "Конец реи на корабле", "Водяное членистоногое", "Длинная глубокая канава", "Судьба", "Барка для подвоза груза на суда", "Бобовое кормовое растение", "Преступление", "Алкогольный напиток из винограда", "Боец", "Корейская денежная еденица", "Неприятный запах", "Рыбьи яйца", "Монах", "Вид исскуства", "Самец лошади", "Затвердевший слой чего-либо", "Небольшой круглый слиток", "Вирусное заболевание", "Утройство для выпуска жидкости", "Крыша", "Живой мертвец", "Призрак", "Обработанное поле", "Что-то новое", "Жилище животных под землёй", "Вид вдорослей", "Характер", "Строение для сушки снопов", "Счетная монета в Марокко", "Современная монета в Турции", "Жена раджи в Индии", "Раннее утреннее время", "Площадка для катания на коньках", "Животное отряда ластоногих", "Синий коралл из Африки", "Загон для скота", "Живописное изображение святых", "Сплав железа с никелем", "Просообразное растение в Перу", "Священная книга мусульман", "Жидкость, циркулирующая в организме", "Денежная еденица", "Хищный пушной зверек", "Название тропического циклона", "Что-либо рваное",];

// Нужные переменные
let hiddenLetters = [];
let inputBox = "";
let countWords = 0
let getSavedWords = localStorage.savedWords;


// Сокрытие букв в словах
function hideLetters() {
    if (localStorage.getItem("savedWords") == null) {
        for (let index = 0; index < words.length; index++) {
            hiddenLetters[index] = "_".repeat(words[index].length);
        }
        localStorage.savedWords = hiddenLetters
    }
    else {
        hiddenLetters = localStorage.savedWords.split(",")
    }
}
hideLetters()

// Добавление слов и подсказок из массива
function wordsArray() {
    for (let index = 0; index < hiddenLetters.length; index++) {
        if (countWords == 0) {
            getWords.innerHTML += "<div class='words__content' onclick='startHelp(this)' id='" + index + "'> " + hiddenLetters[index] + "</div>";
        }
        else {
            getWordsContent[index].innerHTML = hiddenLetters[index];
        }
    };
    countWords = 1
};
wordsArray();

// Проверка совпадения слов
function checkSame() {
    for (let index = 0; index < words.length; index++) {
        if (inputBox == words[index] && hiddenLetters[index] !== words[index]) {
            hiddenLetters[index] = words[index]
            localStorage.savedWords = hiddenLetters
            inputDeleteAll()
            wordsArray();
            rightSound()
        }
        if (inputBox == words[index] && hiddenLetters[index] == words[index]) {
            getMiss.classList.add("miss_active")
            setTimeout(function(){getMissContent.classList.add("miss_animate")},1)
            setTimeout(function(){
                getMiss.classList.remove("miss_active")
                getMissContent.classList.remove("miss_animate")
            },2010)
            
        }
    }
}

//Вызов подсказки
function startHelp(getWord) {
    let helpId = getWord.getAttribute("id");

    if (getHelp.classList.contains("help_remove") == true) {
        getHelpContent.innerHTML = helps[helpId]
        getHelp.classList.remove("help_remove");
    }
    getHelpContent.innerHTML = helps[helpId]
}

//Удаление подсказки
function removeHelp() {
    getHelp.classList.add("help_remove");
    document.getElementById("helpContent").innerHTML = ""
}

//Очистка введеных букв
function inputDeleteAll() {
    inputBox = "";
    getInputField.innerHTML = inputBox
    for (let count = 0; count < getInputLetter.length; count++) {
        getInputLetter[count].disabled = false
    }
}

//Удаление последней введенной буквы
function inputDeleteLast() {
    inputBox = inputBox.split("")
    let letterDisable = inputBox.pop()
    for (let letterCount = 0; letterCount < getInputLetter.length; letterCount++) {
        if (getInputLetter[letterCount].innerHTML == letterDisable) {
            getInputLetter[letterCount].disabled = false;
        }
    }
    inputBox = inputBox.join("")
    getInputField.innerHTML = inputBox
}
// Получение буквы с клавиатуры
addEventListener("keydown", function (event) {
    let keyText = event.key

    for (let checkLetter = 0; checkLetter < getInputLetter.length; checkLetter++) {
        if (keyText == getInputLetter[checkLetter].innerHTML && getInputLetter[checkLetter].disabled == false) {
            letterProcessing(getInputLetter[checkLetter])
            getInputLetter[checkLetter]
        }
    }

    if (keyText == "Backspace") {
        inputDeleteLast()
        document.getElementById("btnDeleteLast").classList.add("btn_delete-last-active")
    }
})
addEventListener("keyup", function (event) {
    if (event.key == "Backspace") {
        document.getElementById("btnDeleteLast").classList.remove("btn_delete-last-active")
    }
})
//Обработка буквы
let startCheck = setTimeout(function () { checkSame() }, 1)
function letterProcessing(getletter) {
    clearTimeout(startCheck)
    getletter.disabled = true;
    inputBox += getletter.innerHTML
    getInputField.innerHTML = inputBox
    startCheck = setTimeout(function () { checkSame() }, 1000)
};





