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
    let nums = string.match(/\s*\d+\.*\d*\s*/g);
    console.log('nums is', nums)
    let final = nums.map(num => parseFloat(num.replace(' ', '')));
    console.log('final is', final)
    return final
}

function getOp(string) {
    return string.match(/[+\-\*\/]/)[0];
}

function equalFunc(value) {
    console.log('value is', value)
    let num1 = getNums(value)[0];
    let num2 = getNums(value)[1];
    let op = getOp(value);
    console.log('value', value, 'op', op, 'num1', num1, 'num2', num2);
    return num1 && num2 && op ? parseFloat(operate(num1, op, num2).toFixed(2)) : 'ERR';
}

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
    if (press.match(/[+\-\*\/]/)) {
        press = ` ${press} `
        let eqCheck = existing.match(/\d+\s[+\-\*\/]\s\d+/)
        if (eqCheck) {
            console.log('we have some numbers to compute', eqCheck);
            existing = equalFunc(existing)
        }
    } else if (press === '\u2190') {
        
        let minusLength = existing.length-1;
        let newString = existing.substr(0, minusLength);
        console.log('newString is', newString, minusLength, existing.length)
        existing = newString;
        press = '';
    }
    existing === '0' ? existing = press : existing += press;
    screen.value = existing;
}

function keyPress(key) {
    console.log('key is', key)
    if (document.getElementById(key)) {
        document.getElementById(key).click()
    } else if (key === 'enter') {
        equals.click();
    } else if (key === 'escape') {
        clear.click();
    }
    
}

document.addEventListener('keydown', e => {
    keyPress(e.key.toLowerCase())
})

//create HTML calculator
const calculator = document.createElement('div');
const screen = document.createElement('input');
const buttons = document.createElement('div');
const numbers = document.createElement('div');
const opDiv = document.createElement('div');

document.body.appendChild(calculator);
calculator.setAttribute('class', 'calc');
calculator.appendChild(screen); 
screen.disabled = true;
calculator.appendChild(buttons);
buttons.setAttribute('class', 'buttons');
buttons.appendChild(numbers);
numbers.setAttribute('class', 'numbers')
buttons.appendChild(opDiv);
opDiv.setAttribute('class', 'op-div')

//add numbers buttons
for (let x = 9; x >= 0; x--) {
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

//add decimal button
let decButton = document.createElement('button');
numbers.appendChild(decButton);
decButton.textContent = '.';
decButton.addEventListener('click', e => {
    //check last number for a decimal
    let nums = getNums(screen.value);
    console.log('nums is', nums)
    let last = nums.length-1;
    let decMatch = nums[last].toString().match(/\./);
    if (!decMatch) {
        inputUpdate('.')
    }
})

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

//add backspace button
let backspace = document.createElement('button');
backspace.textContent = '\u2190'
opDiv.appendChild(backspace)
backspace.setAttribute('id', 'backspace')
backspace.addEventListener('click', e => {
    inputUpdate(e.target.textContent)
})

//add equals button
const equals = document.createElement('button');
equals.textContent = '=';
equals.id = 'equals';
opDiv.appendChild(equals)
equals.addEventListener('click', e => {
    screen.value = equalFunc(screen.value)
})

//add clear button
const clear = document.createElement('button');
clear.textContent = 'C';
numbers.appendChild(clear);
clear.setAttribute('id', 'clear');
clear.addEventListener('click', e => {
    screen.value = 0;
})
