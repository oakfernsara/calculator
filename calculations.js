//Basic math operator functions
const add = function(num1, num2) {
    return num1+num2
}

const subtract = function(num1, num2) {
    return num1-num2
}

const multiply = function(num1, num2) {
    return num1*num2
}

const divide = function(num1, num2) {
    return num1/num2
}

//Add variables for num1, num2, and operator
let first, second, operator;

//Function for operator
const operatorFunc = function(num1, op, num2) {
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
            return "No operator detected";
    }
}