const inpField = document.querySelector(".container .input-field");
const monkeyText = document.querySelector(".monkey-text");
const startBtn = document.querySelector(".start-search");
const container = document.querySelector(".container");

const letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a",
    "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"
];

var allLetters = ""

var stopped = true;

var searchWord = "";

var running = false;

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
    let ranIndex = parseInt(Math.random() * letters.length - 1);
    return letters[ranIndex];
}

function addLetter() {
    let letter = nextLetter();
    monkeyText.textContent += letter;
    checkIfWordFound(letter);
}

function checkIfWordFound(letter) {
    allLetters += letter;

    // checks variable with all the letters that have been added
    // checks by picking out the latest characters the length of the search word
    console.log(allLetters);

    if (allLetters.substring(allLetters.length - searchWord.length) === searchWord) {
        stopped = true;

        // adds a label to the html container and shows Monkey found word
        const foundLabel = document.createElement("h2");
        foundLabel.setAttribute("id", "found-label");
        foundLabel.innerText = "Monkey found " + searchWord
        container.appendChild(foundLabel);

        document.getElementById("stop-theorem").remove()
        makeRestartButton()

    }
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
        monkeyText.scrollTop = monkeyText.scrollHeight;
        // var ta = document.getElementById('.monkey-text');
        // ta.scrollTop = ta.scrollHeight;
    }, 0)

}

initTheorem();