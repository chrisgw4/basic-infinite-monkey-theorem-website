const inpField = document.querySelector(".container .input-field");
const monkeyText = document.querySelector(".monkey-text");
const startBtn = document.querySelector(".start-search");
const container = document.querySelector(".container");
const text = document.querySelector(".text p");
const textBox = document.getElementById("text-box");

const letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a",
    "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"
];

var allLetters = ""

var stopped = true;

var searchWord = "";

var running = false;

var characterIndex = 0;

var builtWord = ""

// keeps track of the letters that are correct
var charactersCorrect = []


var characters = []

// array of Character Indexes of the characters that are correct, so if the word if incorrect it assign an incorrect class tag
var charIndexArray = []

// each time it gets a letter correct it will increment to check if the next letter is correct
var letterStreak = 0;

// initializes the theorem
function initTheorem() {
    monkeyText.innerHTML = "";

    startBtn.addEventListener("click", () => {
        startTheorem();
    })

    // adds an event listener to check for keypresses
    inpField.addEventListener('keypress', (e) => {
        // if the keypress isnt enter then it quits
        if (e.key !== 'Enter') {
            return;
        }
        startTheorem();
    })
}

// checks to make sure the word doesnt contain illegal characters
function checkWordValid(word) {
    if (word === "") {
        return false;
    }
    // using a real for loop because it is able to sync
    for (char of word.split("")) {
        // if the char is not in letters it will return false
        // checks each letter to see if they are in the letters

        if (letters.includes(char)) {
            return true;
        }

    }
    return false;

}



function nextLetter() {
    let ranIndex = parseInt(Math.random() * letters.length);
    return letters[ranIndex];
}

function addLetter() {
    let letter = nextLetter();
    let spanTag = `<span>${letter}</span>`;

    // adds a tag to text to add each character individually so it can add class tags such as correct/incorrect
    text.innerHTML += spanTag;

    //monkeyText.innerHTML += spanTag;
    //monkeyText.textContent += letter;



    checkIfWordFound(letter);
}

function checkIfWordFound(letter) {
    allLetters += letter;
    //characters = text.querySelectorAll("span");
    characters.push(text.lastElementChild);

    let stopAdd = false;
    //console.log(characters[0]);



    // checks variable with all the letters that have been added
    // checks by picking out the latest characters the length of the search word
    if (characters[characterIndex].innerText === searchWord.substring(letterStreak, letterStreak + 1)) {
        characters[characterIndex].classList.add("correct");
        letterStreak++;
        builtWord += characters[characterIndex].innerText;
        charIndexArray.push(characterIndex)
    } else {

        builtWord = ""

        if (letterStreak > 0) {
            //let chars = text.querySelectorAll("span");
            let chars = text.getElementsByClassName("correct")

            for (num of chars) {
                if (num.classList.contains("correct")) {
                    num.classList.remove("correct");
                    num.classList.add("incorrect");
                }
            }
        }
        characters = []
        characterIndex = 0
        letterStreak = 0;
        charIndexArray = []
        stopAdd = true

    }
    //console.log(builtWord)
    if (builtWord === searchWord) {
        stopped = true;

        // adds a label to the html container and shows Monkey found word
        const foundLabel = document.createElement("h2");
        foundLabel.setAttribute("id", "found-label");
        foundLabel.innerText = "Monkey found " + searchWord
        container.appendChild(foundLabel);

        document.getElementById("stop-theorem").remove()
        makeRestartButton()

    }
    if (!stopAdd)
        characterIndex++;
    textBox.scrollTop = textBox.scrollHeight
}


function makeStopButton() {
    const stopBtn = document.createElement("button");
    stopBtn.innerHTML = "Stop";
    stopBtn.setAttribute("id", "stop-theorem");
    stopBtn.setAttribute("type", "button");
    // sets stopped to true to stop it from running
    stopBtn.addEventListener('click', () => {
        stopped = true;
        stopBtn.remove();
        makeResumeButton();
        makeRestartButton();
    })



    container.appendChild(stopBtn)

}



function makeResumeButton() {
    // makes a resume button
    const resumeBtn = document.createElement('button');
    resumeBtn.innerHTML = "Resume";
    resumeBtn.setAttribute("id", "resume-theorem");
    resumeBtn.setAttribute("type", "button");
    resumeBtn.addEventListener("click", () => {
        stopped = false;
        resumeBtn.remove();
        document.getElementById("restart-theorem").remove()
        makeStopButton();

    })
    container.appendChild(resumeBtn);


}

function makeRestartButton() {
    // makes a restart button
    const restartBtn = document.createElement("button")
    restartBtn.innerText = "Reset"
    restartBtn.setAttribute("id", "restart-theorem")
    restartBtn.setAttribute("type", "restartBtn")
    restartBtn.addEventListener("click", () => {
        window.location.reload()
    })
    container.appendChild(restartBtn)
}

function startTheorem() {


    searchWord = document.getElementById('word-input').value;
    searchWord = searchWord.toLowerCase();

    if (checkWordValid(searchWord) === false) {
        alert("Please Only Use Letters");
        return;
    }

    if (running) { return }



    makeStopButton();

    startBtn.remove();



    stopped = false;
    running = true;

    // sets the function to run every interval (set to 0 now, so as often as possible)
    runTheorem = setInterval(function() {

        if (!stopped) {

            addLetter(searchWord)

        } else {
            return
        }
        //monkeyText.scrollTop = monkeyText.scrollHeight;

        // var ta = document.getElementById('.monkey-text');
        // ta.scrollTop = ta.scrollHeight;
    }, 0)

}

initTheorem();