function random(number) {
    return Math.floor(Math.random() * number);
}

var activeList = [];

for(let i=1 ; i<= 190 ; i++) {
    activeList[i-1] = i;
}

/*let colors = [
    "rgb(196, 30, 58)",
    "rgb(226, 135, 30)",
    "rgb(222, 204, 68)",
    "rgb(79, 170, 53)",
    "rgb(62, 113, 185)",
    "rgb(40, 28, 124)",
    "rgb(141, 34, 212)",
    "rgb(212, 34, 194)",
    "rgb(255, 255, 255)",
    "rgb(126, 126, 126)",
    "rgb(0, 0, 0)",
];*/

var mode = 'pen';

/*function bgChange(oldColor) {
    let index = colors.indexOf(oldColor);

    const rndCol = colors[(index+1)%10];
    return rndCol;
}*/

var currBg = 0;
function nextBg() {
    currBg++;
    return "url(movies/" + activeList[(currBg-1)%(activeList.length)] + ".jpg)"
}

const header = document.getElementById("header");
const footer = document.getElementById("footer");

function hoverMouse(event) {
    if(mode == 'pen') {
        //event.target.style.backgroundColor = bgChange(event.target.style.backgroundColor);
        event.target.style.backgroundImage = nextBg();
    } else if (mode == 'erase') {
        event.target.style.backgroundImage = null;
        header.style.backgroundImage = null;
        footer.style.backgroundImage = null;
        event.target.style.backgroundColor = white;
    } else if (mode == 'inspect') {
        document.body.style.backgroundImage = event.target.style.backgroundImage;
        header.style.backgroundImage = event.target.style.backgroundImage;
        footer.style.backgroundImage = event.target.style.backgroundImage;
    }
}

const container = document.querySelector("#container");
//container.style.gridTemplateColumns = "repeat(" + TILE_NUM + ", 4vh)"
for (let i = 0; i < 190; i++) {
    const d = document.createElement("div")
    d.classList.add("tile")
    d.style.backgroundColor = colors[8];
    d.addEventListener("mouseover", (event) => hoverMouse(event));
    container.appendChild(d)
}

const pen = document.getElementById("penbutton");
const erase = document.getElementById("erasebutton");
const inspect = document.getElementById("inspectbutton");

function activateButton(event) {
    const currentButton = document.querySelector(".activebutton");
    currentButton.classList.remove('activebutton');
    event.target.classList.add('activebutton');
    mode = event.target.id;
    mode = mode.slice(0,mode.length-6);
}

pen.addEventListener("click", (event) => activateButton(event));
erase.addEventListener("click", (event) => activateButton(event));
inspect.addEventListener("click", (event) => activateButton(event));

const pattern = document.getElementById("patternbutton");
const randomButton = document.getElementById("randombutton");
const clearbutton = document.getElementById("clearbutton");

function patternSimple() {
    let index = 0;
    for(const node of container.childNodes) {
        node.style.backgroundImage = "url(movies/" + activeList[(index)%(activeList.length)] + ".jpg)" 
        index++;
    }
}

// I got this function from the internet. 
function shuffleIntegerRange(max) {
    const numbers = [];
    for (let i = 1; i <= max; i++) {
      numbers.push(i);
    }
  
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; 
    }
  
    return numbers;
}

function patternRandom() {
    let index = 0;
    let numbers = shuffleIntegerRange(190);
    for(const node of container.childNodes) {
        node.style.backgroundImage = "url(movies/" + activeList[(numbers[index])%(activeList.length)] + ".jpg)" 
        index++;
    }
}

function clearButton() {
    document.body.style.backgroundImage = null;
    header.style.backgroundImage = null;
    footer.style.backgroundImage = null;
    for(const node of container.childNodes) {
        node.style.backgroundImage = null;
    }
}

pattern.addEventListener("click", patternSimple);
randomButton.addEventListener("click", patternRandom);
clearbutton.addEventListener("click", clearButton);

const redButton = document.getElementById("red");
const orangeButton = document.getElementById("orange");
const yellowButton = document.getElementById("yellow");
const greenButton = document.getElementById("green");
const blueButton = document.getElementById("blue");
const purpleButton = document.getElementById("purple");
const pinkButton = document.getElementById("pink");
const whiteButton = document.getElementById("white");
const blackButton = document.getElementById("black");

function refreshActiveList() {
    activeList = [];
    let activeColors = document.querySelectorAll(".activecolorbutton")
    if(activeColors.length == 0) {
        for(let i=1 ; i<= 190 ; i++) {
            activeList[i-1] = i;
        }
    }
    for(let activeColor of activeColors) {
        console.debug(activeColor.id);
        switch(activeColor.id) {
            case "red":
                for(let i=188 ; i<=190 ; i++) {
                    activeList.push(i);
                }
                for(let i=1 ; i<=23 ; i++) {
                    activeList.push(i);
                }
                break;
            case "orange":
                for(let i=24 ; i<=45 ; i++) {
                    activeList.push(i);
                }
                break;
            case "yellow":
                for(let i=46 ; i<=77 ; i++) {
                    activeList.push(i);
                }
                break;
            case "green":
                for(let i=78 ; i<=101 ; i++) {
                    activeList.push(i);
                }
                break;
            case "blue":
                for(let i=102 ; i<=126 ; i++) {
                    activeList.push(i);
                }
                break;
            case "purple":
                for(let i=127 ; i<=140 ; i++) {
                    activeList.push(i);
                }
                break;
            case "pink":
                for(let i=141 ; i<=159 ; i++) {
                    activeList.push(i);
                }
                break;
            case "white":
                for(let i=172 ; i<=181 ; i++) {
                    activeList.push(i);
                }
                break;
            case "black":
                for(let i=160 ; i<=171 ; i++) {
                    activeList.push(i);
                }
                for(let i=182 ; i<=187 ; i++) {
                    activeList.push(i);
                }
                break;
        }
    }
}

function activateColorButton(event) {
    if(event.target.classList.contains('activecolorbutton'))
    {
        event.target.classList.remove('activecolorbutton');   
        refreshActiveList();
        return;
    }
    event.target.classList.add('activecolorbutton');
    
    refreshActiveList();
}

redButton.addEventListener("click", (event) => activateColorButton(event));
orangeButton.addEventListener("click", (event) => activateColorButton(event));
yellowButton.addEventListener("click", (event) => activateColorButton(event));
greenButton.addEventListener("click", (event) => activateColorButton(event));
blueButton.addEventListener("click", (event) => activateColorButton(event));
purpleButton.addEventListener("click", (event) => activateColorButton(event));
pinkButton.addEventListener("click", (event) => activateColorButton(event));
whiteButton.addEventListener("click", (event) => activateColorButton(event));
blackButton.addEventListener("click", (event) => activateColorButton(event));

