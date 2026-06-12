// Hamburger Logic
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('open-menu');

openBtn.onclick = (e) => {
    e.stopPropagation();
    sidebar.classList.add('active');
};
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active');
});

// Sync Logic
function setupSync(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);

    input.oninput = () => { slider.value = input.value; calculateSI(); };
    slider.oninput = () => { input.value = slider.value; calculateSI(); };
}

setupSync('p-input', 'p-slider');
setupSync('r-input', 'r-slider');
setupSync('t-input', 't-slider');

// Calculate Simple Interest
function calculateSI() {
    const P = parseFloat(document.getElementById('p-input').value) || 0;
    const R = parseFloat(document.getElementById('r-input').value) || 0;
    const T = parseFloat(document.getElementById('t-input').value) || 0;

    // SI Formula = (P * R * T) / 100
    const interest = (P * R * T) / 100;
    const totalAmount = P + interest;

    document.getElementById('res-principal').innerText = "₹" + Math.round(P).toLocaleString('en-IN');
    document.getElementById('res-interest').innerText = "₹" + Math.round(interest).toLocaleString('en-IN');
    document.getElementById('res-total').innerText = "₹" + Math.round(totalAmount).toLocaleString('en-IN');
}

calculateSI();