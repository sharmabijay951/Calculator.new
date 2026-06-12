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
    input.oninput = () => { slider.value = input.value; calculateInflation(); };
    slider.oninput = () => { input.value = slider.value; calculateInflation(); };
}

setupSync('amt-input', 'amt-slider');
setupSync('rate-input', 'rate-slider');
setupSync('year-input', 'year-slider');

function calculateInflation() {
    const PV = parseFloat(document.getElementById('amt-input').value) || 0;
    const r = parseFloat(document.getElementById('rate-input').value) || 0;
    const n = parseFloat(document.getElementById('year-input').value) || 0;

    // Future Value (Mehangai ke baad cheez kitne ki hogi)
    const futureCost = PV * Math.pow(1 + (r / 100), n);
    
    // Purchasing Power (Aaj ke paiso ki aukaat kitni reh jayegi)
    const purchasingPower = PV / Math.pow(1 + (r / 100), n);

    document.getElementById('res-future').innerText = "₹" + Math.round(futureCost).toLocaleString('en-IN');
    document.getElementById('res-power').innerText = "₹" + Math.round(purchasingPower).toLocaleString('en-IN');
}

calculateInflation();