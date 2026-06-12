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
    input.oninput = () => { slider.value = input.value; calculateSWP(); };
    slider.oninput = () => { input.value = slider.value; calculateSWP(); };
}

setupSync('total-inv-input', 'total-inv-slider');
setupSync('withdraw-input', 'withdraw-slider');
setupSync('rate-input', 'rate-slider');
setupSync('year-input', 'year-slider');

function calculateSWP() {
    let P = parseFloat(document.getElementById('total-inv-input').value) || 0;
    let W = parseFloat(document.getElementById('withdraw-input').value) || 0;
    let r = (parseFloat(document.getElementById('rate-input').value) || 0) / 100 / 12;
    let n = (parseFloat(document.getElementById('year-input').value) || 0) * 12;

    let balance = P;
    let totalWithdrawn = W * n;

    // Monthly reduction logic
    for (let i = 0; i < n; i++) {
        balance = (balance - W) * (1 + r);
    }

    if (balance < 0) balance = 0; // Negative balance fix

    document.getElementById('res-total-withdrawal').innerText = "₹" + Math.round(totalWithdrawn).toLocaleString('en-IN');
    document.getElementById('res-final-balance').innerText = "₹" + Math.round(balance).toLocaleString('en-IN');
}

calculateSWP();