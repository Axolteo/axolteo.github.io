const input = document.getElementById("goal");
const output = document.getElementById("answer");
const dep = document.getElementById("dep");

const timer = document.getElementById("time");
const ans = document.getElementById("ans");
const len = document.getElementById("len");

let startDate;

function isValid(exp, X) {
    try {
        if (X?.includes("Infinity") || exp.includes("Infinity")) {
            throw "infinity err";
        }
        math.evaluate(exp.replace("X", X)).toFixed(7);
        return true;
    } catch (err) {
        return false;
    }
}

function isSame(a, b) {
    return (Math.abs(math.evaluate(a).toFixed(7) - math.evaluate(b).toFixed(7)) <= 0.0000001);
}

function getNum(G, depth, final, prevOp) {
    const keys = Object.keys(ops);
    const N = Math.round(math.random(10, 999));
    const S = Math.round(math.random(2, 9));

    const op = ops[keys[keys.length * Math.random() << 0]];

    const exp = op.use.replaceAll("N", N).replaceAll("S", S).replaceAll("G", G);
    const getExp = op.getX.replaceAll("N", N).replaceAll("S", S).replaceAll("G", G).replaceAll("R", "round(random(1,99))");
    
    if (!isValid(getExp, null)) {
        return "retry";
    }

    const X = math.evaluate(getExp).toFixed(7);

    if (!isValid(exp, X) || !isSame(exp.replace("X", X), G)) {
        return "retry";
    }

    let newX = X;
    
    if (depth < final) {
        newX = getNum(X, depth + 1, final, op);
        while (newX == "retry") {
            newX = getNum(X, depth + 1, final, op);
        }
    }

    if (prevOp?.priority <= op.priority) {
        return "(" + exp.replace("X", newX) + ")";
    } else {
        return exp.replace("X", newX);
    }
}

function clicked() {
    timer.innerText = "Time: timing...";
    len.innerText = "Answer length: checking...";
    ans.innerText = "Real answer: in progress...";
    startDate = new Date();

    let out = getFinalNum(input.value, dep.value);
    while (!isSame(out, input.value)) {
        out = getFinalNum(input.value, dep.value);
    }

    output.innerText = out;
    timer.innerText = "Time: " + Math.abs(new Date() - startDate) + "ms";
    ans.innerText = "Real answer: " + math.evaluate(out).toFixed(7);
    len.innerText = "Answer length: " + out.length + " characters";
}

function getFinalNum(G, finalDepth) {
    let depth = 0;
    
    let out = getNum(G, depth + 1, finalDepth, null);
    let validator = isValid(out, null);
    while (!validator) {
        out = getNum(G, depth + 1, finalDepth, null)
        validator = isValid(out, null);
    }

    if (!isSame(G, out)) {
        const fix = G + math.evaluate(out);
        out = fix + "-(" + out + ")";
    }

    return out;
}