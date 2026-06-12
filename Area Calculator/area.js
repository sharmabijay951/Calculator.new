// Sidebar Logic
const sidebar = document.getElementById('sidebar');
document.getElementById('open-menu').onclick = (e) => { e.stopPropagation(); sidebar.classList.add('active'); };
document.addEventListener('click', (e) => { if (!sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active'); });

// Shape switching
const shapeSelector = document.getElementById('shape-selector');
const resultDisplay = document.getElementById('final-area');

shapeSelector.onchange = () => {
    document.querySelectorAll('.shape-input-container').forEach(el => el.classList.remove('active-shape'));
    document.getElementById(`inputs-${shapeSelector.value}`).classList.add('active-shape');
    calculateArea();
};

// Triangle Method Switch
document.getElementById('tri-method').onchange = (e) => {
    document.getElementById('tri-m1').style.display = e.target.value === "1" ? "block" : "none";
    document.getElementById('tri-m2').style.display = e.target.value === "2" ? "block" : "none";
    calculateArea();
};

function calculateArea() {
    const shape = shapeSelector.value;
    let area = 0;
    document.getElementById('cone-extra').style.display = "none";

    if (shape === 'square') {
        const a = parseFloat(document.getElementById('sq-a').value) || 0;
        area = a * a;
    } 
    else if (shape === 'rectangle') {
        const a = parseFloat(document.getElementById('rect-a').value) || 0;
        const b = parseFloat(document.getElementById('rect-b').value) || 0;
        area = a * b;
    } 
    else if (shape === 'circle') {
        const r = parseFloat(document.getElementById('circ-r').value) || 0;
        area = Math.PI * r * r;
    } 
    else if (shape === 'triangle') {
        const method = document.getElementById('tri-method').value;
        if (method === "1") {
            const b = parseFloat(document.getElementById('tri-b').value) || 0;
            const h = parseFloat(document.getElementById('tri-h').value) || 0;
            area = 0.5 * b * h;
        } else {
            const a = parseFloat(document.getElementById('tri-s1').value) || 0;
            const b = parseFloat(document.getElementById('tri-s2').value) || 0;
            const c = parseFloat(document.getElementById('tri-s3').value) || 0;
            const s = (a + b + c) / 2;
            if (s > a && s > b && s > c) {
                area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            } else {
                area = "Invalid Triangle";
            }
        }
    } 
    else if (shape === 'polygon') {
        const n = parseInt(document.getElementById('poly-n').value) || 0;
        const s = parseFloat(document.getElementById('poly-s').value) || 0;
        area = (n * s * s) / (4 * Math.tan(Math.PI / n));
    } 
    else if (shape === 'cone') {
        const r = parseFloat(document.getElementById('cone-r').value) || 0;
        const h = parseFloat(document.getElementById('cone-h').value) || 0;
        const l = Math.sqrt(r * r + h * h);
        const csa = Math.PI * r * l;
        const tsa = Math.PI * r * (l + r);
        document.getElementById('cone-extra').style.display = "block";
        document.getElementById('res-csa').innerText = csa.toFixed(2);
        area = tsa; // Main display shows TSA
    }
    else if (shape === 'ellipse') {
        const a = parseFloat(document.getElementById('elp-a').value) || 0;
        const b = parseFloat(document.getElementById('elp-b').value) || 0;
        area = Math.PI * a * b
    }

    resultDisplay.innerText = typeof area === 'number' ? area.toFixed(2) : area;
}

// Auto update on input change
document.querySelectorAll('input').forEach(input => input.addEventListener('input', calculateArea));
calculateArea();