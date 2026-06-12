const sidebar = document.getElementById('sidebar');
const display = document.getElementById('display');
let bracketCount = 0;

// Hamburger Menu
document.getElementById('open-menu').onclick = (e) => {
    e.stopPropagation();
    sidebar.classList.add('active');
};
document.addEventListener('click', (e) => {
    if(!sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active');
});

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function handleInput(val) {
    const current = display.value;
    const lastChar = current.slice(-1);
    const ops = ['+', '-', '×', '÷', '*', '/', '^'];

    if (val === 'C' || val === 'Escape' || val === 'Delete') {
        display.value = ''; bracketCount = 0;
    } 
    else if (val === '⌫' || val === 'Backspace') {
        if(lastChar === '(') bracketCount--;
        if(lastChar === ')') bracketCount++;
        // Remove functions like "sin(" together
        if (current.endsWith('sin(') || current.endsWith('cos(') || current.endsWith('tan(') || current.endsWith('log(')) {
            display.value = current.slice(0, -4);
        } else if (current.endsWith('ln(')) {
            display.value = current.slice(0, -3);
        } else {
            display.value = current.slice(0, -1);
        }
    } 
    else if (val === '=' || val === 'Enter') {
        try {
            if (current === "") return;
            let expr = current
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/\^/g, '**')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/√\(/g, 'Math.sqrt(');
            
            // Factorial handling (Basic)
            expr = expr.replace(/(\d+)!/g, (match, n) => factorial(parseInt(n)));
            
            let res = eval(expr);
            // Limit decimals
            if(res % 1 !== 0) res = parseFloat(res.toFixed(8));
            display.value = res;
            bracketCount = 0;
        } catch { 
            display.value = 'Error'; 
            setTimeout(()=> display.value="", 1500); 
        }
    } 
    else if (ops.includes(val)) {
        let normalized = val === '*' ? '×' : val === '/' ? '÷' : val;
        if (ops.includes(lastChar)) {
            display.value = current.slice(0, -1) + normalized;
        } else {
            display.value += normalized;
        }
    } 
    else if (val === '+/-') {
        if (current === "") return;
        display.value = current.startsWith('-') ? current.substring(1) : '-' + current;
    }
    else if (val === '()') {
        if (bracketCount > 0 && (!isNaN(lastChar) || lastChar === ')' || lastChar === 'π' || lastChar === 'e')) {
            display.value += ')';
            bracketCount--;
        } else {
            if (current !== "" && (!isNaN(lastChar) || lastChar === ')')) {
                display.value += '×';
            }
            display.value += '(';
            bracketCount++;
        }
    }
    else {
        // Automatically add multiply if number comes after PI or E
        if ((!isNaN(val) || val.includes('sin') || val.includes('cos') || val === 'π') && (lastChar === 'π' || lastChar === 'e' || lastChar === ')')) {
            display.value += '×';
        }
        display.value += val;
        if(val.includes('(')) bracketCount++;
    }
    
    display.scrollLeft = display.scrollWidth;
    display.style.fontSize = display.value.length > 15 ? "1.8rem" : "3rem";
}

document.addEventListener('keydown', (e) => {
    const validKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','(',')','Enter','Backspace','Escape','Delete','=','^'];
    if (validKeys.includes(e.key)) {
        e.preventDefault();
        handleInput(e.key);
    }
});