let previousInput = '';
let currentInput = '';
let operator = '';

function append(number){
    currentInput += number;
    document.getElementById('result').value =`${previousInput} ${operator} ${currentInput}`
}



function appendop(operation){
if (currentInput === '') return;
    if (previousInput !== '') {
        calculate(); 
    }
    operator = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('result').value = `${previousInput} ${operator}`;
}


function calculate(){
    if(previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch(operator){

        case '+':
            result = prev+current;
            break;
        case '-':
            result = prev-current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if(current === 0){
                alert('Cannot divide by zero!');
                return;
            }
            result = prev/current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    document.getElementById('result').value = currentInput;
}

function clearDisplay(){
    previousInput = '';
    currentInput = '';
    operator = '';
    document.getElementById('result').value = "";
}