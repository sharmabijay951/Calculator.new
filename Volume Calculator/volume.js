// Sidebar toggle logic
const sidebar = document.getElementById('sidebar');
document.getElementById('open-menu').onclick = (e) => { e.stopPropagation(); sidebar.classList.add('active'); };
document.addEventListener('click', (e) => { if (sidebar && !sidebar.contains(e.target) && e.target.id !== 'open-menu') sidebar.classList.remove('active'); });

// UI Interaction
const shapeSelector = document.getElementById('shape-selector');
const resultDisplay = document.getElementById('final-volume');

shapeSelector.onchange = () => {
    document.querySelectorAll('.shape-input-container').forEach(el => el.classList.remove('active-shape'));
    document.getElementById(`inputs-${shapeSelector.value}`).classList.add('active-shape');
    calculateVolume();
};

function calculateVolume() {
    const shape = shapeSelector.value;
    let volume = 0;

    if (shape === 'sphere') {
        const r = parseFloat(document.getElementById('sphere-r').value) || 0;
        volume = (4/3) * Math.PI * Math.pow(r, 3);
    } 
    else if (shape === 'cube') {
        const a = parseFloat(document.getElementById('cube-a').value) || 0;
        volume = Math.pow(a, 3);
    } 
    else if (shape === 'cuboid') {
        const a = parseFloat(document.getElementById('cuboid-a').value) || 0;
        const b = parseFloat(document.getElementById('cuboid-b').value) || 0;
        const c = parseFloat(document.getElementById('cuboid-c').value) || 0;
        volume = a * b * c;
    } 
    else if (shape === 'pyramid') {
        const a = parseFloat(document.getElementById('pyra-a').value) || 0;
        const h = parseFloat(document.getElementById('pyra-h').value) || 0;
        volume = (Math.pow(a, 2) * h) / 3;
    } 
    else if (shape === 'prism') {
        const n = parseInt(document.getElementById('prism-n').value) || 0;
        const s = parseFloat(document.getElementById('prism-s').value) || 0;
        const h = parseFloat(document.getElementById('prism-h').value) || 0;
        const baseArea = (n * Math.pow(s, 2)) / (4 * Math.tan(Math.PI / n));
        volume = baseArea * h;
    } 
    else if (shape === 'cone') {
        const r = parseFloat(document.getElementById('cone-r').value) || 0;
        const h = parseFloat(document.getElementById('cone-h').value) || 0;
        volume = (1/3) * Math.PI * Math.pow(r, 2) * h;
    } 
    else if (shape === 'ellipsoid') {
        const a = parseFloat(document.getElementById('ell-a').value) || 0;
        const b = parseFloat(document.getElementById('ell-b').value) || 0;
        const c = parseFloat(document.getElementById('ell-c').value) || 0;
        volume = (4/3) * Math.PI * a * b * c;
    }

    // Locale string for Indian Numbering System and 4 decimal precision
    resultDisplay.innerText = volume.toLocaleString('en-IN', { maximumFractionDigits: 4 });
}

// Listening to all inputs for real-time calculation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateVolume);
});

// Initial calculation
calculateVolume();