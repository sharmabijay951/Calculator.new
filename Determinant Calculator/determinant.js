const sidebar = document.getElementById('sidebar');
document.getElementById('open-menu').onclick = (e) => { e.stopPropagation(); sidebar.classList.add('active'); };
document.addEventListener('click', (e) => { if (sidebar && !sidebar.contains(e.target)) sidebar.classList.remove('active'); });

const sizeSelect = document.getElementById('matrix-size');
const container = document.getElementById('matrix-container');
const visualFormula = document.getElementById('matrix-visual-formula');
const resultDisplay = document.getElementById('matrix-result');

function initMatrix() {
    const n = parseInt(sizeSelect.value);
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${n}, 55px)`;

    // Har avyav ke liye input box banana
    for (let i = 0; i < n * n; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'matrix-input';
        input.value = (i % (n + 1) === 0) ? "1" : "0"; // Identity matrix default
        input.dataset.index = i;
        input.oninput = updateUI;
        container.appendChild(input);
    }
    updateUI();
}

function updateUI() {
    const n = parseInt(sizeSelect.value);
    const inputs = document.querySelectorAll('.matrix-input');
    
    // 1. Array mein convert karna
    let matrixArr = [];
    let rows = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(parseFloat(inputs[i * n + j].value) || 0);
        }
        matrixArr.push(row);
    }

    // 2. Visualization render karna (Determinant Box)
    let visualHTML = 'det(A) = <div class="matrix-display">';
    for (let i = 0; i < n; i++) {
        let rowHTML = '<div>';
        for (let j = 0; j < n; j++) {
            let val = matrixArr[i][j];
            rowHTML += `<span class="avyav-live" style="display:inline-block; width:40px; text-align:center;">${val}</span> `;
        }
        rowHTML += '</div>';
        visualHTML += rowHTML;
    }
    visualHTML += '</div>';
    visualFormula.innerHTML = visualHTML;

    // 3. Determinant calculate karna
    const det = getDeterminant(matrixArr);
    resultDisplay.innerText = det.toLocaleString();
}

// Universal N x N Determinant logic
function getDeterminant(m) {
    if (m.length === 1) return m[0][0];
    if (m.length === 2) return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);

    let d = 0;
    for (let j = 0; j < m.length; j++) {
        d += Math.pow(-1, j) * m[0][j] * getDeterminant(getMinor(m, 0, j));
    }
    return d;
}

function getMinor(m, row, col) {
    return m.filter((r, i) => i !== row).map(r => r.filter((c, j) => j !== col));
}

sizeSelect.onchange = initMatrix;
initMatrix();