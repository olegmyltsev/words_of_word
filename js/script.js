const getInputBox = document.getElementById("input_box");
const getInputBtn = document.getElementById("input_btn");
const getWords = document.getElementById("words");
const getWordBtn = document.getElementsByClassName("word__btn");
const getUnsolvedWords = document.getElementsByClassName("unsolved_word");

const words = ["аи", "ар", "ва", "аир", "акр", "арк", "ваи", "вар", "вок", "вор", "ива", "инь", "ион", "кар", "кир", "кон", "кор", "кри", "нар", "нок", "рак", "ров", "рок", "акон", "вика", "вина", "вино", "воин", "вона", "вонь", "икра", "инок", "кино", "конь", "кора", "корн", "корь", "кран", "кров", "навь", "наир", "нива", "новь", "нора", "нори", "нрав", "овин", "окиа", "оник", "рани", "рань", "ринк", "авьор", "акори", "варок", "икона", "инвар", "киноа", "коран", "кровь", "крона", "норка", "оркан", "рвань",];

const helps = ["Сорт шампанского", "Еденица площади", "Народность в Китае", "Лекарственное растение", "Англиийская еденица площади", "Крепость", "Народ в Западной Африке", "Вареная смола", "Круглая китайская сковорода", "Человек, занимающийся воровством", "Гибкое дерево", "Понятие китайской философии", "Электрически заряженная частица", "Чашеобразное углубление в верхней части гор ", "Земля, пропитанная нефтью", "Одна партия какой-либо игры", "Вид корсета", "Народность в Канаде", "Гибрид верблюдов", "Конец реи на корабле", "Водяное членистоногое", "Длинная глубокая канава", "Судьба", "Барка для подвоза груза на суда", "Бобовое кормовое растение", "Преступление", "Алкогольный напиток из винограда", "Боец", "Корейская денежная еденица", "Неприятный запах", "Рыбьи яйца", "Монах", "Вид исскуства", "Самец лошади", "Затвердевший слой чего-либо", "Небольшой круглый слиток", "Вирусное заболевание", "Утройство для выпуска жидкости", "Крыша", "Живой мертвец", "Призрак", "Обработанное поле", "Что-то новое", "Жилище животных под землёй", "Вид вдорослей", "Характер", "Строение для сушки снопов", "Счетная монета в Марокко", "Современная монета в Турции", "Жена раджи в Индии", "Раннее утреннее время", "Площадка для катания на коньках", "Животное отряда ластоногих", "Синий коралл из Африки", "Загон для скота", "Живописное изображение святых", "Сплав железа с никелем", "Просообразное растение в Перу", "Священная книга мусульман", "Жидкость, циркулирующая в организме", "Денежная еденица", "Хищный пушной зверек", "Название тропического циклона", "Что-либо рваное",];

let hiddenLetters = [];
let inputBox = null;
let countWords = 0
let savedWords;

function hideLetters() {
    for (let index = 0; index < words.length; index++) {
        hiddenLetters[index] = "_".repeat(words[index].length);
    }
}
hideLetters()

let test = document.cookie.split("=")
if (test[0] == "") {
    document.cookie = "words=" + hiddenLetters + ";expires=Tue, 19 Jan 2038 03:14:07 GMT"
}

function saveWords() {
    savedWords = document.cookie
    savedWords = savedWords.split("=")
    savedWords = savedWords[1].split(";")
    savedWords = savedWords[0].split(",")
}
saveWords()

function wordsArray() {
    for (let index = 0; index < hiddenLetters.length; index++) {
        if (countWords == 0) {
            getWords.innerHTML += "<div class='unsolved_word' onclick='help(this)' id='" + index + "'> " + hiddenLetters[index] + "</div>";
        }
        else {
            getUnsolvedWords[index].innerHTML = hiddenLetters[index];
        }
    };
    countWords++
};
wordsArray();

function getLetter(letter, getName) {
    getName.disabled = true;
    if (inputBox == null) {
        inputBox = letter
    }
    else { inputBox += letter }
    getInputBox.innerHTML = inputBox
};

function clearInput() {
    inputBox = null;
    getInputBox.innerHTML = inputBox
    for (let count = 0; count < getWordBtn.length; count++) {
        getWordBtn[count].disabled = false
    }
}
hiddenLetters = savedWords
function check() {
    for (let index = 0; index < words.length; index++) {
        if (inputBox == words[index] && hiddenLetters[index] !== words[index]) {
            hiddenLetters[index] = words[index]
            clearInput();
            document.cookie = "words=" + hiddenLetters;
            wordsArray();
        }
    }
}
setInterval(function () { check() }, 1000);


function help(getThis) {
    let helpId = getThis.getAttribute("id");
    let childrenCheck = getThis.children.length;
    if (childrenCheck == 0) {
        getThis.innerHTML += "<span>" + helps[helpId] + "</span>";
    }
    else {
        getThis.innerHTML = hiddenLetters[helpId]
    }
}
wordsArray();










