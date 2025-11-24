document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});
let txt1
let txt2
let btn
let lblRes
let op

function pageLoaded() {
    txt1 = document.getElementById('txt1');
    txt2 = document.getElementById('txt2');
    btn = document.getElementById('btnCalc');
    lblRes = document.getElementById('lblRes');
    op = document.getElementById('op');
    btn.addEventListener('click', () => {
        calculate();
    });

    const btn2 = document.getElementById("btn2");
    //this is callback
    btn2.addEventListener("click", () => {
        print("btn2 clicked : " + btn2.id + btn2.value, false);
    })


}

function calculate() {
    // get numbers
    const num1 = parseInt(txt1.value);
    const num2 = parseInt(txt2.value);

    let res

    //use selected operation from the list "dropdown"
    switch (op.value) {
        case "+":
            res = num1 + num2;
            break;

        case "-":
            res = num1 - num2;
            break;

        case "*":
            res = num1 * num2;
            break;

        case "/":
            res = num2 === 0 ? NaN : num1 / num2; // simple handling
            break;
    }

    lblRes.innerText = res;

    print(`${num1} ${op.value} ${num2} = ${res}`, false);
}







function print(msg, appendToLastLine) {
    //--get text area element reference 
    const ta = document.getElementById("output");
    if (!ta) {
        console.log(msg);
        return;
    }
    if (appendToLastLine) {
        //continue the last line
        ta.value += msg;
    } else {
        //start a new line
        if (ta.value !== "") {
            ta.value += "\n";
        }
        ta.value += msg;
    }

    ta.scrollTop = ta.scrollHeight;
}



// =============================================
// STEP 1: JS NATIVE TYPES, USEFUL TYPES & OPERATIONS
// =============================================
function demoNative() {
    let out = "=== STEP 1: NATIVE TYPES ===\n";

    // String
    const s = "Hello World";
    out += "\n[String] s = " + s;
    out += "\nLength: " + s.length;
    out += "\nUpper: " + s.toUpperCase();

    // Number
    const n = 42;
    out += "\n\n[Number] n = " + n;

    // Boolean
    const b = true;
    out += "\n\n[Boolean] b = " + b;

    // Date
    const d = new Date();
    out += "\n\n[Date] now = " + d.toISOString();

    // Array
    const arr = [1, 2, 3, 4];
    out += "\n\n[Array] arr = [" + arr.join(", ") + "]";
    out += "\nPush 5 → " + (arr.push(5), arr.join(", "));
    out += "\nMap x2 → " + arr.map(x => x * 2).join(", ");

    // Functions as variables
    const add = function (a, b) { return a + b; };
    out += "\n\n[Function as variable] add(3,4) = " + add(3, 4);

    // Callback
    function calc(a, b, fn) { return fn(a, b); }
    const result = calc(10, 20, (x, y) => x + y);
    out += "\n[Callback] calc(10,20, x+y ) = " + result;

    //print to log
    print(out, false);
}
