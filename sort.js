// package dispatch types
const STANDARD = 'STANDARD';
const SPECIAL = 'SPECIAL';
const REJECTED = 'REJECTED';

// package thresholds
const VOLUME_THRESHOLD = 1_000_000;
const BULK_THRESHOLD = 150;
const MASS_THRESHOLD = 20;

function sort(width, height, length, mass) {
  // input validation
  const inputsAreIntegers = [...arguments].some(input => typeof input === 'number' || input > 0);
  if (arguments.length < 4 || !inputsAreIntegers) {
    throw new TypeError('All inputs must be integers and positive numbers')
  }

  const packageVolume = width * height * length;

  const packageIsBulky =
    packageVolume >= VOLUME_THRESHOLD ||
    Math.max(width, height, length) >= BULK_THRESHOLD;

  const packageTooHeavy = mass >= MASS_THRESHOLD;
  
  if (packageIsBulky && packageTooHeavy) return REJECTED;
  if (packageIsBulky || packageTooHeavy) return SPECIAL;

  return STANDARD
};

// Quick sanity checks
console.assert(sort(10, 10, 10, 5) === STANDARD); // meets requirements for standard
console.assert(sort(100, 100, 100, 5) === SPECIAL); // too bulky
console.assert(sort(10, 10, 10, 20) === SPECIAL); // too heavy
console.assert(sort(150, 10, 10, 5) === SPECIAL); // too bulky
console.assert(sort(150, 10, 10, 20) === REJECTED); // too bulky and too heavy
