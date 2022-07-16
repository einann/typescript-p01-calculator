import * as calcFuncs from "./calcs.js";

interface CalculatorItems {
    value: string | number;
    type: string;
}

const objArray: CalculatorItems[] = [
    { value: "%", type: "operation" },
    { value: "CE", type: "change",},
    { value: "C", type: "change" },
    { value: "/", type: "operation" },
    { value: 7, type: "number" },
    { value: 8, type: "number" },
    { value: 9, type: "number" },
    { value: "*", type: "operation" },
    { value: 4, type: "number" },
    { value: 5, type: "number" },
    { value: 6, type: "number" },
    { value: "-", type: "operation" },
    { value: 1, type: "number" },
    { value: 2, type: "number" },
    { value: 3, type: "number" },
    { value: "+", type: "operation" },
    { value: "+/-", type: "change" },
    { value: 0, type: "number" },
    { value: ".", type: "change" },
    { value: "=", type: "operation" },
];

const numContainer = document.querySelector(".calc-items") as HTMLDivElement;

// Create UI
objArray.forEach(item => {
    const numElement = document.createElement("div");
    numElement.innerText = item.value.toString();
    numElement.classList.add("calc-item");
    numElement.dataset.type = item.type;
    numContainer.append(numElement);
});

const calcItems = document.querySelectorAll(".calc-item")!;
const numInput = document.querySelector('#calc-input-num') as HTMLInputElement;
const result = document.querySelector("#calc-input-result")!;

let cr, vr;

calcItems.forEach(item => {
    item.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLDivElement;

        cr = calcFuncs.calc(target.dataset.type!, target.innerHTML, numInput.selectionStart!);
        vr = calcFuncs.setResValues(cr);

        numInput.value = vr.inputVal;
        result.innerHTML = vr.resultVal;
    })
});

numInput.addEventListener("keyup", (e: Event) => {
    const target = e as KeyboardEvent;
    let lastInput = target.key;
    let inputType = objArray.find(x => x.value == lastInput)?.type!;

    if (lastInput === "Backspace") inputType = "BS";
    
    cr = calcFuncs.calc(inputType, lastInput, numInput.selectionStart!);
    vr = calcFuncs.setResValues(cr);

    numInput.value = vr.inputVal;
    result.innerHTML = vr.resultVal;

})