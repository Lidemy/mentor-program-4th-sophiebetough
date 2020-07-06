const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function digitsCount(n) {
  if (n === 0) return 1;
  let result = 0;
  let j = n;
  while (j !== 0) {
    j = Math.floor(j / 10);
    result += 1;
  }
  return result;
}

function isNarcissistic(n) {
  let m = n;
  const digits = digitsCount(m);
  let sum = 0;
  while (m !== 0) {
    const num = m % 10;
    sum += num ** digits;
    m = Math.floor(m / 10);
  }
  return sum === n;
}

function solve(arr) {
  const temp = arr[0].split(' ');
  const n = Number(temp[0]);
  const m = Number(temp[1]);
  for (let i = n; i <= m; i += 1) {
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
