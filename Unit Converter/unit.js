// Sidebar logic
const sidebar = document.getElementById('sidebar');
document.getElementById('open-menu').onclick = (e) => { e.stopPropagation(); sidebar.classList.add('active'); };
document.addEventListener('click', (e) => { if (sidebar && !sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active'); });

// Comprehensive Unit Data from your images
const converterData = {
    length: { units: { 'Millimeters (mm)': 0.001, 'Centimeters (cm)': 0.01, 'Meters (m)': 1, 'Kilometers (km)': 1000, 'Inches (in)': 0.0254, 'Feet (ft)': 0.3048, 'Yards (yd)': 0.9144, 'Miles (mi)': 1609.34, 'Nautical miles (NM)': 1852, 'Mils (mil)': 0.0000254 } },
    area: { units: { 'Acres (ac)': 4046.856, 'Ares (a)': 100, 'Hectares (ha)': 10000, 'Square centimeters (cm²)': 0.0001, 'Square feet (ft²)': 0.092903, 'Square inches (in²)': 0.00064516, 'Square meters (m²)': 1 } },
    mass: { units: { 'Tons (t)': 1000, 'UK tons (t)': 1016.05, 'US tons (t)': 907.185, 'Pounds (lb)': 0.453592, 'Ounces (oz)': 0.0283495, 'Kilograms (kg)': 1, 'Grams (g)': 0.001 } },
    volume: { units: { 'UK gallons (gal)': 4.54609, 'US gallons (gal)': 3.78541, 'Liters (l)': 1, 'Milliliters (ml)': 0.001, 'Cubic centimeters (cm³)': 0.001, 'Cubic meters (m³)': 1000, 'Cubic inches (in³)': 0.016387, 'Cubic feet (ft³)': 28.3168 } },
    data: { units: { 'Bits (bit)': 0.125, 'Bytes (B)': 1, 'Kilobytes (KB)': 1024, 'Megabytes (MB)': 1048576, 'Gigabytes (GB)': 1073741824, 'Terabytes (TB)': 1099511627776 } },
    speed: { units: { 'Meters per second (m/s)': 1, 'Kilometers per hour (km/h)': 0.277778, 'Miles per hour (mi/h)': 0.44704, 'Knots (kn)': 0.514444, 'Feet per second (ft/s)': 0.3048 } },
    time: { units: { 'Milliseconds (ms)': 0.001, 'Seconds (s)': 1, 'Minutes (min)': 60, 'Hours (h)': 3600, 'Days (d)': 86400, 'Weeks (wk)': 604800 } },
    temperature: { units: { 'Celsius (°C)': 'C', 'Fahrenheit (°F)': 'F', 'Kelvin (K)': 'K' } }
};

// UI Elements
const catSelector = document.getElementById('category-selector');
const convBox = document.getElementById('converter-box');
const tipBox = document.getElementById('tip-section');
const unitFrom = document.getElementById('unit-from-select');
const unitTo = document.getElementById('unit-to-select');
const valIn = document.getElementById('input-value');
const valOut = document.getElementById('output-value');

// Switching logic
catSelector.onchange = () => {
    if (catSelector.value === 'tip') {
        convBox.style.display = 'none';
        tipBox.style.display = 'block';
        calculateTip();
    } else {
        convBox.style.display = 'block';
        tipBox.style.display = 'none';
        updateUnitDropdowns();
    }
};

function updateUnitDropdowns() {
    const units = Object.keys(converterData[catSelector.value].units);
    unitFrom.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    unitTo.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    unitTo.selectedIndex = units.length > 1 ? 1 : 0;
    performConversion();
}

function performConversion() {
    const cat = catSelector.value;
    if (cat === 'tip') return;
    const from = unitFrom.value, to = unitTo.value;
    const v = parseFloat(valIn.value) || 0;

    if (cat === 'temperature') {
        const f = converterData.temperature.units[from], t = converterData.temperature.units[to];
        let c = (f === 'C') ? v : (f === 'F') ? (v - 32) * 5/9 : v - 273.15;
        let res = (t === 'C') ? c : (t === 'F') ? (c * 9/5) + 32 : c + 273.15;
        valOut.value = res.toFixed(2);
    } else {
        const res = (v * converterData[cat].units[from]) / converterData[cat].units[to];
        valOut.value = res.toLocaleString(undefined, { maximumFractionDigits: 6 });
    }
}

// Tip Logic
function calculateTip() {
    const sub = parseFloat(document.getElementById('tip-subtotal').value) || 0;
    const pct = parseInt(document.getElementById('tip-percent-slider').value);
    const split = parseInt(document.getElementById('tip-split-slider').value);

    document.getElementById('tip-percent-display').innerText = pct + "%";
    document.getElementById('tip-split-display').innerText = split.toString().padStart(2, '0');

    const tip = sub * (pct / 100);
    const total = sub + tip;
    document.getElementById('res-tip-amount').innerText = "₹" + tip.toFixed(2);
    document.getElementById('res-tip-total').innerText = "₹" + total.toFixed(2);
    document.getElementById('res-tip-each').innerText = "₹" + (total / split).toFixed(2);
}

// Event bindings
[unitFrom, unitTo, valIn].forEach(el => el.oninput = performConversion);
['tip-subtotal', 'tip-percent-slider', 'tip-split-slider'].forEach(id => document.getElementById(id).oninput = calculateTip);

// Initialize
updateUnitDropdowns();