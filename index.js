//your code here

class Calculator {
    static reset(){
        Calculator.sum = undefined;
        Calculator.operatorMemory = undefined;
        Calculator.equated = undefined;
    }
    static add(a,b) {
        return a + b;
    }
    static subtract(a,b) {
        return a - b;
    }
    static multiply(a,b) {
        return a * b;
    }
    static divide(a,b) {
        return a / b;
    }

    static operate(input, operator) {
        //debugger

        if (Calculator.operatorMemory === undefined) {
            Calculator.operatorMemory = operator;
        }

        if (Calculator.sum === undefined) {
            Calculator.sum = input;
        }

        // Addresses User Continuing Calculation after equating, ie for input 2+5=(7)*2= can return 14
        else if (Calculator.equated && Number.isNaN(input)) {
            Calculator.equated = false;
        }

        // Addresses User Switching Operator in Between Calculation, ie for input 2+*5 will return 2*5.
        else if (Number.isNaN(input) && Calculator.sum != undefined) {
            Calculator.operatorMemory = operator;
            return;
        }

        else {
            //Run Calculation
            Calculator.sum = Calculator[Calculator.operatorMemory](Calculator.sum, input);

            //Check if operator is not equal
            if (!operator === 'equate') {
                //Update operator memory to newly selected operator for next calculation
                Calculator.operatorMemory = operator;
                Calculator.equated = false;
            } else {
                //Reset operator memory
                Calculator.operatorMemory = undefined;
                Calculator.equated = true;
            }
        }

        return (Calculator.sum);
    }
}

//Declare Calculator variables
Calculator.sum;
Calculator.operatorMemory;
Calculator.equated;

class Event {
    static captureInput() {
        Event.inputSource.addEventListener('click', (e) => {
            //Check if user clicked on a number and then capture that number as a string
            if (e.target.className === 'numpad') {
                //Check if last input was equals. If so, reset calculator for fresh calculation
                if (Event.inputMemory === 'equate'){
                    Event.reset();
                    Calculator.reset();
                    UIEvent.display(0);
                }
                //Prevent multiple decimal points
                //Check if input is a decimal
                if(/\./.test(e.target.textContent)) {
                    // Check if Event.input already has a Decimal to Avoid Multiple Decimal Points
                    if (!(/\./.test(e.target.textContent))) {
                        // Check if user input is within UI Display Limit
                        if (Event.inputString.length < UI.displayLimit){
                            Event.inputString += e.target.textContent;
                        }
                    }

                } else /*If input is a number, it skips the decimal logic */ {
                    // Check if user input is within UI limit
                    if (Event.inputString.length < UI.displayLimit){
                        Event.inputString += e.target.textContent;
                    }
                }

                //Display input on UI
                UI.display(Event.inputString);

                //Since clicked event is numpad, sets input memory as numpad
                Event.inputMemory = 'number';
            } 

            //Check if User clicked on an operator and run operation
            else if (e.target.className === 'key-op' || e.target.className === 'key-eq') {
                //Prevent same operator from being clicked multiple times
                if (!(Event.inputMemory === e.target.dataset.action)) {
                    Event.selectedOperator = e.target.dataset.action;

                    //convert input string to floating point number, run calculation, and display in UI
                    console.log(Event.inputString, Event.selectedOperator);
                    UI.display(Calculator.operate(parseFloat(Event.inputString), Event.selectedOperator));

                    //Clear input string
                    Event.inputString = '';

                    //Save clicked operator to memory
                    EventCounts.inputMemory = e.target.dataset.action;
                }
            }

            //if user clicked on clear reset calculator 
            else if (e.target.dataset.action === 'clear') {
                Event.reset();
                Calculator.reset();
                UI.display(0);
            }
        });
    }
    static reset() {
        Event.inputString = '';
        Event.selectedOperator = undefined;
        Event.inputMemory = '';
    }

    static init() {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Dom loaded');
            Event.captureInput();
        })
    }
}

//Declare event variables
Event.inputSource = document.querySelector('.calc-key');
Event.inputString = '';
Event.selectedOperator;
Event.inputMemory = '';


class UI {
    static display(value) {
        if (typeof(value) === 'string') {
            //Limit string to display limit of calculator
            UI.displayBar.textContent = value.substring(0, UI.displayLimit);
        } else if (typeof(value) === 'number') {
            //Check if computed number is within display limit
            if (value < ((Math.pow(10, UI.displayLimit))-1)) {
                // Compute Trailing Decimals That can be shown without UI Overflow
                UI.displayableDecimalTrail = (UI.displayLimit) - (value.toString().split('.')[0].length);
                //Limit trailing decimals digits
                if (value % 1 != 0) {
                    UI.displayBar.textContent = parseFloat(value.toFixed(UI.displayableDecimalTrail)); // parseFloat used to remove insignificant trailing zeros
                } else {
                    UI.displayBar.textContent = value;
                }
            } else {
                // if number is more than UI display limit, show error 'E'
                UI.displayBar.textContent = 'E';
            }
        }
    }
}

//Declare UI variables
UI.displayBar = document.querySelector('.calc-display');
UI.displayLimit = 12;
UI.displayableDecimalTrail;


// Listen for input
Event.init();