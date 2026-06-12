const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('open-menu');

openBtn.onclick = (e) => {
    e.stopPropagation();
    sidebar.classList.add('active');
};
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active');
});

function setupSync(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);
    input.oninput = () => { slider.value = input.value; calculateCompounding(); };
    slider.oninput = () => { input.value = slider.value; calculateCompounding(); };
}

setupSync('init-input', 'init-slider');
setupSync('month-input', 'month-slider');
setupSync('rate-input', 'rate-slider');
setupSync('year-input', 'year-slider');

function calculateCompounding() {
    const principal = parseFloat(document.getElementById('init-input').value) || 0;
    const monthly = parseFloat(document.getElementById('month-input').value) || 0;
    const rate = parseFloat(document.getElementById('rate-input').value) || 0;
    const years = parseFloat(document.getElementById('year-input').value) || 0;

    const n = years * 12;
    const i = rate / 100 / 12;

    // Principal Compounding
    let totalPrincipalValue = principal * Math.pow(1 + i, n);
    
    // Monthly Contribution Compounding (SIP formula)
    let totalMonthlyValue = 0;
    if(i > 0) {
        totalMonthlyValue = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    } else {
        totalMonthlyValue = monthly * n;
    }

    const totalInvested = principal + (monthly * n);
    const finalValue = totalPrincipalValue + totalMonthlyValue;
    const totalInterest = finalValue - totalInvested;

    document.getElementById('res-invested').innerText = "₹" + Math.round(totalInvested).toLocaleString('en-IN');
    document.getElementById('res-interest').innerText = "₹" + Math.round(totalInterest).toLocaleString('en-IN');
    document.getElementById('res-total').innerText = "₹" + Math.round(finalValue).toLocaleString('en-IN');
}

calculateCompounding();