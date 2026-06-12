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

// Update HEX, DEC, OCT, BIN displays
function updateConversions(value) {
    // Extract the last typed number or the evaluated result to convert
    let match = value.match(/-?\d+(?:\.\d+)?$/); 
    let num = match ? parseInt(match[0], 10) : 0;
    
    if (isNaN(num)) num = 0;

    document.getElementById('hex-val').innerText = num.toString(16).toUpperCase();
    document.getElementById('dec-val').innerText = num.toString(10);
    document.getElementById('oct-val').innerText = num.toString(8);
    document.getElementById('bin-val').innerText = num.toString(2);
}

function handleInput(val) {
    const current = display.value;
    const lastChar = current.slice(-1);
    const ops = ['+', '-', '×', '÷', '*', '/', '&', '|', '^', '%', '<<', '>>'];

    if (val === 'C' || val === 'Escape' || val === 'Delete') {
        display.value = ''; bracketCount = 0;
    } 
    else if (val === '⌫' || val === 'Backspace') {
        if(lastChar === '(') bracketCount--;
        if(lastChar === ')') bracketCount++;
        
        // Handle shifting operators backspace (<<, >>)
        if (current.endsWith('<<') || current.endsWith('>>')) {
            display.value = current.slice(0, -2);
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
                .replace(/~/g, '~'); // Bitwise NOT
            
            let res = eval(expr);
            // Limit decimals for clean view
            if(res % 1 !== 0) res = parseFloat(res.toFixed(8));
            display.value = res;
            bracketCount = 0;
        } catch { 
            display.value = 'Error'; 
            setTimeout(()=> { display.value=""; updateConversions(""); }, 1500); 
        }
    } 
    else if (ops.includes(val)) {
        let normalized = val === '*' ? '×' : val === '/' ? '÷' : val;
        
        // Block double operators
        if (ops.includes(lastChar) || current.endsWith('<<') || current.endsWith('>>')) {
            // Complex replacement for 2-char operators vs 1-char
            if (current.endsWith('<<') || current.endsWith('>>')) {
                display.value = current.slice(0, -2) + normalized;
            } else {
                display.value = current.slice(0, -1) + normalized;
            }
        } else {
            display.value += normalized;
        }
    } 
    else if (val === '~') {
        display.value += '~';
    }
    else if (val === '+/-') {
        if (current === "") return;
        display.value = current.startsWith('-') ? current.substring(1) : '-' + current;
    }
    else if (val === '()') {
        if (bracketCount > 0 && (!isNaN(lastChar) || lastChar === ')')) {
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
        display.value += val;
    }
    
    // UI Updates
    display.scrollLeft = display.scrollWidth;
    display.style.fontSize = display.value.length > 15 ? "1.8rem" : "3rem";
    
    // Update live base conversions!
    updateConversions(display.value);
}

// Keyboard binding
document.addEventListener('keydown', (e) => {
    const validKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','(',')','Enter','Backspace','Escape','Delete','=','&','|','^','%','~','<','>'];
    if (validKeys.includes(e.key)) {
        e.preventDefault();
        
        // Handle shift keys specially
        if (e.key === '<') handleInput('<<');
        else if (e.key === '>') handleInput('>>');
        else handleInput(e.key);
    }
});