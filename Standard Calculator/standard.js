const sidebar = document.getElementById('sidebar');
const display = document.getElementById('display');
let bracketCount = 0;

document.getElementById('open-menu').onclick = () => sidebar.classList.add('active');
document.addEventListener('click', (e) => {
    if(!sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active');
});

function handleInput(val) {
    const current = display.value;
    const lastChar = current.slice(-1);
    const ops = ['+', '-', '×', '÷', '*', '/', '%'];

    if (val === 'C' || val === 'Escape' || val === 'Delete') {
        display.value = ''; bracketCount = 0;
    } 
    else if (val === '⌫' || val === 'Backspace') {
        if(lastChar === '(') bracketCount--;
        if(lastChar === ')') bracketCount++;
        display.value = current.slice(0, -1);
    } 
    else if (val === '=' || val === 'Enter') {
        try {
            if (current === "") return;
            let res = eval(current.replace(/×/g, '*').replace(/÷/g, '/'));
            display.value = res;
        } catch { 
            display.value = 'Error'; 
            setTimeout(()=> display.value="", 1500); 
        }
    } 
    else if (ops.includes(val)) {
        let normalized = val === '*' ? '×' : val === '/' ? '÷' : val;
        if (ops.includes(lastChar)) {
            display.value = current.slice(0, -1) + normalized;
        } else if (current !== "" || normalized === '-') {
            // Minus shuru mein lag sake isliye '|| normalized === '-'' add kiya hai
            display.value += normalized;
        }
    } 
    else if (val === '+/-') {
        if (current === "") return;
        display.value = current.startsWith('-') ? current.substring(1) : '-' + current;
    }
    // SMART BRACKET LOGIC FIX
    else if (val === '()' || val === '(' || val === ')') {
        if (val === '()') {
            // Agar bracket open hai aur aakhiri char number ya ')' hai, toh close karo
            if (bracketCount > 0 && (!isNaN(lastChar) || lastChar === ')')) {
                display.value += ')';
                bracketCount--;
            } else {
                // Naya bracket open karo (aur jarurat ho toh Multiply '×' lagao)
                if (current !== "" && (!isNaN(lastChar) || lastChar === ')')) {
                    display.value += '×';
                }
                display.value += '(';
                bracketCount++;
            }
        } 
        else if (val === '(') {
            if (current !== "" && (!isNaN(lastChar) || lastChar === ')')) {
                display.value += '×';
            }
            display.value += '(';
            bracketCount++;
        } 
        else if (val === ')') {
            if (bracketCount > 0) {
                display.value += ')';
                bracketCount--;
            }
        }
    } 
    else { 
        display.value += val; 
    }
    
    // Auto Scroll aur Font Adjust
    display.scrollLeft = display.scrollWidth;
    const len = display.value.length;
    display.style.fontSize = len > 15 ? "1.8rem" : len > 10 ? "2.5rem" : "3.5rem";
}

document.addEventListener('keydown', (e) => {
    const validKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','%','.','(',')','Enter','Backspace','Escape','Delete','='];
    if (validKeys.includes(e.key)) {
        e.preventDefault();
        handleInput(e.key);
    }
});