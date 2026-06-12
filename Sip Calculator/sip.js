const sidebar = document.getElementById('sidebar');
document.getElementById('open-menu').onclick = (e) => { 
    e.stopPropagation(); // Ye menu ko turant band hone se rokega
    sidebar.classList.add('active'); 
};
document.addEventListener('click', (e) => {
    if(!sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active');
});

function setupSync(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);
    input.oninput = () => { slider.value = input.value; calculate(); };
    slider.oninput = () => { input.value = slider.value; calculate(); };
}

setupSync('amt-input', 'amt-slider');
setupSync('rate-input', 'rate-slider');
setupSync('year-input', 'year-slider');

function calculate() {
    const P = parseFloat(document.getElementById('amt-input').value) || 0;
    const rate = parseFloat(document.getElementById('rate-input').value) || 0;
    const years = parseFloat(document.getElementById('year-input').value) || 0;

    const n = years * 12;
    const i = Math.pow(1 + rate/100, 1/12) - 1; // Accurate Python Logic

    let M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = P * n;
    const profit = M - invested;

    document.getElementById('res-invested').innerText = "₹" + Math.round(invested).toLocaleString('en-IN');
    document.getElementById('res-returns').innerText = "₹" + Math.round(profit).toLocaleString('en-IN');
    document.getElementById('res-total').innerText = "₹" + Math.round(M).toLocaleString('en-IN');
}

calculate();