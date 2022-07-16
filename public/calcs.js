let nums = ['', ''];
let operation = '';
let result = 0;
let i;
export const calc = (type, value, ss) => {
    if (nums[0] && !nums[1])
        i = 0;
    else if (nums[1])
        i = 1;
    if (nums[0] && operation)
        i = 1;
    if (type === "number") {
        // eksi ile başlarken gg
        operation ? nums[1] += value : nums[0] += value;
    }
    else if (type === "operation") {
        if (operation && nums[1] && operation != "=") {
            result = +(+calculate(nums[0], operation, nums[1])).toFixed(2);
            nums[0] = result.toString();
            nums[1] = '';
            operation = value;
            i = 0;
        }
        else {
            operation = value;
            nums[0].slice(-1) === "." ? nums[0] = nums[0].replace(".", "") : "";
        }
    }
    else if (type === "change") {
        if (value === ".") {
            if (!nums[i].includes("."))
                nums[i] += value;
            if (i === 0 && nums[0] && operation)
                nums[1] = "0.";
        }
        else if (value === "+/-") {
            const searchIndex = nums[i].search("-");
            if (searchIndex <= -1)
                nums[i] = "-" + nums[i];
            else
                nums[i] = nums[i].replace("-", "");
        }
        else if (value === "C")
            nums = ["", ""], operation = "", result = 0;
        else if (value === "CE") {
            nums[i] = "";
            if (i === 0)
                operation = "";
        }
    }
    if (type === "BS") {
        const char = nums[i].charAt(ss);
        if (char)
            nums[i] = nums[i].replace(char, "");
        // nums[i] = nums[i].substring(ss-1, nums[i].length);
    }
    const rva = { nums, operation, result };
    return rva;
};
export const setResValues = (input) => {
    let inputVal = '';
    let resultVal = '';
    if (input.nums[0] && input.operation) {
        resultVal = input.nums[0] + input.operation;
        if (input.nums[1])
            inputVal = input.nums[1];
        else
            inputVal = "";
    }
    else {
        inputVal = input.nums[0];
        resultVal = input.result ? "" + input.result : String.fromCharCode(160);
    }
    return { inputVal, resultVal };
};
const calculate = (numOne, operator, numTwo) => {
    return new Function('return ' + numOne + operator + numTwo)();
};
