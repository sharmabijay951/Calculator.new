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

setupSync('loan-input', 'loan-slider');
setupSync('rate-input', 'rate-slider');
setupSync('year-input', 'year-slider');

function calculate() {
    const P = parseFloat(document.getElementById('loan-input').value) || 0;
    const R = (parseFloat(document.getElementById('rate-input').value) || 0) / 12 / 100;
    const N = (parseFloat(document.getElementById('year-input').value) || 0) * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    document.getElementById('res-principal').innerText = "₹" + Math.round(P).toLocaleString('en-IN');
    document.getElementById('res-interest').innerText = "₹" + Math.round(totalInterest).toLocaleString('en-IN');
    document.getElementById('res-emi').innerText = "₹" + Math.round(emi).toLocaleString('en-IN');
}

calculate();