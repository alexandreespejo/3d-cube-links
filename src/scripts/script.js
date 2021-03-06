const cube = document.querySelector('.cube');
const scene = document.querySelector('.scene');

let centerScreenY;
let centerScreenX;

let currentPositionX = 0,
  currentPositionY = 0,
  lastPositionX = null,
  lastPositionY = null;

let grabbing = false;

document.addEventListener('mouseup', grabOff);
document.addEventListener('mousemove', handleMouseMove);

Array.from(document.querySelectorAll('#icon')).map(
  (item) =>
    (item.ondragstart = function () {
      return false;
    })
);

const links = [
  'https://github.com/alexandreespejo',
  'https://www.linkedin.com/in/alexandre-espejo-59b5911a9/',
  'https://www.instagram.com/alexandre_espejo/',
];

function redirect(index) {
  window.open(links[index]);
}

function grabOn() {
  grabbing = true;
  document.body.style.cursor = 'grab';
}

function grabOff() {
  grabbing = false;
  lastPositionX = currentPositionX;
  lastPositionY = currentPositionY;
  cube.style.cursor = 'grab';
  document.body.style.cursor = 'auto';
}

function handleMouseMove({ pageX, pageY }) {
  const { innerHeight, innerWidth } = window;

  centerScreenY = innerHeight / 2;
  centerScreenX = innerWidth / 2;

  if (grabbing) renderMovement(pageX, pageY);
}

function renderMovement(pageX, pageY) {
  currentPositionX = lastPositionX
    ? lastPositionX + percentCalculate(pageY, 'y')
    : percentCalculate(pageY, 'y');
  currentPositionY = lastPositionY
    ? lastPositionY + percentCalculate(pageX, 'x')
    : percentCalculate(pageX, 'x');

  cube.style.transform = `translateZ(-100px) rotateX(${currentPositionX}deg) rotateY(${currentPositionY}deg) `;
}

function percentCalculate(mousePosition, axis) {
  let expression;

  switch (axis) {
    case 'x':
      mousePosition > centerScreenX
        ? (expression = ((mousePosition - centerScreenX) * 180) / centerScreenX)
        : (expression =
            (-1 * ((centerScreenX - mousePosition) * 180)) / centerScreenX);
      break;
    case 'y':
      mousePosition > centerScreenY
        ? (expression =
            -1 * (((mousePosition - centerScreenY) * 180) / centerScreenY))
        : (expression =
            ((centerScreenY - mousePosition) * 180) / centerScreenY);
      break;
  }

  return Math.floor(expression);
}
