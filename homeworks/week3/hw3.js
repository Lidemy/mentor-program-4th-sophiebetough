const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(n) {
  if (n === 1) {
    return false;
  }
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function solve(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    const N = Number(arr[i]);
    if (isPrime(N)) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
