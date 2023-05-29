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

    }
}

//Declare Calculator variables
Calculator.sum;
Calculator.operatorMemory;
Calculator.equated;