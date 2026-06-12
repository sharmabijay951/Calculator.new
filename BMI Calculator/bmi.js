// Sidebar Logic
const sidebar = document.getElementById('sidebar');
document.getElementById('open-menu').onclick = (e) => { e.stopPropagation(); sidebar.classList.add('active'); };
document.addEventListener('click', (e) => { if (sidebar && !sidebar.contains(e.target)) sidebar.classList.remove('active'); });

const hInput = document.getElementById('height');
const wInput = document.getElementById('weight');
const bmiVal = document.getElementById('bmi-val');
const bmiStatus = document.getElementById('bmi-status');
const bmiBox = document.getElementById('bmi-result-area');
const idealBox = document.getElementById('ideal-weight');

function calculateBMI() {
    const h = parseFloat(hInput.value) / 100; // cm to meters
    const w = parseFloat(wInput.value);

    if (h > 0 && w > 0) {
        const bmi = w / (h * h);
        bmiVal.innerText = bmi.toFixed(1);

        // Ideal weight range (BMI 18.5 to 24.9)
        const minW = (18.5 * (h * h)).toFixed(1);
        const maxW = (24.9 * (h * h)).toFixed(1);
        idealBox.innerText = `Ideal weight for your height: ${minW}kg - ${maxW}kg`;

        // Update UI Styles
        bmiBox.classList.remove('healthy', 'warning', 'danger');
        bmiVal.style.color = ""; // Reset inline color

        if (bmi < 18.5) {
            bmiStatus.innerText = "Underweight";
            bmiBox.classList.add('warning');
            bmiVal.style.color = "#ff9800";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            bmiStatus.innerText = "Healthy / Fit";
            bmiBox.classList.add('healthy');
            bmiVal.style.color = "#00d09c";
        } else if (bmi >= 25 && bmi <= 29.9) {
            bmiStatus.innerText = "Overweight";
            bmiBox.classList.add('warning');
            bmiVal.style.color = "#ff9800";
        } else {
            bmiStatus.innerText = "Obese";
            bmiBox.classList.add('danger');
            bmiVal.style.color = "#f44336";
        }
    }
}

[hInput, wInput].forEach(el => el.oninput = calculateBMI);
calculateBMI();