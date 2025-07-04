let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

let laptop = document.querySelector("#game-status-laptop");
let phone = document.querySelector("#game-status-phone");

let clickSound = new Audio("click.mp3");
let loseCount = 0; 
let memeSoundFiles = [
    "lose 1.mp3",
    "lose 2.mp3",
    "lose 3.mp3",
    "lose 4.mp3",
    "lose 5.mp3",
    "lose 6.mp3",
    "lose 7.mp3",
    "lose 8.mp3",
];

let currentLoseAudio = null;  


// "Keypress" will help while playing on Laptop
document.addEventListener("keypress", function(){
    if (started == false) {
        // console.log("game is started");
        started = true;
        levelUp();
    }
});

// "touchstart will help while playing on phone
document.addEventListener("touchstart", function(){
    if (started == false) {
        // console.log("game is started");
        started = true;
        levelUp();
    }
});


function gameFlash(btn){

    
    setTimeout(() => {
        btn.classList.add("flash");
    }, 250);

    setTimeout(function () {
      btn.classList.remove("flash");     
    }, 500);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
      btn.classList.remove("userflash");     
    }, 100);
}

function levelUp() {

    userSeq = [];
    level++;

    laptop.innerText = `Level ${level}`;
    phone.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4);
    // console.log(randIdx);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    // console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }  
    } else {
        hiScore();
        document.getElementById("game-status-laptop").innerHTML = 
            `Game over! Your score was <b> ${level}</b> <br> Press any key to start.`;

        document.getElementById("game-status-phone").innerHTML = 
            `Game over! You scored <b>${level}</b> <br> Tap anywhere to restart.`;

        // Determine sound index: wrap around if past the last sound
        let soundIndex = Math.floor(loseCount / 2) % memeSoundFiles.length;

        // Stop any current playing audio
        if (currentLoseAudio) {
            currentLoseAudio.pause();
            currentLoseAudio.currentTime = 0;
        }

        // Play the correct meme sound
        currentLoseAudio = new Audio(memeSoundFiles[soundIndex]);
        currentLoseAudio.play();

        loseCount++;  // Increment lose count

        reset();
        wrong();
    }

} 


function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    // Create new Audio instance so it plays each time cleanly
    new Audio("click.mp3").play();


    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let body = document.querySelector("body");

function wrong(){
    body.classList.add("wrong");
    setTimeout(function () {
      body.classList.remove("wrong");     
    }, 250);
}

let highScore = 0;

function hiScore(){
    if(level > highScore){
        highScore = level;
    }
        h3.innerText = `Highest Score: ${highScore}`;
}



document.getElementById("night-toggle").addEventListener("change", function() {
    let body = document.querySelector("body");

    if (this.checked) {
        body.classList.add("night-mode");
    } else {
        body.classList.remove("night-mode");
    }

});
