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