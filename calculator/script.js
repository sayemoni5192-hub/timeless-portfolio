let display = document.querySelector(".display h1");
let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".clear");
let plusMinusButton = document.querySelectorAll(".function")[1];
let percentButton = document.querySelectorAll(".function")[2];

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let waitingForSecondNumber = false;

// Number buttons
for (let button of numberButtons) {
    button.addEventListener("click", function () {

        let value = button.textContent;

        if (
            value === "." &&
            !waitingForSecondNumber &&
            display.textContent.includes(".")
        ) {
            return;
        }

        if (waitingForSecondNumber) {
            display.textContent = value === "." ? "0." : value;
            waitingForSecondNumber = false;
        } else {
            if (display.textContent === "0" && value !== ".") {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }

    });
}

// AC
clearButton.addEventListener("click", function () {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    waitingForSecondNumber = false;
});

// +/-
plusMinusButton.addEventListener("click", function () {

    if (display.textContent !== "0") {
        display.textContent = String(-Number(display.textContent));
    }

});

// %
percentButton.addEventListener("click", function () {

    display.textContent = String(Number(display.textContent) / 100);

});

// Operators
for (let button of operatorButtons) {

    button.addEventListener("click", function () {

        let value = button.textContent;

        if (value === "=") {

            if (currentOperator === "") return;

            secondNumber = Number(display.textContent);

            let result;

            switch (currentOperator) {

                case "+":
                    result = Number(firstNumber) + secondNumber;
                    break;

                case "-":
                    result = Number(firstNumber) - secondNumber;
                    break;

                case "×":
                    result = Number(firstNumber) * secondNumber;
                    break;

                case "÷":
                    if (secondNumber === 0) {
                        display.textContent = "Error";
                        currentOperator = "";
                        return;
                    }
                    result = Number(firstNumber) / secondNumber;
                    break;
            }

            display.textContent = result;
            firstNumber = result;
            currentOperator = "";
        }

        else {

            firstNumber = display.textContent;
            currentOperator = value;
            waitingForSecondNumber = true;

        }

    });

}
let deleteButton = document.querySelector(".delete");

deleteButton.addEventListener("click", function () {
    display.textContent = display.textContent.slice(0, -1);

    if (display.textContent === "") {
        display.textContent = "0";
    }
});