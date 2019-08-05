let rows = document.getElementById('row-c').value;
let cols = document.getElementById('col-c').value;

const defaultColor = '#EDF5E1';

const sketch = document.querySelector('.sketchboard');


function refreshData() {
  rows = document.getElementById('row-c').value;
  cols = document.getElementById('col-c').value;
}

function populateGrid() {
  const size = rows * cols;
  for (let i = 0; i < size; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.minWidth = `${500 / cols}px`;
    cell.style.minHeight = `${500 / rows}px`;
    cell.style.border = `solid 1px ${document.getElementById('input-color').value}`;

    cell.addEventListener('mouseenter', (e) => {
      const color = document.getElementById('input-color').value;
      e.target.style.backgroundColor = color;
    });

    cell.addEventListener('mouseenter', (e) => {
      e.target.style.border = 'solid 2px #ffffff';
    });
    cell.addEventListener('mouseout', (e) => {
      e.target.style.border = `solid 1px ${document.getElementById('input-color').value}`;
    });

    sketch.appendChild(cell);
  }
}

// Color Converters
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(color) {
  return `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(color.b)}`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function dynamicPopulateGrid() {
  const size = rows * cols;
  for (let i = 0; i < size; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.minWidth = `${500 / cols}px`;
    cell.style.minHeight = `${500 / rows}px`;
    cell.style.border = `solid 1px ${document.getElementById('input-color').value}`;

    cell.addEventListener('mouseenter', (e) => {
      let color = e.target.style.backgroundColor;
      if (color == null || color === '') {
        color = defaultColor;
        color = hexToRgb(color);
      } else if (color[0] === '#') {
        color = hexToRgb(color);
      } else if (color[0] === 'r' || color[1] === 'g' || color[2] === 'b') {
        color = color.slice(4, -1);
        const colors = color.split(',').map(Function.prototype.call, String.prototype.trim);
        // [color.r, color.g, color.b] = [colors[0], colors[1], colors[2]];
        color = {
          r: colors[0],
          g: colors[1],
          b: colors[2],
        };
      }
      color.r = Math.max(color.r - 26, 0);
      color.g = Math.max(color.g - 26, 0);
      color.b = Math.max(color.b - 26, 0);
      const temp = rgbToHex(color);
      e.target.style.backgroundColor = temp;
    });

    cell.addEventListener('mouseenter', (e) => {
      e.target.style.border = 'solid 2px #ffffff';
    });
    cell.addEventListener('mouseout', (e) => {
      e.target.style.border = `solid 1px ${document.getElementById('input-color').value}`;
    });

    sketch.appendChild(cell);
  }
}

function init() {
  refreshData();
  sketch.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  sketch.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  populateGrid();
}

function removeCells() {
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach((e) => {
    sketch.removeChild(e);
  });
}

function repaint() {
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach((e) => {
    e.style.backgroundColor = defaultColor;
  });
}

function reset() {
  removeCells();
  init();
}

function changeColor() {
  document.getElementById('input-color').value = '#05386b';
}

function dynamic() {
  removeCells();
  document.getElementById('input-color').value = '#000000';
  refreshData();
  sketch.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  sketch.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  dynamicPopulateGrid();
}

document.getElementById('reset-btn').addEventListener('click', repaint);
document.getElementById('change-btn').addEventListener('click', reset);
document.getElementById('color-reset').addEventListener('click', changeColor);
document.getElementById('dynamic-btn').addEventListener('click', dynamic);

init();
