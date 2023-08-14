//Basic math operator functions
function add(num1, num2) {
    return num1+num2
}

function subtract(num1, num2) {
    return num1-num2
}

function multiply(num1, num2) {
    return num1*num2
}

function divide(num1, num2) {
    return num1/num2
}

function getNums(string) {
    let nums = string.match(/\s*\d+\s*/g).map(num => parseInt(num.replace(' ', '')));
    return nums
}

function getOp(string) {
    return string.match(/[^\d|\s]/)[0];
}

function equalFunc(value) {
    //separate values from nums array
    // let value = screen.value.split(" ");
    console.log('value is', value)
    let num1 = getNums(value)[0];
    let num2 = getNums(value)[1];
    let op = getOp(value);
    console.log('value', value, 'op', op, 'num1', num1, 'num2', num2);
    return operate(num1, op, num2);
}

// function separator(string) {
//     let equation = string;
//     //find multiplication
//     let my = string.match(/\d+\s\*\s\d+/);
//     //find division
//     let dear = string.match(/\d+\s\/\s\d/);
//     console.log(my)
// }

//Add variables for num1, num2, and operator
let first, second, operator;

//Function for operator
function operate(num1, op, num2) {
    switch(op) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
            return "ERR";
    }
}

//update input function
function inputUpdate(press) {
    let existing = screen.value;
    if (press.match(/\D/)) {
        press = ` ${press} `
        let eqCheck = existing.match(/\d+\s\D\s\d+/)
        if (eqCheck) {
            console.log('we have some numbers to compute', eqCheck);
            existing = equalFunc(existing)
        }
    }
    existing === '0' ? existing = press : existing += press;
    screen.value = existing;
}

//create HTML calculator
const calculator = document.createElement('div');
const screen = document.createElement('input');
const buttons = document.createElement('div');
const numbers = document.createElement('div');
const opDiv = document.createElement('div');

document.body.appendChild(calculator);
calculator.appendChild(screen);
calculator.appendChild(buttons);
buttons.appendChild(numbers);
buttons.appendChild(opDiv);

//add numbers buttons
for (let x = 1; x < 10; x++) {
    let button = document.createElement('button');
    let thisButton = numbers.appendChild(button);
    thisButton.textContent = x;
    thisButton.id = x;

    //set display populate function
    thisButton.addEventListener('click', e=> {
        console.log('numButton clicked!', e.target)
        inputUpdate(e.target.textContent)
    })
}

//add operator buttons
const opArray = ['+', '-', '*', '/'];

opArray.forEach(op => {
    let button = document.createElement('button');
    let thisButton = opDiv.appendChild(button);
    thisButton.textContent = op;
    thisButton.id = op;
    thisButton.addEventListener('click', e=> {
        inputUpdate(e.target.textContent);
    })
})

//add equals button
const equals = document.createElement('button');
equals.textContent = '=';
equals.id = '=';
buttons.appendChild(equals)
equals.addEventListener('click', e => {
    // // let value = screen.value.split(/\D/);
    // let value = screen.value.split(" ");
    // // let op = screen.value.match(/\D/)[0];
    // // let md = 
    // let num1 = parseInt(value[0]);
    // let num2 = parseInt(value[1]);
    // console.log('value', value, 'op', op, 'num1', num1, 'num2', num2);
    // screen.value = operate(num1, op, num2);
    screen.value = equalFunc(screen.value)
})

//add clear button
const clear = document.createElement('button');
clear.textContent = 'clear';
buttons.appendChild(clear);
clear.addEventListener('click', e => {
    screen.value = 0;
})
