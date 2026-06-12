const sidebar = document.getElementById('sidebar');
document.getElementById('open-menu').onclick = (e) => {
    e.stopPropagation();
    sidebar.classList.add('active');
};
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active');
});

const dStart = document.getElementById('date-start');
const dEnd = document.getElementById('date-end');
const resDiv = document.getElementById('date-result');

// Auto calculate on change
[dStart, dEnd].forEach(el => el.addEventListener('change', calculateDateDiff));

function calculateDateDiff() {
    if (!dStart.value || !dEnd.value) return;

    let start = new Date(dStart.value);
    let end = new Date(dEnd.value);

    let diffTime = Math.abs(end - start);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let years = Math.floor(diffDays / 365);
    let months = Math.floor((diffDays % 365) / 30);
    let days = (diffDays % 365) % 30;

    resDiv.innerHTML = `<strong>Result:</strong><br>${years} Years, ${months} Months, ${days} Days<br><small>Total ${diffDays} days</small>`;
}