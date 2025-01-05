let input = document.getElementById("goal");
let output = document.getElementById("answer");
let dep = document.getElementById("dep");

let timer = document.getElementById("time");
let ans = document.getElementById("ans");
let len = document.getElementById("len");

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
    let keys = Object.keys(ops);
    let N = Math.round(math.random(10, 999));
    let S = Math.round(math.random(2, 9));

    let op = ops[keys[keys.length * Math.random() << 0]];

    let exp = op.use.replaceAll("N", N).replaceAll("S", S).replaceAll("G", G);
    let getExp = op.getX.replaceAll("N", N).replaceAll("S", S).replaceAll("G", G).replaceAll("R", "round(random(1,99))");
    
    if (!isValid(getExp, null)) {
        return "retry";
    }

    let X = math.evaluate(getExp).toFixed(7);

    if (!isValid(exp, X)) {
        return "retry";
    }

    if (!isSame(exp.replace("X", X), G)) {
        return "retry";
    }

    console.log(X, exp, getExp);

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

async function clicked() {
    timer.innerHTML = "Time: timing...";
    len.innerHTML = "Answer length: checking...";
    ans.innerHTML = "Real answer: in progress...";
    startDate = new Date();

    let out = await getFinalNum(input.value, dep.value);
    while (!isSame(out, input.value)) {
        out = await getFinalNum(input.value, dep.value);
    }

    output.innerHTML = out;
    timer.innerHTML = "Time: " + Math.abs(new Date() - startDate) + "ms";
    ans.innerHTML = "Real answer: " + math.evaluate(out).toFixed(7);
    len.innerHTML = "Answer length: " + out.length + " characters";
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
        let fix = G + math.evaluate(out);
        out = fix + "-(" + out + ")";
    }

    return out;
}