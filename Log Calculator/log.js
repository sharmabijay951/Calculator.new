// 1. Keyboard & Logic Overhaul
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/[0-9]/.test(key)) handleInput(key);
    else if (key === '+') handleInput('+');
    else if (key === '-') handleInput('-');
    else if (key === '*') handleInput('×');
    else if (key === '/') handleInput('÷');
    else if (key === '.') handleInput('.');
    else if (key === '(' || key === ')') handleInput('()');
    else if (key === 'Enter' || key === '=') handleInput('=');
    else if (key === 'Backspace') handleInput('⌫');
    else if (key === 'Escape') handleInput('C');
});

// 2. Custom Log Finder Logic (Top Section)
const baseInp = document.getElementById('base-val');
const numInp = document.getElementById('num-val');
const resOut = document.getElementById('log-res-output');

function updateLog() {
    const a = parseFloat(baseInp.value);
    const b = parseFloat(numInp.value);
    if(a > 0 && a !== 1 && b > 0) {
        resOut.innerText = (Math.log(b) / Math.log(a)).toFixed(4);
    } else { resOut.innerText = "Error"; }
}
if(baseInp) baseInp.oninput = updateLog;
if(numInp) numInp.oninput = updateLog;

// 3. Robust Handle Input
function handleInput(val) {
    const disp = document.getElementById('display');
    if (!disp) return;

    if (val === '=') {
        try {
            let str = disp.value;
            
            // Balanced brackets fix[cite: 8]
            let open = (str.match(/\(/g) || []).length;
            let close = (str.match(/\)/g) || []).length;
            while (open > close) { str += ')'; open--; }

            // Factorial Calculation[cite: 8]
            str = str.replace(/(\d+)!/g, (match, num) => {
                let f = 1;
                for (let i = 1; i <= parseInt(num); i++) f *= i;
                return f;
            });

            // Logical Mapping: Visual to JS Logic[cite: 8]
            let processed = str
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/√\(/g, 'Math.sqrt(')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/\^/g, '**');
            
            let result = eval(processed);
            disp.value = Number.isInteger(result) ? result : result.toFixed(8).replace(/\.?0+$/, ""); 
        } catch { 
            disp.value = "Error"; 
            setTimeout(() => disp.value = "", 1500); 
        }
    } 
    else if (val === 'C') disp.value = "";
    else if (val === '⌫') disp.value = disp.value.slice(0, -1);
    else if (val === '()') {
        // Smart Context Brackets[cite: 8]
        const last = disp.value.slice(-1);
        const open = (disp.value.match(/\(/g) || []).length;
        const close = (disp.value.match(/\)/g) || []).length;
        if (disp.value === "" || "+-×÷(^".includes(last)) disp.value += "(";
        else if (open > close) disp.value += ")";
        else disp.value += "(";
    }
    else if (val === 'plusMinus') {
        if (disp.value) disp.value = disp.value.startsWith('-') ? disp.value.slice(1) : '-' + disp.value;
    }
    else if (val === '.') {
        const lastChar = disp.value.slice(-1);
        if (!disp.value.includes('.') || "+-×÷(".includes(lastChar)) {
            disp.value += '.';
        }
    }
    else { disp.value += val; }
}

// FIX: Correct logic for log_ab button[cite: 8]
function handleLogAB() {
    let a = prompt("Enter Base (a):");
    let b = prompt("Enter Number (b):");
    if (a && b) {
        // Change of base formula: log_a(b) = ln(b) / ln(a)[cite: 8]
        const val = (Math.log(parseFloat(b)) / Math.log(parseFloat(a))).toFixed(4);
        document.getElementById('display').value += val;
    }
}
