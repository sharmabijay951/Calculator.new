// PERFECT HAMBURGER LOGIC
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('open-menu');

openBtn.onclick = (e) => {
    e.stopPropagation(); // Prevents instant closing
    sidebar.classList.add('active');
};

document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target.id !== 'open-menu') {
        sidebar.classList.remove('active');
    }
});

// CALCULATION & SYNC LOGIC
function setupSync(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);

    input.oninput = () => { slider.value = input.value; calculateLumpsum(); };
    slider.oninput = () => { input.value = slider.value; calculateLumpsum(); };
}

setupSync('inv-input', 'inv-slider');
setupSync('rate-input', 'rate-slider');
setupSync('year-input', 'year-slider');

function calculateLumpsum() {
    const P = parseFloat(document.getElementById('inv-input').value) || 0;
    const r = parseFloat(document.getElementById('rate-input').value) || 0;
    const n = parseFloat(document.getElementById('year-input').value) || 0;

    // A = P(1 + r/100)^n
    const totalValue = P * Math.pow((1 + r / 100), n);
    const returns = totalValue - P;

    document.getElementById('res-invested').innerText = "₹" + Math.round(P).toLocaleString('en-IN');
    document.getElementById('res-returns').innerText = "₹" + Math.round(returns).toLocaleString('en-IN');
    document.getElementById('res-total').innerText = "₹" + Math.round(totalValue).toLocaleString('en-IN');
}

calculateLumpsum();